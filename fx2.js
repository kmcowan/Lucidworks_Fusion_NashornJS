/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


load("fx:base.js");
load("fx:controls.js");
load("fx:graphics.js");
 
var WIDTH = 500;
var HEIGHT = 600;
var animation;
 
function setup(primaryStage) {
 var root = new Group();
 primaryStage.resizable = false;
 var scene = new Scene(root, WIDTH, HEIGHT);
 scene.title = "Colourful Circles";
 primaryStage.scene = scene;
 
 // create first list of circles
 var layer1 = new Group();
 for(var i = 0; i < 15; i++) {
  var circle = new Circle(200, Color.web("white", 0.05));
  circle.strokeType = StrokeType.OUTSIDE;
  circle.stroke = Color.web("white", 0.2);
  circle.strokeWidth = 4;
  layer1.children.add(circle);
 }
 
 // create second list of circles
 var layer2 = new Group();
 for(var i = 0; i < 20; i++) {
  var circle = new Circle(70, Color.web("white", 0.05));
  circle.strokeType = StrokeType.OUTSIDE;
  circle.stroke = Color.web("white", 0.1);
  circle.strokeWidth = 2;
  layer2.children.add(circle);
 }
 
 // create third list of circles
 var layer3 = new Group();
 for(var i = 0; i < 10; i++) {
  var circle = new Circle(150, Color.web("white", 0.05));
  circle.strokeType = StrokeType.OUTSIDE;
  circle.stroke = Color.web("white", 0.16);
  circle.strokeWidth = 4;
  layer3.children.add(circle);
 }
 
 // set a blur effect on each layer
 layer1.effect = new BoxBlur(30, 30, 3);
 layer2.effect = new BoxBlur(2, 2, 2);
 layer3.effect = new BoxBlur(10, 10, 3);
 
 // create a rectangle size of window with colored gradient
 var colors = new Rectangle(WIDTH, HEIGHT,
   new LinearGradient(0, 1, 1, 0, true, CycleMethod.NO_CYCLE,
      new Stop(0,   Color.web("#f8bd55")),
      new Stop(0.14, Color.web("#c0fe56")),
      new Stop(0.28, Color.web("#5dfbc1")),
      new Stop(0.43, Color.web("#64c2f8")),
      new Stop(0.57, Color.web("#be4af7")),
      new Stop(0.71, Color.web("#ed5fc2")),
      new Stop(0.85, Color.web("#ef504c")),
      new Stop(1,   Color.web("#f2660f"))));
 colors.blendMode = BlendMode.OVERLAY;
 
 // create main content
 var group = new Group(new Rectangle(WIDTH, HEIGHT, Color.BLACK),
        layer1, 
        layer2,
        layer3,
        colors);
 var clip = new Rectangle(WIDTH, HEIGHT);
 clip.smooth = false;
 group.clip = clip;
 root.children.add(group);
 
 // create list of all circles
 var allCircles = new java.util.ArrayList();
 allCircles.addAll(layer1.children);
 allCircles.addAll(layer2.children);
 allCircles.addAll(layer3.children);
 
 // Create a animation to randomly move every circle in allCircles
 animation = new Timeline();
 for each (var circle in allCircles) {
  animation.getKeyFrames().addAll(
     new KeyFrame(Duration.ZERO, // set start position at 0s
         new KeyValue(circle.translateXProperty(),
Math.random() * WIDTH),
         new KeyValue(circle.translateYProperty(),
Math.random() * HEIGHT)),
     new KeyFrame(new Duration(20000), // set end position at 20s
         new KeyValue(circle.translateXProperty(),
Math.random() * WIDTH),
         new KeyValue(circle.translateYProperty(),
Math.random() * HEIGHT))
     );
 }
 animation.autoReverse = true;
 animation.cycleCount = Animation.INDEFINITE;
}
 
function stop() {
 animation.stop();
}
 
function play() {
 animation.play();
}
 
function start(primaryStage) {
 setup(primaryStage);
 primaryStage.show();
 play();
}