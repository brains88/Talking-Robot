const jokes = [
  ["Knock, knock", "Art", "R2-D2"],
  ["Knock, knock", "Shy", "Cyborg"],
  ["Knock, knock", "Anne", "Anne droid"],
  ["Why did the robot go to the bank?", "He'd spent all his cache"],
  ["Why did the robot go on holiday?", "To recharge her batteries"],
  ["What music do robots like?", "Heavy metal"],
  ["What do you call an invisible droid?", "C-through-PO"],
  ["What do you call a pirate robot?", "Argh-2D2"],
  ["Why was the robot late for the meeting?", "He took an R2 detour"],
  ["Why did R2D2 walk out of the pop concert?", "He only likes electronic music"],
  ["Why are robots never lonely?", "Because there R2 of them"],
  ["What do you call a frozen droid?", "An ice borg"]
];

let correct = -1;
const trivia = [
  {
    question: "What is 2 + 2?",
    correct: "4",
    incorrect: ["3", "5", "6"]
  },
  {
    question: "Who wrote the Three Laws of Robotics",
    correct: "Isaac Asimov",
    incorrect: ["Charles Darwin", "Albert Einstein", "Jules Verne"]
  },
  {
    question: "What actor starred in the movie 'I, Robot'?",
    correct: "Will Smith",
    incorrect: ["Keanu Reeves", "Johnny Depp", "Jude Law"]
  },
  {
    question: "What actor starred in the movie AI?",
    correct: "Jude Law",
    incorrect: ["Will Smith", "Keanu Reeves", "Johnny Depp"]
  },
  {
    question: "What does AI mean?",
    correct: "Artificial Intelligence",
    incorrect: ["Augmented Intelligence", "Australia Island", "Almond Ice-cream"]
  },
];

const flags = [
  {
    pattern: "linear-gradient(#AA151B 25%, #F1BF00 0 75%, #AA151B 0)",
    description: "3 vertical lines: red, yellow, red",
    correct: "Spain",
    incorrect: ["France", "Italy", "Germany"]
  },
  {
    pattern: "linear-gradient(to right, #002395 33.3%, #fff 0 66.6%, #ED2939 0)",
    description: "3 horizontal lines of equal size: blue, white, and red",
    correct: "France",
    incorrect: ["Spain", "Italy", "Germany"]
  },
  {
    pattern: "linear-gradient(to right, #008C45 33.3%, #F4F9FF 0 66.6%, #CD212A 0)",
    description: "3 horizontal lines of equal size: green, white, red",
    correct: "Italy",
    incorrect: ["Spain", "France", "Germany"]
  },
  {
    pattern: "linear-gradient(#000 33.3%, #d00 0 66.6%, #fc0 0)",
    description: "3 vertical lines of equal size: black, red, yellow",
    correct: "Germany",
    incorrect: ["Spain", "France", "Italy"]
  }
]

function talk(sentence, subtitles = true, language = "en-US") {
  document.querySelector(".mouth").classList.add("talking");
  let speech = new SpeechSynthesisUtterance();
  speech.text = sentence;
  speech.lang = language;
  if (subtitles) {
    document.querySelector("#subtitles").textContent = sentence;
  }
  speech.onend = function() {
    document.querySelector("#subtitles").textContent = "";
    document.querySelector(".mouth").classList.remove("talking");
  }
  window.speechSynthesis.speak(speech);
}

function hide(element) {
  document.querySelector(`#${element}`).classList.add("hidden");
}

function show(element) {
  document.querySelector(`#${element}`).classList.remove("hidden");
}

function tellJoke() {
  hide("menu");
  const jokeIndex = Math.floor(Math.random() * jokes.length);
  const joke = jokes[jokeIndex];
  joke.map(function(sentence, index) {
    setTimeout(function() { talk(sentence); }, index * 3000);
  });
  setTimeout("show('menu')", (joke.length - 1) * 3000 + 1000);
}

function answerTrivia(num) {
  if (num === correct) {
    talk("Yes! You got it right!")
  } else {
    talk("Oh, no! That wasn't the correct answer")
  }
  document.querySelector("#trivia h2").innerHTML = "";
  document.querySelector(".face").style.background = "";
  hide("trivia");
  show("menu");
}

function askTrivia() {
  hide("menu");
  document.querySelector("#subtitles").textContent = "";
  const questionIndex = Math.floor(Math.random() * trivia.length);
  const question = trivia[questionIndex];
  
  // fill in the data
  correct = Math.floor(Math.random() * 4);
  document.querySelector("#trivia h2").textContent = question.question;
  document.querySelector(`#trivia button:nth-child(${correct + 1})`).textContent = question.correct;
  for (let x = 0; x < 3; x++) {
    document.querySelector(`#trivia button:nth-child(${(correct + x + 1) % 4 + 1})`).textContent = question.incorrect[x];
  }
  
  talk(question.question, false);
  show('trivia');
}

function askFlag() {
  hide("menu");
  document.querySelector("#subtitles").textContent = "";
  const questionIndex = Math.floor(Math.random() * flags.length);
  const question = flags[questionIndex];
  
  // fill in the data
  correct = Math.floor(Math.random() * 4);
  document.querySelector("#trivia h2").innerHTML = `What country is this flag from? <span class='a11y-hidden'>${question.description}</span>` ;
  document.querySelector(`#trivia button:nth-child(${correct + 1})`).textContent = question.correct;
  document.querySelector(".face").style.background = question.pattern;
  for (let x = 0; x < 3; x++) {
    document.querySelector(`#trivia button:nth-child(${(correct + x + 1) % 4 + 1})`).textContent = question.incorrect[x];
  }
  
  talk(`What country is this flag from? ${question.description}`, false);
  show('trivia');
}