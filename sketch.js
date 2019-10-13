var song;
var play;
var analyzer;
var sliderPan;

function setup() {
  reset();
}

//define what happens every time the sketch refreshes itself
function reset() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  song = loadSound("assets/Nctrnm_-_Blur.mp3", loaded);

  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
}

//define what is drawn in the canvas
function draw() {
    basic(); //basic animation
    visual(); //animation that becomes more complex as the beat does
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    fill("#b0f11d");
    textSize(15);
    text('W A I T . . .', width/2, windowHeight - 90);
    pop();

    //create a slider to slide the sound from left to right
    sliderPan = createSlider(-1, 1, 0, 0.01);
    //style the pan
    song.pan(sliderPan.value());
    sliderPan.position(width/2 - 200, height - 45);
    sliderPan.style("width", "400px");
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    fill("#b0f11d");
    textSize(10);
    text('L E F T', width/2 - 230, windowHeight - 35);
    text('R I G H T', width/2 + 240, windowHeight - 35);
    pop();
}

//define what happens once the song is loaded
//this defines mainly the appearence of the button, which will appear only when the song is loaded
function loaded() {
  play = createButton("PLAY TO TRIP");

  //style the button
  play.position(width/2 - 75, height - 120);
  play.size(150)
  play.style('background-color', "black");
  play.style('font-size', '15px');
  play.style('font-weight', 'bold');
  play.style('letter-spacing','2px');
  play.style('color', "#b0f11d");
  play.style('padding', '15px');
  play.style('border-style', 'solid');
  play.style('border-width', '0.5px');
  play.style('border-color', "#b0f11d");

  //when the button is pressed, the function togglePlaying is called
  play.mousePressed(togglePlaying);
  console.log("loaded");
}


//define what happens once the button PLAY is pressed
function togglePlaying() {
  if (!song.isPlaying()) { //if the song is not playing, by clicking the button it starts
    song.play();
    play.html("PAUSE");
  }
  else { //if the song is already playing, if you press the button it pauses
    song.pause();
    play.html("PLAY");
  }
}



//define the basic animation that appears when the music starts playing
function basic() {

  //define the volume function
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  //draw the shape
  for (i = 50; i < windowWidth; i += 100) {
    for (j = 50; j < windowHeight; j += 200) {
      stroke(255);
      strokeWeight(0.4);
      fill(0);
      polygon(i, j, volume * 0.6, 8);
    }
  }
}

//define the different animation that start whenever a new beat comes up
function visual() {

  //first new beat, draw hexagons
  if (song.currentTime() > 14) {
    for (i = 100; i < windowWidth; i += 100) {
      for (j = -100; j < windowHeight; j += 100) {
        stroke(255);
        strokeWeight(0.4);
        fill(0);
        polygon(i, j, volume * 0.5, 6);
      }
    }
  }

  //second new beat, draw gray ellipses
  if (song.currentTime() > 28) {
    for (t = 50; t < windowWidth; t += 100) {
      for (z = -100; z < windowHeight; z += 100) {
        stroke(0);
        strokeWeight(0.4);
        fill(120);
        ellipse(t, z, volume * 0.2);
      }
    }
  }

  //third new beat, draw squares
  if (song.currentTime() > 36) {
    for (h = -100; h < windowWidth + 100; h += 100) {
      for (l = 150; l < windowHeight + 200; l += 200) {
        stroke("#b0f11d");
        strokeWeight(0.5);
        fill(0);
        polygon(h, l, volume * 0.1, 4);
      }
    }
  }

  //fourth new beat, draw ellipses
  if (song.currentTime() > 68) {
    for (g = 50; g < windowWidth; g += 100) {
      for (r = 50; r < windowHeight; r += 200) {
        stroke("#b0f11d");
        strokeWeight(0.4);
        fill(0);
        ellipse(g, r, volume * 0.2);
      }
    }
  }

//once the song reaches a certain point, it stops and the whole animation gets refreshed
  if (song.currentTime() > 75) {
    song.stop();
    reset();
  }
}


//define the polygon function
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
