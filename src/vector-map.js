let points = [
	{ x: 100, y: 100 },
	{ x: 245, y: 214 },
	{ x: 312, y: 412 },
	{ x: 432, y: 123 },
	{ x: 166, y: 122 },
	{ x: 85, y: 232 },
	{ x: 219, y: 271 },
	{ x: 379, y: 370 },
	{ x: 377, y: 199 },
	{ x: 277, y: 122 },
	{ x: 322, y: 285 },
	{ x: 164, y: 355 }
];

function setup() {
	createCanvas(800, 600);

	fill(255);
	noStroke(0);
}

function draw() {
	background("#1c1c1c");

	// map
	drawPoints();

	// cursor
	ellipse(mouseX, mouseY, 20);
}

function mouseClicked() {
	if (mouseButton == LEFT) {
		points.push({
			x: mouseX,
			y: mouseY
		});
	}
}

//
// util
//

function drawPoints() {
	points.forEach((point) => {
		ellipse(point.x, point.y, 20);
	});
}
