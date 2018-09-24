/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function readContext(ctx){
    var e = java.lang.Exception;
     try{
         
        var props = ctx.keySet().iterator();
        var pkey,pvalue;
        var str = "";
        while(props.hasNext()){
            pkey = props.next();
            pvalue = ctx.getString(pkey);
            str += "Key: "+pkey+" value: "+pvalue;
        }
        logger.info(str);
    }catch(e){
        logger.error(e.getLocalizedMessage());
    }
}