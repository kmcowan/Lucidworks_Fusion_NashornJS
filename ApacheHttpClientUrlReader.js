/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var apacheHttpClientUrlReader = function(doc) {
   var BufferedReader = java.io.BufferedReader;
var InputStreamReader = java.io.InputStreamReader;
var userAgent = org.apache.http.HttpHeaders.USER_AGENT;
var HttpResponse = org.apache.http.HttpResponse;
var HttpClient = org.apache.http.client.HttpClient;
var HttpGet = org.apache.http.client.methods.HttpGet;
var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
var StringBuffer = java.lang.StringBuffer;
var String = java.lang.String;
var e = java.lang.Exception;

var result = new StringBuffer();
        try {
            var url = new String( "http://www.google.com/search?q=httpClient");

            var client = HttpClientBuilder.create().build();
            var request = new HttpGet(url);

             // add request header
            request.addHeader("User-Agent", userAgent);
            var response = client.execute(request);

            logger.info("RESPONSE Code : " + response.getStatusLine().getStatusCode());

            var rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

             result = new StringBuffer();
            var line = "";
            while ((line = rd.readLine()) !== null) {
                result.append(line);
            }
        } catch (e) {
           logger.error(e);
        }
       logger.info(result);

   return doc;
}


