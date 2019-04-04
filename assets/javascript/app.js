$(document).ready(function() {
    var audio = new Audio("assets/audio/Doug_Theme_Song.mp3.crdownload");
    var audioWrongAns = new Audio("assets/audio/horn.ogg");
    var audioCorrect = new Audio("assets/audio/correct.wav");
    //object variables we will use in our functions below.
    var game = {
        correct: 0, // to hold the number of correct answers when we display our results page.
        incorrect: 0, // to hold the # of incorrect answers for the results page.
        unAnswered: 0, // holds any unanswered questions for the results page.
        time: 15, // our timer variable for how long the user has to answer each question.
        count: 0, // *IMPORTANT* this variable acts as our index number for each array questions, choices & answers.  Our functions use this number to pull the correct coresponding sub-array elements for every new question.
        runTimer: false, // *IMPORTANT* this variable acts as a stoper to stop our clock when the user will submit an answer or when time runs out on our clock. Initial value of false keeps the timer from running until the appropriate function is called to begin timer later.
        currentChoices:'',
        arrayLength: 4, // variable created to stop our game when we reach end of array length.
        // object array for each of our question we will loop through in our questions function to display them individually to our user for the game logic.
        questions: [
            "What is Doug's dog's name?",
            "Who is the main bully in the show?",
            "Who does Doug have a crush on?",
            "What is the name of the famous band in the show?",
            "Doug's dog's dog house is what?",
        ],
        // object array of our corresponding chocies at the same index of our questions array object.
        choices: [
            ["Spot", "Hambone", "Porkchop", "Spike"],
            ["Ned", "Boomer", "Roger", "Skeeter"],
            ["Beebe", "Loretta", "Connie", "Patti"],
            ["Banging on a Trash Can", "The Beets", "Killer Tofu", "Beautify Bluffington"],
            ["a shed", "igloo", "doesn't have one", "outhouse"],
        ],
        // object array of our corresponding choices at the same index of our questions & choices array objects.
        answers: [
            "Porkchop",
            "Roger",
            "Patti",
            "The Beets",
            "igloo",
        ],
    };

    // create a variable to display the instructions of the game to the user and puts in a <p> elements.
    var instructions = $("<p></p>").text("Welcome to a trivia game on the Nickelodeon TV show Doug Funnie.  You will have 15 seconds to answer each question before time runs out.  Your score will be displayed once you finish the quiz.  Good luck!");
    // create 'id= info' for styling in CSS.
    instructions.attr("id", "info");
    // create the text that will be displayed to the user of our instructions variable by appending to the html div elements 'id=question'.
    $("#question").append(instructions);

    // button we create on our instructions page to begin the game on button click.
    $("#start").on("click", start);
    
    // function that is called when we click our button to hide everything on the current page and call the nextQuestion function to start displaying our questions to the user.
    function start() {
        game.count = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unAnswered = 0;
        game.runTimer = false;
        game.currentChoices = '';
        setTimeout(() => {
            audio.play();
        }, 1300);
            

        // animation on hide event.
        var openingImg = $("<div>");
        openingImg.attr("id", "opening");
        openingImg.addClass("img-fluid");
        openingImg.append("<img src='assets/images/opening.gif' width='300px'>")
        $(instructions).append(openingImg)   
        setTimeout(() => {
            $(instructions).hide("slow");
        }, 1500);
        // hides our start game button. will use a submit answer button for the questions page.
        $('#start').hide();
        // we use a setTimeout function to wait till our animations complete on hiding before we call our nextQuestion function.
        setTimeout(() => {
            nextQuestion(); 
        }, 2000);
    };
    
    // function that controls our questions and displays them in our div element in our html @ id=question
    function nextQuestion() { 
        console.log(game.count);
        $('#question').empty();
        if (game.count > game.arrayLength) {
            console.log(game.count)
            results();
            return;
            
        };
        currentChoices = '';
        // first we create new div to append our questions to.
        var newQuestion = $('<div>');
        // create a new variable to only get the array element position of our multiple game.questions array      
        var currentQuestion = game.questions[game.count];
        // add a bootstrap class element for styling
        newQuestion.addClass("container");
        // adding a specific 'id' element for styling in CSS.
        newQuestion.attr("id", "quest");
        // creating the text format of how our questions will appear to the user.
        // game.count+1  will display the number of the question user is currently on by using our global count varibale which acts as our indeces for our array varibales later, so we add 1 to the start since it begins at 0.
        newQuestion.text("Question " + (game.count+1) + ": " + currentQuestion);
        // game.time resetting variable to begin a new for each question.
        game.time = 15;
        // creatting the div element to display our time to our user.
        var timer = $('<div>');
        // all class container and 'id' timer for styling.
        timer.addClass("container");
        timer.attr("id", "timer");
        // formatting to display the timer to our user.
        timer.text("Time Remaining: " + game.time);
        // adds the time to our html div element @ 'id=question'.
        $('#question').append(timer, newQuestion);

        // loop through our answer choices array and appends radio buttons for each element in the array[i].
        // We create a varibale currentChoices and set it = to the array object at position 0 to begin with, this position changes as our count variable is incremented as we move through each question.
        
        for (var i = 0; i < game.choices.length; i++) {
            game.currentChoices = game.choices[game.count];
            console.log(currentChoices)

            // once currentChoices = array object of current [game.count] we run a for loop which is the second time looping through our object array of game.choices.
            // Pulls the array values at coresponding index positions and creates radio buttons for each element of the array.
            for (var i = 0; i < game.currentChoices.length; i++) {
                // Bootstrap element with modifications to input "id" & class "id" giving it our position variable [i] of the array of current game.chocies.
                var radioBtn = '<div class="custom-control custom-radio"><input type="radio" id="customRadio'+i+'" name="customRadio" class="custom-control-input"><label class="custom-control-label" id="customRadio'+i+'" for="customRadio'+i+'">'+game.currentChoices[i]+'</label><br></div>';
                // creates the buttons in our html div at 'id=questions'.
                $('#question').append(radioBtn);
            }
        
        }
        controlTimer(); // Here we call our timer function to begin the count down when our questions appear in the div.


        submitBtn = $('<input class="btn btn-primary" type="submit" value="Submit">');
        submitBtn.attr("id", "submitChoice");
        $('#buttonLocation').append(submitBtn);
        $(submitBtn).on("click", stopTimer);
        $(submitBtn).on("click", checkAnswer);
        console.log(game.runTimer)
        
    };
    // create button elements to submit choice

    // function to check answers input from radio button.
    function checkAnswer() {
        var rightAnswer;
        var userChoice;
        var wrong = $('<div id="wrongAns">');
        wrong.addClass("embed-responsive");
        var right = $('<div id="rightAnsDisplay">');
        right.addClass("embed-responsive");
        rightAnswer = game.answers[game.count];
        console.log(rightAnswer)
        userChoice = $('input:radio:checked').next('label:first').html()
        console.log(userChoice)
        if (userChoice === rightAnswer) {
            game.correct++;
            console.log(game.correct)
            game.runTimer = false;
            right.append('<div>CORRECT!</div>');
            right.append("<img src='assets/images/correctAnswer.gif' width='200px'>");
            $('#question').append(right);
            audioCorrect.play();
            $('#buttonLocation').empty();
            setTimeout(() => {
                game.count++;
                nextQuestion();
            }, 3000);
            console.log(game.correct)
        } else if (userChoice !== rightAnswer) {
            game.incorrect++;
            game.runTimer = false;

            wrong.append('<div>WRONG!</div>');
            wrong.append("<img src='assets/images/wrong.gif' width='180px'>")
            
            $('#buttonLocation').empty();
            setTimeout(() => {
                showAnswer();
                $('#question').append(wrong);
                audioWrongAns.play();
            }, 500);
            setTimeout(() => {
                game.count++;
                nextQuestion();

            }, 3000);
            console.log(game.incorrect)
        }
        
    }

    var intervalId;
    // this function controls the speed of our timer count by 1 second with a setInterval variable.
    function controlTimer() {
        if (!game.runTimer) {
            intervalId = setInterval(decrimentTimer, 1000);
              game.runTimer = true;
              decrimentTimer();
          }
    };
    // function that reduces our timer variable by 1 and edits our variables to hold unAnswered questions when time runs out.
    function decrimentTimer() {
        var dontKnImg = $("<div>");
        dontKnImg.addClass("embed-responsive");
        $(dontKnImg).append("<img src='assets/images/stumped.gif' width='200px'>");
        if (game.runTimer = true) {
            game.time--;
            $("#timer").text("Time Remaining: " + game.time);
        }
        if (game.time === 0) {
            stopTimer();
            game.unAnswered++;
            $('#question').append(dontKnImg);
            audioWrongAns.play();
            
            $("#timer").empty();
            showAnswer();
            game.count++;
            setTimeout(() => {
                $('#question').empty();
                $('#buttonLocation').empty();
                nextQuestion(); 
            }, 3000);
        }

    };   
    // function to stop the current question timer of our variable game.runTimer and clear the count down clock.
    function stopTimer() {
        clearInterval(intervalId);
        game.runTimer = false;
        
    };
    // function to display the correct answer when out of time
    function showAnswer() {
        var displayAns = $('<div>');
        var ans = $('<div>');
        ans.attr('id', 'correctAns');
        displayAns.text("The correct answer is: " + game.answers[game.count]);
        $('#quest').prepend(displayAns);
        
    };
    function results() {
        $('#question').empty();
        var endGame = $('<div>');
        var resultsDiv = $('<div>');
        var endSong = $('<iframe width="400" height="300" src="https://www.youtube.com/embed/a-Pj2aDQ6bs?controls=0?&autoplay=1" " frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        endSong.addClass("embed-responsive");
        endGame.addClass('container');
        endGame.attr('id', 'results');
        resultsDiv.text("Here is how you stack up: ");
        resultsDiv.append('<div>' + "You got " + game.correct + " correct" + '</div>');
        resultsDiv.append('<div>' + "You missed " + game.incorrect + " questions" + '</div>');
        resultsDiv.append('<div>' + "You did not answer " + game.unAnswered + " questions" + '</div>');
        $(endGame).append(endSong);
        $(endGame).append(resultsDiv);
        $('#question').append(endGame);
        $('#question').append('<button type="button" class="btn btn-primary btn-lg" id="tryAgain">Try Again?</button>');
        $("#tryAgain").on("click", start);
    }
});