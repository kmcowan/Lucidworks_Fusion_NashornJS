/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  var String = java.lang.String;
var entity = org.apache.http.HttpEntity;
var response = org.apache.http.client.methods.CloseableHttpResponse;
var httpGet = org.apache.http.client.methods.HttpGet;

var httpclient = org.apache.http.impl.client.CloseableHttpClient;
var client = org.apache.http.impl.client.HttpClient
var instream = java.io.InputStream;
var ex = java.io.IOException;
var content = java.lang.String;
var ioutil = org.apache.commons.io.IOUtils;
var httpClients = org.apache.http.impl.client.HttpClients;
var sys = java.lang.System;
var entityUtil = org.apache.http.util.EntityUtils;

 httpclient = httpClients.createDefault();
 httpGet = new org.apache.http.client.methods.HttpGet("http://www.google.com");//http://localhost:8764/api/apollo/connectors/jobs/google_news


try {
    
 
   
  response = httpclient.execute(httpGet);
    sys.out.println("Response: " + response.getStatusLine());
  entity = response.getEntity();
  //entityUtil.consume(entity);
  
     if (entity != null) {
                   //  instream = entity.getContent();
                   //  sys.out.println("Available: "+ instream.available());
                    try {
                     //   instream.read();
                       //  content = ioutil.toString(instream, "UTF-8"); 
                         sys.out.println(new String(entityUtil.toByteArray(entity)));
                        // do something useful with the response
                    } catch (ex) {
                        // In case of an IOException the connection will be released
                        // back to the connection manager automatically
                        throw ex;
                    } finally {
                        // Closing the input stream will trigger connection release
                       // instream.close();
                    }
                } else {
                    sys.out.println("entity was null");
                }
} finally {
    if(response !== null){
   // response.close();
    }
}