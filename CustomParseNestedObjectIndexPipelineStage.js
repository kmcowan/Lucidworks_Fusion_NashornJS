/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parseNestedObject = function (doc) {


    if (doc !== null && doc.getFirstFieldValue("_raw_content_") !== null) {



        var ex = java.lang.Exception;
        var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
        var outdocs = java.util.ArrayList;
        var ObjectMapper = org.codehaus.jackson.map.ObjectMapper;
        var SerializationConfig = org.codehaus.jackson.map.SerializationConfig;
        var String = java.lang.String;
        var e = java.lang.Exception;
        var base64 = java.util.Base64;
        var String = java.lang.String;
        var ArrayList = java.util.ArrayList;
        var mapper = new ObjectMapper();
        var pretty = true;
        var result = new String("");
        outdocs = new ArrayList();
        pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument();

        try {
            var rawlist = doc.getFieldValues("_raw_content_");
            raw = rawlist[0];

            //  logger.info("Raw class: " + raw.getClass().getSimpleName());
            // will be a byte[]
            var stdin = new String(raw, "UTF8"); // turn the stream into a string. 
            var json = JSON.parse(stdin); // parse with the JavaScript JSON parser. 

            //   logger.info("JSON: " + stdin);
            mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);

            var children = json[0].fields; // get fields for the parent. 
            // set our PipelineDocument ID 
            pipelineDoc.setId(json[0].id);
            logger.info("document ID: " + doc.getId());

            if (children !== null) {

                /**
                 * Here is the heavy lifting.  Now that we have a JSON object, 
                 * We will transform it into a PipelineDocuemnt.  This 
                 * document will be fasioned after our collection schema. 
                 */
                for (var i = 0; i < children.length; i++) {
                    var item = children[i];
                    if (item.name === "_childDocuments_") {
                        //  logger.info("FOUND CHILD DOCUMENTS ! "+item.value.toString()); 
                        var cdocs = item.value;
                        var childArray = new ArrayList();
                        for (var c = 0; c < cdocs.length; c++) {
                            var child = cdocs[c];
                            var childPipeDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument();
                            childPipeDoc.setId(child.id);
                            childPipeDoc.addField("_parent", json[0].id);
                            for (var d = 0; d < child.fields.length; d++) {
                                var cfield = child.fields[d];
                                childPipeDoc.addField(cfield.name, cfield.value);
                            }
                            childArray.add(childPipeDoc);
                        }
                        pipelineDoc.addField("_childDocuments_", childArray);
                    } else {

                        pipelineDoc.addField(item.name, item.value);
                    }

                }
            } else {
                // in this case, if I don't find children, I print the doc in the logs 
                // so I can see what is thee. 
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
        // if all goes well, we'll return our new doc right here. 
        logger.info("RETURN BRANCH 1");
        outdocs.add(pipelineDoc);
        return outdocs;
    } else {
        logger.info("Doc ID was null");
        // if something was wrong with the doc, or it was null, we return here. 
        return doc;
    }
    // otherwise, we return here. 
    return doc;
}