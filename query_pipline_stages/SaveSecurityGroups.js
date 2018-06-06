/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var changeSec = function(request, response, ctx, collection, solrServer, solrServerFactory) {
    var SolrInputDocument = Java.type("org.apache.solr.common.SolrInputDocument");
    var UpdateResponse = Java.type("org.apache.solr.client.solrj.response.UpdateResponse");
    var JDate = Java.type("java.util.Date");


    if(ctx.get("user_security_groups") != null && request.hasParam("username")) {
        var user_security_groups = ctx.get("user_security_groups");
        var username = request.getParam("username")[0];

        logger.info("ldap groups from previous stage are: " + user_security_groups);

        //Create new Fusion document to store security groups
        var sideDoc = new SolrInputDocument();
        sideDoc.addField("id", username);
        for(var i=0; i<user_security_groups.length;i++){
            sideDoc.addField("user_security_groups_ss", user_security_groups[i]);
        }
        sideDoc.addField('refreshDate_dt',new JDate());
        var update_response = new UpdateResponse();
        var sideSolr = solrServerFactory.getSolrServer("ldap_cache");
        update_response = sideSolr.add(sideDoc);
        sideSolr.commit();

        //remove the entry from the context
        ctx.remove("user_security_groups");
    } else {
        logger.info("No new records to store in sidecar collection");
    }
    return request;
}