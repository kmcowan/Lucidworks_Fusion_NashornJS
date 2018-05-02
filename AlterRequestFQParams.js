/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var alterReq = function (request) {
    //clientId:  change to clientID
    var String = java.lang.String;
    var HashMap = java.util.HashMap;
    var map = request.getParams();
    var str = "";


    var value = "";
    
    // load params for reloading later
    var allParams = request.getParams();
    var map = new HashMap();
    for each(var k in allParams.keySet()){
        var params = request.getParam(k);
        map.put(k, params);
    }
    
    // get all the fq params
    var params = request.getParam("fq");
    // clear params (so you don't keep them around)
    request.clearParams();
    
    // now run through the 'fq' fields, and make your changes. 
    if (params !== null) {
        for each (var key in params) {
            value = new String(key);
            if (value.indexOf("clientId=") > -1) {
                // search and replace goes here.
                value = value.replaceAll("clientId=", "clientID:");
                request.addParam("fq", value);
            }
        }
        
        // now reload everything but fq back
        for each(var k in map.keySet()){
            if(k !== "fq"){
                request.addParam(k, map.get(k));
            }
        }
    }  
}