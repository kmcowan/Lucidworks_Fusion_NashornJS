


var parseSignalDocs_old = function (doc) {


    if (doc !== null && doc.getFirstFieldValue("_raw_content_") !== null) {
        logger.info("PARSING NESTED DOCUMENTS...");
        logger.info("*** RAW: " + doc.getFirstFieldValue("_raw_content_"));
        doc.setId(null);

        // var raw = doc.getFirstFieldValue("_raw_content_");
        // if(raw !== null){
        //    logger.info("Raw class: "+ raw.getClass().getSimpleName()); 
        // }
        var doclist = java.util.ArrayList;
        var Jsoup = org.jsoup.Jsoup;
        var jdoc = org.jsoup.nodes.Document;
        var ex = java.lang.Exception;
        var Parser = org.jsoup.parser.Parser;
        var element = org.jsoup.Element;
        var PipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
        var xmlstr = java.lang.String;
        var docurl = java.lang.String;
        var elements = org.jsoup.select.Elements;
        var ele = org.jsoup.Element;

        var String = java.lang.String;
        var e = java.lang.Exception;
        var base64 = java.util.Base64;
        var String = java.lang.String;
        var ArrayList = java.util.ArrayList;

        var decoder = base64.getDecoder();

        var pretty = true;
        var result = new String("");
        var outdocs = new ArrayList();
        var pipelineDoc = new PipelineDocument();

        try {
            var rawlist = doc.getFieldValues("_raw_content_");
            raw = rawlist[0];
            //  logger.info("raw: "+ raw);
            logger.info("Raw class: " + raw.getClass().getSimpleName());
            var stdin = new String(raw, "UTF8");
            var JSONArray = org.json.JSONArray;
            var JSONObject = org.json.JSONObject;
            var Iterator = java.util.Iterator;

            var json = JSON.parse(stdin);//new JSONObject(stdin);

            //   var stdin = fromHex(raw);//new String(decoder.decode(raw));
            logger.info("JSON: " + stdin);

            var children = json;//doc.getFirstFieldValue("_childDocuments_"); // _childDocuments

            var out_array = [];
            if (children !== null) {
                // result = JSON.stringify(result);//mapper.writerWithDefaultPrettyPrinter().writeValueAsString(children);
                // logger.info("Children: " + children);
                for (var i = 0; i < children.length; i++) {
                    var item = children[i];

                    // YYYY-MM-DDTHH:MM:SSZ
                    // 2019-02-15T21:38:19+00:00
                    var pattern = "YYYY-MM-DD'T'HH:MM:SS";
                    var simpleDateFormat = new SimpleDateFormat(pattern);
                    var date = simpleDateFormat.format(new java.util.Date());
                    date += "+00:00";
                    item.params.timestamp = date;
                    item.params.att_custom_info = "This is custom information";
                    out_array.push(item);


                    /* var param = {};
                     for (var key in item) {
                     if (item.hasOwnProperty(key)) {
                     logger.info(key + " -> " + item[key]);
                     param[key] = item["key"];
                     }
                     }*/

                }

                // now send documents to the signals API
                var client = getBasicAuthHttpClient();
                var HttpPost = org.apache.http.client.methods.HttpPost;
                var url = new String("http://localhost:8764/api/apollo/signals/_test_?commit=true");
                // create the HttpPost
                var request = new HttpPost(url);
                request.setEntity(new org.apache.http.entity.StringEntity(JSON.stringify(out_array)));
                request.addHeader("Content-Type", "application/json");
                // send the request
                var response = client.execute(request);

                logger.info("RESPONSE: " + response);

            }
        } catch (ex) {
            logger.error(ex.getLocalizedMessage());
        }
        logger.info("RETURN BRANCH 1");

        return doc;
    } else {
        logger.info("Doc ID was null");
        logger.info("RETURN BRANCH 2");
        return doc;
    }
    logger.info("RETURN BRANCH 3");
    return doc;
}


var parseSignalDocs = function (doc) {
    if (doc !== null && doc.getFirstFieldValue("_raw_content_") !== null) {
        // logger.info("PARSING NESTED DOCUMENTS...");
        // logger.info("*** RAW: " + doc.getFirstFieldValue("_raw_content_"));
        var String = java.lang.String;
        var e = java.lang.Exception;
        var base64 = java.util.Base64;
        var String = java.lang.String;

        logger.info(" ** BEGIN parSING ** ");

        try {
            var raw = doc.getFirstFieldValue("_raw_content_");
            logger.info("Raw class: " + raw.getClass().getSimpleName());
            var stdin = new String(raw, "UTF8");
            logger.info("** STDIN ** " + stdin);

            var children = JSON.parse(stdin);
            var out_array = [];
            if (children !== null) {
                for (var i = 0; i < children.length; i++) {
                    var item = children[i];
                    logger.info(" ** QUERY ** " + item.params.query);
                    var pattern = "YYYY-MM-DD'T'HH:MM:SS";
                    var simpleDateFormat = new java.text.SimpleDateFormat(pattern);
                    var date = simpleDateFormat.format(new java.util.Date());
                    date += "+00:00";
                    item.params.timestamp = date;
                    item.params.att_custom_info = "This is custom information";
                    logger.info("Timestamp: " + item.params.timestamp);
                    out_array.push(item);

                }

                // now submit the signals to the api
                var client = getBasicAuthHttpClient();
                var HttpPost = org.apache.http.client.methods.HttpPost;
                var url = new String("http://localhost:8764/api/apollo/signals/_test_?commit=true");
                // create the HttpPost
                var request = new HttpPost(url);
                request.setEntity(new org.apache.http.entity.StringEntity(JSON.stringify(out_array)));
                request.addHeader("Content-Type", "application/json");
                // send the request
                var response = client.execute(request);

                logger.info("RESPONSE: " + response);

            }


        } catch (e) {
            logger.error(" **** ERRROR **** " + e.toString());
        }
    }


    function getBasicAuthHttpClient() {
        logger.info(" ** GET AUTH CLIENT ** ");
        // var client = {};
        var System = java.lang.System;
        var client = org.apache.http.client.HttpClient;
        var httpdKey = "authd_http_client";
        var HttpPost = org.apache.http.client.methods.HttpPost;
        if (System.getProperties().get(httpdKey) === null) { // only init once
            var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;

            var user = "admin";
            var pwd = "Ixion1964";
            var fusionUrl = "http://localhost:8764";

          //  logger.info("User: " + user + " pwd: " + pwd + " fusion: " + fusionUrl);

            var authJson = "{\"username\":\"" + user + "\", \"password\":\"" + pwd + "\"}";
            var authUrl = fusionUrl + "/api/session?realmName=native";


            var AuthScope = org.apache.http.auth.AuthScope;
            var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
            var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;

            var provider = new BasicCredentialsProvider();

            var credentials = new UsernamePasswordCredentials(user, pwd);
            provider.setCredentials(AuthScope.ANY, credentials);

            client = HttpClientBuilder.create()
                    .setDefaultCredentialsProvider(provider)
                    .build();



            System.getProperties().put(httpdKey, client);

        } else {
            client = System.getProperties().get(httpdKey);
        }

        // refresh the session
        var request = new HttpPost(authUrl);
        var params = new org.apache.http.entity.StringEntity(authJson);
        request.addHeader("content-type", "application/json");
        request.setEntity(params);
        var response = client.execute(request);

        logger.info(" ** RETURN  AUTH CLIENT ** " + client.getClass().getSimpleName());
        return client;

    }


    return doc;
}

