const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $answers = document.querySelectorAll(".answer");

let currentQuestionIndex = 0;
let totalCorrect = 0;

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
    $startGameButton.classList.add("hide");
    $questionsContainer.classList.remove("hide");
    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();

    if (questions.length === currentQuestionIndex) {
    return finishGame();
    }

    $questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((answer) => {
    const newAsnwer = document.createElement("button");
    newAsnwer.classList.add("button", "answer");
    newAsnwer.textContent = answer.text;
    if (answer.correct) {
        newAsnwer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAsnwer);

    newAsnwer.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class");
    $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++;
    } else {
        document.body.classList.add("incorrect");
    }

    document.querySelectorAll(".answer").forEach((button) => {
        button.disabled = true;

    if (button.dataset.correct) {
        button.classList.add("correct");
    } else {
        button.classList.add("incorrect");
    }
    });

    $nextQuestionButton.classList.remove("hide");
    currentQuestionIndex++;
}

function finishGame() {
    const totalQuestions = questions.length;
    const performance = Math.floor((totalCorrect * 100) / totalQuestions);

    let message = "";

    switch (true) {
        case performance >= 90:
        message = "Excelente :)";
        break;
        case performance >= 70:
        message = "Muito bom :)";
        break;
        case performance >= 50:
        message = "Bom";
        break;
        default:
        message = "Pode melhorar :(";
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
        Você acertou ${totalCorrect} de ${totalQuestions} questões!
        <span>Resultado: ${message}</span>
        </p>
        <button 
        onclick=window.location.reload() 
        class="button"
        >
        Refazer teste
        </button>
    `;
}

const questions = [
    {
        question: "Qual função utilizamos para inicializar a configuração do Grunt?",
        answers: [
        { text: "grunt.Config()", correct: false },
        { text: "grunt.init()", correct: false },
        { text: "grunt.initConfig()", correct: true },
        { text: "grunt-Config()", correct: false },
        ],
    },
    {
    question: "Qual função utilizamos para arredondar um número para baixo, ou seja, considerar apenas a parte inteira do número?",
    answers: [
        { text: "Math.floor(4.52)", correct: true },
        { text: "Math&floor(4.52)", correct: false },
        { text: "Math(4.52)", correct: false },
        { text: "floor(4.52)", correct: false },
    ],
    },
    {
    question:
        'Qual função utilizamos para carregar um plugin no Grunt?',
    answers: [
        { text: 'grunt.loadNpmTasks("nome")', correct: true },
        { text: 'grunt.loadTasks("nome")', correct: false },
        { text: 'grunt.loadNpm("nome")', correct: false },
        { text: 'grunt.loadNpmTasks("nome")', correct: false },
    ],
    },
    {
        question: "Sobre a execução de tarefas em paralelo é correto afirmar que:",
        answers: [
        { text: "São possíveis através do plugin grunt-concurrent", correct: true },
        { text: "São possíveis através do plugin grunt-config", correct: false },
    ],
    },
    {
        question: 'Qual função utilizamos para arredondar um número para baixo, ou seja, considerar apenas a parte inteira do número?',
        answers: [
        { text: 'Math-floor(4.52)', correct: false },
        { text: 'Math.floor(4.52)', correct: true },
        { text: 'Math(4.52)', correct: false },
        { text: 'floor(4.52)', correct: false },
        ],
    },
    {
        question: "Qual plugin utilizamos para comprimir código JavaScript no Grunt?",
        answers: [
        { text: "grunt-uglify", correct: false },
        { text: "grunt-contrib-uglify", correct: true },
        { text: "grunt-contrib", correct: false },
        { text: "grunt uglify", correct: false },
        ],
    },
    {
        question: 'Como informamos ao plugin grunt-replace o campo que ele deverá substituir?',
        answers: [
        { text: "adicionando $$ antes do nome do campo", correct: false },
        { text: "adicionando ++ antes do nome do campo", correct: false },
        { text: "adicionando && antes do nome do campo", correct: false },
        { text: "adicionando @@ antes do nome do campo", correct: true },
        ],
    },
];
