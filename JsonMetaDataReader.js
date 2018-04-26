/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var metaDataReader = function (doc) {
    var e = java.lang.Exception;

    if (doc !== null && doc.getId() !== null && doc.getFirstFieldValue("parse") !== null) {
        try {
            var JSONArray = org.json.JSONArray;
            var JSONObject = org.json.JSONObject;
            var Iterator = java.util.Iterator;

            var json = new JSONObject(jsonStr);
            /*  
             * Here is a sample of how to work with the JSONObject and JSONArray
             
             var sample_json_string = json.get("dc:description");
             var sample_json_array = payload.getJSONArray("corning:resource-types.es");
             */

            var iter = json.keys();
            var key;
            var obj;
            while (iter.hasNext()) {
                key = iter.next();
                obj = json.get(key);
                logger.info("Key: " + key + " is of type: " + obj.getClass().getSimpleName());
                doc.addField(key, obj);


            }

        } catch (e) {
            logger.error(e);
        }

    }

    return doc;
}


    /*
    function fromHex(bs) {

        var Integer = java.lang.Integer;
        var String = java.lang.String;

        var s = new String(bs);
        for (var i = 0; i < s.length(); i += 2) {
            bs[i / 2] = Integer.parseInt(s.substring(i, i + 2), 16);
        }
        return new String(bs, "UTF8");
    }

     function getChildren(json){
     var arr = json.fields;
     logger.info("There are: "+fields.length+" in this docuemnt");
     return json.fields;
     }
     */
    

var parser_v3 =  function (doc) {


        if (doc !== null && doc.getFirstFieldValue("_raw_content_") !== null) {
            logger.info("PARSING NESTED DOCUMENTS...");
            logger.info("*** RAW: " + doc.getFirstFieldValue("_raw_content_"));
            // var raw = doc.getFirstFieldValue("_raw_content_");
            // if(raw !== null){
            //    logger.info("Raw class: "+ raw.getClass().getSimpleName()); 
            // }
            var doclist = java.util.ArrayList;
            var Jsoup = org.jsoup.Jsoup;
            var jdoc = org.jsoup.nodes.Document;
            var ex = java.lang.Exception;
            var Parser = org.jsoup.parser.Parser;
            var element = org.jsoup.Element;
            var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
            var xmlstr = java.lang.String;
            var docurl = java.lang.String;
            var elements = org.jsoup.select.Elements;
            var ele = org.jsoup.Element;
            var outdocs = java.util.ArrayList;
            var ObjectMapper = org.codehaus.jackson.map.ObjectMapper;
            var SerializationConfig = org.codehaus.jackson.map.SerializationConfig;
            var String = java.lang.String;
            var e = java.lang.Exception;
            var base64 = java.util.Base64;
            var String = java.lang.String;

            var decoder = base64.getDecoder();
            var mapper = new ObjectMapper();
            var pretty = true;
            var result = new String("");

            try {
                var rawlist = doc.getFieldValues("_raw_content_");
                raw = rawlist[0];
                //  logger.info("raw: "+ raw);
                logger.info("Raw class: " + raw.getClass().getSimpleName());
                var stdin = new String(raw, "UTF8");
                var JSONArray = org.json.JSONArray;
                var JSONObject = org.json.JSONObject;
                var Iterator = java.util.Iterator;

                var json = JSON.parse(stdin);//new JSONObject(stdin);

                //   var stdin = fromHex(raw);//new String(decoder.decode(raw));
                logger.info("JSON: " + stdin);
                mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);



                var children = json[0].fields;//doc.getFirstFieldValue("_childDocuments_"); // _childDocuments
                if (children !== null) {
                    // result = JSON.stringify(result);//mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                   // logger.info("Children: " + children);
                   for(var i=0; i<children.length; i++){
                        var item = children[i];
                        if(item.name === "_childDocuments"){
                            logger.info("FOUND CHILD DOCUMENTS ! ");    
                        }
                    }
                } else {
                    logger.info("NO CHILDREN FOUND");


                    try {
                        mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);


                        if (pretty) {
                            result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(doc);
                        } else {

                            result = mapper.writeValueAsString(doc);
                        }
                        logger.info("**** DOCUMENT " + result);

                        var fields = doc.getFields();
                        for each (var fieldName in fields.keySet()) {
                            var field = doc.getFirstField(fieldName);
                            // result += "Field Name: "+field.getName()+" val: "+field.getValue()+"\n"; 
                        }
                    } catch (e) {
                        logger.error(e.getLocalizedMessage());
                    }
                }
            } catch (ex) {
                logger.error(ex.getLocalizedMessage());
            }
            return outdocs;
        } else {
            logger.info("Doc ID was null");
            return doc;
        }
        return doc;
    }
    





