/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sparkRunner = function (doc) {
    var HashMap = java.util.HashMap;
    var Map = java.util.Map;
    var SparkSession = org.apache.spark.sql.SparkSession;
    var Dataset = org.apache.spark.sql.Dataset;
    var Row = org.apache.spark.sql.Row;
    var e = java.lang.Exception;
    try {

        var spark = SparkSession
                .builder()
                .appName("JavaScript Spark SQL")
                .config("spark.some.config.option", "some-value")
                .getOrCreate();

        var df = spark.read().json("examples/src/main/resources/people.json");

// Displays the content of the DataFrame to stdout
        df.show();

        //    spark.sqlContext().load("solr",Map("zkHost" -> "localhost:9983", "collection" -> "term_docs")).filter("term_key='a*'");

        var map = new HashMap();
        map.put("zkHost", "localhost:9983");
        map.put("collection", "default");

        // this will be the dataset you query
        var ds = spark.sqlContext().load("solr", map);

    } catch (e) {
        logger.error(e);
    }

}
