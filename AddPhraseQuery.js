function (request, response, ctx, collection, solrServer, solrServerFactory) {

 

  var QF_PARAM = "qf";
  // extract field/weight from: (<field>)^(<weight>)
  var QF_REGEX = "([^\\^]+)\\^([0-9\.]+)"
  // multipliers on the weight in qf= to use with pf=/pf2=/pf3=
  var QF_PF_MULTIPLIER = 5.0;
  var QF_PF2_MULTIPLIER = 2.0;
  var QF_PF3_MULTIPLIER = 3.0;

 

  var PF_FORMAT = "%s^%f";
  var PF_PARAM = "pf";
  var PF2_PARAM = "pf2";
  var PF3_PARAM = "pf3";

 

  var PS = "1";
  var PS2 = "1";
  var PS3 = "1";
  var PS_PARAM = "ps";
  var PS2_PARAM = "ps2";
  var PS3_PARAM = "ps3";

 

  var qfParams = new java.util.ArrayList(request.getParam(QF_PARAM));
  if (null !== qfParams && !qfParams.isEmpty()) {
    var qfRegex = java.util.regex.Pattern.compile(QF_REGEX);
    for (var i = 0; i < qfParams.size(); i++) {
      var qfParam = qfParams.get(i);
      if (null !== qfParam) {
        var qfMatcher = qfRegex.matcher(qfParam);
        if (qfMatcher.find()) {
          var field = qfMatcher.group(1);
          var weight = qfMatcher.group(2);
          if (null !== field && null !== weight) {
            var weightD = java.lang.Double.valueOf(weight);
            // pf=, pf2=, pf3=
            request.addParam(PF_PARAM, java.lang.String.format(PF_FORMAT, field, 
                (QF_PF_MULTIPLIER * weightD)));
            request.addParam(PF2_PARAM, java.lang.String.format(PF_FORMAT, field, 
                (QF_PF2_MULTIPLIER * weightD)));
            request.addParam(PF3_PARAM, java.lang.String.format(PF_FORMAT, field, 
                (QF_PF3_MULTIPLIER * weightD)));
          }
        }
      }
    }
    // ps=, ps2=, ps3=
    request.addParam(PS_PARAM, PS);
    request.addParam(PS2_PARAM, PS2);
    request.addParam(PS3_PARAM, PS3);
  }
}