/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var deduper = function (doc, solrServer, collection, ctx) {

    // load the config
    load("scripts/super-de-duper-config.js");
    var config = getDefaultConfig();
    if (superDeDuuperConfig !== undefined) {
        config = superDeDuuperConfig;
    }

    // Check for multi-collection enabled
    if (config.multi_collection_enabled &&
            config.collections[collection]) { // if multi collection is enabled and exists, set as config. 
        config = config.collections[collection];
    }

    // define defaults. 
    var HashMap = java.util.HashMap;
    var e = java.lang.Exception;
    var System = java.lang.System;
    var baseKey = "deduper_map_";

    var duperMapKey = baseKey + ctx.getString("batchId");
    var key = config.duplicate_key;
    var skipDoc = false;
    var maxdocs = 1000000000; // this value should never exceed Integer.MAX_VALUE
    var isMultiCollectionEnabled = config.multi_collection_enabled;

    if (isMultiCollectionEnabled) {
        duperMapKey = collection + "_" + duperMapKey;
    }

  // clear pervious runs
   cleanUpDuperMaps(ctx, baseKey, duperMapKey);


    try {
        if (config.use_map) {
            var map = null;
            if (doc === null || doc.getId()) {
                // first run, or re-run, of the pipeline, so we create a new map. 
                logger.info("** LAST RUN...RESETTING MAP ** : " + doc.getId());
                map = new HashMap();
                System.getProperties().put(duperMapKey, map);
            } else if (System.getProperties().get(duperMapKey) !== null) {
                map = System.getProperties().get(duperMapKey);
                if (map.size() > maxdocs) {

                }
                logger.info("** USE EXISTING MAP ** ... items: " + map.size());
            } else {
                map = new HashMap();
                logger.info("** MAKE NEW MAP ** : " + doc.getId());
            }

            if (doc !== null && doc.hasField(key)) {
                var target = doc.getFirstFieldValue(key);
                if (target && target !== undefined && target !== null) {
                    switch (config.treshold) {
                        case "equals":
                            if (map.get(target.trim()) === null) {
                                logger.info("ADD NEW DE-DUPE: " + doc.getId());
                                map.put(target, doc.getId());
                            } else {
                                logger.info("***** ### **** DE-DUPING DOCUMENT: " + target);
                                doc.setId(null);// don't index the duplicate. 
                                skipDoc = true;
                            }
                            break;

                        case "date": // compare dates 
                            var date = doc.getFirstFieldValue(config.date_key);
                            skipDoc = isInDateThreshold(date, config.date_format_str, config.days_old, config.date_threshold);
                            break;

                        default: // if something other than equals or date
                            skipDoc = isTargetHit(target, config.sample, config.threshold, config.regex);
                            break;

                    }

                }
            }

            // replace the map in the system. 
            System.getProperties().put(duperMapKey, map);
        }

        // if we're using map and skipDoc is true, we'll ignore this branch. 
        if ((!skipDoc && config.use_map) || config.use_solr) {
            skipDoc = hasDeDupeTarget(key, config, solrServer);
        }

    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }

    if (skipDoc) {
        return null;
    } else {
        return doc;
    }
};


function hasDeDupeTarget(target, config, server) {
    var result = false;
    var HashMap = java.util.HashMap();
    var e = java.lang.Exception;

    try {
        var map = new HashMap();

        var iter = config.getJSONObject("query_params").keys();
        var key, value;
        while (iter.hasNext()) {
            key = iter.next();
            value = config.getJSONObject("query_params").getString(key);
            map.put(key, value);
        }
        var params = new MapSolrParams(map);


        var resp = server.query(params);
        var docs = resp.getResults();
        if (docs != null && docs.size() > 0) {
            result = true;
        }

    } catch (e) {
        e.printStackTrace();
    }

    return result;
}

function getDefaultConfig() {
    // the default config object. 
    var superDeDuuperConfig = {
        "query_params": {},
        "use_solr": false,
        "use_map": true,
        "threshold": "equals", //options are: contains|equals|startsWith|endsWith|matches|date
        "regex": "",
        "sample": "sample text to filter",
        "days_old": "0",
        "date_key": "date",
        "date_format": "timestamp",
        "date_format_str": "",
        "date_threshold": "before",
        "duplicate_key": "id",
        "multi_collection_enabled": false,
        "collections": {}


    };

    return superDeDuuperConfig;
}


function isTargetHit(target, source, threshold, regex) {
    var result = false;
    var String = java.lang.String;
    var test = new String(target);
    var src = new String(source);

    switch (threshold) {
        case "contains":
            result = test.contains(source);
            break;

        case "equals":
            result = test.equals(source);
            break;

        case "startsWith":
            result = src.startsWith(target);
            break;

        case "endsWith":
            result = src.endsWith(target);
            break;

        case "matches":
            var m = test.matches(regex);
            if (m === 0) {
                result = true;
            }
            break;

    }
    return result;
}


function isInDateThreshold(dateStr, format, daysOld, threshold) {
    var result = false;
    var SimpleDateFormat = java.text.SimpleDateFormat;
    var simpleDateFormat = new SimpleDateFormat(format);
    var Calendar = java.util.Calendar;
    var Date = java.util.Date;

    var date1 = simpleDateFormat.parse(dateStr);
    var cal = Calendar.getInstance();
    cal.add(Calendar.DAY_OF_MONTH, daysOld);
    var date2 = cal.getTime();
    var comp = date1.compareTo(date2);
    switch (threshold) {
        case "before":
            if (comp < 0) {
                result = true;
            }
            break;
        case "after":
            if (comp > 0) {
                result = true;
            }
            break;
        case "equals":
            if (comp === 0) {
                result = true;
            }
            break;

    }


    return result;
}

function cleanUpDuperMaps(ctx, baseKey, duperMapKey) {
    var e = java.lang.Exception;
    try {

        var props = ctx.keySet().iterator();
        var pkey;

        while (props.hasNext()) {
            pkey = props.next();

            if (pkey.startsWith(baseKey) &&
                    !pkey.equals(duperMapKey)) {
                ctx.put(pkey, null);
            }
        }
        //  logger.info(str);
    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }
}

function printMap(pmap) {
    var e = java.lang.Exception;
    try {
        if (pmap instanceof Java.type("java.util.Map")) {
            var props = pmap.keySet().iterator();
            var pkey;
            var pvalue;
            var str = "";
            while (props.hasNext()) {
                pkey = props.next();
                pvalue = pmap.get(pkey);
                str += " Key: " + pkey + " value: " + pvalue.toString() + "  ";
            }
        } else {
            str = " ** OBJECT IS NOT A MAP...";
            if (pmap !== null && pmap instanceof Java.type("java.lang.Object")) {
                str += " class: " + pmap.class.getSimpleName();
            } else if (pmap !== null) {
                str += " object: " + pmap.toString();
            }
        }
        logger.info(str);
    } catch (e) {
        logger.error(e.toString());
    }
}
