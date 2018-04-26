/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var urlComponentPath = function(doc){
    var URL = java.net.URL;
    var e = java.lang.Exception;
    var String = java.lang.String;
    
    try{
            var urlstr = doc.getId();
            var url = new URL(urlstr);
           logger.info("Full Path: "+url.getPath());
            var path = new String(url.getPath());
            var urlId = path.substring(path.indexOf("/", 2), path.length());
              System.out.println("Doc Path: "+urlId);
            
            var paths = url.getPath().split("/");
            for(var i=0; i<paths.length; i++){
                System.out.println("Component Path: "+paths[i]);
            }
            
           
            
        }catch(e){
           logger.error(e.getLocalizedMessage());
        }
}