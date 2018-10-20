let points = [
	{ x: 0, y: 0 },
	{ x: 100, y: 100 },
	{ x: 245, y: 214 },
	{ x: 312, y: 412 },
	{ x: 432, y: 123 }
];

function setup() {
	createCanvas(800, 600);

	fill(255);
	noStroke(0);
}

function draw() {
	background("#1c1c1c");

	// cursor
	points[0].x = mouseX;
	points[0].y = mouseY;

	// map
	drawPoints();
	drawLines();
}

function mouseClicked() {
	if (mouseButton == LEFT) {
		points.push({
			x: points[0].x,
			y: points[0].y
		});
	}
}

//
// util: draw
//

function drawPoints() {
	points.forEach((point) => {
		ellipse(point.x, point.y, 20);
	});
}

function drawLines() {
	stroke(255);
	strokeWeight(2);

	for (let i = 0; i < points.length; i++) {
		let point1 = points[i];
		for (let j = 0; j < points.length; j++) {
			let point2 = points[j];

			if (point1 == point2) continue;

			line(point1.x, point1.y, point2.x, point2.y);
		}
	}

	noStroke();
}
