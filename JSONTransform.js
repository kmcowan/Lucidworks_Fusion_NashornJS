/* 
 * {
        "description":"winter",
        "groups":"rules-lenovousepp",
        "type":"filter_list",
        "enabled":true,
        "matching":"contains",
        "field_name":"code_s",
        "display_type":"Filter List",
        "search_terms":["winter"],
        "ruleName":"winter",
        "field_values":["22TP2TXY370",
          "22TP2TXX11Y"],
        "id":"30714596-4c20-42f3-a044-533c251fc73e",
        "createdAt":"2017-11-01T10:33:28.700Z",
        "updatedAt":"2017-11-01T10:34:19.540Z",
        "_version_":1583026106029572096}

  //"body_t":["{\"display_type\":\"Boost List\",\"ruleName\":\"BoostName\",\"description\":\"BoostDesc\",\"matching\":\"keywords\",\"values\":\"\",\"param_keys\":[],\"param_values\":[],\"param_policies\":[],\"field_values\":[\"care\"],\"createdAt\":\"2017-11-02T14:11:55.153Z\",\"updatedAt\":\"2017-11-02T14:11:55.153Z\",\"enabled\":[true],\"groups\":\"rules-usweb\",\"type\":\"boost_list\",\"field_name\":\"id\",\"search_terms\":\"https://www3.lenovo.com/us/en/search/v1/list/SubSeries#20#0\",\"filters\":[]}"],
  
 */

var f = function(doc){
    if(doc != null){
        logger.info(doc);
        var content = doc.getFirstFieldValue("body_t");
        var json = JSON.parse(content);
        var item = json[0];
        doc.addField("display_type", item.display_type);
         doc.addField("ruleName", item.ruleName);
    }
    return doc;
}
