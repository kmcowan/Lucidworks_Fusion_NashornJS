/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var readHttpHeaders = function (doc) {
    if (doc !== null && doc.getId() !== null) {
        var HttpURLConnection = java.net.HttpURLConnection;
        var URL = java.net.URL;
        var Iterator = java.util.Iterator;
        var String = java.lang.String;
        var e = java.lang.Exception;
        try {
            var url = new URL(doc.getId());
            var conn = java.net.HttpURLConnection;

            conn = url.openConnection();
            conn.setDoOutput(true);
            conn.setDoInput(true);

            var status = conn.getResponseCode();
            var iter = conn.getHeaderFields().keySet().iterator();
            if (status == HttpURLConnection.HTTP_OK ||
                    status == HttpURLConnection.HTTP_MOVED_PERM) {
                var key, header = "";
                while (iter.hasNext()) {
                    key = iter.next();
                    header = conn.getHeaderField(key);
                    logger.info("Key: " + key + " header value: " + header);
                    doc.addField(key, header);

                }

            } else {
                logger.info("Staus: " + status);
            }
        } catch (e) {
            logger.error(e);
        }
    }
    return doc;
}