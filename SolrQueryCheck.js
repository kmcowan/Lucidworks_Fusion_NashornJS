/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function doWork(doc, ctx, collection, solrServer, solrServerFactory) {
    /*var imports = new JavaImporter(
     org.apache.solr.client.solrj.SolrQuery,
     org.apache.solr.client.solrj.util.ClientUtils);
     */
    if (doc !== null && doc.getId() !== null) {
        try {
            var SolrQuery = org.apache.solr.client.solrj.SolrQuery;
            var ClientUtils = org.apache.solr.client.solrj.util.ClientUtils;
            var ex = java.lang.Exception;
            // with (imports) {
            var keywords = doc.getFirstFieldValue('keywords_t_en_hl');
            var uuid = doc.getFirstField('jcr_uuid') ? doc.getFirstField('jcr_uid').getValue() : '';
            if (keywords !== null) {

                logger.info('Found Document with keywords Id:' + doc.getId() + ' JCR_uuid: ' + uuid + ' Keywords: ' + keywords);
                var client = solrServerFactory.getSolrServer("Search_Keywords");
                for (var j = 0; j < keywords.length; j++) {
                    var keywordTagId = '/etc/tags/' + keywords[j].replace(/\:/g, '/');
                    if (client !== null) {
                        var q = "id:" + "\"" + keywordTagId + "\"";
                        var query = new SolrQuery();
                        query.setRows(1);
                        query.setQuery(q);
                        var res = client.query(query);
                        if (res !== null) {
                            doc.addField('keywords_t', res.getResults().get('docs').get('jcr_title_t'));
                        } else {
                            logger.error(' Invalid keyword in document ' + doc.getId() + ' tag reference:' + q);
                        }
                    }
                }
                logger.info('Added keywords to document ' + doc.getId() + ' ' + doc.getFieldValues('keywords_t'));
            } else {
                logger.info('Not processing Document ' + doc.getId() + ' JCR_uuid: ' + uuid);
                if (doc.getId() === '/content/healthlibrary/home/hl/wellness/quit_tobacco/get_ready/0010-3C-10-reasons-to-quit') {
                    logger.info('Fields for ' + doc.getId() + ' JCR_uuid: ' + uuid + '  Field Names:' + doc.getAllFieldNames());
                }
            }
            // }
        } catch (ex) {
            logger.error(ex.getLocalizedMessage());
        }
    }

    return doc;
}

/* Add Additional Fields Stage */

var solrQueryCheck = function (doc) {
    var url_field = 'url_t';
    var html_ext = '.html';
    var desc_en_field = 'description_t_en_hl';
    var body_en_field = 'body_t_en_hl';
    var title_field = 'title_suhg';
    var text_field = 'text';
    var jcr_title_field = 'jcr_title_t';
    var title_text_field = 'title_t_en_hl';
    var lang_field = 'language_t';

    doc.addField(lang_field, 'en');

    /* create url_t field for documents */
    var url = doc.getId() + html_ext;
    doc.addField(url_field, url);

    /* copy text values to body_en_t field for documents */
    if (doc.hasField(text_field)) {
        for (var i = 0; i < doc.getFieldValues(text_field).length; i++) {
            doc.addField(body_en_field, doc.getFieldValues(text_field)[i]);
        }
        doc.removeFields(text_field);
    }
    /* replace html tags from description_en_t and body_en_t fields */
    var regex = new RegExp('<\/?(?:[phib])?(?:(br)?(ul)?(li)?)[1-4]?>|\\r\\n|&nbsp;', 'g');

    if (doc.hasField(desc_en_field)) {
        var desc = doc.getFirstFieldValue(desc_en_field);
        desc = desc.replace(regex, ' ').trim();
        doc.setField(desc_en_field, desc);
    }
    if (doc.hasField(body_en_field)) {
        var bodyArr = [];
        for (var i = 0; i < doc.getFieldValues(body_en_field).length; i++) {
            var body = doc.getFieldValues(body_en_field)[i];
            body = body.replace(regex, ' ').trim();
            bodyArr.push(body);
        }
        doc.removeFields(body_en_field);
        for (var i = 0; i < bodyArr.length; i++) {
            doc.addField(body_en_field, bodyArr[i]);
        }
    }
    /* create description field if still empty */
    if (!doc.hasField(desc_en_field)) {
        doc.setField(desc_en_field, doc.getFirstFieldValue(body_en_field));
    }

    /* remove whitespace from title sort field */
    if (doc.hasField(title_field)) {
        var title = doc.getFirstFieldValue(title_field);
        title = title.replace(/\//g, " ");//to remove forwardslash in title_suhg
        title = title.replace(/^\s+/, "");// remove leading whitespace
        title = title.replace(/\s+/g, " ");  // multiple whitespace to one space
        doc.setField(title_field, title);
    } else {
        if (doc.hasField(jcr_title_field)) {
            var title = doc.getFirstFieldValue(jcr_title_field);
            doc.addField(title_text_field, title);
            var pattern = new RegExp('[$&+,:;=?@#|\'<>.^*()%!-]', 'g');
            title = title.replace(pattern, '');
            title = title.replace(/\//g, " ");//to remove forwardslash in title_suhg
            title = title.replace(/^\s+/, "");// remove leading whitespace
            title = title.replace(/\s+/g, " ");  // multiple whitespace to one space
            doc.addField(title_field, title);
        }
    }
    return doc;
}
