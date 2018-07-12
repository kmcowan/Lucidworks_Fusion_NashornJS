/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var stripNonSSL = function(doc){
    // here we're just looking at the protocol, 
    // but you could in theory make a call to solr to see if a dupe with https existed. 
    if(doc !== null && doc.getId() !== null && doc.getId().startsWith("http:")){
        
            return null;
        
    }
    return doc;
}

