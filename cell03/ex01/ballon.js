const balloon = document.getElementById('balloon');

const ORIGINAL_SIZE = 200;
const MIN_SIZE = 200;
const EXPLODE_SIZE = 420;
const GROW_STEP = 10;
const SHRINK_STEP = 5;

const colors = ['red', 'green', 'blue'];
let colorIndex = 0;
let size = ORIGINAL_SIZE;

function setSize(newSize) {
	size = newSize;
	balloon.style.width = `${size}px`;
	balloon.style.height = `${size}px`;
}

function setColor(index) {
	colorIndex = (index + colors.length) % colors.length;
	balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener('click', () => {
	setSize(size + GROW_STEP);
	setColor(colorIndex + 1);

	if (size > EXPLODE_SIZE) {
		setSize(ORIGINAL_SIZE);
	}
});

balloon.addEventListener('mouseleave', () => {
	setSize(Math.max(MIN_SIZE, size - SHRINK_STEP));
	setColor(colorIndex - 1);
});
