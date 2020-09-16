document.addEventListener('DOMContentLoaded', () => {
	const startBtn = document.querySelector('#button');
	const timeLeft = document.querySelector('#time-left');
	const resultDisplay = document.querySelector('#result');
	const squares = document.querySelectorAll('.grid div');
	const logsLeft = document.querySelectorAll('.log-left');
	const logsRight = document.querySelectorAll('.log-right');
	const carsLeft = document.querySelectorAll('.car-left');
	const carsRight = document.querySelectorAll('.car-right');
	const indexOfEndingBlock = 4;
	const widthOfWholeGrid = 9;
	let currentIndex = 76;
	let currentTime = 20;
	let timerId = null;

	// draw frogger first to show
	squares[currentIndex].classList.add('frog');

	// to start the game
	function startFunction () {
		resultDisplay.textContent = '';
		currentTime = 20;
		timeLeft.textContent = currentTime;
		squares[currentIndex].classList.remove('frog');
		currentIndex = 76;
		squares[currentIndex].classList.add('frog');
		squares[indexOfEndingBlock].classList.add('ending-block');
		document.addEventListener('keyup', moveFrog);
		clearInterval(timerId);
		timerId = null;
		timerId = setInterval(movePieces, 1000);
	}

	// moves Frog
	function moveFrog (event) {
		squares[currentIndex].classList.remove('frog');

		// using events of keyCode, decide which way the Frog is gonna go
		switch (event.keyCode) {
			case 37:
				if (currentIndex % widthOfWholeGrid !== 0) currentIndex -= 1; // goes left
				break;
			case 38:
				if (currentIndex - widthOfWholeGrid >= 0) currentIndex -= widthOfWholeGrid; // goes top
				break;
			case 39:
				if (currentIndex % widthOfWholeGrid < widthOfWholeGrid - 1) currentIndex += 1; // goes right
				break;
			case 40:
				if (currentIndex + widthOfWholeGrid < widthOfWholeGrid * widthOfWholeGrid) {
					currentIndex += widthOfWholeGrid; // goes down
				}

				break;
		}

		squares[currentIndex].classList.add('frog');

		// while moving or on each key press, check if the frog has done anything that would result winning or losing. declare them through new individual funcions
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
			case carRight.classList.contains('c1'):
				carRight.classList.remove('c1');
				carRight.classList.add('c3');
				break;
			case carRight.classList.contains('c2'):
				carRight.classList.remove('c2');
				carRight.classList.add('c1');
				break;
			case carRight.classList.contains('c3'):
				carRight.classList.remove('c3');
				carRight.classList.add('c2');
				break;
		}
	}

	// moves Logs auto
	function moveLogsAuto () {
		logsLeft.forEach((logLeft) => moveLogToLeft(logLeft));
		logsRight.forEach((logRight) => moveLogToRight(logRight));
	}

	// logs are going to left
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

	// moving logs to left
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

	// moves frog when the frog is on the log that moves to LEFT
	function moveWithLogLeft () {
		if (currentIndex >= 27 && currentIndex < 35) {
			squares[currentIndex].classList.remove('frog');
			currentIndex += 1;
			squares[currentIndex].classList.add('frog');
		}
	}

	// moves frog when the frog is on the log that moves to RIGHT
	function moveWithLogRight () {
		if (currentIndex > 18 && currentIndex <= 27) {
			squares[currentIndex].classList.remove('frog');
			currentIndex -= 1;
			squares[currentIndex].classList.add('frog');
		}
	}

	// rules to win the game
	function win () {
		if (squares[indexOfEndingBlock].classList.contains('frog')) {
			resultDisplay.textContent = 'YOU WON!';
			squares[currentIndex].classList.remove('ending-block');
			clearInterval(timerId);
			document.removeEventListener('keyup', moveFrog);
		}
	}

	// decides how Frogger can lose
	function lose () {
		if (
			currentTime === 0 ||
			squares[currentIndex].classList.contains('c1') ||
			squares[currentIndex].classList.contains('l4') ||
			squares[currentIndex].classList.contains('l5')
		) {
			squares[currentIndex].classList.remove('frog');
			resultDisplay.textContent = 'YOU LOSE';
			clearInterval(timerId);
			document.removeEventListener('keyup', moveFrog);
		}
	}

	function movePieces () {
		currentTime--;
		timeLeft.textContent = currentTime;
		moveCarsAuto();
		moveLogsAuto();
		moveWithLogLeft();
		moveWithLogRight();
		lose(); // while pieces move, there's a chance to lose. So, call lose() here as well.
	}

	startBtn.addEventListener('click', startFunction);
});
