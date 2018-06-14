/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-diamond',
             'fa-bolt', 'fa-bolt',
             'fa-anchor', 'fa-anchor',
             'fa-bomb', 'fa-bomb',
             'fa-leaf', 'fa-leaf',
             'fa-cube', 'fa-cube',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-bicycle', 'fa-bicycle'
            ];

let mCounter = 0;

/*
 * Function to render cards
 */

function createCard(card) {
    return cardList =`<li class="card" data-type="${card}"><i class="fa ${card}"></i></li>`;
}; 

/*
 * Star Rating
 */

let finalStars;

function starRating (s) {
    let starCount = document.querySelector('.stars');
    let renderStar = `<li><i class="fa fa-star"></i></li>`;
    window.onload=function() {
        starCount.innerHTML = `${renderStar} ${renderStar} ${renderStar}`;
    };
    if (mCounter <= 16) {
        starCount.innerHTML = `${renderStar} ${renderStar} ${renderStar}`;
        finalStars = `${renderStar} ${renderStar} ${renderStar}`;
    } else if (mCounter > 17 || mCounter <= 20) {
        starCount.innerHTML = `${renderStar} ${renderStar}`;
        finalStars = `${renderStar} ${renderStar}`;
    } else if (mCounter >= 21) {
        starCount.innerHTML = `${renderStar}`;
        finalStars = `${renderStar}`;
    } 
};

/*
 * Move Counter
 */

function moveCounter(m) {
    let moveWords = document.querySelector('.moves');
    let moveCount =m +` Moves`;
    moveWords.innerHTML = moveCount;
    console.log(moveWords.innerHTML);
};

moveCounter(mCounter);

/*
 * Timer
 */
let seconds = 00;
let minutes = 0;
const timer = document.querySelector('.timer');
let clock;

function runTimer() {
    clock = setInterval( function() {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        };
        if (seconds < 10) {
            timer.innerHTML = `Time Elapsed: ${minutes}: 0${seconds}`;
        } else {
            timer.innerHTML = `Time Elapsed: ${minutes}: ${seconds}`;
        };        
    }, 1000);
};
            
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function renderDeck() {
    let deck = document.querySelector('.deck');
    shuffle(cards);
    let cardHTML = cards.map(function(card) {
        return createCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    console.log(deck.innerHTML);
};

/*
 * Final Window
 */

const modal = document.querySelector('.modal');
let modalText;


function congratulations() {
    seconds = seconds;
    minutes = minutes;
    clearInterval(clock);
    modalText = `
    <div class="modal-content">
        <h2>Congratulations!</h2>
        <p>You completed the Matching Game in ${mCounter} moves and ${minutes} minutes, ${seconds} seconds.</p>
        <p>You earned:</p>
        <center><section class="score-panel"><center><ul class="stars">${finalStars}</ul></center></section></center>
        <p>Care to play again?</p>
        <span><button class="play-again" onclick="window.location.reload()">Play again?</button>
    </div>
    `
    modal.style.display = "block";
    modal.innerHTML = `${modalText}`;
    console.log("CONGRATS!");
 };

 let timerClick=0;

renderDeck();
window.addEventListener("click", function(evt) {
    evt.preventDefault;
    if (timerClick === 0) {
        runTimer();
        timerClick = 1;
    };
});
starRating();

function matchMade() {
    openCards[0].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.add('match');
    openCards[1].classList.remove('open', 'show');
    matchedCards.push(openCards);
    openCards=[];
    mCounter = mCounter + 1;
    moveCounter(mCounter);
    starRating();
    console.log("The mCounter is " + mCounter);
};

function matchNotMade() {
    openCards.forEach(function(card) {
        card.classList.remove('open');
        card.classList.add('no-match');
    })
    allCards.forEach(function(card) {
        card.style.pointerEvents = "none";
    })
    setTimeout(function() {
        openCards.forEach(function(card) {
            card.classList.remove('no-match', 'show');
            openCards = [];
        });
        allCards.forEach(function(card) {
            card.style.pointerEvents = "auto";
        })
    }, 1250);
    mCounter = mCounter + 1;
    moveCounter(mCounter);
    starRating();    
    console.log("The mCounter is " + mCounter);
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *  DONE  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *  DONE  + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *  DONE  + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // event listener to click and show:

 const allCards = document.querySelectorAll('.card');
 let openCards = [];
 let firstCard = '0';
 let storedCard = '';
 let matchCard = '1';
 let i=0;
 const stars = document.querySelectorAll('.fa-star');
 const restart = document.querySelector('.restart');
 let matchedCards = [];


 allCards.forEach(function(card) {
    card.addEventListener('click', function(evt) {
        openCards.push(card);
        
        //storing match attributes
        
        if (openCards.length === 1) {
            firstCard = card.dataset.type;
            console.log(firstCard);
        } else if (openCards.length === 2) {
            matchCard = card.dataset.type;
            console.log(matchCard);
        };
        
        //checking for a match
        
        if (openCards.length === 2) {
            card.classList.add('open', 'show');
            if (firstCard === matchCard) {
                matchMade();
                if (matchedCards.length===8) {
                    congratulations();
                };
            } else {
                matchNotMade();
            }            
        } else {
            card.classList.add('open', 'show');
    };
 });
 });

 window.addEventListener("click", function(evt) {
     evt.preventDefault;
     if (openCards.length === 2) {
         console.log("I'm trying over here!");
         document.getElementsByClassName('.card').style.pointerEvents = "none";
     } else {
         document.getElementsByClassName('.card').style.pointerEvents = "auto";
     }
 });

/*
 * Restart Button
 */

restart.addEventListener('click', function(evt) {
    evt.preventDefault;
    window.location.reload();
})