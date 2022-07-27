/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var extract = function (doc) {
  if(doc !== null && doc.getId() !== null){ 

    var Jsoup = org.jsoup.Jsoup;
    var Document = org.jsoup.nodes.Document;
    var Element = org.jsoup.nodes.Element;
    var Elements = org.jsoup.select.Elements;

    var pdoc = org.jsoup.nodes.Document;
    var e = java.lang.Exception;

    try {
        pdoc = Jsoup.parse(content);
        if (null !== pdoc) {
            div = pdoc.select("div#body-container").first();
          
            if (div != null) {
                var txt = div.ownText();
                logger.info("ADD CONTENT: " + txt);
                doc.addField("content", txt);
            } else {
                logger.warn("Div was null");
            }
        }

    } catch (e) {
        logger.error(e);
    }
  }
    return doc;
}