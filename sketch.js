let rainCloud = [] // store all of the rainDrops

let umbrella; //store the umbrella player
let bunny; //store a friend
let totalRainDropsThatHitFrinds = 0; //the "anti-points"


function setup() {
  createCanvas(400, 400);
  
  umbrella = new player(100); //make a new umbrella from the player class
  bunny = new friend(50) // make a new bunny from from the friend class.
  
  
  //generate all the raind drops and store them in the raincloud
  for(let i = 0 ; i < 100 ; i ++){
    let drop = new rainDrop()
    rainCloud.push(drop)
  }
}

function draw() {
  background(220);
  
  // do all of the behaviors on our raincloud
    for(let i = 0 ; i < rainCloud.length ; i ++){
      rainCloud[i].fall()
      rainCloud[i].render()
      rainCloud[i].splash(umbrella) //hit detection between the umbrella and each rain drop
    	rainCloud[i].splash(bunny)//hit detection between the bunny and each rain drop


    }
  
  umbrella.render(); 
  bunny.render()

}


//Start the playet class (the umbrella)
class player{
  
  constructor(size){
    this.size = size
    this.y = height - this.size
    this.x = mouseX;
    this.type = "umbrella"


  }
  
  //render behavior / method / class
  render(){
    
    this.x = mouseX; // keep updating the mouse pos every frame
    
    //comment below to see where the hit detection is going to occur in the rain drop class
    // noFill();
    // ellipse(this.x,this.y,this.size) // this is where the actual circle is from a math standpoint!
    
    
    //draw the umbrella
    push()
    fill(255)
    translate(this.x,this.y)
    arc(0,0,this.size,80,PI,TWO_PI)
    rect(-2.5,0,5,70)
    pop()
    
    
  }
  
} //close player


//start the rainDrop class
class rainDrop{
  
  constructor(){
    this.x = random(0,width); // a random pos on the x axis
    this.y = random(-height,0) // - hieght so that they are all offset and dont draw in a line
    this.size = 10;
    this.color = color(0,0,255);
    this.speed = random(1,3); //for paralax effect since each drop will have it's own speed
  }
  
  //drop to the bottom of the screen
  fall(){
    
    this.y += this.speed //move down by the speed amount
    
    //if we hit the bottom, back to the top and get a new x position
    if(this.y > height){
      this.y = 0;
      this.x = random(0,width);
    }
    
  } // close fall
  
  //what should the drop look like?
  render(){
    
    // noStroke()
    stroke(this.color)
    line(this.x,this.y,this.x,this.y - this.size)
  }
  
  //this is the tricky thing, just remember that we can pass some data into a function, even if that function is attached to a class / object!
  //hit detection between the drop and something else 'stuff' is the something else... the umbrella or a friend.
  splash(stuff){
    
    //calculate the distance between this drop and the stuff if that distance is closer than the stuff (minus it's size) then we are hitting it.
    if( dist(this.x,this.y - this.size, stuff.x,stuff.y) <= stuff.size/2){
      //go back to the top
      this.y = 0
      this.x = random(0,width);
      
      //do point scoring based on the type of stuff that we hit.
      if(stuff.type == "friend"){
      	totalRainDropsThatHitFrinds ++;
      	// console.log(totalRainDropsThatHitFrinds)
    	}
    }
    
  } // closes splash
} //closes rainDrop

//friend class for buddies!
class friend{
  
  constructor(size){
    this.size = size
    this.y = height - this.size
    this.x = width/4;
    this.type = "friend" //< to make it undetectable to the rain drops change it's type to something other than frined for a second.

  }
  
  render(){
    
    //making the frinds do special 'animations' etc would happen here!
    fill(255)
		ellipse(this.x, this.y, this.size)
    
    
  }
  
} //close player

