/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var httpPost = function (doc) {
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var userAgent = org.apache.http.HttpHeaders.USER_AGENT;
    var HttpResponse = org.apache.http.HttpResponse;
    var HttpClient = org.apache.http.client.HttpClient;
    var HttpPost = org.apache.http.client.methods.HttpPost;
    var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
    var StringBuffer = java.lang.StringBuffer;
    var String = java.lang.String;
    var e = java.lang.Exception;
    var UrlEncodedFormEntity = org.apache.http.client.entity.UrlEncodedFormEntity;
    var StringEntity = org.apache.http.entity.StringEntity;
    var JSONObject = org.json.JSONObject;
    var JSONArray = org.json.JSONArray;

    result = new StringBuffer();
    try {
        
        // target url.  Note the skipParsing=true  
        var url = new String("http://localhost:8765/api/v1/index-pipelines/sis_page/collections/sis_docs/index?skipParsing");

        // create the HttpClient
        var client = HttpClientBuilder.create().build();
        
        // create the HttpPost
        var request = new HttpPost(url);

/*
 * We need to creat our pipeline document from scratch in order for it to be formatted correctly. 
 */
        var obj = new JSONObject();
        obj.put("id", doc.getId());
        var fields = new JSONArray();
        
        var dfields = docfields.toArray();
        for (var i = 0; i < dfields.length; i++) {
            var str = dfields[i];
              var jsonfield = new JSONObject();
            jsonfield.put("name", str);
            jsonfield.put("value", doc.getFirstFieldValue(str));
             fields.put(jsonfield);
        }
        
         obj.put("fields", fields);

            var arr = new JSONArray();
            arr.put(obj);
            request.setEntity(new StringEntity(arr.toString()));

        // add request header.  If you skipParsing, 
        // then you want to send as octet-stream rather than json. 
        request.addHeader("Content-Type", "application/octet-stream");
        
        // send the request
        var response = client.execute(request);

        logger.info("RESPONSE: " + response);
    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }
    return;
}