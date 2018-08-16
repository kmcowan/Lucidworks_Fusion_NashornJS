/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var timerTest = function (doc) {

    var e = java.lang.Exception;
    var Timer = java.util.Timer;
    var TimerTask = java.util.TimerTask;
    var System = java.lang.System;
    var timer = null;
    if (System.getProperties().get("my_timer") === null) {
        timer = new Timer();
        System.getProperties().put("my_timer", timer);
    } else {
        timer = System.getProperties().get("my_timer");
    }

    try {
        var task = new TimerTask {
            run: function () {
                logger.info("\n\n ******** Run in separate thread! ************* \n\n ");
            }
        };


        timer.schedule(task, 50);
    } catch (e) {
        logger.error(e.toString());
    }



    return doc;
};