var zoe, zoe_running, zoe_collided
var bg, bgImg
var bottomGround
var topGround
var leftGround
var rightGround
var meat, meatImg
var net, netImg
var score =0
var gameState = "PLAY"
var restart, restartImg

function preload(){
  bgImg = loadImage("pictures/bg4.png")
  meatImg = loadImage("pictures/meat.png")
  netImg = loadImage("pictures/net.png")
  zoe_running =  loadAnimation("pictures/zoe1.png","pictures/zoe2.png","pictures/zoe3.png" )
  zoe_collided = loadAnimation("pictures/zoeinnet.png")
  restartImg = loadImage("pictures/restartbutton.png")
  }

  function setup(){

    createCanvas(1100,800)
  //background image
  bg = createSprite(550,400);
  bg.addImage(bgImg);
  bg.scale = 1
  bg.velocityX = -2
  
  //creating top and bottom grounds
  bottomGround = createSprite(400,800,1400,20);
  bottomGround.visible = true;
  
  topGround = createSprite(400,0,1400,20);
  topGround.visible = false;
  
  leftGround = createSprite(0,400,10,800);
  rightGround = createSprite(1100,400,10,800);
  
  leftGround.visible = false;
  rightGround.visible = false;
        
  zoe = createSprite(100,600)
  zoe.addAnimation("running", zoe_running);
  zoe.addAnimation("collided", zoe_collided);
  zoe.setCollider('circle',0,0,50)
  zoe.scale = 0.8
  //zoe.debug = true

  restart = createSprite(550,500)
  restart.addImage("restart",restartImg)
  restart.scale = 0.1
  restart.visible = false

  meatGroup = new Group();
  netGroup = new Group();

  }

  function draw() {
  
    background("black");

    if(gameState === "PLAY"){

      if(keyDown("LEFT_ARROW")){
        //zoe.velocityX = -0.6
        zoe.x = zoe.x -5
      }

      if(keyDown("RIGHT_ARROW")){
       //zoe.velocityX = -0.6
       zoe.x = zoe.x +5
     }

     if(keyDown("UP_ARROW")){
       //zoe.velocityX = -0.6
       zoe.y = zoe.y -5
     }

     if(keyDown("DOWN_ARROW")){
       //zoe.velocityX = -0.6
       zoe.y = zoe.y +5
     }

     
     if (bg.x < 0){
      bg.x = 900;
    }


    createMeat();
    createTrap();

    if(meatGroup.isTouching (zoe)){
      for(var i =0; i < meatGroup.length;i++){
        if(meatGroup[i].isTouching(zoe)){
          meatGroup[i].destroy()
          score+=10
        }
      }
 
    }

    if(netGroup.isTouching (zoe)){
      //zoe animation will change to zoe in net
  
       gameState = "END"
    }

    }
  
      if(gameState === "END"){
        zoe.changeAnimation("collided", zoe_collided)
        bg.velocityX = 0
        meatGroup.destroyEach()
        netGroup.destroyEach()
        restart.visible = true
        if(mousePressedOver(restart)){
          restartGame();
        }
        
      }    

          zoe.collide(topGround);
          //zoe.collide(bottomGround);
          zoe.collide(leftGround);
          zoe.collide(rightGround);
  
          drawSprites();

          textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  text("press ⇡ arrow for the husky to move upwards", 600,50)
  text("press ⇣ arrow for the husky to move downwards", 600,80)
  text("press ⇢ arrow for the husky to move right", 600,110)
  text("press ⇠ arrow for the husky to move left", 600,140)

  }
  
  function createMeat(){
    if(frameCount % 80 == 0){
      var meat = createSprite(1100,random(600,700))
      meat.addImage(meatImg);
      meat.scale = 0.2;
      meat.velocityX = -8
      meat.lifetime = 250;
 
      meatGroup.add(meat);
    }
  }

  function createTrap(){
    if(frameCount % 150 == 0){
      var net = createSprite(1100,random(500,700))
      net.addImage(netImg);
      net.scale = 0.2;
      net.velocityX = -6
      net.lifetime = 150;
  
      netGroup.add(net);
    }
  }

  function restartGame(){
    gameState = "PLAY";
    restart.visible = false;
    
    meatGroup.destroyEach();
    netGroup.destroyEach();
    
    zoe.changeAnimation("running",zoe_running);
    score = 0;
  }
