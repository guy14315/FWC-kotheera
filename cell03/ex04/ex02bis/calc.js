const $form = $('#calc');
const $leftInput = $('#left');
const $rightInput = $('#right');
const $operatorSelect = $('#operator');

const DELAY = 30000;

function isPositiveInteger(value) {
	return /^\d+$/.test(value.trim());
}

function compute(left, operator, right) {
	switch (operator) {
		case '+':
			return left + right;
		case '-':
			return left - right;
		case '*':
			return left * right;
		case '/':
			return left / right;
		case '%':
			return left % right;
	}
}

function report(message) {
	console.log(message);
	alert(message);
}

$form.on('submit', (event) => {
	event.preventDefault();

	const leftValue = $leftInput.val();
	const rightValue = $rightInput.val();
	const operator = $operatorSelect.val();

	if (!isPositiveInteger(leftValue) || !isPositiveInteger(rightValue)) {
		report('Error :(');
		return;
	}

	const left = Number(leftValue);
	const right = Number(rightValue);

	if ((operator === '/' || operator === '%') && right === 0) {
		report("It's over 9000!");
		return;
	}

	report(compute(left, operator, right));
});

setInterval(() => {
	alert('Please, use me...');
}, DELAY);
