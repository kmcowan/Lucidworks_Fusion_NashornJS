/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parseurl = function(doc){
    var e = java.lang.Exception;
    var URL = java.net.URL;
    if(doc !== null && doc.getId() !== null){
        try{
            var urlstr = doc.getId();
            var url = new URL(urlstr);
            var path = url.getPath();
            var paths = path.split("/");
            if(paths.length > 0){
              doc.addField(paths[1]);
              logger.info("Lang: " + paths[1]);
            }
        }catch(e){
            logger.error("**** ERROR **** " + e.toString());
        }
    }
    return doc;
}