/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// splits a PDF into 1-doc-per-page using PDFBox, returning a List<PipelineDocument>
var pdfparser = function (doc) {
    var docs = doc; // return the original doc if splitting somehow fails
    if (null != doc.getContent()) {
        var content = new java.io.ByteArrayInputStream(doc.getContent());
        var pdf = null;
        var pdfPages = null;
        try {
            // parse the PDF
            pdf = org.apache.pdfbox.pdmodel.PDDocument.load(content);
            if (null !== pdf) {
                // split the PDF by page
                pdfPages = (new org.apache.pdfbox.multipdf.Splitter()).split(pdf);
                if (null !== pdfPages && !pdfPages.isEmpty()) {
                    logger.info("***EVAN Split PDF into " + pdfPages.size() + " pages: [ " + doc.getId() + " ]");
                    docs = new java.util.ArrayList(pdfPages.size());
                    var buf = new java.io.ByteArrayOutputStream();
                    for (var i = 0; i < 2; i++) {
                        // copy 'doc' to get all of the parent PDF doc fields ('id' and '_raw_content_'
                        // are changed to contain values for just the single page)
                        var pdfPageDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument(doc);
                        pdfPageDoc.setId(doc.getId() + "#page=" + java.lang.Integer.toString(i + 1));
                        // serialize the single PDF page
                        pdfPages.get(i).save(buf);
                        // save the single PDF page to _raw_content_
                        pdfPageDoc.setContent(buf.toByteArray());
                        pdfPageDoc.setField('pageX_i', java.lang.Integer.toString(i + 1));
                        pdfPageDoc.setField('pagenameX', doc.getFirstFieldValue('nameX') + ' - page ' + java.lang.Integer.toString(i + 1));
                        pdfPageDoc.setField('pageTotalX_i', pdfPages.size());
                        pdfPageDoc.setField('urlX', pdfPageDoc.getFirstFieldValue('urlX') + "#page=" + java.lang.Integer.toString(i + 1));

                        doPost(pdfPageDoc);
                        //docs.add(pdfPageDoc);
                        buf.reset();
                    }
                }
            }
        } catch (err) {
            var msg = "***EVAN to split PDF: doc=[ " + doc.getId() + " ]; error='" + err + "'";
            doc.addField("_failure_ss", msg);
            logger.error(msg);
        } finally {
            // clean up PDFBox documents, they have to be close()'d
            if (null !== pdf) {
                pdf.close();
            }
            if (null !== pdfPages) {
                for (var j = 0; j < pdfPages.size(); j++) {
                    var pdfPage = pdfPages.get(j);
                    if (null !== pdfPage) {
                        pdfPage.close();
                    }
                }
            }
        }
    }
    return docs;
}

//Sends doc down index pipeline
var doPost = function (doc) {
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var userAgent = org.apache.http.HttpHeaders.USER_AGENT;
    var HttpResponse = org.apache.http.HttpResponse;
    var HttpClient = org.apache.http.client.HttpClient;
    var HttpPost = org.apache.http.client.methods.HttpPost;
    var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;
    var StringBuffer = java.lang.StringBuffer;
    var String = java.lang.String;
    var e = java.lang.Exception;
    var UrlEncodedFormEntity = org.apache.http.client.entity.UrlEncodedFormEntity;
    var StringEntity = org.apache.http.entity.StringEntity;
    var JSONObject = org.json.JSONObject;
    var JSONArray = org.json.JSONArray;
    var HttpHeaders = org.apache.http.HttpHeaders;
    var Header = org.apache.http.Header;
    var BasicHeader = org.apache.http.message.BasicHeader;
    var ArrayList = java.util.ArrayList;


    result = new StringBuffer();
    try {
        var url = new String("http://localhost:8765/api/v1/index-pipelines/sis_page/collections/sis_docs/index");
        var header = new BasicHeader(HttpHeaders.CONTENT_TYPE, "application/vnd.lucidworks-document");
        var headers = new ArrayList();
        headers.add(header);
        var client = HttpClientBuilder.create().setDefaultHeaders(headers).build();
        var jsonstr = '[{"id": "myDoc1","fields": [{"name":"pagenameX", "value": "My first document"},{"name":"body", "value": "This is a simple document."}]}, {"id": "myDoc2","fields": [{"name":"pagenameX","value": "My second document"},{"name":"body", "value": "This is another simple document."}]}]';


        var request = new HttpPost(url);
        var obj = new JSONObject();
        obj.put("id", doc.getId());
        var fields = new JSONArray();
        var docfields = doc.getFieldNames();
        //  for(var f=0; f<docfields.size(); f++){
        for (var str in docfields) {
            var pipeFields = doc.getFields(str);
            var jsonfield = new JSONObject();
            for (var f = 0; f < pipeFields.size(); f++) {
                var field = pipeFields.get(f);

                jsonfield.put("name", field.getName());
                jsonfield.put("value", field.getValue());
                fields.put(jsonfield);
            }
        }
        obj.put("fields", fields);
        var arr = new JSONArray();
        arr.put(obj);
        request.setEntity(new StringEntity(arr.toString()));
        // logger.info("***DOC stringify: " +jsonstr);
        // request.setEntity(new StringEntity(JSON.stringify(doc)));
        // logger.info("***DOC stringify: " + JSON.stringify(doc));

        // add request header
        // request.setHeader("Content-Type","application/vnd.lucidworks-document");
        var response = client.execute(request);

        logger.info("RESPONSE: " + response);
    } catch (e) {
        logger.error(e);
    }
    return;
}