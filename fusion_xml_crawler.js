/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fusionWebCrawler = function(doc){
       var parsedDocs = java.util.ArrayList;
    
      
     var jsoupXmlParser = function(doc){
     var Jsoup = org.jsoup.Jsoup;
     var jdoc = org.jsoup.nodes.Document;
     var ex   = java.lang.Exception;
     var Parser = org.jsoup.parser.Parser;
     var element = org.jsoup.Element;
     var xmlstr = java.lang.String;
     var docs = java.util.ArrayList;
     var outdocs = java.util.ArrayList;
     var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
     var docurl = java.lang.String;
      var elements = org.jsoup.select.Elements;
      var extractedText = java.lang.String;
       var ele = org.jsoup.Element;
       var client = org.apache.http.client.HttpClient;
       var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
       var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
       var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
       var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
     
     try{
         docs = new java.util.ArrayList();
         
         xmlstr = doc.getFirstFieldValue("body");
         jdoc = Jsoup.parse(xmlstr, "", Parser.xmlParser());
         for each(element in jdoc.select("loc")) {
             docurl = element.ownText();
             if(docurl !== null && docurl !== ""){
             logger.info("Parsed URL: "+element.ownText());
             pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument(element.ownText());
             docs.add(pipelineDoc);
             }
             
          }
          
          outdocs = new java.util.ArrayList();
          // now crawl each doc in the feed
          for each(pipelineDoc in docs){
              docurl = pipelineDoc.getId();
              jdoc = Jsoup.connect(docurl).get();
              if(jdoc !== null){
                  logger.info("FOUND a JSoup document for url  "+doc.getId());
                  extractedText = new java.lang.String();
                   elements = jdoc.select("p");
                        logger.info("ITERATE OVER ELEMENTS");
                        // then parse elements and pull just the text
                        for each (ele in elements) {
                            if (ele !== null) {
                                if (ele.ownText() !== null) {
                                    extractedText += ele.ownText();
                                }
                            }
                        }
                        pipelineDoc.addField('extracted_text', extractedText);
                        logger.info("Extracted: "+extractedText);
                        outdocs.add(pipelineDoc);
                  
              } else {
                  logger.warn("Jsoup Document was NULL **** ");
              }
          }
     }catch(ex){
         logger.error(ex);
     }
     return outdocs;
 };
 
   parsedDocs = jsoupXmlParser(doc);
   logger.info(" SUBMITTING "+parsedDocs.size()+" to solr index... ****** ");
   
 var solrCloudClient = function(doc){
       var client = org.apache.http.client.HttpClient;
       var cloudServer = org.apache.solr.client.solrj.impl.CloudSolrClient;
       var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
       var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
       var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
       var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
       var cm = org.apache.http.impl.conn.PoolingClientConnectionManager;
       var String = java.lang.String;
       var pdoc  = com.lucidworks.apollo.common.pipeline.PipelineDocument;
       
       var ZOOKEEPER_URL = new String("localhost:9983");
       var DEFAULT_COLLECTION = new String("cityofsacramento");
       var server = ZOOKEEPER_URL;
       var collection = DEFAULT_COLLECTION;
       var docList = java.util.ArrayList;
       var inputDoc = org.apache.solr.common.SolrInputDocument;
       var pingResp = org.apache.solr.client.solrj.response.SolrPingResponse;
       var res = org.apache.solr.client.solrj.response.UpdateResponse;
       var SolrInputDocument = org.apache.solr.common.SolrInputDocument;
       var UUID = java.util.UUID;
         
       
       try{
           // PoolingClientConnectionManager cm = new PoolingClientConnectionManager();
            cm = new PoolingClientConnectionManager();
            client = new DefaultHttpClient(cm);
            cloudServer = new CloudSolrClient(server, client);
            cloudServer.setDefaultCollection(collection);
            logger.info("CLOUD SERVER INIT OK...");
            docList = new java.util.ArrayList();
            pingResp = cloudServer.ping();
            logger.info(pingResp);
            docList = new java.util.ArrayList();
            for each(pdoc in doc){
                inputDoc = new SolrInputDocument();
                inputDoc.addField("id", UUID.randomUUID().toString());
                inputDoc.addField("q_txt", pdoc.getFirstFieldValue("extracted_text"));
                docList.add(inputDoc);
            }
            
            logger.info(" DO SUBMIT OF "+docList.size()+" DOCUMENTS TO SOLR **** ");
            cloudServer.add(docList);
            res = cloudServer.commit();
            logger.info(res);
            
           
       }catch(ex){
           logger.error(ex);
       }
     
     return doc;
 };
 
 
    solrCloudClient(parsedDocs);
    logger.info("RSS CRAWL COMPLETE...");
    return doc;
};




// V 1.0

var fusionWebCrawler_1_0 = function(doc){
     var Jsoup = org.jsoup.Jsoup;
     var jdoc = org.jsoup.nodes.Document;
     var ex   = java.lang.Exception;
     var Parser = org.jsoup.parser.Parser;
     var element = org.jsoup.Element;
     var xmlstr = java.lang.String;
     var docs = java.util.ArrayList;
     var outdocs = java.util.ArrayList;
     var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
     var docurl = java.lang.String;
      var elements = org.jsoup.select.Elements;
      var extractedText = java.lang.String;
       var ele = org.jsoup.Element;
       
     
     try{
         docs = new java.util.ArrayList();
         
         xmlstr = doc.getFirstFieldValue("body");
         jdoc = Jsoup.parse(xmlstr, "", Parser.xmlParser());
         for each(element in jdoc.select("loc")) {
             docurl = element.ownText();
             if(docurl !== null && docurl !== ""){
             logger.info("Parsed URL: "+element.ownText());
             pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument(element.ownText());
             docs.add(pipelineDoc);
             }
             
          }
          
          outdocs = new java.util.ArrayList;
          // now crawl each doc in the feed
          for each(pipelineDoc in docs){
              docurl = pipelineDoc.getId();
              jdoc = Jsoup.connect(docurl).get();
              if(jdoc !== null){
                  logger.info("FOUND a JSoup document for url  "+doc.getId());
                  extractedText = new java.lang.String();
                   elements = jdoc.select("p");
                        logger.info("ITERATE OVER ELEMENTS");
                        // then parse elements and pull just the text
                        for each (ele in elements) {
                            if (ele !== null) {
                                if (ele.ownText() !== null) {
                                    extractedText += ele.ownText();
                                }
                            }
                        }
                        pipelineDoc.addField('content_text', extractedText);
                       // pipelineDoc.addField("_raw_content_", jdoc.toString());
                        pipelineDoc.addMetadata("Content-Type", "text/html");
                        logger.info("Extracted: "+extractedText);
                        outdocs.add(pipelineDoc);
                  
              } else {
                  logger.warn("Jsoup Document was NULL **** ");
              }
          }
     }catch(ex){
         logger.error(ex);
     }
     return outdocs;
 }
 
 
 // solr cloud client
 var solrCloudClient = function(doc){
       var client = org.apache.http.client.HttpClient;
       var cloudServer = org.apache.solr.client.solrj.impl.CloudSolrClient;
       var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
       var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
       var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
       var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
       var cm = org.apache.http.impl.conn.PoolingClientConnectionManager;
       var String = java.lang.String;
       
       var ZOOKEEPER_URL = new String("localhost:9983");
       var DEFAULT_COLLECTION = new String("cityofsacramento");
       var server = ZOOKEEPER_URL;
       var collection = DEFAULT_COLLECTION;
       var docList = java.util.ArrayList;
       var inputDoc = org.apache.solr.common.SolrInputDocument;
       var pingResp = org.apache.solr.client.solrj.response.SolrPingResponse;
       var res = org.apache.solr.client.solrj.response.UpdateResponse;
         
       
       try{
           // PoolingClientConnectionManager cm = new PoolingClientConnectionManager();
            cm = new PoolingClientConnectionManager();
            client = new DefaultHttpClient(cm);
            cloudServer = new CloudSolrClient(server, client);
            cloudServer.setDefaultCollection(collection);
            logger.info("CLOUD SERVER INIT OK...");
            docList = new java.util.ArrayList();
            pingResp = cloudServer.ping();
            logger.info(pingResp);
            
            cloudServer.add(docList);
            res = cloudServer.commit();
            logger.info(res);
            
           
       }catch(ex){
           logger.error(ex);
       }
     
     return doc;
 };
 
 
