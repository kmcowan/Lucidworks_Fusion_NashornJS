/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var urlReader = function (doc) {
    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
    try {
        var oracle = new URL(doc.getId());
        var ins = new BufferedReader(new InputStreamReader(oracle.openStream()));

        var inputLine = "";
        var result = new String();
        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine);
            result += inputLine;
        }
        ins.close();
        logger.info("ADD RESULT: " + result);
        doc.addField("csvdata_txt", result);
    } catch (e) {
        logger.error(e);
    }

    return doc;
}

var getFileSize = function (docurl) {
    var HttpURLConnection = java.net.HttpURLConnection;
    var URL = java.net.URL;
    var conn = java.net.HttpURLConnection;
    var e = java.lang.Exception;
    var len = 0;
    try {
        var url = new URL(docurl);
        conn = url.openConnection();
        conn.setRequestMethod("HEAD");
        conn.getInputStream();
        len = conn.getContentLength();
    } catch (e) {
        len = -1;
    } finally {
        if(conn.disconnect){
        conn.disconnect();
        }
    }
   return len;

};

var fusionUrlParser = 
function (doc) {
    var e = java.lang.Exception;
    var URL = java.net.URL;
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var String = java.lang.String;
    var fileSize = getFileSize(doc.getId());
   logger.info("**** FILE SIZE: "+fileSize+" *******");
    try {
        var oracle = new URL(doc.getId());
        var ins = new BufferedReader(new InputStreamReader(oracle.openStream()));

        var inputLine = "";
        var result = new String();
        while ((inputLine = ins.readLine()) !== null) {
            //logger.info(inputLine);
            result += inputLine;
        }
        ins.close();
        logger.info("ADD RESULT: "+result);
        doc.addField("csvdata_txt", result);
    } catch (e) {
        logger.error(e);
    }
    
    return doc;


function getFileSize(docurl) {
    var HttpURLConnection = java.net.HttpURLConnection;
    var URL = java.net.URL;
    var conn = java.net.HttpURLConnection;
    var e = java.lang.Exception;
    var len = 0;
    try {
        var url = new URL(docurl);
        conn = url.openConnection();
        conn.setRequestMethod("HEAD");
        conn.getInputStream();
        len = conn.getContentLength();
    } catch (e) {
        len = -1;
    } finally {
         if(conn.disconnect){
        conn.disconnect();
        }
    }
   return len;

}

 
}
