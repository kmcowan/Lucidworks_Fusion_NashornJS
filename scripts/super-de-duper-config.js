/* 
 * Usage: 
 * 
 * query_params:  A standard set of Solr Query Params. 
 * use_solr: specifies whether or not a solr query should be made to look for a duplicate. 
 * use_map:  specifies whether or not an internal map should be used to track duplicates.
 * duplicate_key: The field in the document in which to search for duplicates.  
 * multi_collection_enabled: allow different config params for different collections. Takes the same config as the root level 
 * collections: a json object that contains the configurations for various collections. 
 * threshold: How should the duplicate be determined.  options are: contains|equals|startsWith|endsWith|matches|date
 * regex: if threshold->matches is used, a valid regex must be supplied. 
 * sample: a static piece of text that should invoke filter. 
 * days_old: filter by how old a document is.   
 * date_key: the field in the document contain the date. 
 * date_format_str: E.g. "EEE, d MMM yyyy HH:mm:ss Z" See SimpleDateFormat https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 *  
 * 
 * Notes: 
 *         - Root-level defintions create the default values.  These can be overridden with the collection config. 
 *         - if both use_map and use_solr are enabled, use_solr will only fire if result of use_map is false. I.e. skipDoc is false and use_map is enabled. 
 *         - If threshold type is date, you'll need to fill in other date_ fields accordingly. 
 */


var superDeDuuperConfig = {
    "query_params": {
        "q": "*:*",
        "fq": ""
    },
    "use_solr": true,
    "use_map": true,
    "duplicate_key": "title_s",
    "threshold": "equals",
    "regex": "",
    "sample": "sample text to filter",
    "days_old": "0",
    "date_key": "date",
    "date_format_str": "",
    "date_threshold": "before",
    "multi_collection_enabled": true,
    "collections": {
        "default": {
            "query_params": {
                "q": "*:*",
                "fq": ""
            },
            "use_solr": true,
            "use_map": true,
            "duplicate_key": "title_s",
            "threshold": "equals",
            "regex": "",
            "sample": "sample text to filter",
            "days_old": "0",
            "date_key": "date",
            "date_format_str": "",
            "date_threshold": "before"
        }
    }

};