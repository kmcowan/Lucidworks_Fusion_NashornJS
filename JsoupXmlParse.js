/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jsoupxml = function (doc) {
    var Base64 = org.apache.commons.codec.binary.Base64;

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
    var String = java.lang.String;
    var base64 = java.util.Base64;
    var decoder = base64.getDecoder();
    doclist = new java.util.ArrayList();
    outdocs = new java.util.ArrayList();

    try {
        if (doc !== null && doc.getId() !== null) {
            var raw = doc.getFirstFieldValue("_raw_content_");
            if (raw !== null) {
                xmlstr = new String(decoder.decode(raw));
                if (xmlstr) {
                    logger.warn("xml str: " + xmlstr);
                    doc.addField("html_s", xmlstr);
                    jdoc = Jsoup.parse(xmlstr, '', Parser.xmlParser());
                    var elements = jdoc.select("img");
                    var biz = jdoc.select('img').first();
                    logger.warn("Biz: " + biz);
                    logger.warn("Elements: " + elements);
                    var ele = elements.first();
                    //logger.warn("Ele: " + ele);
                    //logger.warn("JDoc: " + jdoc + " ---------------------");

                    // test/sanity-check code
                    var foo = '<html>\
<body>\
<img src="mypic.png" alt="Test image" title="Sample title" />\
</body>\
</html>';
                    jbar = Jsoup.parse(foo, '', Parser.xmlParser());
                    var baz = jbar.select('img').first();
                    logger.warn("Baz: " + baz);

                } else {
                    logger.error("no body :-(  -------------------");
                }
            }
        } else {
            logger.debug("!!!!!!!!!!!!!!! No doc object  -------------------");
        }


    } catch (ex) {
        logger.error(ex);
    }

    return doc;

}
