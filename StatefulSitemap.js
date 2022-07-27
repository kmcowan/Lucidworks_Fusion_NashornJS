/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var stage1 = function(doc){
    var HashMap = java.util.HashMap;
    var Document = org.jsoup.nodes.Document;
    var Elements =  org.jsoup.select.Elements;
    var Element = org.jsoup.nodes.Element;
    var Parser =  org.jsoup.parser.Parser;
    var key = "sitemap";
    var System = java.lang.System;
    var sitemap = null;
    if(System.getProperties().get(key) == null){
        sitemap = new HashMap();
        var mydoc = Jsoup.connect("https://developers.docusign.com/sitemap.xml")
                    .userAgent("Mozilla")
                    .parser(Parser.xmlParser())
                    .cookie("cookie", "ds_a=40e56845-0afb-43f8-a8a2-1a5017204e7e; ELOQUA=GUID=0CEC7F4221CE4791A4C302F7F067F756; _gcl_au=1.1.829288402.1615902601; OptanonConsent=landingPath=https%3A%2F%2Fdevelopers.docusign.com%2F&datestamp=Tue+Mar+16+2021+07%3A50%3A01+GMT-0600+(Mountain+Daylight+Time)&version=4.9.0&EU=false&groups=117%3A1%2C1%3A1%2C2%3A1%2C3%3A1%2C4%3A1%2C120%3A1%2C0_197850%3A1%2C0_122589%3A1%2C0_115082%3A1%2C0_97563%3A1%2C0_97565%3A1%2C101%3A1%2C102%3A1%2C103%3A1%2C104%3A1%2C105%3A1%2C106%3A1%2C107%3A1%2C108%3A1%2C109%3A1%2C110%3A1%2C111%3A1%2C112%3A1%2C113%3A1%2C114%3A1%2C115%3A1%2C116%3A1%2C118%3A1%2C119%3A1%2C0_115081%3A1%2C0_115083%3A1; _ga=GA1.2.213169198.1615902601; _gid=GA1.2.497448063.1615902601; _fbp=fb.1.1615902601717.1751908360; __adroll_fpc=fa77bb8878d7394cbd5244613525835e-1615902602171; __ar_v4=%7CDQTAWOHQF5GGTCQWS4YGYB%3A20210315%3A1%7CL7L3QFB6AZERXCALORVQKA%3A20210315%3A1%7C6GKHADQYCZELLKOJA5FR27%3A20210315%3A1; NPS_01824d57_last_seen=1615902699389").get();
            if (mydoc != null) {
                for (var e in mydoc.select("url")) {
                    //System.out.println(e.getElementsByTag("loc").first().text());
                    sitemap.put(e.getElementsByTag("loc").first().text(), "");
                }
            }
    System.getProperties().put(key, sitemap);
    
    logger.info("SET stateful key " + key);
      
    } else {
       logger.info("GET stateful key... " + key);
       sitemap =  System.getProperties().get(key);
    }
    
    if(doc !== null && 
            doc.getId() !== null && 
            sitemap !== null && 
            sitemap.get(doc.getId()) === null ){
         
            return null;
        
    }
    
    
    return doc;
}

