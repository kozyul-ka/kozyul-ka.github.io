const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const timerElem = window.parent.document.querySelector('.timer');
const amountQuestions = 8;
const timeToResolveTestSeconds = 60*3;


//Класс, который представляет сам тест
class Quiz {
	constructor(type, questions, results) {
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index) {
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if (value >= 1) {
			correct = index;
		}
		else {
			//Иначе ищем, какой ответ может быть правильным
			for (let i = 0; i < this.questions[this.current].answers.length; i++) {
				if (this.questions[this.current].answers[i].value >= 1) {
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next() {
		this.current++;

		if (this.current >= this.questions.length) {
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End() {
		for (let i = 0; i < this.results.length; i++) {
			if (this.results[i].Check(this.score)) {
				this.result = i;
			}
		}
	}
}

//Класс, представляющий вопрос
class Question {
	constructor(text, answers) {
		this.text = text;
		this.answers = answers;
	}

	Click(index) {
		return this.answers[index].value;
	}
}

//Класс, представляющий ответ
class Answer {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}
}

//Класс, представляющий результат
class Result {
	constructor(text, value) {
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value) {
		if (this.value <= value) {
			return true;
		}
		else {
			return false;
		}
	}
}

//Массив с результатами
const results =
	[
		new Result("Вам многому нужно научиться", Math.round(amountQuestions * 0.15)), //3
		new Result("Вы уже неплохо разбираетесь", Math.round(amountQuestions * 0.40)), //10
		new Result("Ваш уровень очень высокий", Math.round(amountQuestions * 0.75)), //15
		new Result("Вы в совершенстве знаете тему", amountQuestions) //20
	];

//Массив с вопросами
const questions =
	[
		new Question("Брокеры – это:",
			[
				new Answer("Юридические лица и ИП, которые осуществляют виды профессиональной деятельности, предусмотренные ФЗ «О рынке ценных бумаг»", 0),
				new Answer("Юридические лица, которые осуществляют виды профессиональной деятельности, предусмотренные ФЗ «О рынке ценных бумаг»", 0),
				new Answer("Юридические и физические лица, которые осуществляют виды профессиональной деятельности, предусмотренные ФЗ «О рынке ценных бумаг»", 1),
				new Answer("Юридические лица, ИП и физ.лица, которые осуществляют виды профессиональной	деятельности, предусмотренные ФЗ «О рынке ценных бумаг»", 0)
			]),

		new Question("Укажите верное утверждение в отношении брокеров:",
			[
				new Answer("Брокер осуществляет сделку на бирже от своего имени, но за счет и по поручению клиента", 0),
				new Answer("Брокер осуществляет сделку на бирже от имени клиента, по его поручению и за его счет", 1),
				new Answer("Брокер осуществляет сделку на бирже за свой счет, но от имени и по поручению клиента", 0)
			]),

		new Question("Требования к правилам брокерской деятельности устанавливаются:",
			[
				new Answer("Правительством страны", 0),
				new Answer("Государственной думой", 0),
				new Answer("Банком России или другой страны", 1),
				new Answer("Министерством финансов", 0)
			]),

		new Question("Сколько брокерских счетов может иметь один человек?",
			[
				new Answer("1", 0),
				new Answer("Не более 3", 0),
				new Answer("Не ограниченное количество", 1)
			]),

		new Question("Дата закрытия реестра – это…",
			[
				new Answer("Дата выплаты дивидендов", 0),
				new Answer("Дата определения суммы выплаты дивидендов", 0),
				new Answer("Дата собрания акционеров", 0),
				new Answer("Дата составления списка акционеров для получения дивидендов", 1)
			]),

		new Question("Участники рынка, которые заинтересованы в понижении стоимости котировок, называются:",
			[
				new Answer("Совы", 0),
				new Answer("Медведи", 1),
				new Answer("Быки", 0),
				new Answer("Лоси", 0)
			]),

		new Question("По какой ставке налога облагаются купонные выплаты в облигациях (РФ)?",
			[
				new Answer("18%", 0),
				new Answer("13%", 1),
				new Answer("35%", 0),
				new Answer("Не облагаются", 0)
			]),

		new Question("Какое количество ценных бумаг входит в состав индекса Голубых фишек Московской биржи?",
			[
				new Answer("15", 1),
				new Answer("50", 0),
				new Answer("27", 0)
			]),

		new Question("Владельцы каких ценных бумаг не имеют право голосовать на общем собрании акционеров?",
			[
				new Answer("Владельцы обыкновенных акций", 0),
				new Answer("Владельцы краткосрочных акций", 0),
				new Answer("Владельцы привилегированных акций", 1),
				new Answer("Владельцы первичных акций", 0)
			]),

		new Question("Какое количество ценных бумаг входит в состав индекса Dow Jones - Голубых фишек США?",
			[
				new Answer("30", 1),
				new Answer("50", 0),
				new Answer("15", 0)
			]),

		new Question("Дивидендом в целях налогообложения признается:",
			[
				new Answer("Доход, выплачиваемый по долговому обязательству любого вида", 0),
				new Answer("Доход, полученный акционером от организации, при распределении чистой прибыли", 1),
				new Answer("Любой доход, выплаченный акционеру", 0),
				new Answer("Доход, выплаченный акционеру из валовой прибыли акционерного общества", 0)
			]),

		new Question("Какую сумму физическое лицо вправе перечислить на Индивидуальный Инвестиционный счет (ИИС) в течение календарного года?",
			[
				new Answer("400 000руб", 0),
				new Answer("Не ограничено", 0),
				new Answer("1 000 000руб", 1),
				new Answer("Не менее 100 000руб", 0)
			]),

		new Question("Чаще всего, акция падает в цене ...",
			[
				new Answer("Перед выплатой дивидендов", 0),
				new Answer("После выплаты дивидендов", 1)
			]),

		new Question("Налоговым периодом по налогу на доходы физических лиц признается:",
			[
				new Answer("Календарный год", 1),
				new Answer("Календарный месяц", 0),
				new Answer("Год с момента открытия брокерского счета", 0),
				new Answer("Год с момента совершения первой сделки по брокерскому счету", 0)
			]),

		new Question("Какие облигации считаются самыми надежными?",
			[
				new Answer("Корпоративные", 0),
				new Answer("Муниципальные", 0),
				new Answer("Государственные (ОФЗ)", 1)
			]),

		new Question("Погашение части номинала по ценным бумагам называется:",
			[
				new Answer("Оферта", 1),
				new Answer("Дробление", 0),
				new Answer("Амортизация", 0),
				new Answer("Дюрация", 0)
			]),

		new Question("Какая ценная бумага закрепляет за ее владельцем право на долю в бизнесе?",
			[
				new Answer("Акция", 1),
				new Answer("Облигация", 0),
				new Answer("Фонд", 0)
			]),

		new Question("Какое количество ИИС может открыть человек на свое имя?",
			[
				new Answer("1", 1),
				new Answer("3", 0),
				new Answer("Неограниченное количество", 0)
			]),

		new Question("Американская компания AT&T является одним из крупнейших операторов сотовой связи в США. К какой отрасли относится бизнес этой компании?",
			[
				new Answer("Цикличный ", 0),
				new Answer("Не цикличный (\"защитный\")", 1)
			]),

		new Question("Если фонд (БПИФ и ETF) не выплачивает дивиденды инвестору. Что он делает с теми дивидендами, которые платят компании внутри фонда?",
			[
				new Answer("Покупают на эти деньги еще ценные бумаги (реинвестируют)", 1),
				new Answer("Оставляют себе", 0),
				new Answer("Просто лежат у них на счете, как \"Подушка безопасности\"", 0)
			])
	];


//Сам тест
const questionsToDisplay = ChooseRandomQuestions(questions, amountQuestions);
const quiz = new Quiz(1, questionsToDisplay, results);
let timerEnded = false; 
let init = false;
let finish = false;

Update(); 
setTimeout(TimerCallback, 0, timeToResolveTestSeconds);

function TimerCallback(currentTime){

	const minutes = Math.floor(currentTime/60).toString();
	const seconds = currentTime%60;
	if(finish) return;
    if(minutes < 0) {
		timerEnded = true;
        return;
    }
    const minutesToString = minutes.toString().length > 1 ? minutes.toString() : "0" + minutes.toString();
    const secondsToString = seconds.toString().length > 1 ? seconds.toString() : "0" + seconds.toString();
    if (timerElem !== null) {
        timerElem.innerText = `${minutesToString} : ${secondsToString}`;
    }
	
	let afterCurrTime = --currentTime;

	setTimeout(TimerCallback, 1000, afterCurrTime);
}

function ChooseRandomQuestions(_questions, _amountQuestions) {
	let newArrQest = [];
	let countNewQuestions = 0;
	while(countNewQuestions < _amountQuestions) {
		const i = getRandomInt(0, _questions.length);
		const item = _questions[i];
		if(!newArrQest.find(elem => elem.text === item.text)) {
			newArrQest.push(item);
			countNewQuestions++;
		}
	}
	return newArrQest;
}

//Обновление теста
function Update() {

	if(!init) {
		init = true;
		buttonsElem.classList.remove("display-none");
	}
	//Проверяем, есть ли ещё вопросы
	if (quiz.current < quiz.questions.length && !timerEnded) {
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else {
		//Если это конец, то выводим результат
		finish = true;
		buttonsElem.innerHTML = "";
		buttonsElem.classList.add('finish');
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init() {
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for (let i = 0; i < btns.length; i++) {
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) {
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for (let i = 0; i < btns.length; i++) {
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if (quiz.type == 1) {
		if (correct >= 0) {
			btns[correct].className = "button button_correct";
		}

		if (index != correct) {
			btns[index].className = "button button_wrong";
		}
	}
	else {
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}