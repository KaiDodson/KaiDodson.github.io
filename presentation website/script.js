
let currentQuestion = 0;
let score1 = 0;
let score2 = 0;

// Track selections separately for each team
let selections = { team1: null, team2: null };

loadQuestion();

function loadQuestion() {
  const question = questions[currentQuestion];
  document.getElementById('question-text').textContent = question.question;

  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((btn, i) => {
    btn.textContent = question.answers[i].text;
    btn.className = 'answer-btn'; // reset classes
    btn.onclick = (e) => handleSelection(i, e);
  });

  // Reset selections
  selections = { team1: null, team2: null };
}

function handleSelection(index, e) {
  const team = e.shiftKey ? 'team2' : 'team1'; 
  // Use shift key: team1 = normal click, team2 = shift+click (easy for 2 presenters)
  
  if (selections[team] === index) {
    // Clicking same button again unselects
    selections[team] = null;
  } else {
    selections[team] = index;
  }

  updateSelectionUI();
}

function updateSelectionUI() {
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((btn, i) => {
    btn.className = 'answer-btn'; // reset

    const t1 = selections.team1 === i;
    const t2 = selections.team2 === i;

    if (t1 && t2) {
      btn.classList.add('both-selected');
    } else if (t1) {
      btn.classList.add('selected-team1');
    } else if (t2) {
      btn.classList.add('selected-team2');
    }
  });
}

// Navigation
document.getElementById('next-btn').onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
};
document.getElementById('prev-btn').onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

// Reveal answers
document.getElementById('reveal-btn').onclick = () => {
  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((btn, i) => {
    const correct = question.answers[i].correct;

    // Apply correct/wrong styling
    if (correct) btn.classList.add('correct');
    else btn.classList.add('wrong');

    // Update scores
    if (selections.team1 === i && correct) score1++;
    if (selections.team2 === i && correct) score2++;
  });

  document.getElementById('score1').textContent = score1;
  document.getElementById('score2').textContent = score2;
};
