document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div');
	const timeLeft = document.querySelector('#time-left');
	const startBtn = document.querySelector('#button');
	const resultDisplay = document.querySelector('#result');
	const carsLeft = document.querySelectorAll('.car-left');
	const carsRight = document.querySelectorAll('.car-right');
	const logsLeft = document.querySelectorAll('.log-left');
	const logsRight = document.querySelectorAll('.log-right');
	// const endingBlock = document.querySelector('.ending-block');
	const indexOfendingBlock = 4;
	const widthOfWholeGrid = 9;
	let currentIndex = 76;
	let timerId = null;

	// render Frog on starting block
	squares[currentIndex].classList.add('frog');

	// moves Frog
	function moveFrog (event) {
		squares[currentIndex].classList.remove('frog');

		// using events of keyCode, decide which way the Frog is gonna go
		switch (event.key) {
			case 37:
				if (currentIndex % widthOfWholeGrid !== 0) {
					currentIndex -= 1; // goes left
				}
				break;
			case 38:
				if (currentIndex - widthOfWholeGrid >= 0) {
					currentIndex -= widthOfWholeGrid; // goes top
				}
				break;
			case 39:
				if (currentIndex % widthOfWholeGrid < widthOfWholeGrid - 1) {
					currentIndex += 1; // goes right
				}
				break;
			case 40:
				if (currentIndex + widthOfWholeGrid < widthOfWholeGrid * widthOfWholeGrid) {
					currentIndex -= widthOfWholeGrid;
				}
				break;
		}
		squares[currentIndex].classList.add('frog');

		// while moving, decide if lose or win. declare them through new individual funcions
		lose();
		win();
	}

	// moves cars auto
	function moveCarsAuto () {
		carsLeft.forEach((carLeft) => moveCarToLeft(carLeft));
		carsRight.forEach((carRight) => moveCarToRight(carRight));
	}

	// moves car to Left on a time loop
	function moveCarToLeft (carLeft) {
		// if carLeft gets the class '.car-left', then it's true
		// What I mean here is: switch (carLeft === '.car-left') {doSomething}
		//or if (carLeft === '.car-left' && carLeft.classList.contains('c1')) { doSomething }
		switch (true) {
			case carLeft.classList.contains('c1'):
				carLeft.classList.remove('c1');
				carLeft.classList.add('c2');
				break;
			case carLeft.classList.contains('c2'):
				carLeft.classList.remove('c2');
				carLeft.classList.add('c3');
				break;
			case carLeft.classList.contains('c3'):
				carLeft.classList.remove('c3');
				carLeft.classList.add('c1');
				break;
		}
	}

	// moves car to the right
	function moveCarToRight (carRight) {
		switch (true) {
			case carsRight.classList.contains('c1'):
				carsRight.classList.remove('c1');
				carsRight.classList.add('c3');
				break;
			case carsRight.classList.contains('c2'):
				carsRight.classList.remove('c2');
				carsRight.classList.add('c1');
				break;
			case carsRight.classList.contains('c3'):
				carsRight.classList.remove('c3');
				carsRight.classList.add('c2');
				break;
		}
	}

	// moves Logs auto
	function moveLogsAuto () {
		logsLeft.map((logLeft) => moveLogToLeft(logLeft));
		logsRight.map((logRight) => moveLogToRight(logRight));
	}

	// moves logs to right
	function moveLogToLeft (logLeft) {
		switch (true) {
			case logLeft.classList.contains('l1'):
				logLeft.classList.remove('l1');
				logLeft.classList.add('l2');
				break;
			case logLeft.classList.contains('l2'):
				logLeft.classList.remove('l2');
				logLeft.classList.add('l3');
				break;
			case logLeft.classList.contains('l3'):
				logLeft.classList.remove('l3');
				logLeft.classList.add('l4');
				break;
			case logLeft.classList.contains('l4'):
				logLeft.classList.remove('l4');
				logLeft.classList.add('l5');
				break;
			case logLeft.classList.contains('l5'):
				logLeft.classList.remove('l5');
				logLeft.classList.add('l1');
				break;
		}
	}

	// moves logs to left
	function moveLogToRight (logRight) {
		switch (true) {
			case logRight.classList.contains('l1'):
				logRight.classList.remove('l1');
				logRight.classList.add('l5');
				break;
			case logRight.classList.contains('l2'):
				logRight.classList.remove('l2');
				logRight.classList.add('l1');
				break;
			case logRight.classList.contains('l3'):
				logRight.classList.remove('l3');
				logRight.classList.add('l2');
				break;
			case logRight.classList.contains('l4'):
				logRight.classList.remove('l4');
				logRight.classList.add('l3');
				break;
			case logRight.classList.contains('l5'):
				logRight.classList.remove('l5');
				logRight.classList.add('l4');
				break;
		}
	}

	// rules to win the game
	function win () {
		if (squares[indexOfendingBlock].classList.contains('ending-block', 'frog')) {
			resultDisplay.textContent = 'You Won!';
			squares[currentIndex].classList.remove('frog');
			clearInterval(timerId);
			document.removeEventListener('keyup', moveFrog);
		}
	}
	// document.addEventListener('keydown', moveFrog);
});
