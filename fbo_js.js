/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var checkDoc = function (doc) {
    var e = java.lang.Exception;
    var keywords = ["RFID", "PHP", "Java", "JavaScript", ]
    if (doc !== null && doc.getId() !== null) {
        try {
            if (doc.getId().contains("s=opportunity")) {
                var hasKeyword = false;
                var content = doc.getFirstFieldValue("body");
                if (content !== null) {
                    for (var i = 0; i < keywords.length; i++) {
                         var keyword = keywords[i];
                         if(content.contains(keyword)){
                             hasKeyword = true;
                         }
                    }
                    if (hasKeyword) {
                        logger.info("VALID opportunity found: " + doc.getId());
                    } else {
                        doc.setId("NA");
                        doc.setField("body", "");
                        doc.setField("_raw_content_", "");
                    }

                }
            } else {
                doc.setId("NA");
                doc.setField("body", "");
                doc.setField("_raw_content_", "");
            }
        } catch (e) {
            logger.error(e);
        }
    }
    return doc;
}