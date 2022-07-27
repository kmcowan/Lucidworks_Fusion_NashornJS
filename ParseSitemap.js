function (doc, ctx) {
  if(doc !== null && doc.hasField("url.loc_ss")){
    var ArrayList = java.util.ArrayList;
    var list = new ArrayList();
    var PipelineDocument = com.lucidworks.apollo.common.pipeline.PipelineDocument;

    var urls = doc.getFieldValues("url.loc_ss");
    for(var i=0; i<urls.size(); i++){
      var url = urls.get(i);

      
    }
    return list;
  }
  
  return doc;
}