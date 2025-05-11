// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Loop through keypoints and draw circles
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // Color-code based on left or right hand
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }

        // Function to draw lines between keypoints
        function drawLines(startIndex, endIndex, color) {
          stroke(...color);
          strokeWeight(2);
          for (let i = startIndex; i < endIndex; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Define color based on handedness
        let color = hand.handedness == "Left" ? [255, 0, 255] : [255, 255, 0];

        // Draw lines for each segment
        if (hand.keypoints.length > 4) drawLines(0, 4, color);  // Keypoints 0 to 4
        if (hand.keypoints.length > 8) drawLines(5, 8, color);  // Keypoints 5 to 8
        if (hand.keypoints.length > 12) drawLines(9, 12, color); // Keypoints 9 to 12
        if (hand.keypoints.length > 16) drawLines(13, 16, color); // Keypoints 13 to 16
        if (hand.keypoints.length > 20) drawLines(17, 20, color); // Keypoints 17 to 20
        
      }
    }
  }
}
