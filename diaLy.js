const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const selectNumberOfQuestion = document.getElementById("question-num");

startButton.addEventListener("click", startGame);
let shuffledQuestions, currentQuestionIndex, subject;
let numberOfQuestions = 10;
let score = 0;
nextButton.addEventListener("click", ()=> {
	currentQuestionIndex++;
	setNextQuestion();
});
selectNumberOfQuestion.addEventListener("click", chooseNumberOfQuestion);
function chooseNumberOfQuestion(e) {
	const num = e.target;
	console.log(num.id);
	if(num.id == 'ten') {
		numberOfQuestions = 10;
	} else if(num.id == 'twenty') {
		numberOfQuestions = 20;
	} else if(num.id == 'thirty') {
		numberOfQuestions = 30;
	}
	num.classList.add('correct');
	selectNumberOfQuestion.removeEventListener("click", chooseNumberOfQuestion);

}

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function startGame() {
	score = 0;
	console.log("started");
	startButton.classList.add("hide");
	scoreElement.classList.remove("hide");
	selectNumberOfQuestion.classList.add("hide");

	questionContainer.classList.remove("hide");
	shuffledQuestions = shuffle(questList).slice(0,numberOfQuestions);
	currentQuestionIndex = 0;
	setNextQuestion();

}
function restartGame() {
	location.reload();
}
function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
	nextButton.classList.add('hide');
}
function showQuestion(quest) {
	questionElement.innerText = quest.question;
	shuffle(quest.answers).forEach(answer => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		if(answer.correct) {
			button.dataset.correct = answer.correct;
		}	
		button.addEventListener("click", selectAns);
		answerButtonsElement.appendChild(button);
	});
	
}
function resetState() {
	while(answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}

}
function selectAns(e) {
	const selectedButton = e.target;
	setStatusClass(selectedButton, selectedButton.dataset.correct);
	if(selectedButton.dataset.correct) score++;
	Array.from(answerButtonsElement.children).forEach(button => {
		if(button.dataset.correct) {
			setStatusClass(button, button.dataset.correct);
		}
		
	});
	if(numberOfQuestions > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	} else {
		const restartButton = document.createElement("button");
		restartButton.innerText = "Restart";
		restartButton.classList.add("btn");
		restartButton.classList.remove("hide");
		restartButton.addEventListener('click', restartGame);
		document.getElementById("controler").appendChild(restartButton);
		nextButton.classList.add("hide");
	}
	scoreElement.textContent = "Đúng: " + score + "/" + (currentQuestionIndex+1);
}
function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add("correct");
	} else {
		element.classList.add("wrong");
	}
}
function clearStatusClass(element) {
	element.classList.remove("correct");
	element.classList.remove("wrong");
}

let diaLy = `[
	{
		"question":"Chiều dài đường bờ biển của Việt Nam là ?",
		"answers": [
			{"text":"3260km", "correct": true},
			{"text":"3970km", "correct": false},
			{"text":"3320km", "correct": false},
			{"text":"3550km", "correct": false}
		]
	},
	{
		"question":"Số thành phố trực thuộc trung ương của Việt Nam hiện nay là",
		"answers": [
			{"text":"4", "correct": false},
			{"text":"7", "correct": false},
			{"text":"6", "correct": false},
			{"text":"5", "correct": true}
		]
	},
	{
		"question":"Việt Nam có tổng cộng bao nhiêu thành phố?",
		"answers": [
			{"text":"65", "correct": false},
			{"text":"63", "correct": false},
			{"text":"80", "correct": false},
			{"text":"85", "correct": true}
		]
	},
	{
		"question":"Số thành phố trực thuộc tỉnh của Việt Nam là",
		"answers": [
			{"text":"79", "correct": true},
			{"text":"75", "correct": false},
			{"text":"69", "correct": false},
			{"text":"63", "correct": false}
		]
	},
	{
		"question":"Tỉnh/TP trực thuộc trung ương nào có nhiều thành phố nhất?",
		"answers": [
			{"text":"TPHCM", "correct": false},
			{"text":"Hà Nội", "correct": false},
			{"text":"Quảng Ninh", "correct": true},
			{"text":"Bình Dương", "correct": false}
		]
	},
	{
		"question":"Diện tích của Việt Nam là ?",
		"answers": [
			{"text":"329.818km^2", "correct": false},
			{"text":"331.212km^2", "correct": true},
			{"text":"330.010km^2", "correct": false},
			{"text":"330.950km^2", "correct": false}
		]
	},
	{
		"question":"Độ dài biên giới trên đất liền của Việt Nam là?",
		"answers": [
			{"text":"4378km", "correct": false},
			{"text":"3260km", "correct": false},
			{"text":"3570km", "correct": false},
			{"text":"4639km", "correct": true}
		]
	},
	{
		"question":"Vị trí hẹp nhất từ Đông sang Tây trên lãnh thổ Việt Nam thuộc địa phận tỉnh nào ?",
		"answers": [
			{"text":"Hà Tĩnh", "correct": false},
			{"text":"Quảng Bình", "correct": true},
			{"text":"Thừa Thiên-Huế", "correct": false},
			{"text":"Quảng Nam", "correct": false}
		]
	},
	{
		"question":"Việt Nam có mấy vùng kinh tế - xã hội?",
		"answers": [
			{"text":"5", "correct": false},
			{"text":"6", "correct": true},
			{"text":"7", "correct": false},
			{"text":"8", "correct": false}
		]
	},
	{
		"question":"Địa hình đồng bằng và đồi núi thấp chiếm bao nhiêu tổng diện tích lãnh thổ Việt Nam?",
		"answers": [
			{"text":"60%", "correct": false},
			{"text":"65%", "correct": false},
			{"text":"75%", "correct": false},
			{"text":"85%", "correct": true}
		]
	},
		{
		"question":"Miền bắc Việt Nam có khí hậu gì?",
		"answers": [
			{"text":"Cận nhiệt đới ẩm", "correct": true},
			{"text":"Nhiệt đới gió mùa", "correct": false},
			{"text":"Ôn đới", "correct": false},
			{"text":"Nhiệt đới xa-van", "correct": false}
		]
	},
		{
		"question":"Miền nam Việt Nam có khí hậu gì?",
		"answers": [
			{"text":"Cận nhiệt đới ẩm", "correct": false},
			{"text":"Nhiệt đới gió mùa", "correct": false},
			{"text":"Ôn đới", "correct": false},
			{"text":"Nhiệt đới xa-van", "correct": true}
		]
	},
		{
		"question":"Miền trung Việt Nam có khí hậu gì?",
		"answers": [
			{"text":"Cận nhiệt đới ẩm", "correct": false},
			{"text":"Nhiệt đới gió mùa", "correct": true},
			{"text":"Ôn đới", "correct": false},
			{"text":"Nhiệt đới xa-van", "correct": false}
		]
	},
		{
		"question":"Đường biên giới giữa Việt Nam với nước nào là dài nhất?",
		"answers": [
			{"text":"Trung Quốc", "correct": false},
			{"text":"Lào", "correct": true},
			{"text":"Cam-pu-chia", "correct": false},
			{"text":"Thái Lan", "correct": false}
		]
	},
		{
		"question":"Điểm cực Bắc của Việt Nam có tọa độ là bao nhiêu?",
		"answers": [
			{"text":"23,29°B-105,9°Đ", "correct": true},
			{"text":"22,21°B-106,7°Đ", "correct": false},
			{"text":"23,25°B-108,2°Đ", "correct": false},
			{"text":"24,20°B-104,8°Đ", "correct": false}
		]
	},
		{
		"question":"Điểm cực Đông trên đất liền của Việt Nam nằm ở đâu?",
		"answers": [
			{"text":"Thừa Thiên-Huế", "correct": false},
			{"text":"Quảng Nam", "correct": false},
			{"text":"Ninh Thuận", "correct": false},
			{"text":"Khánh Hòa", "correct": true}
		]
	},
		{
		"question":"Lãnh thổ Việt Nam trên đất liền có bao nhiêu miền tự nhiên?",
		"answers": [
			{"text":"3", "correct": true},
			{"text":"6", "correct": false},
			{"text":"4", "correct": false},
			{"text":"5", "correct": false}
		]
	},
		{
		"question":"Điểm cực Bắc của Việt Nam có tọa độ là bao nhiêu?",
		"answers": [
			{"text":"23,29°B-105,9°Đ", "correct": true},
			{"text":"22,21°B-106,7°Đ", "correct": false},
			{"text":"23,25°B-108,2°Đ", "correct": false},
			{"text":"24,20°B-104,8°Đ", "correct": false}
		]
	},
		{
		"question":"Điểm cực Bắc của Việt Nam có tọa độ là bao nhiêu?",
		"answers": [
			{"text":"23,29°B-105,9°Đ", "correct": true},
			{"text":"22,21°B-106,7°Đ", "correct": false},
			{"text":"23,25°B-108,2°Đ", "correct": false},
			{"text":"24,20°B-104,8°Đ", "correct": false}
		]
	},
		{
		"question":"Điểm cực Bắc của Việt Nam có tọa độ là bao nhiêu?",
		"answers": [
			{"text":"23,29°B-105,9°Đ", "correct": true},
			{"text":"22,21°B-106,7°Đ", "correct": false},
			{"text":"23,25°B-108,2°Đ", "correct": false},
			{"text":"24,20°B-104,8°Đ", "correct": false}
		]
	}
]`
const questList = JSON.parse(diaLy);