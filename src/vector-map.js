let points = [
	{ x: 0, y: 0 },
]

let mouse = { x: 0, y: 0 }

let width = document.body.clientWidth;
let height = document.body.clientHeight;

let c = document.getElementById("canvas");

addEventListener("resize", () => {
	width = document.body.clientWidth;
	height = document.body.clientHeight;
	
	c.width = width;
	c.height = height;
});

let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em Arial";


(function render() {
	requestAnimationFrame(render);

	ctx.fillStyle = "#1c1c1c";
	ctx.fillRect(0, 0, width, height);

	// cursor
	points[0].x = mouse.x;
	points[0].y = mouse.y;

	// map
	for (let i = 0; i < points.length; i++) {
		let point1 = points[i];
		
		for (let j = 0; j < points.length; j++) {
			let point2 = points[j];

			if (point1 == point2) continue;

			let d = distanceTo(point1, point2);

			if (255 - d <= 0) continue;

			ctx.strokeStyle = `rgba(255, 255, 255, ${(255 - d) / 255})`;
			ctx.beginPath();
			ctx.moveTo(point1.x, point1.y);
			ctx.lineTo(point2.x, point2.y);
			ctx.stroke();
		}
	}

	ctx.fillStyle = "#ddd";
	points.forEach((point) => {
		ctx.beginPath();
		ctx.ellipse(point.x, point.y, 10, 10, 0, 0, Math.PI * 2);
		ctx.fill();
	});
})();

document.addEventListener("click", (e) => {
	if (e.button == 0) {
		points.push({
			x: points[0].x,
			y: points[0].y
		});
	}
});

c.addEventListener("mousemove", (e) => {
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
});

// util

function distanceTo(point1, point2) {
	let x1 = point1.x; let y1 = point1.y;
	let x2 = point2.x; let y2 = point2.y;

	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt(a*a + b*b);
}
