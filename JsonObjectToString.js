/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jsontostring = function(doc){
    
    var PipelineDocument = com.lucidworks.apollo.common.pipeline.PipelineDocument;
var ObjectMapper = org.codehaus.jackson.map.ObjectMapper;
var SerializationConfig = org.codehaus.jackson.map.SerializationConfig;
var String = java.lang.String;
var e = java.lang.Exception;

var mapper = new ObjectMapper();
       var  pretty = true;
       var  result = new String("");
 
        try {

            mapper.configure(SerializationConfig.Feature.FAIL_ON_EMPTY_BEANS, false);

            if (pretty) {
                result = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(doc);
            } else {

                result = mapper.writeValueAsString(doc);
            }
            logger.info("**** DOCUMENT " + result);
        } catch ( e) {
           logger.error(e);
        }
        
    return doc;
}
