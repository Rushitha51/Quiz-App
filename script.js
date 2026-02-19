const questions = [
    {
        question: "Which language is used for web styling?",
        answers: ["HTML", "CSS", "Java", "Python"],
        correct: 1
    },
    {
        question: "Which is not a JavaScript framework?",
        answers: ["React", "Angular", "Vue", "Django"],
        correct: 3
    },
    {
        question: "Which tag is used for JavaScript?",
        answers: ["<js>", "<script>", "<javascript>", "<code>"],
        correct: 1
    }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    resetState();
    let q = questions[currentQuestion];
    questionElement.innerText = q.question;

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.addEventListener("click", () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    optionsElement.innerHTML = "";
}

function selectAnswer(index) {
    const correctIndex = questions[currentQuestion].correct;
    const buttons = optionsElement.children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === correctIndex) {
            buttons[i].classList.add("correct");
        }
    }

    if (index === correctIndex) {
        score++;
    } else {
        buttons[index].classList.add("wrong");
    }

    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionElement.innerText = "Quiz Completed!";
    optionsElement.innerHTML = "";
    scoreText.innerText = "Your Score: " + score + "/" + questions.length;
    nextBtn.style.display = "none";
    restartBtn.classList.remove("hide");
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreText.innerText = "";
    restartBtn.classList.add("hide");
    loadQuestion();
});

loadQuestion();
