let score = 0;
let timeLeft = 30;

const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

function updateScore() {
    score++;
    scoreDisplay.textContent = `スコア: ${score}`;
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `残り時間: ${timeLeft}秒`;

    if (timeLeft === 0) {
        alert(`ゲーム終了！あなたのスコアは${score}です！`);
        saveScoreToServer(score);
    }
}

function saveScoreToServer(score) {
    // サーバーにスコアを保存するためのHTTPリクエスト
    fetch('http://localhost:5000/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('エラー:', error));
}


clickButton.addEventListener("click", updateScore);

// インターバルでタイマーを更新
const timerInterval = setInterval(function () {
    updateTimer();
    if (timeLeft === 0) {
        clearInterval(timerInterval); // 残り時間が0になったらタイマーを停止する
    }
}, 1000);
