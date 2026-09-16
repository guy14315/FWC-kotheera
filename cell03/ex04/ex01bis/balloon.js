const $balloon = $('#balloon');

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
	$balloon.css({ width: `${size}px`, height: `${size}px` });
}

function setColor(index) {
	colorIndex = (index + colors.length) % colors.length;
	$balloon.css('background-color', colors[colorIndex]);
}

$balloon.on('click', () => {
	setSize(size + GROW_STEP);
	setColor(colorIndex + 1);

	if (size > EXPLODE_SIZE) {
		setSize(ORIGINAL_SIZE);
	}
});

$balloon.on('mouseleave', () => {
	setSize(Math.max(MIN_SIZE, size - SHRINK_STEP));
	setColor(colorIndex - 1);
});
