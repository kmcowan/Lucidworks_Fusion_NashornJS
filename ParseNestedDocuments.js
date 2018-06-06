/* 
 * Sample POST:
 * [{
 
 "id": "book1",
 
 "type_s": "book",
 
 "title_t": "The Way of Kings",
 
 "author_s": "Brandon Sanderson",
 
 "cat_s": "fantasy",
 
 "pubyear_i": "2010",
 
 "publisher_s": "Tor",
 
 "_childDocuments_": [{
 
 "id": "book1_c1",
 
 "type_s": "review",
 
 "review_dt": "2015-01-03T14:30:00Z",
 
 "stars_i": "5",
 
 "author_s": "yonik",
 
 "comment_t": "A great start to what looks like an epic series!"
 
 }]
 
 }]
 */


var parseNested = function (doc) {


    if (doc !== null && doc.getId() !== null) {
        logger.info("PARSING NESTED DOCUMENTS...");
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

        var mapper = new ObjectMapper();
        var pretty = true;
        var result = new String("");

        try {
            mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
            var children = doc.getFirstFieldValue("_childDocuments");
            if (children !== null) {
                 result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                logger.info("Children: " + result);
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
                } catch (e) {
                    logger.error(e);
                }
            }
        } catch (ex) {
            logger.error(ex);
        }
        return outdocs;
    } else {
        return doc;
    }
};

//&& doc.getFirstFieldValue("_raw_content_") !== null

var parse2 = function (doc) {


    if (doc !== null && doc.getId() !== null) {
        logger.info("PARSING NESTED DOCUMENTS...");
        logger.info("*** RAW: "+ doc.getFirstFieldValue("_raw_content_"));
                    
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

        var mapper = new ObjectMapper();
        var pretty = true;
        var result = new String("");

        try {
            mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
            var children = doc.getFirstFieldValue("_childDocuments_"); // _childDocuments
            if (children !== null) {
                 result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                logger.info("Children: " + result);
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
                  for each (var fieldName in fields.keySet()){
                       var field = doc.getFirstField(fieldName);
                     // result += "Field Name: "+field.getName()+" val: "+field.getValue()+"\n"; 
                  }
                } catch (e) {
                    logger.error(e);
                }
            }
        } catch (ex) {
            logger.error(ex);
        }
        return outdocs;
    } else {
        logger.info("Doc ID was null");
        return doc;
    }
  return doc;
};


var parse_v3 = function (doc) {


    if (doc !== null && doc.getFirstFieldValue("_raw_content_") !== null ) {
        logger.info("PARSING NESTED DOCUMENTS...");
        logger.info("*** RAW: "+ doc.getFirstFieldValue("_raw_content_"));
         var raw = doc.getFirstFieldValue("_raw_content_");
         if(raw !== null){
            logger.info("Raw class: "+ raw.getClass().getSimpleName()); 
         }
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
            var stdin = new String(decoder.decode(raw));
            logger.info("Decoded Raw: " + stdin);
            mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);
            var children = doc.getFirstFieldValue("_childDocuments_"); // _childDocuments
            if (children !== null) {
                 result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                logger.info("Children: " + result);
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
                  for each (var fieldName in fields.keySet()){
                       var field = doc.getFirstField(fieldName);
                     // result += "Field Name: "+field.getName()+" val: "+field.getValue()+"\n"; 
                  }
                } catch (e) {
                    logger.error(e);
                }
            }
        } catch (ex) {
            logger.error(ex);
        }
        return outdocs;
    } else {
         logger.info("Doc ID was null");
        return doc;
    }
  return doc;
}


var parseNestedObjectsCustomJson =  function (doc) {


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
            var ArrayList =  java.util.ArrayList;

            var decoder = base64.getDecoder();
            var mapper = new ObjectMapper();
            var pretty = true;
            var result = new String("");
             outdocs = new ArrayList();
             pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument();

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
                pipelineDoc.setId(json[0].id);
                logger.info("document ID: "+doc.getId());
              
                if (children !== null) {
                    // result = JSON.stringify(result);//mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                   // logger.info("Children: " + children);
                   for(var i=0; i<children.length; i++){
                        var item = children[i];
                        if(item.name === "_childDocuments_"){
                            logger.info("FOUND CHILD DOCUMENTS ! "+item.value.toString()); 
                            var cdocs = item.value;
                            var childArray = new ArrayList();
                            for(var c=0; c<cdocs.length; c++){
                                var child = cdocs[c];
                                var childPipeDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument();
                                childPipeDoc.setId(child.id);
                                childPipeDoc.addField("_parent", json[0].id);
                                for(var d=0; d<child.fields.length; d++){
                                     var cfield = child.fields[d];
                                     childPipeDoc.addField(cfield.name,cfield.value);
                                }
                               childArray.add(childPipeDoc);
                            }
                          pipelineDoc.addField("_childDocuments_", childArray);
                        } else {
                        //var pdoc = doc.newDocument();
                        //outdocs.add(pdoc);
                        pipelineDoc.addField(item.name, item.value);
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
            logger.info("RETURN BRANCH 1");
            outdocs.add(pipelineDoc);
            return outdocs;
        } else {
            logger.info("Doc ID was null");
          logger.info("RETURN BRANCH 2");
            return doc;
        }
        logger.info("RETURN BRANCH 3");
        return doc;
    }