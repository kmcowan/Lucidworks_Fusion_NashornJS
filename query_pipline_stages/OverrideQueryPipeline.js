/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function doHttpQuery(request) {
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var HttpGet = org.apache.http.client.methods.HttpGet;
    var e = java.lang.Exception;
    var url = "http://localhost:8764/api/apollo/solr/_test_/select?q=*:*&wt=json&rows=1&fl=id";
    var JSONObject = org.json.JSONObject;
    var json = new JSONObject();
    try {
        var client = getAuthHttpClient();
        json.put("msg1", "got auth client okay");
        var httpget = new HttpGet(url);
        var response = client.execute(httpget);
        json.put("msg2", "execute httpget okay...");
        if (response !== null) {
            var rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            var result = "";
            var line = "";
            while ((line = rd.readLine()) !== null) {
                result += line;
            }

            json.put("result", result);
        }
    } catch (e) {
 
        json.put("error", "some error occurred...");
    }

    return json;
}

function getAuthHttpClient() {

    var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;
    var AuthScope = org.apache.http.auth.AuthScope;
    var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
    var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
    var HttpPost = org.apache.http.client.methods.HttpPost;
    var StringEntity = org.apache.http.entity.StringEntity;
    var pwd = "YOUR_PASSWORD";
    var user = "ADMIN_USER_NAME";
    var fusionUrl = "http://localhost:8764";
    var client = null;
    var e = java.lang.Exception;
    try {

        var authJson = "{\"username\":\"" + user + "\", \"password\":\"" + pwd + "\"}";
        var authUrl = fusionUrl + "/api/session?realmName=native";
        var provider = new BasicCredentialsProvider();
        var credentials = new UsernamePasswordCredentials(user, pwd);
        provider.setCredentials(AuthScope.ANY, credentials);
        var client = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(provider)
                .build();
        var session = new HttpPost(authUrl);
        var params = new StringEntity(authJson);
        session.addHeader("content-type", "application/json");
        session.setEntity(params);
        var response = client.execute(session);
    } catch (e) {
        logger.error("Error getting httpclient " + e.getLocalizedMessage());
    }

    return client;
}

function main(request, response, _context, collection, solrServer, solrClientFactory) {

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


    var docs = doHttpQuery(request);
    json.put("docs", docs.toString());
    var result = docs.get("result");
    var resultJson = JSON.parse(result.toString());
    // this is your docs array that you'll modify and load back into the request. 
    var jsonDocs = resultJson.response.docs;
    json.put("docs_result", JSON.stringify(jsonDocs));
    var someObject = new java.lang.String("{\"response\":{\"numFound\":7,\"start\":0,\"maxScore\":1.0,\"over\":" + json.toString() + " }}"); //


    var stream = new java.io.ByteArrayInputStream(someObject.getBytes("UTF-8"));
    var v2 = new com.lucidworks.apollo.solr.response.RawResponse(stream, "application/json", "UTF-8");
    var newResponse = new com.lucidworks.apollo.pipeline.query.Response(null, v2);
    var queryRequestAndResponse = com.lucidworks.apollo.pipeline.query.QueryRequestAndResponse.create(request, newResponse, 1);
    return queryRequestAndResponse;
}


