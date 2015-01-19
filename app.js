(function() {

  var questions = [
    { "q": "True or False - Tigers are an endangered species", "options": ["True", "False"], "answer": "True", "explanation": "Tigers are in fact endangered - It is estimated that less than 3200 tigers exist in the wild today." },
    { "q": "How many subspecies of tigers are there today?", "options": ["4", "5", "6", "8"], "answer": "6", "explanation": "Tiger subspecies alive today include: Bengal, Indochinese, Malayan, South-China, Sumatran, and Amur (Siberian) tigers." },
    { "q": "In the last 80 years, how many subspecies of tigers have gone extinct?", "options": ["0", "2", "3", "5"], "answer": "3", "explanation": "The Bali, Caspian, and Javan tigers have all gone extinct within the last 80 years." },
    { "q": "Albino tigers are the same thing as white tigers?", "options": ["True", "False"], "answer": "False", "explanation": "Mammals that are albino have no pigment in their skin and tend to have pink eyes, White tigers have skin pigment but just have white fur." },
    { "q": "True or False - White tigers only exist within the Bengal tiger subspecies", "options": ["True", "False"], "answer": "True", "explanation": "This is true, only the Bengal subspecies has white tigers." },
    { "q": "True or False - Tigers are the only species within the Felidae family of cats that can swim", "options": ["True", "False"], "answer": "False", "explanation": "This is false. All species within the Felidae family of cats can swim. Tigers however are the only species known that like being in the water." },
    { "q": "True or False - White tigers are common in the wild.", "options": ["True", "False"], "answer": "False", "explanation": "White tigers are more common in captivity than in the wild." },
    { "q": "The tiger is considered to be the largest of all cats. Which physical trait is the reason for this?", "options": ["Length from nose to tail", "Overall body mass", "Height when standing on hind legs", "Height from the ground to the top of the shoulders"], "answer": "Height from the ground to the top of the shoulders", "explanation": "When measuring from the ground to the top of the shoulders, tigers rank just ahead of the African Lion." }
  ];

  var counter = 0,
      totalCorrect = 0,
      totalWrong = 0,
      wasLastQuestionCorrect = false,
      answer = $("#submit"),
      choices = $("#choices"),
      questionText = $("#questions h2"),
      currentQuestionNumber = $("#current-question"),
      score = $("#score"),
      correctMsg = $("#correct-msg"),
      explanationMsg = $("#explanation"),
      overlayBackground = $("#overlay-background"),

      checkAnswer = function() {
        var selectedAnswer = $("input[type='radio']:checked").val();

        // when user selects correctly, display Correct! message
        if (selectedAnswer == questions[counter].answer) {
          totalCorrect++;

          // check if this was last question
          if (counter == (questions.length-1)) {
            wasLastQuestionCorrect = true;
          }

          correctMsg.show().delay(900).fadeOut(500);
          overlayBackground.show().delay(890).fadeOut(500);
        } 
        // when user selects incorrectly, display explanation message
        else {
          totalWrong++;

          explanationMsg.text(questions[counter].explanation);
          explanationMsg.show().delay(3000).fadeOut(700);
          overlayBackground.show().delay(2900).fadeOut(700);
        }

        // move on to the next question
        nextQuestion();
      },

      nextQuestion = function() {    

        // update the current question number
        counter++;

        // display the next questions when we haven't reach the end of the array
        if (counter < questions.length) {
          currentQuestionNumber.text(counter+1);

          updateQuestion();
        }
        // we've reached the end of the available questions, show results 
        else {
          currentQuestionNumber.text(counter);
          showResults();
        }
      },

      showResults = function() {
        score.html("<p>You've reached the end of the quiz. Your results are:</p>" +
                   "<ul><li>Total Correct: " + totalCorrect + "</li>" +
                   "<li>Total Wrong: " + totalWrong + "</li>" + 
                   "</ul><p>Your score is: " + ((totalCorrect / questions.length) * 100) + "%</p>" +
                   "<input type='button' value='Play Again?' id='play-again'>");
        
        // last question result was wrong, wait for explanation to disappear
        if (!wasLastQuestionCorrect) {
          setTimeout(function() {
            score.show();
          }, 3001); 
        } 
        // last question result was correct, no need to wait here
        else {
          score.show();
        }
      },

      updateQuestion = function() {
        // update the question text
        questionText.text(questions[counter].q);

        // display the choices available for this new question
        var newChoices = '';
        questions[counter].options.forEach(function(entry) {
          newChoices += "<input type='radio' name='choice' value='" + entry + "'>" + entry + "<br>";
        });

        choices.html(newChoices + '<input type="submit" value="Am I Right?" id="submit">');
      };
  

  choices.on('submit', function(event) {
    event.preventDefault();
    checkAnswer();
  });

  $("#score").on('click', "input[type='button']", function() {
    counter = 0;
    totalCorrect = 0;
    totalWrong = 0;
    wasLastQuestionCorrect = false;
    updateQuestion();
    currentQuestionNumber.text(counter+1);  
    overlayBackground.hide();
    score.hide();
  });

})();