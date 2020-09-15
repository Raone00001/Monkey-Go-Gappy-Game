    //create the variables given including the game states
    var monkey , monkey_running;

    var obstacle, obstacleImage, obstacleGroup;
    var banana ,bananaImage, bananaGroup;

    var gameOver, gameOverImage, gameOverSound;

    var jumpSound;
    var bananaTouchSound;
    var survivalTimeSound;
    var scoreSound;

    var ground;

    var score;
    var survivalTime;

    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;

function preload(){
  
  //load the images, animations, and sounds
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage = loadImage("game over/game over.png");
  gameOverSound = loadSound("game over/Game Over (Sound Effect).mp3");
 
  jumpSound = loadSound("Jump/what 1 second sounds.mp3");
  bananaTouchSound = loadSound("BananaTouch/okay 1 second sounds.mp3");
  
  survivalTimeSound = loadSound("point and survival/Unikitty Yay Sound Effects.mp3");
  
  scoreSound = loadSound("point and survival/YEAY Sound Effect (1).mp3");
  
}

//set up the format
function setup() {
  
  createCanvas(400,400);

    //create the monkey while adding it's "features"
    monkey = createSprite(100,340,20,50);
    monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.1;

    //create the ground
    ground = createSprite(400,350,800,10);

    //create the score and survival time
    score = 0;
    survivalTime = 0;

    //create new groups
    bananaGroup = new Group();
    obstacleGroup = new Group();
  
}


function draw() {
  
  background("white");

    //if the game state is in play, these commands will be met
    if (gameState === PLAY) {

        //make the monkey collide with the ground
        monkey.collide(ground);

        //call this function
        obstacles();
        food();

      //if space is pressed & monkey is in this P, this will happen
      if (keyDown("space") && monkey.y > 300) {

          //make the monkey jump and play this sound
          monkey.velocityY = -15; 
          jumpSound.play();

      }

      //give gravity to the monkey
      monkey.velocityY = monkey.velocityY + 0.8;

      // if the bananas are touching the monkey, this will happen
      if (bananaGroup.isTouching(monkey)) {

          //this sound will play and score will increase
          //bananas will be also be destroyed
          bananaTouchSound.play();
          score = score + 1;
          bananaGroup.destroyEach();

      }

      //if survival time is greater than 0 and is a multiple of 10,
      //these commands will be met
      if (survivalTime > 0 && survivalTime % 10 === 0){

          //play this sound
          survivalTimeSound.play();   

      }

      //if score is greater than 0 and is a multiple of 10, these
      //commands will be met
      if (score > 0 && score % 5 === 0){

          //play this sound
          scoreSound.play();

      }

      //if the obstacles are touching the monkey, this will happen
      if (obstacleGroup.isTouching(monkey)) {

          //The game state will go to end, and this sound will play
          gameState = END;
          gameOverSound.play();

      }
      //else if the game state is end, these commands will be met
    } else if (gameState === END) {

          //destroy the monkey,bananagroup,obstaclegroup,and ground
          monkey.destroy();
          bananaGroup.destroyEach();
          obstacleGroup.destroyEach();
          ground.destroy();

          //Reset the score and survival time
          //put the framecount to 0
          survivalTime = 0;
          score = 0;
          frameCount = 0;

          //create the game over text and add its "features"
          gameOver = createSprite(200,200,50,50);
          gameOver.addImage("gameOver", gameOverImage);
          gameOver.scale = 0.2;

    }

    //create the survival time text and add features to it
    fill("black");
    textFont("comic sans");
    strokeWeight(1);
    stroke("darkred");
    textSize(20);
    survivalTime = Math.round(frameCount/frameRate());
    text("Survival Time: " + survivalTime,20,20);

    //create the score text and add features to it
    fill("black");
    textFont("comic sans");
    strokeWeight(1);
    stroke("lightyellow");
    textSize(20);
    text("Bananas Collected: " + score, 215,20); 
  
  drawSprites();
  
}

//create a function for the food group
function food() {

    //in every 80 frames, these commands will be met
    if (World.frameCount % 80 === 0) {

        //create the bananas, make it spawn in different y Ps
        banana = createSprite(400,200,20,20);
        banana.y = Math.round(random(120,200));
      
        //add a banana image
        banana.addImage("banana", bananaImage);
      
        //give velocity to the banana and a scale
        banana.velocityX = -(10 + score/5);
        banana.scale = 0.07;
      
        //give lifetime to the banana
        banana.lifetime = 40;
     
        //put the banana in a group
        bananaGroup.add(banana);
      
    }
  
}

//create a function for the obstacle
function obstacles(){
  
    //in every 300 frames, these commands will be met
    if (World.frameCount % 300 === 0) {

        //create the obstacles, and add "features" to it
        obstacle = createSprite(400,320,20,20);
        obstacle.addImage("obstacle", obstacleImage);
        obstacle.scale = 0.15;
      
        //give velocity to the obstacles
        obstacle.velocityX = -(10 + survivalTime/5);
      
        //give lifetime to the obstacles
        obstacle.lifetime = 35;
      
        //put the obstacles in a group
        obstacleGroup.add(obstacle);
      
  }
  
}