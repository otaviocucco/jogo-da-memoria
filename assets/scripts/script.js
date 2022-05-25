const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";





startGame();

function startGame() {
    game.createCardsFromTechs();
    initializeCards();
}

function restartGame() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';

    let movements = document.getElementById("movements");
    movements.innerHTML = game.clearMovements();

}

function initializeCards() {
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";

    for (let card of game.cards) {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    }

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}



function flipCard() {




    if (game.setCard(this.id)) {

        this.classList.add("flip");

        if (game.secondCard) {

            let movements = document.getElementById("movements");
            movements.innerHTML = game.countMovements();

            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setTimeout(() => {
                        let gameOverLayer = document.getElementById("gameOver");
                        gameOverLayer.style.display = 'flex';
                    }, 300);
                }

            } else {

                setTimeout(() => {

                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();

                }, 1000);
            }
        }
    }

}