var song;
var sliderRate;
var sliderPan;
var amp;
var len;
var t;

var volhistory = [];
function setup() {
  createCanvas(windowWidth, windowHeight/2);
  song = loadSound("./song.mp3");
  song.setVolume(0.5);

  amp = new p5.Amplitude();

  startBtn = createButton('&#9658;');
  startBtn.mousePressed(() => this.togglePlaying());

  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);

}

function togglePlaying() {
    if (!song.isPlaying()) {
      song.play();
      song.setVolume(0.5);
      startBtn.html("&#10074;&#10074;");
    } else {
      song.stop();
      startBtn.html("&#9658;");
    }
  }

function draw() {

  background(232,232,232);
  song.pan(sliderPan.value());
  song.rate(sliderRate.value());
  var vol = amp.getLevel();
  volhistory.push(vol);
  let lineColor = map(vol, 0, 1, 255, 0);
// fill xd
 stroke(51);

   noFill();

  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);

  }
  endShape();
  pop();

  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, -y + height*2);

  }
  endShape();
  pop();


  if (volhistory.length > (width) - 50) {
    volhistory.splice(0, 1);
  }

  stroke(56, 109, 255);
  line(volhistory.length, 0, volhistory.length, height);
  //ellipse(100, 100, 200, vol * 200);


}