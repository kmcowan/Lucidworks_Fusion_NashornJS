/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var documentListBuildiner = function (doc) {
        var doclist = java.util.ArrayList;
        var Jsoup = org.jsoup.Jsoup;
        var jdoc = org.jsoup.nodes.Document;
        var ex = java.lang.Exception;
        var Parser = org.jsoup.parser.Parser;
        var element = org.jsoup.Element;
        var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
        var xmlstr = java.lang.String;
        var docurl = java.lang.String;
        var elements = org.jsoup.select.Elements;
        var ele = org.jsoup.Element;
        var outdocs = java.util.ArrayList;
        doclist = new java.util.ArrayList();
        outdocs = new java.util.ArrayList();
        var elementsToExtract = ["p","span","div","a"];
        var targetElement = "loc";
        
        try {


            xmlstr = doc.getFirstFieldValue("body");
            jdoc = Jsoup.parse(xmlstr, "", Parser.xmlParser());
            for each(element in jdoc.select(targetElement)) {
                docurl = element.ownText();
                if (docurl !== null && docurl !== "") {
                    logger.info("Parsed URL: " + element.ownText());
                    pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument(element.ownText());
                    doclist.add(pipelineDoc);
                }

            }

        } catch (ex) {
            logger.error(ex);
        }

        try {
            for each(pipelineDoc in doclist) {
                docurl = pipelineDoc.getId();
                jdoc = Jsoup.connect(docurl).get();
                extractedText = new java.lang.String();
                if (jdoc !== null) {
                    logger.info("FOUND a JSoup document for url  " + docurl);
                    var extractedText = new java.lang.String();
                    var metaDataText = new java.lang.String();
                    // get the title
                    ele = jdoc.select("title").first();
                    if(ele !== null && ele.ownText){
                      pipelineDoc.addField("title", ele.ownText());
                    }
                    
                    // get the meta 
                     ele = jdoc.select("meta[keywords]").first();
                     if(ele !== null && ele.ownText){
                        pipelineDoc.addField("meta.keywords", ele.ownText());
                    }
                    
                    ele = jdoc.select("meta[description]").first();
                     if(ele !== null && ele.ownText){
                        pipelineDoc.addField("meta.description", ele.ownText());
                    }
                    
                    for each(var val in elementsToExtract){
                    elements = jdoc.select(val);
                    logger.info("ITERATE OVER ELEMENTS");
                    // then parse elements and pull just the text
                    for each (ele in elements) {
                        if (ele !== null) {
                            if (ele.ownText() !== null) {
                                extractedText += " "+ ele.ownText();
                            }
                        }
                    }
                  }
                    pipelineDoc.addField('body', extractedText);
                    logger.info("Extracted: " + extractedText);
                    outdocs.add(pipelineDoc);

                } else {
                    logger.warn("Jsoup Document was NULL **** ");
                }
            }
        } catch (ex) {
            logger.error(ex);
        }

        return outdocs;
    }