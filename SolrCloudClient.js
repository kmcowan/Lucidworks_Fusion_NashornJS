

 var solrCloudClient = function (doc) {
        var client = org.apache.http.client.HttpClient;
        var cloudServer = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
        var ClientConnectionManager = org.apache.http.conn.ClientConnectionManager;
        var PoolingClientConnectionManager = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var CloudSolrClient = org.apache.solr.client.solrj.impl.CloudSolrClient;
        var cm = org.apache.http.impl.conn.PoolingClientConnectionManager;
        var String = java.lang.String;
        var pdoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;

        var ZOOKEEPER_URL = new String("localhost:9983");
        var DEFAULT_COLLECTION = new String("cityofsacramento");
        var server = ZOOKEEPER_URL;
        var collection = DEFAULT_COLLECTION;
        var docList = java.util.ArrayList;
        var inputDoc = org.apache.solr.common.SolrInputDocument;
        var pingResp = org.apache.solr.client.solrj.response.SolrPingResponse;
        var res = org.apache.solr.client.solrj.response.UpdateResponse;
        var SolrInputDocument = org.apache.solr.common.SolrInputDocument;
        var UUID = java.util.UUID;


        try {
            // PoolingClientConnectionManager cm = new PoolingClientConnectionManager();
            cm = new PoolingClientConnectionManager();
            client = new DefaultHttpClient(cm);
            cloudServer = new CloudSolrClient(server, client);
            cloudServer.setDefaultCollection(collection);
            logger.info("CLOUD SERVER INIT OK...");
            docList = new java.util.ArrayList();
            pingResp = cloudServer.ping();
            logger.info(pingResp);
            docList = new java.util.ArrayList();
            for each(pdoc in doc) {
                inputDoc = new SolrInputDocument();
                inputDoc.addField("id", UUID.randomUUID().toString());
                inputDoc.addField("q_txt", pdoc.getFirstFieldValue("extracted_text"));
                docList.add(inputDoc);
            }

            logger.info(" DO SUBMIT OF " + docList.size() + " DOCUMENTS TO SOLR **** ");
            cloudServer.add(docList);
            res = cloudServer.commit();
            logger.info(res);


        } catch (ex) {
            logger.error(ex);
        }

        return doc;
    };
