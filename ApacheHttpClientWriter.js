/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var apacheHttpClientUrlWriter = function (doc) {

    var userAgent = org.apache.http.HttpHeaders.USER_AGENT;
    var HttpResponse = org.apache.http.HttpResponse;

    var HttpPost = org.apache.http.client.methods.HttpPost;
    var StringEntity = org.apache.http.entity.StringEntity;
    var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
    var StringBuffer = java.lang.StringBuffer;
    var String = java.lang.String;
    var e = java.lang.Exception;


    try {

        var result = "";
        var url = "";
        // example data
        var data = "{ \"set-user\": {\"somename\" : \"somepwd\" }}";
        var client = HttpClientBuilder.create().build();
        var request = new HttpPost(url);
        var params = new StringEntity(data);
        request.addHeader("content-type", "application/json");
        request.setEntity(params);
        var response = client.execute(request);
        // parse solr response
        var result = streamToString(response.getEntity().getContent());
        // log response
        logger.info(result);

    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }


    return doc;
}

function streamToString(is) {
    var StringBuffer = java.lang.StringBuffer;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var e = java.lang.Exception;

    try {
        var rd = new BufferedReader(new InputStreamReader(is));

        var result = new StringBuffer();
        var line = "";
        while ((line = rd.readLine()) !== null) {
            result.append(line);
        }
    } catch (e) {
        logger.error(e.getLocalizedMessage());
    }

    return result;
}