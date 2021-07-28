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
	scoreElement.textContent = "Đúng: " + score + "/" + (numberOfQuestions);
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
	scoreElement.textContent = "Đúng: " + score + "/" + (numberOfQuestions);
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

let lichSu = `[
    {
		"question":"Thuật luyện kim được phát minh nhờ vào nghề nào?",
		"answers": [
			{"text":"Lúa nước.", "correct": false},
			{"text":"Làm gốm", "correct": true},
			{"text":"Chăn nuôi", "correct": false},
			{"text":"Làm đồ trang sức", "correct": false}
		]
	},
    {
		"question":"Cuộc sống của người nguyên thủy ngày càng ổn định hơn, dần dần đã xuất hiện",
		"answers": [
			{"text":"Những làng bản thưa thớt dân ở các vùng ven sông.", "correct": false},
			{"text":"Những làng bản đông dân ở các vùng ven sông.", "correct": true},
			{"text":"những làng bản thưa thớt dân ở các vùng chân núi.", "correct": false},
			{"text":"những làng bản đông dân ở các vùng chân núi.", "correct": false}
		]
	},
    {
		"question":"Những giai cấp mới ra đời ở Việt Nam sau Chiến tranh thế giới thứ nhất là",
		"answers": [
			{"text":"Tư sản và tiểu tư sản.", "correct": true},
			{"text":"Công nhân và tư sản.", "correct": false},
			{"text":"Công nhân và tiểu tư sản.", "correct": false},
			{"text":"Địa chủ và tư sản dân tộc.", "correct": false}
		]
	},
    {
		"question":"Theo thỏa thuận tại Hội nghị Pốtxđam (1945), quân đội Trung Hoa Dân quốc vào Việt Nam giải giáp quân đội Nhật từ",
		"answers": [
			{"text":"Vĩ tuyến 17 trở vào Nam.", "correct": false},
			{"text":"Vĩ tuyến 16 trở ra Bắc.", "correct": true},
			{"text":"Vĩ tuyến 16 trở vào Nam.", "correct": false},
			{"text":"Vĩ tuyến 17 trở ra Bắc.", "correct": false}
		]
	},
    {
		"question":"Trong cuộc khai thác thuộc địa lần thứ hai ở Đông Dương (1919 - 1929), thực dân Pháp đầu tư vốn nhiều nhất vào ngành kinh tế nào?",
		"answers": [
			{"text":"Thương nghiệp", "correct": false},
			{"text":" Công nghiệp", "correct": false},
			{"text":"Thủ công nghiệp", "correct": false},
			{"text":"Nông nghiệp", "correct": true}
		]
	},
    {
		"question":"Hội nghị lần thứ nhất Ban Chấp hành Trung ương lâm thời Đảng Cộng sản Việt Nam (10/1930) quyết định đổi tên Đảng Cộng sản Việt Nam thành",
		"answers": [
			{"text":"Đảng Cộng sản Đông Dương.", "correct": true},
			{"text":" Đông Dương Cộng sản đảng.", "correct": false},
			{"text":"Đảng Dân chủ Việt Nam.", "correct": false},
			{"text":"Đảng Lao động Việt Nam.", "correct": false}
		]
	},
    {
		"question":"Năm 1929, những tổ chức cộng sản nào xuất hiện ở Việt Nam?",
		"answers": [
			{"text":"Việt Nam Quốc dân đảng, An Nam Cộng sản đảng, Đông Dương Cộng đảng.", "correct": false},
			{"text":"Đông Dương Cộng sản đảng, An Nam Cộng sản Đảng, Đông Dương Cộng sản liên đoàn.", "correct": true},
			{"text":"Hội Việt Nam Cách mạng Thanh niên, An Nam Cộng sản đảng, Đông Dương Cộng sản đảng.", "correct": false},
			{"text":"Tân Việt Cách mạng đảng, An Nam Cộng sản đảng, Đông Dương Cộng sản đảng.", "correct": false}
		]
	},
    {
		"question":"Tổ chức nào được coi là đại diện tiêu biểu nhất của khuynh hướng cách mạng dân chủ tư sản ở Việt Nam trong những năm 20 của thế kỉ XX?",
		"answers": [
			{"text":"Tân Việt cách mạng đảng.", "correct": false},
			{"text":"Việt Nam Quốc dân Đảng.", "correct": true},
			{"text":"Đảng Lập hiến.", "correct": false},
			{"text":"Việt Nam nghĩa đoàn.", "correct": false}
		]
	},
    {
		"question":"Nhân dân Việt Nam hăng hái tham gia phong trào dân chủ 1936 - 1939 là do đời sống của họ",
		"answers": [
			{"text":"có phần ổn định", "correct": false},
			{"text":"được cải thiện hơn", "correct": false},
			{"text":"khó khăn, cực khổ", "correct": true},
			{"text":"không quá khó khăn", "correct": false}
		]
	},
    {
		"question":"Luận cương chính trị (10/1930) của Đảng Cộng sản Đông Dương xác định giai cấp lãnh đạo cách mạng là",
		"answers": [
			{"text":"nông dân ", "correct": false},
			{"text":"công nhân", "correct": true},
			{"text":"tư sản dân tộc", "correct": false},
			{"text":"tiểu tư sản trí thức", "correct": false}
		]
	},
    {
		"question":"Tư tưởng cốt lõi trong Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam là",
		"answers": [
			{"text":" tự do và dân chủ.", "correct": false},
			{"text":"độc lập và tự do.", "correct": true},
			{"text":"ruộng đất cho dân cày.", "correct": false},
			{"text":"đoàn kết với cách mạng thế giới.", "correct": false}
		]
	},
    {
		"question":"Nội dung nào dưới đây là sự tóm tắt đường lối kháng chiến chống thực dân Pháp (1945 - 1954) của Đảng Cộng sản Đông Dương?",
		"answers": [
			{"text":" Toàn dân, toàn diện, tự lực cánh sinh và tranh thủ các lực lượng hòa bình.", "correct": false},
			{"text":"Toàn dân, toàn diện, trường kì, tự lực cánh sinh và tranh thủ sự ủng hộ của quốc tế.", "correct": true},
			{"text":"Toàn dân, toàn diện, lâu dài và tranh thủ sự ủng hộ của nhân dân Pháp.", "correct": false},
			{"text":"Toàn dân, toàn diện, trường kì và tranh thủ sự ủng hộ của các nước xã hội chủ nghĩa", "correct": false}
		]
	},
    {
		"question":"Đại hội đại biểu lần thứ II của Đảng Cộng sản Đông Dương (tháng 2/1951) có ý nghĩa là",
		"answers": [
			{"text":"Đại hội xây dựng chủ nghĩa xã hội.", "correct": false},
			{"text":"Đại hội kháng chiến thắng lợi.", "correct": true},
			{"text":"Đại hội kháng chiến toàn dân.", "correct": false},
			{"text":"Đại hội xây dựng và bảo vệ Tổ quốc.", "correct": false}
		]
	},
    {
		"question":"Thực hiện kế hoạch Nava, từ thu - đông 1953 thực dân Pháp tập trung 44 tiểu đoàn quân cơ động ở đâu?",
		"answers": [
			{"text":"Tây Bắc.", "correct": false},
			{"text":"Nam Đông Dương.", "correct": false},
			{"text":" Tây Nguyên", "correct": false},
			{"text":" Đồng bằng Bắc Bộ.", "correct": true}
		]
	},
    {
		"question":"Trong cuộc kháng chiến chống thực dân Pháp (1945 - 1954), thắng lợi nào của quân dân Việt Nam đã làm phá sản hoàn toàn kế hoạch Nava?",
		"answers": [
			{"text":"Chiến dịch Việt Bắc thu - đông năm 1947.", "correct": false},
			{"text":"Chiến dịch Thượng Lào xuân - hè năm 1953.", "correct": false},
			{"text":"Chiến dịch Biên giới thu - đông năm 1950.", "correct": false},
			{"text":"Chiến dịch Điện Biên Phủ năm 1954.", "correct": true}
		]
	},
    {
		"question":"Sự kiện nào đánh dấu công nhân Việt Nam bước đầu đi vào đấu tranh tự giác?",
		"answers": [
			{"text":"Công nhân Sài Gòn - Chợ Lớn thành lập tổ chức Công hội (1920).", "correct": false},
			{"text":"Liên đoàn công nhân tàu biển ở Viễn Đông được thành lập (1921).", "correct": false},
			{"text":"Hơn 200 công nhân xưởng sửa chữa ô tô Avia (Hà Nội) bãi công (5/1929).", "correct": false},
			{"text":"Hơn một nghìn công nhân xưởng đóng tàu Ba Son (Sài Gòn) bãi công (8/1925).", "correct": true}
		]
	},
    {
		"question":"Biện pháp căn bản và lâu dài để giải quyết nạn đói ở Việt Nam sau ngày Cách mạng tháng Tám năm 1945 thành công là",
		"answers": [
			{"text":"nghiêm trị những người đầu cơ tích trữ lúa gạo.", "correct": false},
			{"text":"thực hiện phong trào thi đua tăng gia sản xuất.", "correct": true},
			{"text":"tổ chức điều hòa thóc gạo giữa các địa phương.", "correct": false},
			{"text":" thực hiện lời kêu gọi cứu đói của Hồ Chí Minh.", "correct": false}
		]
	},
    {
		"question":"Ở Việt Nam, đỉnh cao nhất của phong trào cách mạng 1930 - 1931 được đánh dấu bằng sự kiện nào?",
		"answers": [
			{"text":"Cuộc biểu tình của công nhân ngày 1/5/1930.", "correct": false},
			{"text":"Cuộc đấu tranh của công nhân nhà máy sợi Nam Định.", "correct": false},
			{"text":"Cuộc đấu tranh của công nhân Vinh - Bến Thủy.", "correct": false},
			{"text":"Sự thành lập các Xô viết ở Nghệ An và Hà Tĩnh.", "correct": true}
		]
	},
    {
		"question":"Một trong những mục đích chính của thực dân Pháp trong quá trình thực hiện cuộc khai thác thuộc địa lần thứ hai ở Đông Dương (1919 - 1929) là",
		"answers": [
			{"text":"bù đắp thiệt hại do Chiến tranh thế giới thứ nhất gây ra.", "correct": true},
			{"text":"đầu tư phát triển đồng bộ cơ sở hạ tầng ở Đông Dương.", "correct": false},
			{"text":"đầu tư phát triển toàn diện nền kinh tế Đông Dương.", "correct": false},
			{"text":"hoàn thành việc bình định để thống trị Đông Dương.", "correct": false}
		]
	},
    {
		"question":"Nội dung nào không phản ánh đúng nguyên nhân thắng lợi của Cách mạng tháng Tám năm 1945?",
		"answers": [
			{"text":"Dân tộc Việt Nam có truyền thống yêu nước chống ngoại xâm.", "correct": false},
			{"text":"Đảng cộng sản Đông Dương đề ra đường lối cách mạng đúng đắn.", "correct": false},
			{"text":"Chiến thắng của quân Đồng minh trong cuộc chiến tranh chống phát xít.", "correct": false},
			{"text":"Sự ủng hộ, giúp đỡ của Trung Quốc, Liên Xô và các nước dân chủ nhân dân.", "correct": true}
		]
	},
    {
		"question":"Yếu tố nào quyết định sự bùng nổ của phong trào dân chủ 1936 - 1939 ở Việt Nam?",
		"answers": [
			{"text":"Chính phủ Mặt trận Nhân dân lên cầm quyền ở Pháp (6/1936).", "correct": false},
			{"text":"Nghị quyết Đại hội lần thứ VII của Quốc tế Cộng sản (7/1935).", "correct": false},
			{"text":"Nghị quyết Hội nghị Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương (7/1936)", "correct": true},
			{"text":"Sự xuất hiện chủ nghĩa phát xít và nguy cơ chiến tranh thế giới (những năm 30 của thế kỉ XX).", "correct": false}
		]
	},
    {
		"question":"Phong trào “vô sản hóa” do Hội Việt Nam Cách mạng Thanh niên phát động và thực hiện là",
		"answers": [
			{"text":"phương thức tự rèn luyện của những chiến sĩ cách mạng tiền bối.", "correct": true},
			{"text":"mốc đánh dấu phong trào công nhân hoàn toàn trở thành tự giác.", "correct": false},
			{"text":"điều kiện để công nhân phát triển về số lượng và trở thành giai cấp.", "correct": false},
			{"text":"cơ hội thuận lợi giúp những người cộng sản về nước hoạt động.", "correct": false}
		]
	},
    {
		"question":"Sự kiện nào đánh dấu Cách mạng tháng Tám năm 1945 ở Việt Nam đã thắng lợi hoàn toàn?",
		"answers": [
			{"text":"Vua Bảo Đại thoái vị, trao ấn tín cho cách mạng (30/8).", "correct": false},
			{"text":"Cải tổ Ủy ban dân tộc giải phóng Việt Nam thành Chính phủ lâm thời (28/8).", "correct": false},
			{"text":"Khởi nghĩa giành chính quyền ở Hà Nội thắng lợi (19/8).", "correct": false},
			{"text":"Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa (2/9).", "correct": true}
		]
	},
    {
		"question":"Luận cương chính trị tháng 10/1930 của Đảng Cộng sản Đông Dương có hạn chế trong việc xác định",
		"answers": [
			{"text":"quan hệ giữa cách mạng Đông Dương với cách mạng thế giới.", "correct": false},
			{"text":"nhiệm vụ hàng đầu của cách mạng.", "correct": true},
			{"text":"vai trò lãnh đạo cách mạng của Đảng Cộng sản.", "correct": false},
			{"text":"phương pháp, hình thức đấu tranh cách mạng.", "correct": false}
		]
	},
    {
		"question":"Thành công của cuộc Tổng tuyển cử bầu Quốc hội (1946) ở Việt Nam chứng tỏ",
		"answers": [
			{"text":"sự ủng hộ to lớn của cộng đồng quốc tế đối với Việt Nam.", "correct": false},
			{"text":"quyền lực nhà nước chính thức thuộc về cơ quan hành pháp.", "correct": false},
			{"text":"nhân dân có tinh thần đoàn kết và ý thức làm chủ đất nước.", "correct": true},
			{"text":"nhân dân bước đầu giành chính quyền, làm chủ đất nước.", "correct": false}
		]
	},
    {
		"question":"Vì sao Hội nghị Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương (11/1939) quyết định đặt nhiệm vụ giải phóng dân tộc lên hàng đầu?",
		"answers": [
			{"text":"Mâu thuẫn giữa dân tộc Việt Nam với đế quốc và tay sai phát triển gay gắt.", "correct": true},
			{"text":"Nước Pháp bị Đức chiếm đóng làm cho quân Pháp ở Đông Dương suy yếu.", "correct": false},
			{"text":"Quân phiệt Nhật hoàn thành xâm lược và thống trị nhân dân Đông Dương.", "correct": false},
			{"text":"Nhân dân Việt Nam phải chịu hai tầng áp bức, bóc lột của Pháp và Nhật.", "correct": false}
		]
	},
    {
		"question":"Việc Mĩ đồng ý với Pháp thực hiện kế hoạch Rơve (5/1949) là mốc mở đầu cho",
		"answers": [
			{"text":"chính sách xoay trục của Mĩ sang khu vực châu Á - Thái Bình Dương.", "correct": false},
			{"text":"thời kì Mĩ triển khai chiến lược toàn cầu ở khu vực Đông Nam Á.", "correct": false},
			{"text":"quá trình Mĩ dính líu trực tiếp vào cuộc chiến tranh Đông Dương.", "correct": true},
			{"text":"sự hình thành liên minh quân sự giữa hai cường quốc Pháp và Mĩ.", "correct": false}
		]
	},
    {
		"question":"Trong văn kiện ngoại giao nào dưới đây, Chính phủ nước Việt Nam Dân chủ Cộng hòa đã nhân nhượng đối phương về không gian để có thời gian đưa cách mạng tiếp tục tiến lên?",
		"answers": [
			{"text":"Hiệp định Pari năm 1973 về Việt Nam.", "correct": false},
			{"text":"Hiệp định Sơ bộ ngày 6/3/1946.", "correct": true},
			{"text":"Tạm ước Việt - Pháp ngày 14/9/1946.", "correct": false},
			{"text":"Hiệp định Giơnevơ về Đông Dương.", "correct": false}
		]
	},
    {
		"question":"Đầu năm 1930, Nguyễn Ái Quốc triệu tập Hội nghị thành lập Đảng Cộng sản Việt Nam là do",
		"answers": [
			{"text":"phong trào công nhân đã phát triển đến trình độ hoàn toàn tự giác.", "correct": false},
			{"text":"phong trào cách mạng Việt Nam đứng trước nguy cơ bị chia rẽ lớn.", "correct": true},
			{"text":"Tổng bộ Hội Việt Nam Cách mạng Thanh niên nêu ra yêu cầu hợp nhất.", "correct": false},
			{"text":"các tổ chức cộng sản trong nước đề nghị hợp nhất thành một đảng.", "correct": false}
		]
	},
    {
		"question":"Trong cuộc Tiến công chiến lược Đông - Xuân 1953 - 1954, quân đội và nhân dân Việt Nam thực hiện kế sách gì để đối phó với kế hoạch Nava?",
		"answers": [
			{"text":"Lừa địch để đánh địch.", "correct": false},
			{"text":"Đánh điểm, diệt viện.", "correct": false},
			{"text":"Đánh vận động và công kiên.", "correct": false},
			{"text":"Điều địch để đánh địch.", "correct": true}
		]
	},
    {
		"question":"Cách mạng tháng Tám năm 1945 ở Việt Nam là một cuộc cách mạng",
		"answers": [
			{"text":"không mang tính bạo lực.", "correct": false},
			{"text":"có tính dân chủ điển hình.", "correct": false},
			{"text":"không mang tính cải lương.", "correct": true},
			{"text":"chỉ mang tính chất dân tộc.", "correct": false}
		]
	},
    {
		"question":"Điểm nào dưới đây thể hiện Việt Nam Quốc dân đảng (1927 - 1930) đã nhận thức đúng yêu cầu khách quan của lịch sử dân tộc?",
		"answers": [
			{"text":"Chủ trương tiến hành cách mạng bằng bạo lực.", "correct": true},
			{"text":"Phát triển cơ sở đảng ở một số địa phương Bắc Kì.", "correct": false},
			{"text":"Đề cao binh lính người Việt trong quân đội Pháp.", "correct": false},
			{"text":"Kiên quyết phát động cuộc khởi nghĩa Yên Bái.", "correct": false}
		]
	},
    {
		"question":"Đông Khê được chọn là nơi mở đầu Chiến dịch Biên giới thu - đông năm 1950 của quân dân Việt Nam, vì đó là vị trí",
		"answers": [
			{"text":"quan trọng nhất và tập trung cao nhất binh lực của Pháp.", "correct": false},
			{"text":"án ngữ Hành lang Đông - Tây của thực dân Pháp.", "correct": false},
			{"text":" ít quan trọng nên quân Pháp không chú ý phòng thủ.", "correct": false},
			{"text":"có thể đột phá, chia cắt tuyến phòng thủ của quân Pháp.", "correct": true}
		]
	},
    {
		"question":"Trong chiến dịch Điện Biên Phủ (1954), quân đội Việt Nam thực hiện.",
		"answers": [
			{"text":"lấy nhiều đánh ít", "correct": true},
			{"text":"lấy lực thắng thế", "correct": false},
			{"text":"lấy nhỏ đánh lớn", "correct": false},
			{"text":"lấy ít địch nhiều", "correct": false}
		]
	},
    {
		"question":"Nguyên tắc quan trọng nhất của Việt Nam trong việc kí kết Hiệp định Sơ bộ (6/3/1946) và Hiệp định Giơnevơ về Đông Dương (21/7/1954) là",
		"answers": [
			{"text":"phân hóa và cô lập cao độ kẻ thù.", "correct": false},
			{"text":"đảm bảo giành thắng lợi từng bước.", "correct": false},
			{"text":"giữ vững vai trò lãnh đạo của Đảng.", "correct": false},
			{"text":"không vi phạm chủ quyền dân tộc.", "correct": true}
		]
	},
    {
		"question":"Phong trào dân chủ 1936 - 1939 ở Việt Nam là một phong trào",
		"answers": [
			{"text":"có tính chất dân tộc.", "correct": true},
			{"text":"chỉ có tính dân chủ.", "correct": false},
			{"text":"không mang tính cách mạng.", "correct": false},
			{"text":"không mang tính dân tộc.", "correct": false}
		]
	},
    {
		"question":"Xu hướng bạo động và xu hướng cải cách trong phong trào yêu nước và cách mạng ở Việt Nam những năm đầu thế kỉ XX đều",
		"answers": [
			{"text":"không bị động trông chờ vào sự giúp đỡ từ bên ngoài.", "correct": false},
			{"text":"xuất phát từ truyền thống yêu nước của dân tộc.", "correct": true},
			{"text":"có sự kết hợp nhiệm vụ chống đế quốc và phong kiến.", "correct": false},
			{"text":"do giai cấp tư sản khởi xướng và lãnh đạo.", "correct": false}
		]
	},
    {
		"question":"Phong trào cách mạng Việt Nam 1930 - 1931 để lại bài học kinh nghiệm gì cho Cách mạng tháng Tám năm 1945?",
		"answers": [
			{"text":"Sử dụng bạo lực cách mạng của quần chúng để giành chính quyền.", "correct": true},
			{"text":"Kết hợp các hình thức đấu tranh bí mật, công khai và hợp pháp.", "correct": false},
			{"text":"Đi từ khởi nghĩa từng phần tiến lên tổng khởi nghĩa giành chính quyền.", "correct": false},
			{"text":"Thành lập ở mỗi nước Đông Dương một hình thức mặt trận riêng.", "correct": false}
		]
	},
    {
		"question":"Điểm chung về mục đích của thực dân Pháp khi đề ra kế hoạch Rơve và kế hoạch Đờ Lát đơ Tátxinhi trong cuộc chiến tranh xâm lược Việt Nam (1945 - 1954) là",
		"answers": [
			{"text":"chuẩn bị tiến công lên Việt Bắc.", "correct": false},
			{"text":"nhanh chóng kết thúc chiến tranh.", "correct": true},
			{"text":"giành quyền chủ động chiến lược.", "correct": false},
			{"text":"khóa chặt biên giới Việt - Trung.", "correct": false}
		]
	},
    {
		"question":"Công lao to lớn đầu tiên của Nguyễn Ái Quốc đối với lịch sử dân tộc Việt Nam là gì?",
		"answers": [
			{"text":"Khẳng định con đường cứu nước mới theo khuynh hướng vô sản.", "correct": true},
			{"text":"Chuẩn bị về tư tưởng chính trị cho sự ra đời của Đảng Cộng sản Việt Nam.", "correct": false},
			{"text":"Chuẩn bị điều kiện về tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam.", "correct": false},
			{"text":"Thống nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.", "correct": false}
		]
	},
    {
		"question":"Nội dung nào phản ánh không đúng những bài học kinh nghiệm có thể rút ra từ cuộc đấu tranh ngoại giao của Chính phủ Việt Nam Dân chủ Cộng hòa trong những năm 1945 – 1946?",
		"answers": [
			{"text":"Cứng rắn về nguyên tắc, mềm dẻo về sách lược.", "correct": false},
			{"text":"Phân hóa kẻ thù, tập trung đấu tranh với kẻ thù chủ yếu.", "correct": false},
			{"text":"Nhân nhượng đúng thời điểm, nhân nhượng có nguyên tắc.", "correct": false},
			{"text":"Luôn nhân nhượng với kẻ thù để có được môi trường hòa bình.", "correct": true}
		]
	},
    {
		"question":"Thực tiễn cách mạng Việt Nam từ sau ngày 2/9/1945 đến ngày 19/12/1946 phản ánh quy luật nào của lịch sử dân tộc Việt Nam?",
		"answers": [
			{"text":"Dựng nước đi đôi với giữ nước.", "correct": true},
			{"text":"Kiên quyết chống giặc ngoại xâm.", "correct": false},
			{"text":"Luôn giữ vững chủ quyền dân tộc.", "correct": false},
			{"text":"Mềm dẻo trong quan hệ đối ngoại.", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	},
    {
		"question":"",
		"answers": [
			{"text":"", "correct": false},
			{"text":"", "correct": true},
			{"text":"", "correct": false},
			{"text":"", "correct": false}
		]
	}
]`
const questList = JSON.parse(lichSu);