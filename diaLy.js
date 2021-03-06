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
//Choose number of questions to be in the test
selectNumberOfQuestion.addEventListener("click", chooseNumberOfQuestion);
function chooseNumberOfQuestion(e) {
	console.log(e.target);
	if(e.target.id == 'ten') {
		numberOfQuestions = 10;
		document.getElementById('ten').classList.add('correct');
		document.getElementById('twenty').classList.remove('correct');
		document.getElementById('thirty').classList.remove('correct');
	} else if(e.target.id == 'twenty') {
		numberOfQuestions = 20;
		document.getElementById('ten').classList.remove('correct');
		document.getElementById('twenty').classList.add('correct');
		document.getElementById('thirty').classList.remove('correct');
	} else if(e.target.id == 'thirty') {
		numberOfQuestions = 30;
		document.getElementById('ten').classList.remove('correct');
		document.getElementById('twenty').classList.remove('correct');
		document.getElementById('thirty').classList.add('correct');
	}
}
//shuffle the questions
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
	scoreElement.textContent = "????ng: " + score + "/" + (currentQuestionIndex+1);
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
		"question":"Chi???u d??i ???????ng b??? bi???n c???a Vi???t Nam l?? ?",
		"answers": [
			{"text":"3260km", "correct": true},
			{"text":"3970km", "correct": false},
			{"text":"3320km", "correct": false},
			{"text":"3550km", "correct": false}
		]
	},
	{
		"question":"S??? th??nh ph??? tr???c thu???c trung ????ng c???a Vi???t Nam hi???n nay l??",
		"answers": [
			{"text":"4", "correct": false},
			{"text":"7", "correct": false},
			{"text":"6", "correct": false},
			{"text":"5", "correct": true}
		]
	},
	{
		"question":"Vi???t Nam c?? t???ng c???ng bao nhi??u th??nh ph????",
		"answers": [
			{"text":"65", "correct": false},
			{"text":"63", "correct": false},
			{"text":"80", "correct": false},
			{"text":"85", "correct": true}
		]
	},
	{
		"question":"S??? th??nh ph??? tr???c thu???c t???nh c???a Vi???t Nam l??",
		"answers": [
			{"text":"79", "correct": true},
			{"text":"75", "correct": false},
			{"text":"69", "correct": false},
			{"text":"63", "correct": false}
		]
	},
	{
		"question":"T???nh/TP tr???c thu???c trung ????ng n??o c?? nhi???u th??nh ph??? nh???t?",
		"answers": [
			{"text":"TPHCM", "correct": false},
			{"text":"H?? N???i", "correct": false},
			{"text":"Qu???ng Ninh", "correct": true},
			{"text":"B??nh D????ng", "correct": false}
		]
	},
	{
		"question":"Di???n t??ch c???a Vi???t Nam l?? ?",
		"answers": [
			{"text":"329.818km^2", "correct": false},
			{"text":"331.212km^2", "correct": true},
			{"text":"330.010km^2", "correct": false},
			{"text":"330.950km^2", "correct": false}
		]
	},
	{
		"question":"????? d??i bi??n gi???i tr??n ?????t li???n c???a Vi???t Nam l???",
		"answers": [
			{"text":"4378km", "correct": false},
			{"text":"3260km", "correct": false},
			{"text":"3570km", "correct": false},
			{"text":"4639km", "correct": true}
		]
	},
	{
		"question":"V??? tr?? h???p nh???t t??? ????ng sang T??y tr??n l??nh th??? Vi???t Nam thu???c ?????a ph???n t???nh n??o ?",
		"answers": [
			{"text":"H?? T??nh", "correct": false},
			{"text":"Qu???ng B??nh", "correct": true},
			{"text":"Th???a Thi??n-Hu???", "correct": false},
			{"text":"Qu???ng Nam", "correct": false}
		]
	},
	{
		"question":"Vi???t Nam c?? m???y v??ng kinh t??? - x?? h???i?",
		"answers": [
			{"text":"5", "correct": false},
			{"text":"6", "correct": true},
			{"text":"7", "correct": false},
			{"text":"8", "correct": false}
		]
	},
	{
		"question":"?????a h??nh ?????ng b???ng v?? ?????i n??i th???p chi???m bao nhi??u t???ng di???n t??ch l??nh th??? Vi???t Nam?",
		"answers": [
			{"text":"60%", "correct": false},
			{"text":"65%", "correct": false},
			{"text":"75%", "correct": false},
			{"text":"85%", "correct": true}
		]
	},
		{
		"question":"Mi???n b???c Vi???t Nam c?? kh?? h???u g???",
		"answers": [
			{"text":"C???n nhi???t ?????i ???m", "correct": true},
			{"text":"Nhi???t ?????i gi?? m??a", "correct": false},
			{"text":"??n ?????i", "correct": false},
			{"text":"Nhi???t ?????i xa-van", "correct": false}
		]
	},
		{
		"question":"Mi???n nam Vi???t Nam c?? kh?? h???u g???",
		"answers": [
			{"text":"C???n nhi???t ?????i ???m", "correct": false},
			{"text":"Nhi???t ?????i gi?? m??a", "correct": false},
			{"text":"??n ?????i", "correct": false},
			{"text":"Nhi???t ?????i xa-van", "correct": true}
		]
	},
		{
		"question":"Mi???n trung Vi???t Nam c?? kh?? h???u g???",
		"answers": [
			{"text":"C???n nhi???t ?????i ???m", "correct": false},
			{"text":"Nhi???t ?????i gi?? m??a", "correct": true},
			{"text":"??n ?????i", "correct": false},
			{"text":"Nhi???t ?????i xa-van", "correct": false}
		]
	},
		{
		"question":"???????ng bi??n gi???i gi???a Vi???t Nam v???i n?????c n??o l?? d??i nh???t?",
		"answers": [
			{"text":"Trung Qu???c", "correct": false},
			{"text":"L??o", "correct": true},
			{"text":"Cam-pu-chia", "correct": false},
			{"text":"Th??i Lan", "correct": false}
		]
	},
		{
		"question":"??i???m c???c B???c c???a Vi???t Nam c?? t???a ????? l?? bao nhi??u?",
		"answers": [
			{"text":"23,29??B-105,9????", "correct": true},
			{"text":"22,21??B-106,7????", "correct": false},
			{"text":"23,25??B-108,2????", "correct": false},
			{"text":"24,20??B-104,8????", "correct": false}
		]
	},
		{
		"question":"??i???m c???c ????ng tr??n ?????t li???n c???a Vi???t Nam n???m ??? ????u?",
		"answers": [
			{"text":"Th???a Thi??n-Hu???", "correct": false},
			{"text":"Qu???ng Nam", "correct": false},
			{"text":"Ninh Thu???n", "correct": false},
			{"text":"Kh??nh H??a", "correct": true}
		]
	},
		{
		"question":"L??nh th??? Vi???t Nam tr??n ?????t li???n c?? bao nhi??u mi???n t??? nhi??n?",
		"answers": [
			{"text":"3", "correct": true},
			{"text":"6", "correct": false},
			{"text":"4", "correct": false},
			{"text":"5", "correct": false}
		]
	},
		{
		"question":"??i???m c???c B???c c???a Vi???t Nam c?? t???a ????? l?? bao nhi??u?",
		"answers": [
			{"text":"23,29??B-105,9????", "correct": true},
			{"text":"22,21??B-106,7????", "correct": false},
			{"text":"23,25??B-108,2????", "correct": false},
			{"text":"24,20??B-104,8????", "correct": false}
		]
	},
		{
		"question":"??i???m c???c B???c c???a Vi???t Nam c?? t???a ????? l?? bao nhi??u?",
		"answers": [
			{"text":"23,29??B-105,9????", "correct": true},
			{"text":"22,21??B-106,7????", "correct": false},
			{"text":"23,25??B-108,2????", "correct": false},
			{"text":"24,20??B-104,8????", "correct": false}
		]
	},
		{
		"question":"??i???m c???c B???c c???a Vi???t Nam c?? t???a ????? l?? bao nhi??u?",
		"answers": [
			{"text":"23,29??B-105,9????", "correct": true},
			{"text":"22,21??B-106,7????", "correct": false},
			{"text":"23,25??B-108,2????", "correct": false},
			{"text":"24,20??B-104,8????", "correct": false}
		]
	}
]`
const questList = JSON.parse(diaLy);