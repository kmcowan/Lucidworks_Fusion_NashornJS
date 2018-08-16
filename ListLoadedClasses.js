/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var listLoadedClasses = function(doc){
    var e = java.lang.Exception;
    var Class = java.lang.Class;
    var Thread = java.lang.Thread;
    var ClassLoader = java.lang.ClassLoader;
    var System = java.lang.System;
    var Iterator = java.util.Iterator;
    
    try{
         var myCL = Thread.currentThread().getContextClassLoader();
         var str = "";
         while (myCL !== null) {
            str += " ClassLoader: " + myCL +" \n";
            for (var iter = list(myCL); iter.hasNext();) {
                str += " \t" + iter.next() + " \n";
            }
            myCL = myCL.getParent();
        }
        logger.info(str);
    }catch(e){
        
    }
    
    function list(CL){
        var ex = java.lang.Exception;
        var Vector = java.util.Vector;
        var ClassLoader_classes_field = java.lang.reflect.Field;
        try{
            var CL_class = CL.getClass();
        while (CL_class != java.lang.ClassLoader.class) {
            CL_class = CL_class.getSuperclass();
        }
        ClassLoader_classes_field = CL_class.getDeclaredField("classes");
        ClassLoader_classes_field.setAccessible(true);
        var classes =  ClassLoader_classes_field.get(CL);
        return classes.iterator();
        }catch(ex){
            
        }
    }
    
    return doc;
}