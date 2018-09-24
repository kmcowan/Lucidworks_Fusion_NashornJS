 
 var mysqlStage = function(doc){
 
var ArrayList =  java.util.ArrayList;
    
      try{
       
          var query = "some query";
          var args = new ArrayList();
          var resultSet =  execStatement(query, args);
          // now do something with ResultSet
          
      }catch(e){
          logger.error(e.getMessage());
      }
   return doc;
 }
 
  function getConnection() {
      var Class = java.lang.Class;
      var DriverManager =  java.sql.DriverManager;
      var e = java.lang.Exception;
        // connect to db
        var con = null;
        try {
            
            // loadDriver();
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            con = DriverManager.getConnection("DB_URL",
                    "DB_USER", "DB_PWD");

        } catch (e) {
           logger.error("Exception: " + e.getMessage());
        }
        return con;
    }
    
     function execStatement(   query,  args) {
         var ex = java.sql.SQLException;
         
          var rs = null;
     try{
       var conn = getConnection();
       var stmt = conn.prepareCall(query);
           for(var i=0; i<args.size(); i++){
            stmt.setObject(i+1, args.get(i));
           }
            rs = stmt.executeQuery();
          /* process the ResultSet 
          while (rs.next()) {
                System.out.println(String.format("%s - %s",
                        rs.getString("first_name") + " "
                        + rs.getString("last_name"),
                        rs.getString("skill")));
            }
       */
        } catch ( ex) {
            logger.error(ex.getMessage());
        }
     
     return rs;
}
