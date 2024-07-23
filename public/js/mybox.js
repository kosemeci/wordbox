
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

    let words = [];
    let allWords = [];
    let currentWord = null;
    let askEnglish = true;
    let correctNum=0;
    let message ="";
    
    function showGameResult(correctAnswers, totalQuestions) {
        // Sonuç mesajını oluştur
        let message_ = `Kelime oyunu bitti! Başarı: ${correctAnswers}/${totalQuestions}<br><br>Kelime Sonuçları:<br>`;
        document.getElementById("resultMessage").innerHTML = message_ + message;
        modal.style.display = "block";
    }

    // Modal kapatma
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    topFace.addEventListener("click", function () {
        if (box.classList.contains("open-top")) {
            box.classList.remove("open-top");
        }
        else {
            if(allWords.length>0){
                box.classList.toggle("open-top");
                createAsk();
            }
            else{
                showGameResult(correctNum, words.length*2,message);
            }
        }
    });

    addButton.addEventListener("click", function () {
        const englishWord = englishWordInput.value.trim();
        const turkishWord = turkishWordInput.value.trim();
        allWords.push(englishWord, turkishWord);
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

        const editButton = document.createElement("i");
        editButton.classList.add("fas", "fa-edit");
        editButton.style.marginRight = "3px";
        editButton.style.color="#e67e22";
        editButton.addEventListener("click", function () {
            editWord(word, li);
        });

        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fas", "fa-trash-alt");
        deleteButton.addEventListener("click", function () {
            deleteWord(word, li);
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        li.appendChild(buttonContainer);
        wordList.appendChild(li);
    }

    function editWord(word, li) {
        const newEnglishWord = prompt("Yeni İngilizce Kelime:", word.english);
        const newTurkishWord = prompt("Yeni Türkçe Kelime:", word.turkish);

        if (newEnglishWord && newTurkishWord) {
            word.english = newEnglishWord;
            word.turkish = newTurkishWord;
            li.firstChild.textContent = `${word.english} = ${word.turkish}`;
        }
    }

    function deleteWord(word, li) {
        const index = words.indexOf(word);
        if (index > -1) {
            words.splice(index, 1);
            wordList.removeChild(li);
        }
    }

    function createAsk(){
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            askEnglish = Math.random() > 0.5;
            answerText.innerText ="";
            //sorunun ingilizce mi türkçe mi sorulacağı random belirlendi
            if (askEnglish) {
                if(allWords.includes(currentWord.turkish)){
                    paper.textContent = currentWord.turkish;
                }
                else{
                    createAsk();
                }
            } else {
                if(allWords.includes(currentWord.english)){
                    paper.textContent = currentWord.english;
                }
                else{
                    createAsk();
                }
            }
        // 'paper' elemanının transition'u bittiğinde 'questionText' içeriğini güncelle
        paper.addEventListener('transitionend', function () {
            if (askEnglish) {
                questionText.textContent = `"${currentWord.turkish}" kelimesinin İngilizcesi nedir?`;
            } else {
                questionText.textContent = `"${currentWord.english}" kelimesinin Türkçesi nedir?`;
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

            createAsk();
            
        }
    });

    submitAnswerButton.addEventListener("click", function () {
        //başındaki ve sonundaki boşlukları temizle küçük harfe çevir
        const answer = userAnswer.value.trim().toLowerCase();
        let ask = paper.innerText;
        //aynı soru bir daha gelmemesi için çıkan soruyu sildim
        let index = allWords.indexOf(ask);
        if (index !== -1) {
            allWords.splice(index, 1);
        }
        //soru ingilizceyse ingilizceyi türkçeyse türkçeyi alıyo
        let correctAnswer = askEnglish ? currentWord.english.toLowerCase() : currentWord.turkish.toLowerCase();
        if (answer === correctAnswer) {
            answerText.innerText = "Correct Answer!"
            answerText.style.color = "green";
            correctNum++;
            message += askEnglish ? 
                ` ${currentWord.turkish} = ${currentWord.english} <span class="correct">✅</span><br> `: 
                `${currentWord.english} = ${currentWord.turkish} <span class="correct">✅</span><br>`;
        } else {
            answerText.innerText = "Wrong Answer!"
            answerText.style.color = "red";
            message += askEnglish ? 
                `${currentWord.turkish} = ${currentWord.english} <span class="incorrect">❌</span><br>` : 
                `${currentWord.english} = ${currentWord.turkish} <span class="incorrect">❌</span><br>`;
        }
        userAnswer.value = "";
        questionText.innerText ="";
        topFace.click();

    });

    
});
