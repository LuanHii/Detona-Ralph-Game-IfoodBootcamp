const state = {
    view: {
        squares: document.querySelectorAll(".squares"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live: document.querySelector("#lives"),


    },
    value: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        playerLives: 3,






    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    }

};

function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    if (state.value.currentTime == 0) {
        state.view.timeLeft.textContent = "Tempo Esgotado!";
    }
    if (state.value.currentTime < 0) {

        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("O tempo acabou! Você fez: " + state.value.result + " Pontos.")
        setTimeout(restartPage, 1);
    }
}

function restartPage() {
    location.reload();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");

    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (state.value.hitPosition !== null && square.id === state.value.hitPosition) {
                state.value.result++;
                playSound("hit");
                state.view.score.textContent = state.value.result;
            } else if (state.value.hitPosition !== null) {
                state.value.playerLives--;
                state.view.live.textContent = "x" + state.value.playerLives;
            }
            // Limpar hitPosition após a verificação
            state.value.hitPosition = null;


            if (state.value.playerLives < 0) {
                alert("Você perdeu!");
                setTimeout(restartPage, 1);
            }
        });
    });
}




function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}


initialize();
