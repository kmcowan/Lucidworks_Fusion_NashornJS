/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function tikaParseString(doc) {

    
    var ByteArrayInputStream = java.io.ByteArrayInputStream;
    var InputStream = java.io.InputStream;
    var Metadata = org.apache.tika.metadata.Metadata;
    var AutoDetectParser = org.apache.tika.parser.AutoDetectParser;
    var BodyContentHandler = org.apache.tika.sax.BodyContentHandler;

    var parser = new AutoDetectParser();
    var handler = new BodyContentHandler();
    var metadata = new Metadata();
    
    var base64 = java.util.Base64;
       var decoder = base64.getDecoder();
    
        var fragment = doc.getFirstFieldValue("_raw_content_");
   
    // need to decode base64 raw content:
         fragment = decoder.decode(fragment);
          
    var stream = new ByteArrayInputStream(fragment.getBytes());
    parser.parse(stream, handler, metadata);
    return handler.toString();

}