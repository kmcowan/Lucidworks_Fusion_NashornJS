/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var parseResponse = function(doc){
    var JSONArray =  org.json.JSONArray;
var JSONObject = org.json.JSONObject;
      var json = new JSONObject(jsonStr);
            var docs = json.getJSONObject("response").getJSONArray("docs");
            var payload = docs.getJSONObject(0);
            var keywords = payload.getJSONArray("keywords");
            var subjects = payload.getJSONArray("subjects");
            
             if(keywords !== null){
                
                logger.info("Keyword 0: "+keywords.getString(0));
            }
            
            if(subjects !== null){
                
               logger.info("Subject 0: "+subjects.getString(0));
            }
            
    return doc;
}