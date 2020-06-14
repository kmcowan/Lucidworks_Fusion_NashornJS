
/* 
 * A Simple JavaScript stage that allows you to leverage embedded spellcheck. 
 */

var spellcheck = function(request) {
    var IOUtils = org.apache.commons.io.IOUtils;
    var JSONObject = org.json.JSONObject;
    var JSONArray = org.json.JSONArray;
    var URL = java.net.URL;
    var String = java.lang.String;
    var Base64 = java.util.Base64;

    var host = "http://localhost:8764";
    var collection = "[COLLECTION_NAME]";
    var user = "[USER_NAME]";
    var pwd = "[USER_PWD]";

    var checkurl = host + "/api/apollo/solr/" + collection + "/spell/?q=";
    var query = request.getFirstFieldValue("q");

    var auth = new String(user + ":" + pwd);
    var encstr = new String(Base64.getEncoder().encodeToString(auth.getBytes()));

    var spellurl = checkurl + query;
    var url = new URL(spellurl);


    var connection = url.openConnection();
    connection.setRequestProperty("Authorization", "Basic " + encstr);
    connection.connect();
    var jsonstr = IOUtils.toString(connection.getInputStream());
    var json = JSON.parse(jsonstr);
    if (json && json.spellcheck && json.spellcheck.suggestions.length > 0) {
        var suggestions = json.spellcheck.suggestions[1].suggestion;
        if (suggestions && suggestions.length > 0) {
            var newquery = query;
            for (var i = 0; i < suggestions.length; i++) {
                newquery += " OR " + suggestions[i].word;
            }
            request.removeParam("q");
            request.putSingleParam("q", newquery);
        }
    }
    return request;
}
