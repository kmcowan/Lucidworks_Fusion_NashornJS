/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var deduper = function (doc, ctx) {
    var HashMap = java.util.HashMap;
    var URLEncoder = java.net.URLEncoder;
    var e = java.lang.Exception;
    var System = java.lang.System;
    var baseKey = "deduper_map_";
 

    var duperMapKey = baseKey + ctx.getString("batchId");
    var key = "title_s";
    var skipDoc = false;
    var maxdocs = 1000000000;

    // clean up from previous runs
    cleanUpDuperMaps(ctx, baseKey, duperMapKey);

    try {
        var map = null;
        if (System.getProperties().get(duperMapKey) !== null) {
            map = System.getProperties().get(duperMapKey);

            logger.info("** USE EXISTING MAP ** ... items: " + map.size());
        } else {
            map = new HashMap();
            logger.info("** MAKE NEW MAP ** : " + doc.getId());
        }

        if (doc !== null && doc.hasField(key)) {
            var title = doc.getFirstFieldValue(key);

            if (title && title !== undefined && title !== null) {
                // create hash-safe key
                title = URLEncoder.encode(title);

                if (map.get(title.trim()) === null) {
                    logger.info("ADD NEW DE-DUPE: " + doc.getId());
                    map.put(title, doc.getId());
                } else {
                    logger.info("***** ### **** DE-DUPING DOCUMENT: " + title);
                    doc.setId(null);// don't index the duplicate. 
                    skipDoc = true;
                }

            }
        }

        // replace the map in the system. 
        System.getProperties().put(duperMapKey, map);

    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }

    if (skipDoc) {
        return null;
    } else {
        return doc;
    }
};

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


