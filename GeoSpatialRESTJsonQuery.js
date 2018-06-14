/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var doGEoRest = function (request) {

    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;

    var ObjectMapper = org.codehaus.jackson.map.ObjectMapper;
    var SerializationConfig = org.codehaus.jackson.map.SerializationConfig;
    var String = java.lang.String;
    var e = java.lang.Exception;
    var JSONObject = org.json.JSONObject;


    var mapper = new ObjectMapper();
    var pretty = true;
    var result = new String("");
    var list = java.util.ArrayList;
    try {
        var url = "https://mapservices.gis.saccounty.net/arcgistest/rest/services/ADDRESS_wSubAddress/GeocodeServer/findAddressCandidates?outFields=*&outSR=4326&f=pjson&Single+Line+Input=799+G+St";
        var targetUrl = new URL(url);
        var ins = new BufferedReader(new InputStreamReader(targetUrl.openStream()));

        var inputLine = "";

        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine);
            result += inputLine;
        }
        ins.close();
        logger.info("Return RESULT: " + result);
        // convert to JSON
        var json = new JSONObject(result);
        var candidates = json.getJSONArray("candidates");
        for (var i = 0; i < candidates.length(); i++) {
            var candidate = candidates.getJSONObject(i);
            var refId = candidate.getJSONObject("attributes").get("Ref_ID");
            list.add(refId);
        }

        var query = "";
        if (list.size() > 0) {
            var count = 0;
            for each (var ref in list) {
                if (count > 0) {
                    query += " OR ";
                }
                query += "FIELD_TO_QUERY:" + ref;
                count++;
            }

            request.addParam('q', query);
        }

    } catch (e) {
        logger.error(e);

    }

    // return result;
}


var geoJSAndJava = function (request, response) {

    // java imports
    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
 

   // local declarations
    var result = new String("");
    var ArrayList = java.util.ArrayList;
    
    
    try {
        var url = "ESRI or SOME OTHER MAPPING REQUEST HERE";
        var targetUrl = new URL(url);
        var ins = new BufferedReader(new InputStreamReader(targetUrl.openStream()));

        var inputLine = "";
        var list = new ArrayList();

        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine); // if you want to see what is on each line
            result += inputLine;
        }
        ins.close();
        logger.info("Return RESULT: " + result); // full result
        
        // convert to JSON using JavaScript
        var json = JSON.parse(result); 
        logger.info(" ** JSON CREATED OKAY ** " + JSON.stringify(json));
        // get candidates
        var candidates = json.candidates;
        logger.info("Candidates: " + candidates.length);
        for (var i = 0; i < candidates.length; i++) {
            var candidate = candidates[i];
            var refId = candidate.attributes.Ref_ID;
            list.add(refId);
            logger.info("ADD REF: " + refId);
        }

        var query = "";

        logger.info("*** BUILD QUERY ** ");
        // run through the list and  build your query. 
        if (list.size() > 0) {
            var count = 0;
            for each (var ref in list) {
                if (count > 0) {
                    query += " OR ";
                }
                
                // @TODO:  CHANGE THE FIELD TO QUERY TO AN EXISTING FIELD IN YOUR SCHEMA
                query += "FIELD_TO_QUERY:" + ref;
                count++;
            }

           // print out the query in the logs
            logger.info("**** QUERY: *** " + query);
            
            // add to response
            response.initialEntity.appendStringList("solr_query", Java.to(query, Java.type('java.util.List')));
        }

    } catch (e) {
        logger.error(e);
    }

 
}
