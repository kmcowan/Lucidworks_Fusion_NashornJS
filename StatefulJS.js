/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var stage1 = function(doc){
  
    var System = java.lang.System;
    if(System.getProperties().get("stateful_key") == null){
    System.getProperties().put("stateful_key", "foobar");
    logger.info("SET stateful key foobar");
      
    } else {
       logger.info("NOT SETTING stateful key... already set");
    }
    return doc;
}

var stage2 = function(doc){
      var System = java.lang.System;
  if(System.getProperties().get("stateful_key") != null){
    var val = System.getProperties().getProperty("stateful_key")
    logger.info("GET stateful key "+val);
  } else {
       logger.warn("STATEFUL KEY NOT FOUND IN STAGE 2"); 
  }
    return doc;
}