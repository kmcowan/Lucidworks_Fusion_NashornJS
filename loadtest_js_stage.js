/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var loadtest = function (doc) {
    load("scripts/loadtest.js");
    var System = java.lang.System;

    var path = System.getProperties().getProperty("user.dir");
    if (path !== null) {
        logger.info("***** USER DIR: " + path + " ****************");
    } else {
        logger.info("********** Path was null...");
    }

    if (doCheckThatScriptHasBeenLoaded) {
        doCheckThatScriptHasBeenLoaded();
    }
    return doc;
}
