
userHasAccess();


function userHasAccess() {
    var JSONArray = org.json.JSONArray;
    var JSONObject = org.json.JSONObject;
    var e = java.lang.Exception;
    var String = java.lang.String;
    var target = "query-pipelines/" + request.getParams().getFirst("lw.pipelineId") + "/collections";
    var hasPermission = false;
    var api = "http://localhost:8764/api/roles";
    try {
        if (request.getHeaders().get("Fusion-User-Role") !== null) {

            var role = request.getHeaders().get("Fusion-User-Role").get(0);
            var content = getUrlRequestContent(api);
            var json = new JSONArray(content);
            var obj, perm, perms, methods, path;
            if (json !== null) {
                obj = getUserRole(json, role);
                if (obj !== null) {

                    perms = obj.getJSONArray("permissions");
                    for (var j = 0; j < perms.length(); j++) {
                        perm = perms.getJSONObject(j);
                        methods = perm.getJSONArray("methods");
                        path = perm.getString("path");
                        logger.info("Check Path: " + path);
                        if (methods.toString().contains("GET")) {
                            if (path.contains(target)
                                    || path.equals("/**")) { // user has permission if any are true

                                hasPermission = true;
                                break;
                            }
                        }
                    }

                } else {

                    throw new Exception("Invalid Role:  " + role);
                }
            } else {

                throw new Exception("No roles found. ");
            }

        } else {

            throw new Exception("No role in header. ");
        }

        if (!hasPermission) {
            logger.warn("403 UNAUTHORIZED ACCESS...");
            throw new Exception("403: Unauthorized. ");
        } else {
            logger.info("User has permission...");
        }

    } catch (e) {
        logger.error(e);
    }

    return hasPermission;

}


function getUrlRequestContent(url) {
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var userAgent = org.apache.http.HttpHeaders.USER_AGENT;
    var HttpResponse = org.apache.http.HttpResponse;
    var HttpClient = org.apache.http.client.HttpClient;
    var HttpGet = org.apache.http.client.methods.HttpGet;
    var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
    var StringBuffer = java.lang.StringBuffer;
    var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
    var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;
    var AuthScope = org.apache.http.auth.AuthScope;
    var String = java.lang.String;
    var e = java.lang.Exception;
    result = new StringBuffer();
    try {

        var provider = new BasicCredentialsProvider();
        var credentials = new UsernamePasswordCredentials("admin", "Ixion1964");
        provider.setCredentials(AuthScope.ANY, credentials);
        var client = HttpClientBuilder.create().setDefaultCredentialsProvider(provider).build();
        var request = new HttpGet(url);
        request.addHeader("User-Agent", userAgent);
        var response = client.execute(request);
        logger.info("RESPONSE Code : " + response.getStatusLine().getStatusCode());
        var rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
        var result = new StringBuffer();
        var line = "";
        while ((line = rd.readLine()) !== null) {
            result.append(line);
        }
    } catch (e) {
        logger.error(e);
    }
    logger.info(result);
    return result.toString();
}
