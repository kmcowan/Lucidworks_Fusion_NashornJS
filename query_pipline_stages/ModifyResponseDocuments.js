/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var modifyResponse = function(request, response, _context, collection, solrServer, solrClientFactory) {

 var headers = {"X-Fusion": "Word" };
 var data = { "test": "yes!"};

 var jr = new com.lucidworks.apollo.solr.response.JSONResponse(data);
 var newResponse = new com.lucidworks.apollo.pipeline.query.Response(new javax.ws.rs.core.MultivaluedHashMap(headers), jr);
 var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request,newResponse,1);
  return queryRequestAndResponse;
}



var query_override = function(){
 
    /*
function doQuery(query) {
        var client = org.apache.http.client.HttpClient;
        var cloudServer = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
        var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
        var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var cm = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var String = java.lang.String;
        var pdoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;

        var ZOOKEEPER_URL = new String("localhost:9983");
        var DEFAULT_COLLECTION = new String("_test_");
        var server = ZOOKEEPER_URL;
        var collection = DEFAULT_COLLECTION;
        var docList = java.util.ArrayList;
        var inputDoc = org.apache.solr.common.SolrInputDocument;
        var pingResp = org.apache.solr.client.solrj.response.SolrPingResponse;
        var res = org.apache.solr.client.solrj.response.UpdateResponse;
        var SolrInputDocument = org.apache.solr.common.SolrInputDocument;
        var UUID = java.util.UUID;
        var QueryResponse = org.apache.solr.client.solrj.response.QueryResponse;

         var JSONObject = org.json.JSONObject;
 var json = new JSONObject();

        try {
            // PoolingClientConnectionManager cm = new PoolingClientConnectionManager();
            cm = new PoolingClientConnectionManager();
            client = new DefaultHttpClient(cm);
            cloudServer = new CloudSolrClient(server, client);
            cloudServer.setDefaultCollection(collection);
            logger.info("CLOUD SERVER INIT OK...");
          if(query !== null){
            
           var resp = cloudServer.query(query);
           var results = resp.getResults();
        for (var i = 0; i < results.size(); ++i) {
            json.put("result_"+i, results.get(i).toString());
        }
          }
 


        } catch (ex) {
            logger.error(ex.getLocalizedMessage());
            json.put("error", ex.getLocalizedMessage());
        }

        return json;
    }
*/

function getQuery(request){
   var SolrQuery = org.apache.solr.client.solrj.SolrQuery;
   var query = new SolrQuery();
   query.setQuery("*");
   return query;
}

function doHttpQuery(request){
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
  var url = "http://localhost:8764/api/apollo/solr/_test_/select?q=*:*&wt=json&rows=1&fl=id";
   var JSONObject = org.json.JSONObject;
 var json = new JSONObject();
  try{
    var client = getAuthHttpClient();
    json.put("msg1", "got auth client okay");
    var httpget = new HttpGet(url);
    var response = client.execute(httpget);
    json.put("msg2", "execute httpget okay...");
    if(response !== null){
         var rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

             var result = "";
            var line = "";
            while ((line = rd.readLine()) !== null) {
                result += line;
            } 
      
        json.put("result", result);
    }
  }catch(e){
     // logger.error(e.getLocalizedMessage());
      json.put("error", "some error occurred...");
  }
  
  return json;
}

function getAuthHttpClient(){
    
    var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;
 
 var AuthScope = org.apache.http.auth.AuthScope;
var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
var HttpPost = org.apache.http.client.methods.HttpPost;
var StringEntity =  org.apache.http.entity.StringEntity;
   var pwd = "Ixion1964";
   var user = "admin";
            var fusionUrl = "http://localhost:8764";

           var client = null;
  var e = java.lang.Exception;
  try{

             var authJson = "{\"username\":\"" + user + "\", \"password\":\"" + pwd + "\"}";
            var authUrl = fusionUrl + "/api/session?realmName=native";

       var provider = new BasicCredentialsProvider();
   
        var credentials  = new UsernamePasswordCredentials("admin", "Ixion1964");
        provider.setCredentials(AuthScope.ANY, credentials);
 
        var client = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(provider)
                .build();
  
  var session = new HttpPost(authUrl);
            var params = new StringEntity(authJson);
            session.addHeader("content-type", "application/json");
            session.setEntity(params);
            var response = client.execute(session);
  }catch(e){
      logger.error("Error getting httpclient " + e.getLocalizedMessage()); 
  }
        
        return client;
        
}

function(request, response, _context, collection, solrServer, solrClientFactory) {

 //var json =  "";//JSON.stringify(request.getParams());
 var JSONObject = org.json.JSONObject;
 var json = new JSONObject();
  if(request.getParams() !== null){
     json.put("msg", "request NOT NULL"); 
    var map = request.getParams();
    var str = "";
    
    var value = "";
    for each (var e in map.keySet()){
      var params = request.getParam(e);
      if(params !== null){
       for each (var key in params){
      str += e + ": "+ key;
       }
      } else {
        str += e + ": |";                                           
      }
    }
    json.put("req", str);
  }
  
 // var docs = doQuery(getQuery(request));
  var docs = doHttpQuery(request);
  json.put("docs", docs.toString());
 
 var someObject = new java.lang.String("{\"response\":{\"numFound\":7,\"start\":0,\"maxScore\":1.0,\"over\":"+json.toString()+" }}");//
 
 
 var  stream = new java.io.ByteArrayInputStream(someObject.getBytes("UTF-8"));
 var v2 = new com.lucidworks.apollo.solr.response.RawResponse(stream,"application/json","UTF-8");

 var newResponse = new com.lucidworks.apollo.pipeline.query.Response(null, v2);
 //  var jr = new com.lucidworks.apollo.solr.response.JSONResponse(someObject);
 //var newResponse = new com.lucidworks.apollo.pipeline.query.Response(new javax.ws.rs.core.MultivaluedHashMap(headers), jr);
  
 var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request,newResponse,1);
 return queryRequestAndResponse;
}



    
}





/**************************
 * saved: 
 */


function doQuery(query) {
        var client = org.apache.http.client.HttpClient;
        var cloudServer = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
        var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
        var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var cm = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var String = java.lang.String;
        var pdoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;

        var ZOOKEEPER_URL = new String("localhost:9983");
        var DEFAULT_COLLECTION = new String("_test_");
        var server = ZOOKEEPER_URL;
        var collection = DEFAULT_COLLECTION;
        var docList = java.util.ArrayList;
        var inputDoc = org.apache.solr.common.SolrInputDocument;
        var pingResp = org.apache.solr.client.solrj.response.SolrPingResponse;
        var res = org.apache.solr.client.solrj.response.UpdateResponse;
        var SolrInputDocument = org.apache.solr.common.SolrInputDocument;
        var UUID = java.util.UUID;
        var QueryResponse = org.apache.solr.client.solrj.response.QueryResponse;

         var JSONObject = org.json.JSONObject;
 var json = new JSONObject();

        try {
            // PoolingClientConnectionManager cm = new PoolingClientConnectionManager();
            cm = new PoolingClientConnectionManager();
            client = new DefaultHttpClient(cm);
            cloudServer = new CloudSolrClient(server, client);
            cloudServer.setDefaultCollection(collection);
            logger.info("CLOUD SERVER INIT OK...");
          if(query !== null){
            
           var resp = cloudServer.query(query);
           var results = resp.getResults();
        for (var i = 0; i < results.size(); ++i) {
            json.put("result_"+i, results.get(i).toString());
        }
          }
           /* docList = new java.util.ArrayList();
            pingResp = cloudServer.ping();
            logger.info(pingResp);
            docList = new java.util.ArrayList();
            for each(pdoc in doc) {
                inputDoc = new SolrInputDocument();
                inputDoc.addField("id", UUID.randomUUID().toString());
                inputDoc.addField("q_txt", pdoc.getFirstFieldValue("extracted_text"));
                docList.add(inputDoc);
            }

            logger.info(" DO SUBMIT OF " + docList.size() + " DOCUMENTS TO SOLR **** ");
            cloudServer.add(docList);
            res = cloudServer.commit();
            logger.info(res);
            */


        } catch (ex) {
            logger.error(ex.getLocalizedMessage());
            json.put("error", ex.getLocalizedMessage());
        }

        return json;
    }

function getQuery(request){
   var SolrQuery = org.apache.solr.client.solrj.SolrQuery;
   var query = new SolrQuery();
   query.setQuery("*");
   return query;
}

function doHttpQuery(request){
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
  var url = "http://localhost:8764/api/apollo/solr/_test_/select?q=*:*&wt=json&rows=1&fl=id";
   var JSONObject = org.json.JSONObject;
 var json = new JSONObject();
  try{
    var client = getAuthHttpClient();
    json.put("msg1", "got auth client okay");
    var httpget = new HttpGet(url);
    var response = client.execute(httpget);
    json.put("msg2", "execute httpget okay...");
    if(response !== null){
         var rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

             var result = "";
            var line = "";
            while ((line = rd.readLine()) !== null) {
                result += line;
            } 
      
        json.put("result", result);
    }
  }catch(e){
     // logger.error(e.getLocalizedMessage());
      json.put("error", "some error occurred...");
  }
  
  return json;
}

function getAuthHttpClient(){
    
    var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;
 
 var AuthScope = org.apache.http.auth.AuthScope;
var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
var HttpPost = org.apache.http.client.methods.HttpPost;
var StringEntity =  org.apache.http.entity.StringEntity;
   var pwd = "Ixion1964";
   var user = "admin";
            var fusionUrl = "http://localhost:8764";

           var client = null;
  var e = java.lang.Exception;
  try{

             var authJson = "{\"username\":\"" + user + "\", \"password\":\"" + pwd + "\"}";
            var authUrl = fusionUrl + "/api/session?realmName=native";

       var provider = new BasicCredentialsProvider();
   
        var credentials  = new UsernamePasswordCredentials("admin", "Ixion1964");
        provider.setCredentials(AuthScope.ANY, credentials);
 
        var client = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(provider)
                .build();
  
  var session = new HttpPost(authUrl);
    
            var params = new StringEntity(authJson);
    
            session.addHeader("content-type", "application/json");
            session.setEntity(params);
            var response = client.execute(session);
            
  }catch(e){
      logger.error("Error getting httpclient " + e.getLocalizedMessage()); 
  }
        
        return client;
        
}

function(request, response, _context, collection, solrServer, solrClientFactory) {

 //var json =  "";//JSON.stringify(request.getParams());
 var JSONObject = org.json.JSONObject;
 var json = new JSONObject();
  if(request.getParams() !== null){
     json.put("msg", "request NOT NULL"); 
    var map = request.getParams();
    var str = "";
    
    var value = "";
    for each (var e in map.keySet()){
      var params = request.getParam(e);
      if(params !== null){
       for each (var key in params){
      str += e + ": "+ key;
       }
      } else {
        str += e + ": |";                                           
      }
    }
    json.put("req", str);
  }
  
 // var docs = doQuery(getQuery(request));
  var docs = doHttpQuery(request);
  json.put("docs", docs.toString());
 
 var someObject = new java.lang.String("{\"response\":{\"numFound\":7,\"start\":0,\"maxScore\":1.0,\"over\":"+json.toString()+" }}");//
 
 
 var  stream = new java.io.ByteArrayInputStream(someObject.getBytes("UTF-8"));
 var v2 = new com.lucidworks.apollo.solr.response.RawResponse(stream,"application/json","UTF-8");

 var newResponse = new com.lucidworks.apollo.pipeline.query.Response(null, v2);
 //  var jr = new com.lucidworks.apollo.solr.response.JSONResponse(someObject);
 //var newResponse = new com.lucidworks.apollo.pipeline.query.Response(new javax.ws.rs.core.MultivaluedHashMap(headers), jr);
  
 var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request,newResponse,1);
 return queryRequestAndResponse;
}




