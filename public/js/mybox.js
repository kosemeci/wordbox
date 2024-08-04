
document.addEventListener("DOMContentLoaded", function () {

    const box = document.getElementById("box");
    const paper = document.getElementById("paper");
    const titleBox = document.getElementById("title_box");
    const scene = document.getElementById("scene");
    const topFace = document.getElementById("top");
    const addButton = document.getElementById("addButton");
    const startButton = document.getElementById("startButton");
    const englishWordInput = document.getElementById("englishWord");
    const turkishWordInput = document.getElementById("turkishWord");
    const wordList = document.getElementById("wordList");
    const basket = document.getElementById("basket");
    const inputSection = document.getElementById("input-section");
    const answerSection = document.getElementById("answer-section");
    const questionText = document.getElementById("questionText");
    const userAnswer = document.getElementById("userAnswer");
    const submitAnswerButton = document.getElementById("submitAnswer");
    const answerText = document.getElementById("answerText");
    const modal = document.getElementById("resultModal");
    const span = document.getElementsByClassName("close")[0];
    const progressContainer = document.querySelector('.progress-container');

    let words = [];
    let currentWord = null;
    let askEnglish = true;
    let correctNum = 0;
    let message = "";
    const red_color = "#E74C3C";
    const green_color = "#2ECC71";
    let ask_index = 0;
    let ask_line = 0;
    let progress = 0;

    document.getElementById('box').classList.add('shake');
    submitAnswerButton.disabled = true ;


    // Kutunun tıklanmasıyla titremenin durması
    document.getElementById('box').addEventListener('click', function () {
        this.classList.remove('shake');
    });

    function showGameResult(correctAnswers, totalQuestions) {
        // Sonuç mesajını oluştur
        const point = (correctAnswers/totalQuestions)*100;
        let message_ = `<div style="text-align: center;"><h2>The word game is over!</h2></div> <h3 class="yellow-color">Success: ${point}% </h3> Word Results:<br>`;
        document.getElementById("resultMessage").innerHTML = message_ + message;
        modal.style.display = "block";
    }

    span.onclick = function () {
        window.location.href = "/mybox"
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

    addButton.addEventListener("click", function () {
        const englishWord = englishWordInput.value.trim();
        const turkishWord = turkishWordInput.value.trim();
        if (englishWord && turkishWord) {
            const word = { english: englishWord, turkish: turkishWord };
            words.push(word);
            addWordToList(word);
            englishWordInput.value = "";
            turkishWordInput.value = "";
            basket.style.display = "block";
        }
    });

    function addWordToList(word) {
        const li = document.createElement("li");
        li.textContent = `${word.english} = ${word.turkish}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
    
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fas", "fa-trash-alt");
        deleteButton.addEventListener("click", function () {
            deleteWord(word, li);
        });

        buttonContainer.appendChild(deleteButton);
        li.appendChild(buttonContainer);
        wordList.appendChild(li);
    }

    function deleteWord(word, li) {
        const index = words.indexOf(word);
        if (index > -1) {
            words.splice(index, 1);
            wordList.removeChild(li);
        }
    }

    function createAsk() {
        ask_index++;
        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        askEnglish = Math.random() > 0.5;
        answerText.innerText = "";
        progressContainer.style.display = "flex";


        if (askEnglish) {
            paper.textContent = currentWord.turkish;
        } else {
            paper.textContent = currentWord.english;
        }
        paper.addEventListener('transitionend', function () {
            if (askEnglish) {
                questionText.textContent = `What is the English translation of "${currentWord.turkish}"?`;
            } else {
                questionText.textContent = `What is the Turkish translation of "${currentWord.english}"?`;
            }

        }, { once: true });
    }

    startButton.addEventListener("click", function () {
        if (words.length > 0) {
            scene.style.display = "flex";
            basket.style.display = "none";
            titleBox.style.display = "none";
            answerText.style.display = "flex";
            inputSection.style.display = "none";
            answerSection.style.display = "flex";
            answerText.style.display = "flex";
            ask_line = words.length;
        }
    });

    submitAnswerButton.addEventListener("click", function () {

        let isCorrect = false;
        const answer = userAnswer.value.trim().toLowerCase();

        let correctAnswer = askEnglish ? currentWord.english.toLowerCase() : currentWord.turkish.toLowerCase();
        if (answer === correctAnswer) {
            answerText.innerText = "Correct Answer!"
            answerText.style.color = green_color;
            correctNum++;
            isCorrect = true;
            message += `<span class="yellow-border"> 
            ${currentWord.english} = ${currentWord.turkish} 
            <span>✅</span></span><br>`;
        } else {
            answerText.innerText = "Wrong Answer!"
            answerText.style.color = red_color;
            isCorrect = false;
            message += `<span class="yellow-border"> 
            ${currentWord.english} = ${currentWord.turkish} 
            <span>❌</span></span><br>`;
        }

        updateProgress(isCorrect);

        userAnswer.value = "";
        questionText.innerText = "";
        topFace.click();

    });

    function updateProgress(isCorrect) {
        if (progress < 100) {
            progress += 100 / ask_line;
            const segment = document.createElement('div');
            segment.classList.add('progress-segment');
            segment.style.width = (100 / ask_line) + '%';
            segment.style.backgroundColor = isCorrect ? green_color : red_color;
            progressContainer.appendChild(segment);

            // Progress 100 olduğunda showGameResult fonksiyonunu çağır
            if (progress >= 100) {
                showGameResult(correctNum, ask_line);
            }
        }
    }

});
