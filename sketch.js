var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var ground;
var score;
var background_sp,groundImage;
var gameState, PLAY, END;
var restart, restartImage;

gameState = "PLAY";
score = 0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_still = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground.png");
  restartImage = loadImage("restart.png");
 }

function setup() {
  createCanvas(600,500);
  
  background_sp = createSprite(300,200,600,400)
  background_sp.addImage(groundImage);
  background_sp.scale = 2;
  background_sp.velocityX = -4;
  
  monkey = createSprite(50,400,30,30);
  monkey.addAnimation("monkeyAni",monkey_running);
  monkey.addAnimation("monkeyEnd",monkey_still);
  monkey.scale = 0.1;
  
  restart = createSprite(300,200,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  
  
  ground = createSprite(300,430,600,100);
  ground.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}
function draw() {
      monkey.setCollider("circle",0,10,200);
      // monkey.debug = true;
    camera.position.y = monkey.y
    if(gameState === "PLAY"){
      
      
      if(background_sp.x<0){
        background_sp.x = background_sp.width/2;
        }
      if(keyDown("space")  && monkey.y>345){
         monkey.velocityY = -15; 
        }
      monkey.velocityY = monkey.velocityY + 0.8;
      
      food();
      obstaclesFun();
      restart.visible = false;
      score = score + Math.round(getFrameRate()/50);
      
     if(obstacleGroup.isTouching(monkey)){
        gameState = "END";
        }
      
     } 
  else if(gameState === "END"){
  background_sp.velocityX = 0;
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  monkey.changeAnimation("monkeyEnd",monkey_still);
  monkey.velocityY = 0;
  restart.visible = true;
  if(mousePressedOver(restart)){
    restartFun();
  }
  
     }
  monkey.collide(ground);
  
  // monkey.debug = true;
  
  drawSprites() 
    fill("black");
  text("SURVIVAL TIME = " + score,400,200);
  

}

function food(){
 if(frameCount%80 === 0){
  banana = createSprite(random(0,600),random(0,20),20,20); 
  banana.addImage(bananaImage);
  banana.scale = 0.05;
  banana.velocityY = 10;
  banana.lifetime = 30;
  bananaGroup.add(banana);
 }
}

function obstaclesFun(){
  if(frameCount%100 === 0) {
  obstacle = createSprite(600,350,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -12;
  obstacle.scale = 0.2;
  obstacle.lifetime = 55;
  obstacleGroup.add(obstacle);
}
}
function restartFun(){
  gameState = "PLAY";
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("monkeyAni", monkey_running);
  score = 0;
  background_sp.velocityX = -4;
}



