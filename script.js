const gameContainer = document.getElementById("game");
const startButton = document.querySelector('button')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.id = color;

    switch (color) {
      case 'red':
        newDiv.classList.add('#ef5350');
        break;
      case 'blue':
        newDiv.classList.add('#42a5f5');
        break;
      case 'green':
        newDiv.classList.add('#66bb6a');
        break;
      case 'orange':
        newDiv.classList.add('#ffa726');
        break;
      case 'purple':
        newDiv.classList.add('#7e57c2');
        break;
    }

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let numberOfClicks = 0
const clickedCards = []

function handleCardClick(event) {

  if (clickedCards.length < 2) {

    // you can use event.target to see which element was clicked
    if (event.target !== clickedCards[0]) {
      clickedCards.push(event.target)
      let elementColor = event.target.className
      clickedCards[numberOfClicks].style.backgroundColor = elementColor

      numberOfClicks++
      console.log(numberOfClicks)
    }
  }
  
  if (clickedCards.length == 2) {

    console.log(clickedCards)

    if (clickedCards[0].className == clickedCards[1].className) {
      // successful guess: clear array for the next guesses
      numberOfClicks = 0

      for (let clickedCard of clickedCards) {
        clickedCard.removeEventListener('click', handleCardClick)
      }

      clickedCards.pop()
      clickedCards.pop()

    } else if (clickedCards[0].className !== clickedCards[1].className) {
      // unsuccessful guess: clear array and flip back to white
      setTimeout(incorrectFlip, 1000)
    }
  }

}

// turn the cards back to white/default
function incorrectFlip() {

  for (let clickedCard of clickedCards) {
    clickedCard.style.backgroundColor = '#FFFFFF'
  }

  numberOfClicks = 0
  clickedCards.pop()
  clickedCards.pop()
}

// listen for button click to set up game board
startButton.addEventListener('click', () => {

  startButton.remove();

  gameContainer.className = 'in-progress'

  createDivsForColors(shuffledColors)
})
