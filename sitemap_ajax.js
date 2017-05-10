/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function renderSitemap(){
    var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8983/solr/recollect_test_city_of_sacramento_shard1_replica1/select?q=*%3A*&wt=json');
xhr.onload = function() {
    if (xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
}

