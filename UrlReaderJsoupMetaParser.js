/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parseUrlAndRead = function (doc) {
    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
    var jsoup = org.jsoup.Jsoup;
    var jdoc = org.jsoup.nodes.Document;
    var metaAttr = java.lang.String;
    metaAttr = "";// init to empty string; 

    try {
        // get the url from the pipeline document. 
        var targetUrl = new URL(doc.getId());

        // get the document url from pipeline doc, and pull in the html
        jdoc = jsoup.connect(doc.getId()).get();

        // extract meta data from original document. 
        elements = jdoc.select("meta");
        logger.info("ITERATE OVER ELEMENTS");
        // then parse elements and pull just the text
        for each (ele in elements) {
            if (ele !== null) {
                // extract meta attribute
                metaAttr = ele.attr("description");
            }
        }
        if (metaAttr !== "") {
            logger.info("Making REST call to grab additional metadata: " + metaAttr);

            // make the rest call. 
            var newUrl = "http://path-to-metadata-json-service";
             var content = doRest(newUrl);
             
            // parse result to json
            var json = getJson(content);
            
            // extract metadata kv pairs 
            var newMeta = json.get("new-metadata-key-name");

            // add to document. 
            doc.addField('additional_metadata', newMeta);
        }

        logger.info("ADD RESULT: " + result);
        doc.addField("csvdata_txt", result);
    } catch (e) {
        logger.error(e);
    }

    return doc;
}

function doREST(url) {

    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
    var result = new String();
    try {
        var targetUrl = new URL(url);
        var ins = new BufferedReader(new InputStreamReader(targetUrl.openStream()));

        var inputLine = "";

        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine);
            result += inputLine;
        }
        ins.close();
        logger.info("Return RESULT: " + result);

    } catch (e) {
        logger.error(e);
    }

    return result;
}

function getJson(content) {
    // this is the java class type returned:
    var JSONObject = org.json.simple.JSONObject;
    
    var JSONParser = org.json.simple.parser.JSONParser;
    var parser = new JSONParser();
    var json = parser.parse(content);
    
    return json;
}