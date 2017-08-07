
var readRelativeHrefs = function (doc) {

    if (doc !== null && 
            doc.getId() !== null && 
            doc.getFirstFieldValue("body") !== null) {
         
        
        var ArrayList = java.util.ArrayList;
        var docs = new ArrayList();
        var e = java.lang.Exception;
        var String = java.lang.String;
         var Jsoup = org.jsoup.Jsoup;
          var jdoc = org.jsoup.nodes.Document;
           var Parser = org.jsoup.parser.Parser;
        var element = org.jsoup.Element;
        var hrefs = org.jsoup.select.Elements;
           var PipelineDocument = com.lucidworks.apollo.common.pipeline.PipelineDocument;
         
        docs.add(doc);
        try{
            var baseUrl = new String("http://cprassoc.com/lucidworks/wabion");
            var html = doc.getFirstFieldValue("body");
             
            var jdoc = Jsoup.parse(html);
            var hrefs = jdoc.select("a[href]");
            
            for each(element in hrefs) {
                logger.info("Parsed URL: " + element.ownText());
                var newId = baseUrl + element.attr("abs:href");
                var pipelineDoc = new PipelineDocument();
                pipelineDoc.addField("id", newId);
                docs.add(pipelineDoc);
            }
            
        }catch(e){
            logger.error(e);
        }
        return docs;
    } else {
        return doc;
    }
}