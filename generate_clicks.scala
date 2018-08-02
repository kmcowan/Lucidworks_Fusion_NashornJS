 //val spark : org.apache.spark.sql.SparkSession = ???
//val sc : org.apache.spark.SparkContext = ???

import com.lucidworks.spark.fusion.FusionPipelineClient
import shaded.com.fasterxml.jackson.databind.JsonNode
//import com.fasterxml.jackson.databind.JsonNode
import java.time.format.DateTimeFormatter
import java.util.{Collections, Date}

import scala.collection.JavaConverters._
import org.apache.log4j.Logger
import java.util.UUID.randomUUID

import scala.collection.mutable.SortedSet

@transient lazy val log = Logger.getLogger("gen_exp_traffic")

 val numQueries = 500
 val queriesMap = Map("collection" -> "labs_signals", "query" -> "*:*", "flatten_multivalued" -> "false", "fields" -> "query_s", "max_rows" -> s"$numQueries")
 val fusionEndpoints = "http://localhost:8765"
 val queryProfilePath = s"/api/v1/query/labs"
 val postSignalPath = s"${queryProfilePath}/signals"
 val jsonContentType = "application/json"
 val numPartitions = 8
 val numUsers = 10000
val filters = Map("id" -> 0.4, "_version_" -> 0.3, "name" -> 0.2, "" -> 0.1)
val pctClicksPerVariant = List(0.4d, 0.2d, 0.1d)
val pctAddsPerVariant = List(0.25d, 0.15d, 0.05d)
val pctTail = 0.1d
// distribution of # of users per query
val maxUsersPerQuery = List(200,100,100,50,50,35,35,25,25,25,20,20,20,20,10,10,10,10,10,7,7,7,7,7,7,7,7,5,5,5,5,5,5,5,5,5,5,2,2,2,2,2,2,2,2,1,1,1,1,1,1)
val doClickPct = 100
val seed = 5150
val random = new java.util.Random(seed)
// keeping track of pct of matched docs
val queriesSent = sc.longAccumulator("queriesSent")
val numClicks = sc.longAccumulator("numClicks")
val numCarts = sc.longAccumulator("numCarts")
val noDocsResults = sc.longAccumulator("noDocsResults")

def sample[A](rand: java.util.Random, dist: Map[A, Double]): A = {
  val p = rand.nextDouble
  val it = dist.iterator
  var accum = 0.0
  while (it.hasNext) {
    val (item, itemProb) = it.next
    accum += itemProb
    if (accum >= p)
      return item
  }
  dist.keySet.head // shouldn't ever hit this
}

def escapeSolrQuery(q: String) : String = {
  // these need to be escaped correctly in solr queries
  val specialQueryChars = List("+","-","&&","||","!","(",")","{","}","[","]","^","\"","~","*","?",":","/")
  var query = q
  specialQueryChars.foreach(e => query = query.replace(e, "\\"+e))
  query
}

// utility method for sending a query request to a fusion pipeline endpoint
def queryFusion(fusion: FusionPipelineClient, queryParams: Map[String,String]) : Option[JsonNode] = {
  try {
    val jsonTree = fusion.queryFusion(queryProfilePath, queryParams.asJava)
    if (jsonTree != null) {
      val response = jsonTree.get("response")
      if (response != null) {
        val docs = response.get("docs")
        if (docs.isArray && docs.size > 0) {
          return Some(jsonTree)
        }
      }
    }
  } catch {
    case exc : Exception => log.info(s"Query [${queryParams.mkString("&")}] failed due to: ${exc}")
    case thr : Throwable => throw thr
  }
  return None
}

def postSignal(fusion: FusionPipelineClient, signalDoc: Map[String,_]) = {
  val timestamp = DateTimeFormatter.ISO_INSTANT.format((new Date()).toInstant)
  val withTs = signalDoc ++ Map("timestamp" -> timestamp)
  try {
    fusion.postBatchToPipeline(postSignalPath, Collections.singletonList(withTs.asJava), jsonContentType)
  } catch {
    case exc : Exception => log.info(s"POST signal [${signalDoc.mkString(", ")}] failed due to: ${exc}")
    case thr : Throwable => throw thr
  }
}

def postRequestSignal(fusion: FusionPipelineClient, userId: String, query: String, sessionId: String, filterField: String) = {
  var params = Map("domain" -> "lucidworks.com",
    "host" -> "64.71.15.234",
    "query" -> query,
    "userId" -> userId,
    "session" -> sessionId,
    "app_id" -> "scala_traffic_gen")
  if (!filterField.isEmpty) {
    params = params ++ Map("filter_field" -> s"${filterField}", "filter" -> s"${filterField}:[* TO *]")
  }
  postSignal(fusion, Map("id" -> randomUUID().toString, "type" -> "request", "params" -> params))
}


spark.read.format("solr").options(queriesMap).load.rdd.repartition(numPartitions).foreachPartition(iter => {
  val variants : SortedSet[String] = SortedSet()
  val fusion = new FusionPipelineClient(fusionEndpoints)
  iter.foreach(query => {
    val doMisspell = false // random.nextDouble <= pctTail
    val numUsersForThisQuery = maxUsersPerQuery.apply(random.nextInt(maxUsersPerQuery.size))
    List.range(0,numUsersForThisQuery).foreach(n => {
      val u = random.nextInt(numUsers)
      val userId = u.toString
      val query_s = query.getString(0)
      val sessionId = randomUUID().toString
      val filterField = sample(random, filters)

      var queryParams = Map("q" -> escapeSolrQuery(query_s),
        "userId" -> userId,
        "fl" -> "id",
        "session" -> sessionId,
        "app_id" -> "scala_traffic_gen")
      if (!filterField.isEmpty) {
        queryParams = queryParams ++ Map("fq" -> s"${filterField}:[* TO *]")
      }

      val resp = queryFusion(fusion, queryParams)
      queriesSent.add(1)

      if (doMisspell && random.nextBoolean) {
        var badQuery = query_s
        if (badQuery.contains("a")) {
          badQuery = badQuery.replaceFirst("a", "q")
        } else if (badQuery.contains("e")) {
          badQuery = badQuery.replaceFirst("e", "d")
        } else if (badQuery.contains("i")) {
          badQuery = badQuery.replaceFirst("i", "u")
        } else if (badQuery.contains("o")) {
          badQuery = badQuery.replaceFirst("o", "p")
        } else if (badQuery.contains("u")) {
          badQuery = badQuery.replaceFirst("u", "y")
        }
        // generate some tail traffic with misspelled terms
        if (badQuery != query_s) {
          //Thread.sleep(100)
          queryFusion(fusion, Map("q" -> escapeSolrQuery(badQuery),
            "userId" -> userId,
            "fl" -> "id",
            "session" -> sessionId,
            "app_id" -> "scala_traffic_gen"))
        }
      }

      var didClick = false
      if (resp.isDefined) {
        val queryResp = resp.get
        val rh = queryResp.get("responseHeader")
        val rhParams = rh.get("params")
        val variantId = if (rhParams.get("fusionExperimentVariant") != null) rhParams.get("fusionExperimentVariant").asText() else ""
        variants += variantId
        val variantIdx = variants.toSeq.indexOf(variantId)
        val pctClickIdx = if (variantIdx < pctClicksPerVariant.size) variantIdx else 0
        if (random.nextDouble <= pctClicksPerVariant.apply(pctClickIdx)) {
          didClick = true
          // send a request signal as part of this query as that's what twigkit does
          postRequestSignal(fusion, userId, query_s, sessionId, filterField)
          val fusionQueryId = rhParams.get("fusionQueryId").asText()
          val docs = queryResp.get("response").get("docs").asScala.toList

          // find which doc to click on in the results based on the num docs returned and the variant
          val clickPosRange = if (docs.size > 3 && variantIdx % 2 == 0) {
            if (random.nextBoolean) {
              1
            } else {
              math.ceil(docs.size/2).toInt
            }
          } else {
            docs.size
          }
          val docId = docs.apply(random.nextInt(clickPosRange)).get("id").asText()

          var params = Map("fusionQueryId" -> fusionQueryId, "query" -> query_s, "userId" -> userId, "docId" -> docId, "session" -> sessionId, "app_id" -> "scala_traffic_gen")
          if (!filterField.isEmpty) {
            params = params ++ Map("filter_field" -> s"${filterField}", "filter" -> s"${filterField}:[* TO *]")
          }
          println(s"Sending 'click' signal on doc $docId by user $userId for query $fusionQueryId in variant ${variantId}")
          postSignal(fusion, Map("id" -> randomUUID().toString, "type" -> "click", "params" -> params))
          numClicks.add(1)
          val pctAddIdx = if (variantIdx < pctAddsPerVariant.size) variantIdx else 0
          if (random.nextDouble <= pctAddsPerVariant.apply(pctAddIdx)) {
            println(s"Sending 'cart' signal on doc $docId by user $userId for query $fusionQueryId in variant ${variantId}")
            postSignal(fusion, Map("id" -> randomUUID().toString, "type" -> "cart", "params" -> params))
            numCarts.add(1)
          }
        }
      } else {
        noDocsResults.add(1)
      }

      if (!didClick) {
        // request signal w/o click
        postRequestSignal(fusion, userId, query_s, sessionId, filterField)
      }
    })
  })
  fusion.shutdown
})

println(s"queriesSent: ${queriesSent.value}")
println(s"numClicks: ${numClicks.value}")
println(s"numCarts: ${numCarts.value}")
println(s"noDocsResults: ${noDocsResults.value}")
