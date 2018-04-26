/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var regexeval = function(doc){
    var Matcher = java.util.regex.Matcher;
    var Pattern = java.util.regex.Pattern;
    var System = java.lang.System;
    var e = java.lang.Exception;
    
    try {
            //1st way  
            var p = Pattern.compile(".s");//. represents single character  
            var m = p.matcher("as");
            var b = m.matches();

//2nd way  
            var b2 = Pattern.compile(".s").matcher("as").matches();

//3rd way  
            var b3 = Pattern.matches(".s", "as");

            System.out.println(b + " " + b2 + " " + b3);
        } catch ( e) {
            logger.error(e);
        }
}