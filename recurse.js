/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var System = java.lang.System;

function start(){
   
    function foo(){
       System.out.println("foo");
        bar();
        
        function bar(){
        System.out.println("bar");
        print(_LINE_);
    }
    }
    foo();
};

start();