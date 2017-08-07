/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var loadJsonConfig = function (doc) {

    var FileInputStream = java.io.FileInputStream;
    var IOUtils = org.apache.cxf.helpers.IOUtils;
    var JSONObject = org.json.JSONObject;
    
     var obj = new JSONObject(IOUtils.readStringFromStream(new FileInputStream("config_sample.json")));
       logger.info("User: "+obj.get("user"));
            

    return doc;
}
