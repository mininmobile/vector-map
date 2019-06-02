let objects = new Map([
	["x", [
		{ x: -1, y: -1 },
		{ x: 0, y: 1 },
		{ x: 1, y: -1 },
	]]
]);

let grid = { shown: true, size: 50 }

let mouse = { hover: false, x: 0, y: 0 }

let selected = undefined;

// create canvas
let cp = document.getElementById("placeholder");

let c = document.createElement("canvas");
document.body.appendChild(c);

addEventListener("resize", () => {
	c.width = cp.clientWidth;
	c.height = cp.clientHeight;
	c.style.top = cp.offsetTop + "px";
	c.style.left = cp.offsetLeft + "px";
});

addEventListener("load", () => {
	c.width = cp.clientWidth;
	c.height = cp.clientHeight;
	c.style.top = cp.offsetTop + "px";
	c.style.left = cp.offsetLeft + "px";
});

// create context
let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em sans-serif";

(function render() {
	requestAnimationFrame(render);

	ctx.fillStyle = "#1c1c1c";
	ctx.fillRect(0, 0, cp.clientWidth, cp.clientHeight);

	// grid
	if (grid.shown) {
		{ // background
			ctx.strokeStyle = "#333"
			ctx.beginPath();

			for (let i = cp.clientWidth / 2; i > 0; i -= grid.size) {
				ctx.moveTo(i, 0);
				ctx.lineTo(i, cp.clientHeight);
			}

			for (let i = cp.clientWidth / 2; i < cp.clientWidth; i += grid.size) {
				ctx.moveTo(i, 0);
				ctx.lineTo(i, cp.clientHeight);
			}

			for (let i = cp.clientHeight / 2; i > 0; i -= grid.size) {
				ctx.moveTo(0, i);
				ctx.lineTo(cp.clientWidth, i);
			}

			for (let i = cp.clientHeight / 2; i < cp.clientHeight; i += grid.size) {
				ctx.moveTo(0, i);
				ctx.lineTo(cp.clientWidth, i);
			}

			ctx.stroke();
		}

		{ // middle
			ctx.strokeStyle = "#555"
			ctx.beginPath();

			ctx.moveTo(cp.clientWidth / 2, 0);
			ctx.lineTo(cp.clientWidth / 2, cp.clientHeight);

			ctx.moveTo(0, cp.clientHeight / 2);
			ctx.lineTo(cp.clientWidth, cp.clientHeight / 2);

			ctx.stroke();
		}
	}

	// map
	ctx.fillStyle = "#fff";
	objects.forEach((points) => {
		for (let i = 0; i < points.length; i++) {
			let point = points[i];

			let x = cp.clientWidth / 2 + point.x * grid.size;
			let y = cp.clientHeight / 2 - point.y * grid.size;

			ctx.beginPath();
			ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
			ctx.fill();
		}
	});

	// cursor
	if (mouse.hover) {
		let x = Math.round(mouse.x / grid.size) * grid.size;
		let y = Math.round(mouse.y / grid.size) * grid.size;

		let offsetx = (cp.clientWidth / 2) % grid.size;
		let offsety = (cp.clientHeight / 2) % grid.size;

		ctx.beginPath();
		ctx.ellipse(x + offsetx, y + offsety, 10, 10, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillText(`(${Math.round((x - cp.clientWidth / 2) / grid.size)}, ` +
					  `${Math.round((cp.clientHeight / 2 - y) / grid.size)})`,
					  x + offsetx + 8, y + offsety - 16);
	}
})();

// mouse controls

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

c.addEventListener("mouseenter", () => mouse.hover = true);
c.addEventListener("mouseleave", () => mouse.hover = false);

// util

function distanceTo(point1, point2) {
	let x1 = point1.x; let y1 = point1.y;
	let x2 = point2.x; let y2 = point2.y;

	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt(a*a + b*b);
}
