/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var basicAuthHttpClient = function(){
    
    var UsernamePasswordCredentials = org.apache.http.auth.UsernamePasswordCredentials;
 
 var AuthScope = org.apache.http.auth.AuthScope;
var BasicCredentialsProvider = org.apache.http.impl.client.BasicCredentialsProvider;
var HttpClientBuilder = org.apache.http.impl.client.HttpClientBuilder;

       var provider = new BasicCredentialsProvider();
   
        var credentials  = new UsernamePasswordCredentials("admin", "SolrRocks");
        provider.setCredentials(AuthScope.ANY, credentials);
 
        var client = HttpClientBuilder.create()
                .setDefaultCredentialsProvider(provider)
                .build();
        
        return client;
        
}