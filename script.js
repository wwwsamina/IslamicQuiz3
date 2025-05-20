const questions = [
    {
        question: "What is the reward for reciting Surah Ikhlas 10 times?",
        answers: [
            { text: "Your duas accepted", correct: false},
            { text: "All your sins are forgiven", correct: false},
            { text: "A palace in Paradise", correct: true},
            { text: "You get the reward of performing Hajj", correct: false},
        ]
    },
    {
        question: "How many Prophets are mentioned by name in the Quran?",
        answers: [
            { text: "23", correct: false},
            { text: "21", correct: false},
            { text: "25", correct: true},
            { text: "24", correct: false},
        ]
    },
    {
        question: "What was the relation between Prophet Musa (A.S) and Prophet Haroon (A.S)?",
        answers: [
            { text: "Neighbours", correct: false},
            { text: "Companions", correct: false},
            { text: "Father and Son", correct: false},
            { text: "Brothers", correct: true},
        ]
    },
    {
        question: "Which name of Allah (S.W.T) means the all forgiving?",
        answers: [
            { text: "Al-Ghaffar", correct: true},
            { text: "Al-Rahim", correct: false},
            { text: "Al-Hakeem", correct: false},
            { text: "Al-Malik", correct: false},
        ]
    },
    {
        question: "What Surah is about 'The Ornaments of Gold'?",
        answers: [
            { text: "Ar-Furqan", correct: false},
            { text: "Az-Zukhruf", correct: true},
            { text: "Al-Mulk", correct: false},
            { text: "Al-Qadr", correct: false},
        ]
    }   
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();