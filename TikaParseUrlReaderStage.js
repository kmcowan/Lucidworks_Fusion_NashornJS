/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * http://cprassoc.com/lucidworks/FL_insurance_sample.csv
 * 
 * http://cprassoc.com/lucidworks/sample_requirements_capture_file.csv
 */


var tikaParserStage = function (doc) {

    if (doc != null && doc.getId() != null) {
        var e = java.lang.Exception;
        var URL = java.net.URL;
        var BufferedReader = java.io.BufferedReader;
        var InputStreamReader = java.io.InputStreamReader;
        var connection = java.net.HttpURLConnection;
        var String = java.lang.String;
        var fileSize = getFileSize(doc.getId());
        logger.info("**** FILE SIZE: " + fileSize + " *******");
        if (fileSize > 10000 && doc.getId().contains(".csv")) {
            logger.info("**** LARGE FILE DETECTED...USING CUSTOM PARSING. ");
            try {
                var oracle = new URL(doc.getId());
                connection = oracle.openConnection();
                connection.setReadTimeout(180000);
                connection.setConnectTimeout(30000);
                connection.connect();

                var ins = new BufferedReader(new InputStreamReader(connection.getInputStream()));

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

        } else {
            doc = tikaParse(doc);
        }
    } else {
        logger.info("Document ID was NULL");
    }
    return doc;
}

function tikaParse(doc) {
    var File = java.io.File;
    var FileInputStream = java.io.FileInputStream;
    var IOException = java.io.IOException;
    var InputStream = java.io.InputStream;
    var HashMap = java.util.HashMap;
    var Tika = org.apache.tika.Tika;
    var Metadata = org.apache.tika.metadata.Metadata;
    var AutoDetectParser = org.apache.tika.parser.AutoDetectParser;
    var ParseContext = org.apache.tika.parser.ParseContext;
    var OOXMLParser = org.apache.tika.parser.microsoft.ooxml.OOXMLParser;
    var PDFParser = org.apache.tika.parser.pdf.PDFParser;
    var BodyContentHandler = org.apache.tika.sax.BodyContentHandler;
    var xContentHandler = org.xml.sax.ContentHandler;
    var String = java.lang.String;
    var URL = java.net.URL;
      var base64 = java.util.Base64;

    var url = doc.getId();

    var autoParser = new AutoDetectParser();
    var tika = new Tika();

    var pdfParser = new PDFParser();
    // Get ready to parse the file.
    var textHandler = new BodyContentHandler(-1);
    var metadata = new Metadata();
    var context = new ParseContext();
    var map = new HashMap();
    var ioe = java.io.IOException;
    var metadataNames = Java.type("java.lang.String[]");
    var content = new String();
    logger.info("*** BEGIN TIKA PARSE *** ");
    
    try {
        var urlobj = new URL(url);
        var input = urlobj.openStream();

        if ("application/pdf".equals(tika.detect(urlobj))) {
            pdfParser.parse(input, textHandler, metadata, context);
            metadataNames = metadata.names();
            content = textHandler.toString();
        } else if ("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(tika.detect(urlobj))) {
            logger.info("Using XslX parser...");
            var msofficeparser = new OOXMLParser();
            msofficeparser.parse(input, textHandler, metadata, context);
            content = textHandler.toString();
            //   logger.info("Contents of the document:" + content);
            logger.info("Metadata of the document:");
            metadataNames = metadata.names();

        } else {
            autoParser.parse(input, textHandler, metadata, context);
            metadataNames = metadata.names();
            content = textHandler.toString();
        }

        if (content !== null) {
            
                      
            var encoder = base64.getEncoder();
            var encoded = encoder.encodeToString(content.getBytes());
           if(!doc.hasField("_raw_content_")){
             doc.addField("_raw_content_", encoded);
           } else {
            doc.setField("_raw_content_", encoded);
           }
        }
        if (metadataNames !== null) {
            for (var name in metadataNames) {
                logger.info(name + ": " + metadata.get(name));
                doc.addField(name, metadata.get(name));
            }
        }
    } catch (ioe) {
        logger.error(ioe);
    }

    return doc;
}

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
        if (conn.disconnect) {
            conn.disconnect();
        }
    }
    return len;

}

 