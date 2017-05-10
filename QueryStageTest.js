/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


logger.info("****** * BEGIN QUERY JS PIPELINE STAGE *********");
var e = java.lang.Exception;
var String = java.lang.String;
var ObjectMapper = com.fasterxml.jackson.databind.ObjectMapper;
var DocumentObjectBinder = org.apache.solr.client.solrj.beans.DocumentObjectBinder;
var SolrDocumentList = org.apache.solr.common.SolrDocumentList;
var SolrDocument = org.apache.solr.common.SolrDocument;
var List = java.util.List;


try {
    logger.info("****** * INSIDE TRY CATCH *********");
//var Gson = com.google.gson.Gson;
    //      var g = new Gson();

    if (response && response !== null) {
        logger.info("RESPONSE IS NOT NULL ****************");
        var mapper = new ObjectMapper();
        // var result = g.toJson(response);
        logger.info("********* ATTEMPT TO MAP RESULT  ****************");
        var result = mapper.writeValueAsString(response);

        logger.info("************ RESPONSE: ***************** " + result);
    } else {
        logger.warn("________X____ RESPONSE NULL ______X______");
    }
} catch (e) {
    logger.error(e);
}


