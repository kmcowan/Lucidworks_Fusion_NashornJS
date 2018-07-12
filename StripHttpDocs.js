/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var stripNonSSL = function(doc){
    if(doc !== null && doc.getId() !== null){
        if(doc.getId().startsWith("http:")){
            return null;
        }
    }
    return doc;
}

