/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var proxyHttpConn = function(doc){
    
    var HttpHost = org.apache.http.HttpHost;
var RequestConfig =  org.apache.http.client.config.RequestConfig;
var HttpGet =  org.apache.http.client.methods.HttpGet;
var e = java.lang.Exception;

 try{
            var proxy = new HttpHost("127.0.0.1", 8080, "http");
            var config = RequestConfig.custom().setProxy(proxy).build();
            var request = new HttpGet("/");
            request.setConfig(config);
        }catch( e){
            logger.error(e);
        }

        
    return doc;
}