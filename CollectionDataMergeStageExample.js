/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var collectionDataMerge = function(doc) {
    // User fired query
    var query = doc.getFirstFieldValue('fileid_s');

    // fusion's url
    var fusion_domain = "localhost"
        // port where fusion api is running
    var fusion_api_port = "8765"
        // username with privileges on this sidecar collection
    var username = "admin"
        // password for the above user
    var password = "password123"
        // name of the sidecar collection
    var sidecar_name = "historical_metadata"
        // pipeline to be used with the sidecar
    var sidecar_qp = "historical_metadata-default"
        // annotable field name
    var field_name = "IND";
    // extra field name (type of annotation)
    // Total results to fetch from the side car
    var fetch_num = 1;
    var HashMap = java.util.HashMap;
    var map = new HashMap();
    // map.put("test", "test1");

    var fusion_url = "http://" + fusion_domain + ":" + fusion_api_port + "/api/v1/query-pipelines/" + sidecar_qp + "/collections/" + sidecar_name + "/select?q=" + query + "&wt=json&fl=" + field_name + "&rows=" + fetch_num;

    //post method\\\
    var method = new org.apache.commons.httpclient.methods.GetMethod(fusion_url);


    var client = new org.apache.commons.httpclient.HttpClient;

    var defaultcreds = new org.apache.commons.httpclient.UsernamePasswordCredentials(username, password);

    client.getState().setCredentials(org.apache.commons.httpclient.auth.AuthScope.ANY, defaultcreds);

    var returnCode = client.executeMethod(method);

    var responseValue = "";

    if (returnCode == org.apache.commons.httpclient.HttpStatus.SC_NOT_IMPLEMENTED) {

    } else if (returnCode == org.apache.commons.httpclient.HttpStatus.SC_OK) {
        responseValue = method.getResponseBodyAsString();
    } else {

    }
    logger.info("===================the response is about to be added================" + responseValue);
    doc.addField('reponse_from_sidecar_collection', responseValue);

    if (responseValue != null) {
        var obj = JSON.parse(responseValue);
        // All the matches will be stored in the variable for annotation matching
        var all_matches = [];
        // Get all the results/docs
        if (obj.response.docs[0] != null) {
            var metadataObject = obj.response.docs[0];
            doc.addField('metadata_dump', metadataObject);
            // if(allKeys!=null){
            //for(var i=0;i<allKeys.length;++i){doc.addField('ind_ss', allKeys[i]);}
            //}}
            for (var property in metadataObject) {
                if (metadataObject.hasOwnProperty(property) && property != "_version_" && property != "score") {
                    // console.log(property + " : " + metadataObject[property][0]);
                     map.put(property, metadataObject[property]);
                    // do stuff
                }
            }




            for each(var key in map.keySet()) {
                var value = map.get(key);
                // use key and value
                doc.addField(key, value);
            }
        }

    }

    return doc;

}