/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var checkHttpResponse = function (doc) {
    if (doc !== null && doc.getId() !== null) {
        var HttpURLConnection = java.net.HttpURLConnection;
        var URL = java.net.URL;
        var e = java.lang.Exception;
        try {
            var url = new URL("http://google.com");
            var connection = url.openConnection();
            connection.setRequestMethod("GET");
            connection.connect();

            var code = connection.getResponseCode();
            System.out.println("Response code of the object is " + code);
            if (code != 200 || code != 301) { // check for OK or Redirect
                doc.setId(null);
            }


        } catch (e) {
            logger.error(e);
        }
    }

    return doc;
}