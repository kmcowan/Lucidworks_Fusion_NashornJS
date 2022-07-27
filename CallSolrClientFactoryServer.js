function (request, response, ctx, collection, solrServer, solrClientFactory) {
    // add your logic here
    var SolrQuery = org.apache.solr.client.solrj.SolrQuery;
    var ldapId = request.getFirstParam("ldapid");
    //ldapId = 't894727';
    logger.info("benjamin ldapid " + ldapId);
    logger.info("benjamin " + request.getClass().getName());

    var filterList = [];
    if( ldapId ){
        logger.info("benjamin starting");
        try {
            aSolrServer = solrClientFactory.getSolrServer("MAIN_UserProfiles");
            logger.info("benjamin got server");

            var q = new SolrQuery();
            q.setQuery("ldapid_s:" + ldapId);
            q.setFields("id,ldapid_s,rolelist_s,sitelist_s");
            q.setRows(1);
            var resp = aSolrServer.query(q);
            logger.info("benjamin got " + resp.toString());
            var docList = resp.getResults();
            logger.info("benjamin doclist type " + docList.getClass().getName());

            logger.info("benjamin doclist size " + docList.size());
            if( docList.size() > 0 ){
                logger.info("benjamin documents found " + docList.size());
                var doc = docList.get(0);
                logger.info("benjamin doc type " + doc.getClass().getName());

                var siteList = doc.getFirstValue("sitelist_s");

                if( siteList ) {
                    siteList = siteList.replaceAll(',',' ').trim();
                    request.addParam("fq","contenturl_en_siteid_ss:(" + siteList + ")");
                    filterList.push("contenturl_en_siteid_ss:(" + siteList + ")");
                }

                logger.info("benjamin siteList " + siteList);

                var roleList = doc.getFirstValue("rolelist_s");

                if( roleList ){
                    roleList = roleList.replaceAll(',',' ').trim();
                    request.addParam("fq","contentrole_ss:(" + roleList + ")");
                    filterList.push("contentrole_ss:(" + roleList + ")");
                }
                logger.info("benjamin roleList " + roleList);
            }
            else {
                request.addParam("fq","id:0");
                filterList.push("id:0");
            }

            
        } catch (e) {
            logger.info("benjamin " + e.toString());
        }

        logger.info("benjamin done");
    } // end if LDAPID 
    else {
       request.addParam("fq","id:0");
       filterList.push("id:0");
    }


    if( filterList.length > 0 ){
        ctx.put("accessfilterlist",JSON.stringify(filterList));
    }
}