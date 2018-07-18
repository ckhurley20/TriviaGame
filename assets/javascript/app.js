var triviaQuestions = [{
	question: "What year were the Patriots founded?",
	answerList: ["1965", "1950", "1960", "1955"],
	answer: 2
},{
	question: "What number draft pick was Tom Brady?",
	answerList: ["201", "199", "196", "197"],
	answer: 1
},{
	question: "How many Super Bowls have the Patriots played in?",
	answerList: ["7", "9", "8", "10"],
	answer: 3
},{
	question: "Who is the Patriots all time leading wide receiver?",
	answerList: ["Stanley Morgan", "Rob Gronkowski", "Wes Welker", "Troy Brown"],
	answer: 0
},{
	question: "Patriots head coaches Bill Belichick, Bill Parcells and Pete Carroll were all head coaches for what other NFL team?",
	answerList: ["Buffalo Bills", "Cleveland Browns", "New York Giants", "New York Jets"],
	answer: 3
},{
	question: "What was the 'New England Patriots' original name ?",
	answerList: ["Massachsetts Patriots", "New England Patriots", "Boston Patiots", "Bay State Patriots"],
	answer: 2
},{
	question: "What college did Tom Brady go to?",
	answerList: ["University Of California", "Michigan", "Notre Dame", "Michigan State"],
	answer: 1
},{
	question: "Which Patriots player, other than Tom Brady, has won a Super Bowl MVP?",
	answerList: ["Deion Branch", "Troy Brown", "James White", "Ben Coates"],
	answer: 0
},{
	question: "Who is the Patriots all time leading scorer?",
	answerList: ["Adam Vinatieri", "Rob Gronkowski", "Stephen Gostkowski", "Stanley Morgan"],
	answer: 2
},{
	question: "Who was the first owner of the Patriots?",
	answerList: ["Robert Kraft", "Victor Kiam", "James Orthwein", "Billy Sullivan"],
	answer: 3
}];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Thats correct, nice job!",
	incorrect: "Aw Rats, that's not it!",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}