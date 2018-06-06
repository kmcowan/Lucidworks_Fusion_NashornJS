
// https://cityofsacramento.custhelp.com/ci/opensearch/feed/startIndex/0/count/1000
// 
// https://recollect.net/api/areas/Sacramento/services/340/pages.xml?locale=en-US&type=material
// 
/*  <item>
 <link>http://cityofsacramento.custhelp.com/app/answers/detail/a_id/349/session/L3RpbWUvMTQ4MzA1MjcwNy9zaWQvZlVkU09mZWtlQ0ZmNnZMdlBQNWhEbnZ2ZVJGX194TExsXzhDcFRKanUyZHNvN0VzbnJMMGlWV0xQYzNsdE12M1M0RHklN0VGMlBLVE4lN0VMWHB0ZEZET1piQ0VLcU1nV1Jvc1Y4a18xRTFqaVB6U0RSSnZ1ZnZjNVpEQSUyMSUyMQ==</link>
 <title>Household Junk - Off-Season</title>
 <pubDate>2016-11-29T13:57:54-08:00</pubDate>
 <relevance:score>100</relevance:score>
 <related:field name="Answer ID">349</related:field>
 </item>
 /*/
// 
// Rewrites https to http
function fusion_snippets() {
    var rewriteHttp =
            function (doc) {
                if (doc.getId() != null) {
                    var newUrl = doc.getId();
                    if (newUrl.match('^https://')) {
                        newUrl = newUrl.replace("https://", "http://")
                    }
                    doc.setId(newUrl);
                } else {
                    doc.addField('url_rewrite', "NO URL PROVIDED");
                }
                return doc;
            }

// jsoup extract html text
    var extractJsoup =
            function (doc) {
                if (doc.getId() != null) {
                    logger.info("BEGIN TEXT EXTRACTION FOR: " + doc.getId());

                    try {
                        var String = java.lang.String;
                        var jsoup = org.jsoup.Jsoup;
                        var jdoc = org.jsoup.nodes.Document;
                        var newHtml = java.lang.String;
                        var elements = org.jsoup.select.Elements;
                        var ele = org.jsoup.nodes.Element;

                        var html = new String(doc.getFirstFieldValue("_raw_content_"));
                        // logger.info("BODY: "+html);
                        jdoc = jsoup.parse(html);
                        newHtml = new String("");
                        // from here you can work with the jsoup document api
                        elements = jdoc.select("p");
                        logger.info("ITERATE OVER ELEMENTS");
                        // then parse elements and pull just the text
                        for each (ele in elements) {
                            if (ele != null) {
                                if (ele.ownText() != null) {
                                    newHtml += ele.ownText();
                                }
                            }
                        }
                        if (newHtml != null) {
                            logger.info("EXTRACTED TEXT: " + newHtml);
                            doc.addField('extracted_text', newHtml);
                        }
                    } catch (err) {
                        logger.error(err);
                    }
                } else {
                    // logger.info("Document URL was NUll"); 
                }
                return doc;
            }

// Thread Runner
    var threadRunner =
            function (doc) {
                logger.info("BEGIN THREAD TEST ****** ");
                try {
                    var Runnable = Java.type('java.lang.Runnable');
                    var Printer = Java.extend(Runnable, {
                        run: function () {
                            logger.info('printed from a separate thread');
                        }
                    });

                    var Thread = Java.type('java.lang.Thread');
                    new Thread(new Printer()).start();

                    new Thread(function () {
                        logger.info('printed from another thread');
                    }).start();
                } catch (err) {
                    logger.error(err);
                }
                return doc;
            }


// Apache HttpClient
    var apacheHttpClient =
            function (doc) {
                var entity = org.apache.http.HttpEntity;
                var response = org.apache.http.client.methods.CloseableHttpResponse;
                var httpGet = org.apache.http.client.methods.HttpGet;

                var httpclient = org.apache.http.impl.client.CloseableHttpClient;
                var client = org.apache.http.impl.client.HttpClient;
                var instream = java.io.InputStream;
                var ioex = java.io.IOException;

                httpclient = org.apache.http.impl.client.HttpClients.createDefault();
                httpGet = new HttpGet("http://localhost:8764/api/apollo/connectors/jobs/google_news");


                try {
                    logger.info("Response: " + response1.getStatusLine());
                    response = httpclient.execute(httpGet);
                    if (entity != null) {
                        instream = entity.getContent();
                        try {
                            instream.read();
                            // do something useful with the response
                        } catch (ioex) {
                            // In case of an IOException the connection will be released
                            // back to the connection manager automatically
                            logger.error(ioex.getLocalizedMessage());
                        } finally {
                            // Closing the input stream will trigger connection release
                            instream.close();
                        }
                    }
                } finally {
                    response1.close();
                }
                return doc;
            }

//pdf content reader
    var pdfContentReader =
            function (doc) {
                var html = java.lang.String;
                var html = new String(doc.getFirstFieldValue("_raw_content_"));
                var exp = java.io.Exception;
                try {
                    if (doc.id.indexOf(".pdf") > -1) {
                        var file = java.io.File;
                        var fileInputStream = java.io.InputStreamReader;
                        var reader = java.io.BufferedReader;
                        var url = java.net.URL;
                        var ioex = java.io.IOException;
                        var strContent = java.lang.String;

                        var tikaex = org.apache.tika.exception.TikaException;
                        var metadata = org.apache.tika.metadata.Metadata;
                        var parserContext = org.apache.tika.parser.ParseContext;
                        var pdfparser = org.apache.tika.parser.pdf.PDFParser;
                        var content = org.apache.tika.sax.BodyContentHandler;

                        content = new org.apache.tika.sax.BodyContentHandler();
                        metadata = new org.apache.tika.metadata.Metadata();
                        url = new java.io.URL(doc.id);
                        fileInputStream = new java.io.InputStreamReader(url.openStream());
                        reader = new java.ioBufferedReader(fileInputStream);
                        parserContext = new org.apache.tika.parser.ParseContext();
                        pdfparser = new PDFParser();
                        pdfparser.parse(fileInputStream, content, metadata, parserContext);
                        strContent = handler.toString();

                        logger.info("PDF Content: " + strContent);
                    } else {
                        logger.info("Document is NOT PDF...");
                    }
                } catch (exp) {
                    logger.error(exp);
                }
                return doc;
            }


// dom4j xml parser
// NOTE: missing dependencies in solr/fusion
    var dom4jReader =
            function (doc) {
                var xmldoc = org.dom4j.Document;
                var DocumentHelper = org.dom4j.DocumentHelper;
                var root = org.dom4j.Element;
                var ele = org.dom4j.Element;
                var eles = java.util.List;
                var iter = java.util.Iterator;
                var stdout = java.lang.String;
                var xurl = java.lang.String;
                var dex = org.dom4j.DocumentException;
                logger.info("PARSE XML ...");
                try {
                    stdout = new java.lang.String();
                    xmldoc = DocumentHelper.parseText(doc.getFirstFieldValue("_raw_content_"));
                    if (xmldoc != null) {
                        root = xmldoc.getRootElement();
                        eles = root.elements("url");
                        for each(ele in eles) {
                            xurl = ele.element("loc").getText();
                            logger.info("Extract URL: " + xurl);
                            stdout += xurl;

                        }

                        doc.setField("extracted_text", stdout);
                    }

                } catch (dex) {
                    logger.error(dex);
                }

                return doc;
            }


// tika xml parser
    var tikaParser =
            function (doc) {
                var file = java.io.File;
                var iostream = java.io.FileInputStream;
                var ioex = java.io.IOException;

                var tikaex = org.apache.tika.exception.TikaException;
                var metadata = org.apache.tika.metadata.Metadata;
                var parseContext = org.apache.tika.parser.ParseContext;
                var xmlparser = org.apache.tika.parser.xml.XMLParser;
                var content = org.apache.tika.sax.BodyContentHandler;
                try {
                    xmlparser = new org.apache.tika.parser.xml.XMLParser();
                } catch (ioex) {
                    logger.error(ioex);
                }

                return doc;
            }

// w3c xml parser
    var wc3Parser =
            function (doc) {

                var factory = javax.xml.parsers.DocumentBuilderFactory;
                var builder = javax.xml.parsers.DocumentBuilder;
                var xmldoc = org.w3c.dom.Document;
                var iostream = java.io.ByteArrayInputStream;
                var ex = java.lang.Exception;
                var xmlstr = java.lang.String;
                var root = org.w3c.Node;
                var urlElements = org.w3c.NodeList;
                var locElements = org.w3c.NodeList;
                var locEle = org.w3c.Node;
                var urlEle = org.w3c.Node;
                var output = new Array();
                var contentType = java.lang.String;

                contentType = doc.getFirstFieldValue("Content_Type");
                logger.info("Content Type: " + contentType);
                //  if (contentType != null && 
                //          (contentType == "text/xml" || contentType == "application/xml" || doc.getId().contains(".xml"))) {


                logger.info("PARSE XML...");
                logger.info(doc.getId());
                try {
                    xmlstr = doc.getFirstFieldValue("body");
                    factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();

                    factory.setNamespaceAware(true);
                    builder = factory.newDocumentBuilder();
                    if (xmlstr != null && xmlstr.getBytes) {
                        iostream = new java.io.ByteArrayInputStream(xmlstr.getBytes());
                        xmldoc = builder.parse(iostream);
                        if (xmldoc != null) {
                            logger.info("XML PARSE OK **** ");
                            output = new java.lang.String();
                            root = xmldoc.getDocumentElement();
                            //  logger.info(root);
                            urlElements = xmldoc.getElementsByTagName("url");//root.childNodes;
                            logger.info("Found: " + urlElements.length + " elements");
                            logger.info(urlElements);
                            var count = 0;
                            for (var i = 0; i < urlElements.length; i++) {

                                urlEle = urlElements.item(i);

                                if (urlEle != null) {
                                    logger.info(urlEle);

                                    logger.info("Check Node: " + urlEle.nodeName + " for children");
                                    if (urlEle.childNodes && urlEle.childNodes.length > 0) {
                                        logger.info(urlEle.childNodes);
                                        logger.info("Node: " + urlEle.nodeName + " has " + urlEle.childNodes.length + " children");
                                        for (var j = 0; j < urlEle.childNodes.length; j++) {
                                            locEle = urlEle.childNodes.item(j);

                                            logger.info(locEle);
                                            if (locEle != null && locEle.nodeName == "loc") {
                                                logger.info("Found a NODE: " + locEle.nodeName);
                                                // break;
                                                logger.info("APPEND: " + locEle.getTextContent());
                                                output[count] = locEle.getTextContent();
                                                count++;

                                            } else {
                                                //logger.warn("Loc Ele was NULL");
                                            }

                                        } // end f0r


                                    } else {

                                        logger.warn("Node: " + urlEle.nodeName + " has no children");
                                    }
                                } else {
                                    logger.warn("Element was NULL");
                                }
                            }

                        } else {
                            logger.warn("XML DOC WAS NULL! ");
                            logger.info(xmlstr);
                        }
                    } else {
                        logger.warn("RAW CONTENT WAS NULL");
                        logger.info(xmlstr);
                    }
                } catch (ex) {
                    logger.error(ex);
                } finally {

                    doc.setField("body.links.targetUri", output);
                }

                // } else {
                //     logger.warn("CONTENT TYPE NOT FOUND.  UNABLE TO PROCESS. ");
                //      doc.setField("body.links.targetUri", output);
                //  }

                return doc;
            };



// jsoup xml parser
    var jsoupXmlParser = function (doc) {
        var Jsoup = org.jsoup.Jsoup;
        var jdoc = org.jsoup.nodes.Document;
        var ex = java.lang.Exception;
        var Parser = org.jsoup.parser.Parser;
        var element = org.jsoup.Element;
        var xmlstr = java.lang.String;

        try {
            xmlstr = doc.getFirstFieldValue("body");
            jdoc = Jsoup.parse(xmlstr, "", Parser.xmlParser());
            for each(element in jdoc.select("loc")) {
                logger.info("Parsed URL: " + element.ownText());
            }
        } catch (ex) {
            logger.error(ex);
        }
        return doc;
    };


// solr cloud client impl
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



    var httpClient2 = function (doc) {
        var String = java.lang.String;
        var entity = org.apache.http.HttpEntity;
        var response = org.apache.http.client.methods.CloseableHttpResponse;
        var httpGet = org.apache.http.client.methods.HttpGet;

        var httpclient = org.apache.http.impl.client.CloseableHttpClient;
        var client = org.apache.http.impl.client.HttpClient
        var instream = java.io.InputStream;
        var ex = java.io.IOException;
        var ex0 = java.lang.Exception;
        var content = java.lang.String;
        var ioutil = org.apache.commons.io.IOUtils;
        var httpClients = org.apache.http.impl.client.HttpClients;
        var sys = java.lang.System;
        var entityUtil = org.apache.http.util.EntityUtils;

        httpclient = httpClients.createDefault();
        httpGet = new org.apache.http.client.methods.HttpGet("http://www.google.com");//http://localhost:8764/api/apollo/connectors/jobs/google_news

        try {

            response = httpclient.execute(httpGet);
            logger.info("Response: " + response.getStatusLine());
            entity = response.getEntity();

            if (entity != null) {

                try {
                    // parse response as string
                    logger.info(new String(entityUtil.toByteArray(entity)));
                    // do something useful with the response
                } catch (ex) {
                    // In case of an IOException the connection will be released
                    // back to the connection manager automatically
                    logger.error(ex);
                }
            } else {
                logger.warn("ENTITY WAS NULL");
            }
        } catch (ex0) {
            logger.error(ex0);
        }

        return doc;
    }


    var tikaPDFParser = function (doc) {
        var File = java.io.File;
        var FileInputStream = java.io.FileInputStream;
        var IOException = java.io.IOException;

        var TikaException = org.apache.tika.exception.TikaException;
        var Metadata = org.apache.tika.metadata.Metadata;
        var ParseContext = org.apache.tika.parser.ParseContext;
        var PDFParser = org.apache.tika.parser.pdf.PDFParser;
        var BodyContentHandler = org.apache.tika.sax.BodyContentHandler;

        var SAXException = org.xml.sax.SAXException;
        var metadataNames = Java.type("java.lang.String[]");
        var name = java.lang.String;




        var handler = new BodyContentHandler();
        var metadata = new Metadata();
        var inputstream = new FileInputStream(new File("Example.pdf"));
        var pcontext = new ParseContext();

        //parsing the document using PDF parser
        var pdfparser = new PDFParser();
        pdfparser.parse(inputstream, handler, metadata, pcontext);

        //getting the content of the document
        logger.info("Contents of the PDF :" + handler.toString());

        //getting metadata of the document
        logger.info("Metadata of the PDF:");
        metadataNames = metadata.names();

        for each(name in metadataNames) {
            logger.info(name + " : " + metadata.get(name));
        }


        return doc;
    };

    var tikaXlsxParser = function (doc) {

        var File = java.io.File;
        var FileInputStream = java.io.FileInputStream;
        var Metadata = org.apache.tika.metadata.Metadata;
        var ParseContext = org.apache.tika.parser.ParseContext;
        var OOXMLParser = org.apache.tika.parser.microsoft.ooxml.OOXMLParser;
        var BodyContentHandler = org.apache.tika.sax.BodyContentHandler;
        var metadataNames = Java.type("java.lang.String[]");
        var String = java.lang.String;
        var e = java.lang.Exception;
        var fileInputStream = java.io.FileInputStream;
        var url = java.net.URL;

        try {

            //detecting the file type
            var handler = new BodyContentHandler(-1);
            url = new URL(doc.getId());
            var metadata = new Metadata();
            // var inputstream = new FileInputStream(new File("/Users/kevin/Dropbox/PBS_SF424494_1.xlsx"));
            var inputstream = new java.io.InputStreamReader(url.openStream());
            var pcontext = new ParseContext();


            //OOXml parser
            var msofficeparser = new OOXMLParser();

            msofficeparser.parse(inputstream, handler, metadata, pcontext);
            // System.out.println("Contents of the document:" + handler.toString());
            logger.info("Metadata of the document:");
            metadataNames = metadata.names();
            var name = new String();
            for (name in metadataNames) {
                logger.info(name + ": " + metadata.get(name));
            }
        } catch (e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        }

        return doc;
    }

    var documentListBuilder = function (doc) {
        var doclist = java.util.ArrayList;
        var Jsoup = org.jsoup.Jsoup;
        var jdoc = org.jsoup.nodes.Document;
        var ex = java.lang.Exception;
        var Parser = org.jsoup.parser.Parser;
        var element = org.jsoup.Element;
        var pipelineDoc = com.lucidworks.apollo.common.pipeline.PipelineDocument;
        var xmlstr = java.lang.String;
        var docurl = java.lang.String;
        var elements = org.jsoup.select.Elements;
        var ele = org.jsoup.Element;
        var outdocs = java.util.ArrayList;
        doclist = new java.util.ArrayList();
        outdocs = new java.util.ArrayList();
        var elementsToExtract = ["p","span","div","a"];
        var targetElement = "loc";
        
        try {


            xmlstr = doc.getFirstFieldValue("body");
            jdoc = Jsoup.parse(xmlstr, "", Parser.xmlParser());
            for each(element in jdoc.select(targetElement)) {
                docurl = element.ownText();
                if (docurl !== null && docurl !== "") {
                    logger.info("Parsed URL: " + element.ownText());
                    pipelineDoc = new com.lucidworks.apollo.common.pipeline.PipelineDocument(element.ownText());
                    doclist.add(pipelineDoc);
                }

            }

        } catch (ex) {
            logger.error(ex);
        }

        try {
            for each(pipelineDoc in doclist) {
                docurl = pipelineDoc.getId();
                jdoc = Jsoup.connect(docurl).get();
                extractedText = new java.lang.String();
                if (jdoc !== null) {
                    logger.info("FOUND a JSoup document for url  " + docurl);
                    var extractedText = new java.lang.String();
                    var metaDataText = new java.lang.String();
                    // get the title
                    ele = jdoc.select("title").first();
                    if(ele !== null && ele.ownText){
                      pipelineDoc.addField("title", ele.ownText());
                    }
                    
                    // get the meta 
                     ele = jdoc.select("meta[keywords]").first();
                     if(ele !== null && ele.ownText){
                        pipelineDoc.addField("meta.keywords", ele.ownText());
                    }
                    
                    ele = jdoc.select("meta[description]").first();
                     if(ele !== null && ele.ownText){
                        pipelineDoc.addField("meta.description", ele.ownText());
                    }
                    
                    for each(var val in elementsToExtract){
                    elements = jdoc.select(val);
                    logger.info("ITERATE OVER ELEMENTS");
                    // then parse elements and pull just the text
                    for each (ele in elements) {
                        if (ele !== null) {
                            if (ele.ownText() !== null) {
                                extractedText += " "+ ele.ownText();
                            }
                        }
                    }
                  }
                    pipelineDoc.addField('body', extractedText);
                    logger.info("Extracted: " + extractedText);
                    outdocs.add(pipelineDoc);

                } else {
                    logger.warn("Jsoup Document was NULL **** ");
                }
            }
        } catch (ex) {
            logger.error(ex);
        }

        return outdocs;
    }

}
// http://www.javaworld.com/article/3147370/open-source-tools/move-over-memcached-and-redis-here-comes-netflixs-hollow.html?google_editors_picks=true






var objMapper = function (doc) {
    logger.info("PRINT PIPELINE DOC");
    logger.info(doc);
    if (doc !== null && doc.getId() !== null) {

        // class import declaration
        var ObjectMapper = com.fasterxml.jackson.databind.ObjectMapper;
        var ArrayList = java.util.ArrayList;
        //  var Iterator = java.util.Iterator;
        var Map = java.util.Map;
        var StringUtils = org.apache.commons.lang3.StringUtils;
        var String = java.lang.String;
        var e = java.lang.Exception;


        try {

            // local variable declaration
            var mapper = new ObjectMapper();
            var content = doc.getFirstFieldValue("body");
            if (content !== null) {
                var mapData = mapper.readValue(content, Map.class);
                if (mapData != null) {
                    logger.info("Read data OKY");
                    var result = mapData.get("result");
                    //    var iter = result.keySet().iterator();
                    var obj = java.lang.Object;
                    var key = java.lang.String;
                    var list = java.util.ArrayList;
                    //  while (iter.hasNext()) {
                    for each(var key in result.keySet()) {
                        //  key = iter.next();
                        obj = result.get(key);

                        if (obj instanceof String) {
                            logger.info("Key: " + key + " object: " + obj.getClass().getSimpleName() + " value: " + obj);
                            doc.addField(key, obj);
                        } else if (obj instanceof ArrayList) {
                            list = obj;
                            logger.info("Key: " + key + " object: " + obj.getClass().getSimpleName() + " value: " + StringUtils.join(list, ","));
                            doc.addField(key, StringUtils.join(list, ","));
                        }
                    }

                }

            } else {
                logger.info("Content was NULL! ");
            }

        } catch (e) {
            logger.error(e);
        }
    } else {
        logger.warn("PipelineDocument was NULL");
    }

    return doc;
};


//https://lucidworks.com/resources/getting-started/?mkt_tok=eyJpIjoiWVRjeE1XUXhabUV4TWpobSIsInQiOiI1cmk1cG53d3JnWSt6d3praFwvRTNZaGpWSHowbXVuNUNYbWl1RjFEc2oyR0tPU0QxT0F0bjhYN2hrcWJSNERmRDdMRTUwTkNvT2g4MFwva3FlUTZKV2lKWFY0WGJKa1NIQTdobFU5M01xdzI2U1d3XC9GYVhpUE5uRzZuUHNjb3hPZSJ9


var urlReader = function (doc) {
    var BufferedReader = java.io.BufferedReader;
    var InputStreamReader = java.io.InputStreamReader;
    var URL = java.net.URL;
    var String = java.lang.String;

    var e = java.langException;
    var stdout = "";

    try {
        var oracle = new URL(doc.getId());
        var isr = new InputStreamReader(oracle.openStream());
        var ins = new BufferedReader();

        var inputLine = "";
        while ((inputLine = ins.readLine()) !== null) {
            logger.info(inputLine);
            stdout += inputLine;
        }
        ins.close();
        doc.addField("body", stdout);
        doc.addField("_raw_content_", stdout);
    } catch (e) {
        logger.error(e);
    }
    return doc;
};

var removeField = function (doc){
    var e = java.lang.Exception;
    try{
        if(doc !== null){
            if(doc.hasField("TOTAL_PRICE")){
                doc = doc.removeFields("TOTAL_PRICE");
            }
        }
    }catch(e){
        logger.error(e);
    }
    return doc;
};