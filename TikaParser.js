/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tikaParser = function (doc) {

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
        var metadataNames = Java.type("String[]");
        var content = "";
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
                doc.addField("_raw_content_", content);
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
    return doc;
}
