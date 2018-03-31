// variables
let cards = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor", 
  "fa-bolt", 
  "fa-cube", 
  "fa-leaf", 
  "fa-bicycle", 
  "fa-bomb",
  "fa-diamond", 
  "fa-paper-plane-o", 
  "fa-anchor", 
  "fa-bolt", 
  "fa-cube", 
  "fa-leaf", 
  "fa-bicycle", 
  "fa-bomb"
];
let openCard = [];
let startGame = false;
let matchFound = 0;
let moves = 0;
let starts = 3;
let starRating = "3";
let timer;

// shuffle the list of cards 
// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleCard() {
    let cardList = shuffle(cards);
    cardList.forEach(function(card) {
      $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
      // newElement.innerHTML = '<li><i class="card fa ' + card + '"></i></li>';
      // $(".deck").appendChild(newElement);
    })
  }

// reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}

// remove all classes except "match"
function removeClasses() {
  $(".card").removeClass("show open wrong");
  removeOpenCards();
}

// update HTML with number of moves
function updateMoves() {
  if (moves === 1) {
    $("#movesText").text(" Move");
  } else {
    $("#movesText").text(" Moves");
  }
  
  $("#moves").text(moves.toString());

  if (moves > 0 && moves <= 16) {
    starRating = starRating;
  } else if (moves > 16 && moves <= 24) {
    $("#starOne").removeClass("fa-star");
    starRating = "2";
  } else if (moves > 24) {
    $("#starTwo").removeClass("fa-star");
    starRating = "1";
  }
}

// open popup when game is complete source: www.w3schools.com
function findWinner() {
  
  if (matchFound === 8) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(moves);
    $("#total-stars").text(starRating);

    modal.style.display = "block";

  // when the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);  

 }
}

// finding matching cards
function findMatch() {
    // showing a card when clicked
    $(".card").on("click", function() {
      if ($(this).hasClass("open show")) { return; }
      $(this).toggleClass("open show");
      openCard.push($(this));
      startGame = true;
      // check if classlist matches when openCard length == 2
      if (openCard.length === 2) {
        if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
        openCard[0][0].classList.add("match");
        openCard[1][0].classList.add("match");
        $(openCard[0]).off('click');
        $(openCard[1]).off('click');
        matchFound += 1;
        moves++;
        removeOpenCards();
        findWinner();
        } else {
        openCard[0][0].classList.add("wrong");
        openCard[1][0].classList.add("wrong");
        // set timeout to remove "show" and "open" class
        setTimeout(removeClasses, 1100);
        // reset openCard.length to 0
        setTimeout(removeOpenCards, 1100);
        moves++;
        }
      }
    updateMoves();
    })
  }
  
  // disable clicks
  function disableClick() {
   openCard.forEach(function (card) {
     card.off("click");
    })
  }
  
  // start timer on the first card click
  function startTimer() {
    let clicks = 0;
    $(".card").on("click", function() {
      clicks += 1;
      if (clicks === 1) {
        var sec = 0;
        function time ( val ) { return val > 9 ? val : "0" + val; }
        timer = setInterval( function(){
          $(".seconds").html(time(++sec % 60));
          $(".minutes").html(time(parseInt(sec / 60, 10)));
        }, 1000);
      }
    })
   }
  
  // function to restart the game on icon click
  function restartGame() {
    $("#restart").on("click", function() {
        location.reload()
    });
    }
  
  // call functions
  shuffle(cards);
  shuffleCard();
  findMatch();
  startTimer();
  restartGame();