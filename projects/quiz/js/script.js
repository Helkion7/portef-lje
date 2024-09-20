const quizKonteirer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const score = document.getElementById("score");
const username = document.getElementById("username");

const storedHighScores = localStorage.getItem("highScores");
if (storedHighScores) {
  const highScores = JSON.parse(storedHighScores);
  highScores.forEach((score, index) => {
    console.log(`${index + 1}. ${score.name}: ${score.score}`);
    document.getElementById("scoreCard").innerHTML += `${index + 1}. ${
      score.name
    }: ${score.score}<br>`;
  });
} else {
  document.getElementById("scoreCard").innerHTML += `No highscores found`;
}

let mongolianGeographyQuiz = {
  1: {
    question: "What is the capital city of Mongolia?",
    choices: ["Ulaanbaatar", "Hohhot", "Astana", "Tbilisi"],
    answer: "Ulaanbaatar",
  },
  2: {
    question: "Which of the following is the largest lake in Mongolia?",
    choices: [
      "Khar Nuur",
      "Uvs Nuur",
      "Khövsgöl Nuur",
      "Terkhiin Tsagaan Nuur",
    ],
    answer: "Uvs Nuur",
  },
  3: {
    question: "Mongolia shares its southern border with which country?",
    choices: ["Russia", "China", "Kazakhstan", "Kyrgyzstan"],
    answer: "China",
  },
  4: {
    question: "What is the predominant geographic feature in the Gobi Desert?",
    choices: ["Sand dunes", "Rocky mountains", "Grasslands", "Salt flats"],
    answer: "Sand dunes",
  },
  5: {
    question: "Which mountain range forms the northern border of Mongolia?",
    choices: [
      "Altai Mountains",
      "Himalayas",
      "Ural Mountains",
      "Caucasus Mountains",
    ],
    answer: "Altai Mountains",
  },
  6: {
    question: "What is the largest national park in Mongolia?",
    choices: [
      "Gorkhi-Terelj National Park",
      "Khustain Nuruu National Park",
      "Bogd Khan Uul National Park",
      "Great Gobi National Park",
    ],
    answer: "Great Gobi National Park",
  },
  7: {
    question: "In which aimag (province) is the Khövsgöl Nuur located?",
    choices: [
      "Khövsgöl Aimag",
      "Arkhangai Aimag",
      "Uvs Aimag",
      "Zavkhan Aimag",
    ],
    answer: "Khövsgöl Aimag",
  },
  8: {
    question: "What is the highest point in Mongolia?",
    choices: ["Otgon Tenger", "Khüiten Peak", "Nairandal Peak", "Tavan Bogd"],
    answer: "Tavan Bogd",
  },
  9: {
    question: "Which desert is located in the southern part of Mongolia?",
    choices: [
      "Gobi Desert",
      "Karakum Desert",
      "Taklamakan Desert",
      "Dasht-e Kavir",
    ],
    answer: "Gobi Desert",
  },
  10: {
    question: "What river flows through the capital city, Ulaanbaatar?",
    choices: ["Tuul River", "Selenge River", "Orkhon River", "Kherlen River"],
    answer: "Tuul River",
  },
};

let points = 0;
let count = 1;
let numberOfInput = 0;

function startQuiz() {
  document.querySelector(".card").style.display = "none";
  document.querySelector(".quizWrapper").style.display = "flex";
  document.getElementById("startQuiz").style.display = "none";
  document.querySelector(".submitBtn").style.display = "none";
  document.getElementById("scoreCard").style.display = "none";

  for (const key in mongolianGeographyQuiz) {
    if (Object.hasOwnProperty.call(mongolianGeographyQuiz, key)) {
      if (key == count) {
        const element = mongolianGeographyQuiz[key];
        let question = element.question;
        document.getElementById(
          "question"
        ).innerHTML += `<h1>${question}</h1><br>`;
        let optionsArray = element.choices;

        optionsArray.forEach((option) => {
          document.getElementById("quiz").innerHTML += `<div class="radio">
          <div class="radioBtnWhole">
          <div class="radioBtn">
              <input type="radio" name="${question}" id="${option}" value="${option}">
          </div>
          <div class="labelRadio">
            <label for="${option}">${option}</label>
          </div>
          </div>
          </div>`;
        });
        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
          radio.addEventListener("change", function (e) {
            // console.log("dette er det som skjer", e.target.id);
            let id = e.target.id;

            if (numberOfInput < 1) {
              if (this.value === mongolianGeographyQuiz[count].answer) {
                document
                  .getElementById(id)
                  .parentElement.parentElement.setAttribute("class", "correct");
                points += 10;
                console.log("points:", points);
                numberOfInput++;
              } else {
                numberOfInput++;
                if (this.value !== mongolianGeographyQuiz[count].answer) {
                  document
                    .getElementById(id)
                    .parentElement.parentElement.classList.add("incorrect");
                  if (points > 0) {
                    points -= 10;
                    console.log("points:", points);
                  }
                }
              }
            } else {
              console.log("youve already clicked one of the inputs");
            }
          });
        });
      }
    }
  }
  if (count == 10) {
    document.querySelector(".nextBtn").style.display = "none";
    document.querySelector(".submitBtn").style.display = "flex";
  }
}

function checkAnswer() {}

function handleQuestion() {
  count++;
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("question").innerHTML = "";
  startQuiz();
  numberOfInput = 0;
}

function submit() {
  document.querySelector(".quizWrapper").style.display = "none";
  document.querySelector(".submitBtn").style.display = "none";
  document.querySelector(".card:nth-child(1)").style.display = "flex";
  document.getElementById("scoreCard").style.display = "flex";
  document.querySelector(".highscore").style.display = "flex";
  document.querySelector(
    ".card:nth-child(1)"
  ).innerHTML = `<h2>You scored <br> ${points}/100</h2>`;
}

function submitScore() {
  let username = document.getElementById("username").value;
  if (username == "") {
    alert("Please enter your username");
  } else {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ name: username, score: points });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores.slice(0, 10)));
    document.querySelector(".card:nth-child(1)").style.display = "none";
    document.querySelector(".highscore").style.display = "none";
    document.querySelector(".submitBtn").style.display = "none";
    location.reload();
  }
}
