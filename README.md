# frogger-game

A retro grid-based game in vanilla JavaScript, HTML and CSS

The object of the game is to direct a frog to its home by crossing a busy road as well as navigating a river by jumping on logs.

### Rules of Frogger
* You will start on your bottom starting block which is purple, or 'starting-block'
* You have 20 seconds from pressing the start button to get to your top block or 'ending-block' to win the game
* You will lose if the time runs out
* You will lose if you get hit by a car, or 'c1'
* You will lose if you fall into the river, or '.l4, .l5, .lf2, .lf3'
* You will be safe on the road, or '.c2, .c3'
* You will be safe on the logs, or '.l1, .l2, .l3'
* You / the frog in this case will move with the logs when the frog is on them.