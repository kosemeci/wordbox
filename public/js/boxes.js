document.addEventListener("DOMContentLoaded", function () {
    const scene = document.getElementById("scene");
    const topFace = document.getElementById("top");
    const inputSection = document.getElementById("input-section");
    const answerSection = document.getElementById("answer-section");
    const questionText = document.getElementById("questionText");
    const userAnswer = document.getElementById("userAnswer");
    const submitAnswerButton = document.getElementById("submitAnswer");
    const answerText = document.getElementById("answerText");
    const modal = document.getElementById("resultModal");
    const span = document.getElementsByClassName("close")[0];
    const progressContainer = document.querySelector('.progress-container');


    scene.style.display = "flex";
    answerText.style.display = "block";
    answerSection.style.display = "flex";

    document.getElementById('box').classList.add('shake');
    submitAnswerButton.disabled = true ;


    const words = [];
    const red_color = "#E74C3C";
    const green_color = "#2ECC71";
    let currentWord = null;
    let askEnglish = true;
    let correctNum = 0;
    let message = "";
    let ask_index = 0;
    let ask_line = 2;
    let progress = 0;


    // 'words' div'inin içindeki tüm 'li' elemanlarını seç
    const listItems = document.querySelectorAll("#words li");
    listItems.forEach((item) => {

        const text = item.innerText.trim();
        // Metni ' - ' karakterine göre ayır
        const [english, turkish] = text.split(' - ');

        words.push({ English: english, Turkish: turkish });
    });

    document.getElementById("words").remove();

    document.getElementById('box').addEventListener('click', function () {
        this.classList.remove('shake');
    });

    function showGameResult(correctAnswers, totalQuestions) {
        // Sonuç mesajını oluştur
        const point = (correctAnswers/totalQuestions)*100;
        let message_ = `<div style="text-align: center;"><h2>The word game is over!</h2></div> <h4 class="yellow-color">Success: ${point}% </h4> Word Results:<br>`;
        document.getElementById("resultMessage").innerHTML = message_ + message;
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    topFace.addEventListener("click", function () {
        if (box.classList.contains("open-top")) {
            submitAnswerButton.disabled = true ;
            box.classList.remove("open-top");
        }
        else {
            if (ask_index < ask_line) {
                submitAnswerButton.disabled = false ;
                box.classList.toggle("open-top");
                createAsk();
            }
            else {
                submitAnswerButton.disabled = true;
                showGameResult(correctNum, ask_line, message);

            }
        }
    });

    function createAsk() {
        ask_index++;
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        askEnglish = Math.random() > 0.5;
        answerText.innerText = "";
        progressContainer.style.display = "flex";


        if (askEnglish) {
            paper.textContent = currentWord.Turkish;
        } else {
            paper.textContent = currentWord.English;
        }
        paper.addEventListener('transitionend', function () {
            if (askEnglish) {
                questionText.textContent = `What is the English translation of "${currentWord.Turkish}"?`;
            } else {
                questionText.textContent = `What is the Turkish translation of "${currentWord.English}"?`;
            }

        }, { once: true });
    }

    submitAnswerButton.addEventListener("click", function () {

        let isCorrect = false;
        const answer = userAnswer.value.trim().toLowerCase();

        let correctAnswer = askEnglish ? currentWord.English.toLowerCase() : currentWord.Turkish.toLowerCase();
        if (answer === correctAnswer) {
            answerText.innerText = "Correct Answer!"
            answerText.style.color = green_color;
            correctNum++;
            isCorrect = true;
            message += `<span class="yellow-border"> 
            ${currentWord.English} = ${currentWord.Turkish} 
            <span>✅</span></span><br>`;
        } else {
            answerText.innerText = "Wrong Answer!"
            answerText.style.color = red_color;
            isCorrect = false;
            message += `<span class="yellow-border"> 
            ${currentWord.English} = ${currentWord.Turkish} 
            <span>❌</span></span><br>`;
        }

        if (progress < 99) {

            progress += 100 / ask_line;
            const segment = document.createElement('div');
            segment.classList.add('progress-segment');
            segment.style.width = (100 / ask_line) + '%';
            segment.style.backgroundColor = isCorrect ? green_color : red_color;
            progressContainer.appendChild(segment);

        }

        userAnswer.value = "";
        questionText.innerText = "";
        topFace.click();

    });

}); 