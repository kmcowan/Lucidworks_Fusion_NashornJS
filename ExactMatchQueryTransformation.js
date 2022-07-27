var extractor = function(request){
  var query = request.getFirstFieldValue("q");
  if(query !== undefined && query.indexOf("\"") > -1){
     query = query.replaceAll("\"","");
     request.addParam("fq", "title_txt_en:"+query+" OR body_txt_en:"+query+" OR description_txt_en:"+query);
     var qarr = query.split(" ");
     for(var i=0; i< qarr.length; i++){
       var altq = qarr[i];
       request.addParam("fq", "title_txt_en:"+altq+" OR body_txt_en:"+altq+" OR description_txt_en:"+altq);
       
     }
  }
  return request;
}


var extractor = function(request){
  var isStopWord = function(word){
    var stops = {"by":"","a":"","the":"","an":"","for":"","what":"","how":"",
    "when":"","where":"","why":"","already":"","some":"","someone":"",
    "somebody":"","that":"","please":"","try":"","again":"","later":"",
    "you":"","your":"","yours":"","with":"","entered":"","mailbox":"",
    "am":"","is":"","are":"","was":"","were":"","do":"","does":"","did":"",
    "have":"","has":"","had":"","may":"","might":"","must":"","can":"","could":"","should":"",
    "would":"","shall":"","will":"","be":"","being":"","been":"","in":""};
    if(stops[word] !== undefined){
      return true; 
    }
    
    return false;
  }
  
  function stripSpecialChars(query){
      chars = ["@", "!", "#", ".", ":", ",", "<", "<","\"",")","(","?","*","}","{",";","[","]","|"];
      for(var c=0; c<chars.length; c++){
         query = query.replaceAll(chars[c], "");
      }
      
      return query;
  }
  
  
  var query = request.getFirstFieldValue("q");
  //query = stripSpecialChars(query);
  //if(query !== undefined && query.indexOf("\"") > -1){
    // query = query.replaceAll("\"","");
  //}
     // request.addParam("fq", "title_txt_en:"+query+" OR body_txt_en:"+query+" OR description_txt_en:"+query);
     var qarr = query.split(" ");
     var altq = "";
     for(var i=0; i< qarr.length; i++){
        if( i > 0){
          altq += " " 
        }
       if(!isStopWord(qarr[i])){
         altq += qarr[i];
       }
       
     }
    request.removeParam("q");
    //request.addParam("q", "title_txt_en:"+altq+" OR body_txt_en:"+altq+" OR description_txt_en:"+altq);
    request.addParam("q", altq);
    
  
  
  return request;
}