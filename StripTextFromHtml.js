/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var striptext = function(doc){
    var e =  java.lang.Exception;
    try{
    if(doc !== null && doc.hasField("body")){
        var Jsoup = org.jsoup.Jsoup;
        var Document = org.jsoup.nodes.Document;
        var Element = org.jsoup.nodes.Element;
        
        var html = doc.getFirstFieldValue("body");
        var jdoc = Jsoup.parseBodyFragment(html);
            var body = jdoc.body();
           logger.info(body.text());
           doc.setField("body", body.text());
    }
    }catch(e){
        logger.error(e.toString());
    }
    
    return doc;
}
