/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var db2ConnectionLoop = function(doc){
    var Connection = java.sql.Connection;
    var DriverManager = java.sql.DriverManager;
    var e = java.lang.Exception;
    var con = java.sql.Connection;
    if(doc != null){
        try{
                  var url = "jdbc:db2://localhost:5021/SAMPLE";
            // Set URL for data source
            var user = "YOUR USER NAME HERE";
            var password = "YOUR USER PWD HERE";
            var con = DriverManager.getConnection(url, user, password);
            if (con.isClosed()) {
                System.out.println("Connected...");
            } else {
                System.out.println(" NOT Connected...");
            }

            con.close();
        }catch(e){
            logger.error(e);
        }
    }
    return doc;
}