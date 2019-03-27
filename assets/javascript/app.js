$(document).ready(function() {
    //object variables we will use in our functions below.
    var game = {
        correct: 0, // to hold the number of correct answers when we display our results page.
        incorrect: 0, // to hold the # of incorrect answers for the results page.
        unAnswered: 0, // holds any unanswered questions for the results page.
        time: 5, // our timer variable for how long the user has to answer each question.
        count: 0, // *IMPORTANT* this variable acts as our index number for each array questions, choices & answers.  Our functions use this number to pull the correct coresponding sub-array elements for every new question.
        runTimer: false, // *IMPORTANT* this variable acts as a stoper to stop our clock when the user will submit an answer or when time runs out on our clock. Initial value of false keeps the timer from running until the appropriate function is called to begin timer later.
        // object array for each of our question we will loop through in our questions function to display them individually to our user for the game logic.
        questions: [
            "What is Doug's dog's name?",
            "Who is the main bully is the show?",
            "Who does Doug have a crush on?",
            "What is the name of the famous band in the show?",
        ],
        // object array of our corresponding chocies at the same index of our questions array object.
        choices: [
            ["Spot", "Hambone", "Porkchop", "Spike"],
            ["Ned", "Boomer", "Roger", "Skeeter"],
            ["Beebe", "Loretta", "Connie", "Patti"],
            ["Banging on a Trash Can", "The Beets", "Killer Tofu", "Beautify Bluffington"],
        ],
        // object array of our corresponding choices at the same index of our questions & choices array objects.
        answers: [
            ["Porkchop"],
            ["Roger"],
            ["Patti"],
            ["The Beets"],
        ],
    };
    // create a variable to display the instructions of the game to the user and puts in a <p> elements.
    var instructions = $("<p></p>").text("Welcome to a trivia game on the Nickelodeon TV show Doug Funny.  You will have 20 seconds to answer each question before time runs out.  Your score will be displayed once you finish the quiz.  Good luck!");
    // create 'id= info' for styling in CSS.
    instructions.attr("id", "info");
    // create the text that will be displayed to the user of our instructions variable by appending to the html div elements 'id=question'.
    $("#question").append(instructions);

    // button we create on our instructions page to begin the game on button click.
    $("#start").on("click", start);
    // function that is called when we click our button to hide everything on the current page and call the nextQuestion function to start displaying our questions to the user.
    function start() {
        // animation on hide event.
        $(instructions).hide("slow");
        // hides our start game button. will use a submit answer button for the questions page.
        $('#start').hide();
        // we use a setTimeout function to wait till our animations complete on hiding before we call our nextQuestion function.
        setTimeout(() => {
            nextQuestion(); 
        }, 1000);
    };
    
    // function that controls our questions and displays them in our div element in our html @ id=question
    function nextQuestion() { 
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
        game.time = 5;
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
            var currentChoices = game.choices[game.count];
            console.log(currentChoices)
            // once currentChoice = array object of current [game.count] we run a for loop which is the second time looping through our object array of game.choices.
            // Pulls the array values at coresponding index positions and creates radio buttons for each element of the array.
            for (var i = 0; i < currentChoices.length; i++) {
                // Bootstrap element with modifications to input "id" & class "id" giving it our position variable [i] of the array of current game.chocies.
                var radioBtn = '<div class="custom-control custom-radio"><input type="radio" id="customRadio'+i+'" name="customRadio" class="custom-control-input"><label class="custom-control-label" id="customRadio'+i+'" for="customRadio'+i+'">'+currentChoices[i]+'</label></div>';
                // creates the buttons in our html div at 'id=questions'.
                $('#question').append(radioBtn);
            }
        
        }
        controlTimer(); // Here we call our timer function to begin the count down when our questions appear in the div.
    };

    var IntervalId;
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
    game.time--;
    $("#timer").text("Time Remaining: " + game.time);
        if (game.time === 0) {
            stopTimer();
            game.unAnswered++;
            game.count++;
            showAnswer();
            setTimeout(() => {
                $('#question').empty();
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

        setTimeout(() => {
            displayAns.text("The correct answer is: ");
            $('#quest').append(displayAns);
        }, 1000);
        
    };

    // function reset() {
    //     correct = 0;
    //     incorrect = 0;
    //     time = 20;
    //     count = 0;
    //     runTimer = false;
    // }
});