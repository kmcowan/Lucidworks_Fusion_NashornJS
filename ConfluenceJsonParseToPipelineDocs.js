/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var confluenceJsonReader = function (doc) {
    var PipelineDocument = com.lucidworks.apollo.common.pipeline.PipelineDocument;

    var URL = java.net.URL;
    var ArrayList = java.util.ArrayList;

    var JSONObject = org.json.JSONObject;
    var Jsoup = org.jsoup.Jsoup;
    var Document = org.jsoup.nodes.Document;
    var Element = org.jsoup.nodes.Element;
    var String = java.lang.String;

    var System = java.lang.System;


    var e = java.lang.Exception;

    var docs = Java.type("java.util.ArrayList");
    var user = new String(USERNAME);
    var pwd = new String(PWD);
    var url = new String("https://cprassoc.atlassian.net/wiki/rest/api/search?cql=siteSearch~%22*%22%20AND%20type=page&label=docs&expand=content.space,space.homepage");
    var baseUrl = new String("https://cprassoc.atlassian.net/wiki");

    var pipelineDocs = new ArrayList();
    var pdoc;
    try {

        var json = new JSONObject(getContent(url, user, pwd));
        var results = json.getJSONArray("results");
        var obj;
        //   var contentObj;
        var link;

        for (var i = 0; i < results.length(); i++) {
            obj = results.get(i);
            System.out.println(obj.getString("title"));
            doc = new PipelineDocument();
            doc.addField("title", obj.getString("title"));
            //  contentObj = obj.getJSONObject("content");
            link = baseUrl + obj.getString("url");
            System.out.println(link);
            doc.setId(link);

            pipelineDocs.add(doc);
        }
    } catch (e) {
        logger.error(e);
    }

    try {
        var jdoc;
        var mainEle;
        var content = new String("");
        for (var i = 0; i < pipelineDocs.size(); i++) {
            content = getContent(new URL(pipelineDocs.get(i).getId()), user, pwd);
            jdoc = Jsoup.parse(content);
            mainEle = jdoc.select("#main").first();
            if (mainEle === null) {
                mainEle = jdoc.body();
            }

            if (mainEle !== null) {
                pipelineDocs.get(i).addField("_raw_content_", content);
                pipelineDocs.get(i).addField("body", mainEle.text());
                System.out.println(mainEle.text());
            }
        }
    } catch (e) {
        logger.error(e);
    }

    return pipelineDocs;



}

function getContent(durl, user, pwd) {
    var Base64 = org.apache.commons.codec.binary.Base64;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var HttpURLConnection = java.net.HttpURLConnection;
    var StringBuffer = java.lang.StringBuffer;

    var url = new URL(durl);
    var buffer = new StringBuffer();
    try {
        var connection = url.openConnection();
        var userCredentials = user + ":" + pwd;
        var basicAuth = "Basic " + new String(new Base64().encode(userCredentials.getBytes()));
        connection.setRequestProperty("Authorization", basicAuth);

        var inb = new BufferedReader(new InputStreamReader(connection.getInputStream()));

        var inputLine = new String();

        while ((inputLine = inb.readLine()) !== null) {

            buffer.append(inputLine);
        }
        inb.close();
    } catch (e) {

    }

    return buffer.toString();
}


/****
 * Conflunce from Fusion
 */
var confluence2 = function (doc) {
 
      logger.info("Loading Java Classes...");
    var PipelineDocument = com.lucidworks.apollo.common.pipeline.PipelineDocument;

    var URL = java.net.URL;
    var ArrayList = java.util.ArrayList;
    var Base64 = org.apache.commons.codec.binary.Base64;
    var JSONObject = org.json.JSONObject;
    var Jsoup = org.jsoup.Jsoup;
    var Document = org.jsoup.nodes.Document;
    var Element = org.jsoup.nodes.Element;
    var String = java.lang.String;

    var System = java.lang.System;


    var e = java.lang.Exception;
    logger.info("spin up variables");
    var docs = Java.type("java.util.ArrayList");
    var user = new String("kev.m.cowan");
    var pwd = new String("s3RvI@Pwd0X");
    var url = new String("https://cprassoc.atlassian.net/wiki/rest/api/search?cql=siteSearch~%22*%22%20AND%20type=page&label=docs&expand=content.space,space.homepage");
    var baseUrl = new String("https://cprassoc.atlassian.net/wiki");

    var pipelineDocs = new ArrayList();
    var pdoc;
    try {
        logger.info("Get initial content");
        var json = new JSONObject(getContent(url, user, pwd));
        var results = json.getJSONArray("results");
        var obj;
        //   var contentObj;
        var link;
logger.info("iterate over results");
        for (var i = 0; i < results.length(); i++) {
            obj = results.get(i);
           logger.info(obj.getString("title"));
            doc = new PipelineDocument();
            doc.addField("title", obj.getString("title"));
            //  contentObj = obj.getJSONObject("content");
            link = baseUrl + obj.getString("url");
            logger.info(link);
            doc.setId(link);

            pipelineDocs.add(doc);
        }
    } catch (e) {
        logger.error(e);
    }
logger.info("Now get the content for the page for each document");
    try {
        var jdoc;
        var mainEle;
        var content = new String("");
        for (var i = 0; i < pipelineDocs.size(); i++) {
            content = getContent(new URL(pipelineDocs.get(i).getId()), user, pwd);
            jdoc = Jsoup.parse(content);
            mainEle = jdoc.select("#main").first();
            if (mainEle === null) {
                mainEle = jdoc.body();
            }

            if (mainEle !== null) {
               if(content !== null){
                pipelineDocs.get(i).addField("_raw_content_", new Base64().encode(content));
               }
                pipelineDocs.get(i).addField("body", mainEle.text());
                logger.info(mainEle.text());
            }
        }
    } catch (e) {
        logger.error(e);
    }

    return pipelineDocs;

}

function getContent(durl, user, pwd) {
    var Base64 = org.apache.commons.codec.binary.Base64;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var HttpURLConnection = java.net.HttpURLConnection;
    var String = java.lang.String;
    var URL = java.net.URL;
    

    var url = new URL(durl);
    var buffer = new String("");
    var e = java.lang.Exception;
    try {
        var connection = url.openConnection();
        var userCredentials = user + ":" + pwd;
        var basicAuth = "Basic " + new String(new Base64().encode(userCredentials.getBytes()));
        connection.setRequestProperty("Authorization", basicAuth);

        var inb = new BufferedReader(new InputStreamReader(connection.getInputStream()));

        var inputLine = new String();

        while ((inputLine = inb.readLine()) !== null) {

            buffer += inputLine;
        }
        inb.close();
    } catch (e) {
        logger.error(e);
    }

    return buffer;
}
