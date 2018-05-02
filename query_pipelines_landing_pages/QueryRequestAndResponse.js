/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var reqRes = function (request, response, _context, collection, solrServer, solrClientFactory) {

    var json = JSON.parse(request);
    var someObject = "{\"response\":{\"numFound\":7,\"start\":0,\"maxScore\":1.0, \"docs\":" + json + "}}";


    var stream = new java.io.ByteArrayInputStream(someObject.getBytes("UTF-8"));
    var v2 = new com.lucidworks.apollo.solr.response.RawResponse(stream, "application/json", "UTF-8");

    var newResponse = new com.lucidworks.apollo.pipeline.query.Response(null, v2);
    var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request, newResponse, 1);
    return queryRequestAndResponse;
}

/* Java code in Fusion:  3.1 
 if (ret instanceof QueryRequestAndResponse) {
 return (QueryRequestAndResponse) ret;
 } else {
 return message;
 }*/


var overridev2 = function (request, response, _context, collection, solrServer, solrClientFactory) {

    //var json =  "";//JSON.stringify(request.getParams());
    var JSONObject = org.json.JSONObject;
    var json = new JSONObject();
    if (request.getParams() !== null) {
        json.put("msg", "request NOT NULL");
        var map = request.getParams();
        var str = "";

        var value = "";
        for each (var e in map.keySet()) {
            var params = request.getParam(e);
            if (params !== null) {
                for each (var key in params) {
                    str += e + ": " + key;
                }
            } else {
                str += e + ": |";
            }
        }
        json.put("req", str);
    }

    var someObject = new java.lang.String("{\"response\":{\"numFound\":7,\"start\":0,\"maxScore\":1.0,\"over\":" + json.toString() + " }}");//


    var stream = new java.io.ByteArrayInputStream(someObject.getBytes("UTF-8"));
    var v2 = new com.lucidworks.apollo.solr.response.RawResponse(stream, "application/json", "UTF-8");

    var newResponse = new com.lucidworks.apollo.pipeline.query.Response(null, v2);
    //  var jr = new com.lucidworks.apollo.solr.response.JSONResponse(someObject);
    //var newResponse = new com.lucidworks.apollo.pipeline.query.Response(new javax.ws.rs.core.MultivaluedHashMap(headers), jr);

    var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request, newResponse, 1);
    return queryRequestAndResponse;
}