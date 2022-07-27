function(doc){
   
   if(doc !== null){
     //logger.info("***** DOC " + doc.toString());
     var content = doc.getFirstFieldValue("body_t");
     doc.setField("_lw_data_source_s", "tiaa");
     logger.info("**** CONTENT " + content);
     var json = JSON.parse(content);
     logger.info("*** ID: " + json["id"]);
     var jdata = getURLData(json["id"]);
     logger.info("**** JDATA " + jdata);
     var docs = JSON.parse(jdata);
     var ArrayList = java.util.ArrayList;
     var PipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
   }
  return doc;


  // support methods
  function getURLData(urlstr){


     var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
    var result = new String();
    try {
        var oracle = new URL(urlstr);
        var ins = new BufferedReader(new InputStreamReader(oracle.openStream()));

        var inputLine = "";
        
        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine);
            result += inputLine;
        }
        ins.close();

    } catch (e) {
        logger.error(e);
    }

    return result;
  }
}