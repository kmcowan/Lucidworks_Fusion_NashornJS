/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var objMapper = function (doc) {
    logger.info("PRINT PIPELINE DOC");
    logger.info(doc);
    if (doc !== null && doc.getId() !== null) {

        // class import declaration
        var ObjectMapper = com.fasterxml.jackson.databind.ObjectMapper;
        var ArrayList = java.util.ArrayList;
        //  var Iterator = java.util.Iterator;
        var Map = java.util.Map;
        var StringUtils = org.apache.commons.lang3.StringUtils;
        var String = java.lang.String;
        var e = java.lang.Exception;


        try {

            // local variable declaration
            var mapper = new ObjectMapper();
            var content = doc.getFirstFieldValue("body");
            if (content !== null) {
                var mapData = mapper.readValue(content, Map.class);
                if (mapData != null) {
                    logger.info("Read data OKY");
                    var result = mapData.get("result");
                    //    var iter = result.keySet().iterator();
                    var obj = java.lang.Object;
                    var key = java.lang.String;
                    var list = java.util.ArrayList;
                    //  while (iter.hasNext()) {
                    for each(var key in result.keySet()) {
                        //  key = iter.next();
                        obj = result.get(key);

                        if (obj instanceof String) {
                            logger.info("Key: " + key + " object: " + obj.getClass().getSimpleName() + " value: " + obj);
                            doc.addField(key, obj);
                        } else if (obj instanceof ArrayList) {
                            list = obj;
                            logger.info("Key: " + key + " object: " + obj.getClass().getSimpleName() + " value: " + StringUtils.join(list, ","));
                            doc.addField(key, StringUtils.join(list, ","));
                        }
                    }

                }

            } else {
                logger.info("Content was NULL! ");
            }

        } catch (e) {
            logger.error(e);
        }
    } else {
        logger.warn("PipelineDocument was NULL");
    }

    return doc;
};