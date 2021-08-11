import { _weatherData, _weatherDaily } from './_weather';

const _createLayout = () => {
	function _createMain() {
		//-----------------Main Div_____________________
		const main = document.createElement('div');
		main.classList.add('main');
		document.body.appendChild(main);
	}
	function _createCurrentWeather() {
		//------------Main div for Weather Icon and Temperature--------
		const IconText = document.createElement('div');
		const right = document.querySelector('.boxright');
		IconText.classList.add('IconText');
		right.appendChild(IconText);

		//---------Sub Div for Weather Description and Temperature------
		const textdiv = document.createElement('div');
		textdiv.classList.add('textdiv');
		IconText.appendChild(textdiv);

		//---------Div for Humidity---------------------
		const humidityDiv = document.createElement('div');
		humidityDiv.classList.add('humidity');
		right.appendChild(humidityDiv);

		const textdiv2 = document.createElement('div');
		textdiv2.classList.add('textdiv2');
		humidityDiv.appendChild(textdiv2);

		//---------Div for AirQuality-------------------
		const airQualityDiv = document.createElement('div');
		airQualityDiv.classList.add('airQuality');
		right.appendChild(airQualityDiv);

		const textdiv3 = document.createElement('div');
		textdiv3.classList.add('textdiv3');
		airQualityDiv.appendChild(textdiv3);

		const giphy = document.createElement('div');
		giphy.classList.add('giphy');
		right.appendChild(giphy);
	}
	function _createLeftScreenSide() {
		//--------------------Left Side of Screen for 7 Day Waether--------------
		const left = document.createElement('div');
		const main = document.querySelector('.main');
		left.classList.add('boxleft');
		main.appendChild(left);
	}

	function _createRightScreenSide() {
		//------------------Right Side for Current Day Information-----
		const right = document.createElement('div');
		const main = document.querySelector('.main');
		right.classList.add('boxright');
		main.appendChild(right);
	}
	function _createSearchbox() {
		//------------SearchBox-------------------
		const searchBox = document.createElement('div');
		const right = document.querySelector('.boxright');
		searchBox.classList.add('searchBox');
		right.appendChild(searchBox);

		_search(searchBox);
		_searchButton(searchBox);
		setTimeout(function () {
			searchBox.style.opacity = 1;
			0;
		}, 500);
	}
	function _createWeekly() {
		const left = document.querySelector('.boxleft');
		let arrayDays = [
			'Sunday',
			'Monday',
			'Thuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		for (let i = 0; i < 7; i++) {
			let number = [i, i + 10, i + 20, i + 30];
			const temp = document.createElement('div');
			temp.classList.add('day');
			temp.classList.add(arrayDays[i]);
			left.appendChild(temp);

			for (let j = 0; j < 4; j++) {
				const subdiv = document.createElement('div');
				subdiv.classList.add('subdiv' + number[j]);
				subdiv.classList.add('subdiv');
				subdiv.id = number[j];
				temp.appendChild(subdiv);
			}

			const subdivi = document.getElementById(i);
			subdivi.innerHTML = arrayDays[i];
			setTimeout(function () {
				subdivi.style.opacity = 1;
				0;
			}, 500);
		}
	}
	_createMain();
	_createLeftScreenSide();
	_createRightScreenSide();
	_createSearchbox();
	_createCurrentWeather();
	_createWeekly();
};

const _search = (parent) => {
	const search = document.createElement('input');
	search.type = 'search';
	search.classList.add('searchI');
	search.placeholder = 'Location...';
	parent.appendChild(search);
};

const _searchButton = (parent) => {
	const button = document.createElement('button');
	button.classList.add('button');

	const i = document.createElement('i');
	i.classList.add('fa', 'fa-search');
	button.appendChild(i);
	parent.appendChild(button);
};

async function _getCurrentDayInfo() {
	const _randomGif = (ObjData) => {
		const img = document.createElement('img');
		const giphy = document.querySelector('.giphy');
		const previousImg = document.querySelector('.imgGif');
		img.classList.add('imgGif');
		giphy.appendChild(img);

		async function randomcat(ObjData) {
			let str = ObjData.description;
			let urlString =
				'http://api.giphy.com/v1/gifs/translate?api_key=6ZbPU5TkCSAdRtrtC1GXv7sqDiDxPFrj&s=' +
				str.replace(/\s/g, '');
			const response = await fetch(urlString, { mode: 'cors' });
			const catData = await response.json();
			img.src = catData.data.images.original.url;
			setTimeout(function () {
				giphy.style.opacity = 1;
			}, 150);
		}

		if (previousImg != null) {
			let removeOpacity = new Promise((resolve) => {
				setTimeout(function () {
					giphy.style.opacity = 0;
				}, 150);
				previousImg.classList.add('done');

				if (previousImg.classList.contains('done') == true) {
					setTimeout(function () {
						resolve(true);
					}, 1550);
				}
			});

			function removeMyDiv() {
				return new Promise((resolve) => {
					previousImg.remove();

					const previousImgTemp = document.querySelector('imgGif');

					if (previousImgTemp == null) {
						resolve(true);
					}
				});
			}

			async function createNew() {
				setTimeout(() => {
					randomcat(ObjData);
				}, 1500);
			}

			removeOpacity.then(removeMyDiv).then(createNew);
			return ObjData;
		} else {
			setTimeout(() => {
				randomcat(ObjData);
			}, 1500);
			return ObjData;
		}
	};
	const _weatherInfo = (ObjData) => {
		const previousImg = document.querySelector('.img1');
		const previousText = document.querySelector('.text1');
		const previousTemp = document.querySelector('.temp1');

		function setUpIcon() {
			const IconText = document.querySelector('.IconText');
			const img = document.createElement('img');
			img.classList.add('img');
			img.classList.add('img1');
			let imgURL =
				'http://openweathermap.org/img/wn/' + ObjData.icon + '@2x.png';
			img.src = imgURL;

			IconText.appendChild(img);

			setTimeout(function () {
				img.style.opacity = 1;
			}, 150);
		}

		function setUpText() {
			const textdiv = document.querySelector('.textdiv');
			let description = ObjData.description.toUpperCase();

			const text = document.createElement('div');
			text.classList.add('text');
			text.classList.add('text1');
			text.innerHTML = description;
			textdiv.appendChild(text);

			const temp = document.createElement('div');
			temp.classList.add('temp');
			temp.classList.add('temp1');
			temp.innerHTML = ObjData.temperature + ' °C';
			textdiv.appendChild(temp);

			setTimeout(function () {
				text.style.opacity = 1;
				temp.style.opacity = 1;
			}, 500);
		}
		if (previousImg != null) {
			let removeOpacity = new Promise((resolve) => {
				setTimeout(function () {
					previousImg.style.opacity = 0;
				}, 150);
				previousText.style.opacity = 0;
				previousTemp.style.opacity = 0;
				previousImg.classList.add('done');

				if (previousImg.classList.contains('done') == true) {
					setTimeout(function () {
						resolve(true);
					}, 1550);
				}
			});

			function removeMyDiv() {
				return new Promise((resolve) => {
					previousText.remove();
					previousTemp.remove();
					previousImg.remove();

					const previousImgTemp = document.querySelector('img1');

					if (previousImgTemp == null) {
						resolve(true);
					}
				});
			}

			async function createNew() {
				setUpIcon();
				setUpText();
			}

			removeOpacity.then(removeMyDiv).then(createNew);
			return ObjData;
		} else {
			setUpIcon();
			setUpText();
			return ObjData;
		}
	};

	const _weatherInfoHumidity = (ObjData) => {
		const previousImg = document.querySelector('.imgHumidity');
		const previousText = document.querySelector('.textHumidity');
		const previousTemp = document.querySelector('.numHumidity');

		function setUpIcon() {
			const humidityDiv = document.querySelector('.humidity');
			const img = document.createElement('img');
			img.classList.add('img');
			img.classList.add('imgHumidity');
			img.src = '../src/SASS/Images/humidity.png';

			humidityDiv.appendChild(img);

			setTimeout(function () {
				img.style.opacity = 1;
			}, 150);
		}

		function setUpText() {
			const textdiv2 = document.querySelector('.textdiv2');

			const text = document.createElement('div');
			text.classList.add('text');
			text.classList.add('textHumidity');
			text.innerHTML = 'HUMIDITY';
			textdiv2.appendChild(text);

			const temp = document.createElement('div');
			temp.classList.add('temp');
			temp.classList.add('numHumidity');
			temp.innerHTML = ObjData.humidity + ' %';
			textdiv2.appendChild(temp);

			setTimeout(function () {
				text.style.opacity = 1;
				temp.style.opacity = 1;
			}, 500);
		}

		if (previousImg != null) {
			let removeOpacity = new Promise((resolve) => {
				setTimeout(function () {
					previousImg.style.opacity = 0;
				}, 150);
				previousText.style.opacity = 0;
				previousTemp.style.opacity = 0;
				previousImg.classList.add('done');

				if (previousImg.classList.contains('done') == true) {
					setTimeout(function () {
						resolve(true);
					}, 1550);
				}
			});

			function removeMyDiv() {
				return new Promise((resolve) => {
					previousText.remove();
					previousTemp.remove();
					previousImg.remove();

					const previousImgTemp = document.querySelector('img1');

					if (previousImgTemp == null) {
						resolve(true);
					}
				});
			}

			async function createNew() {
				setTimeout(() => {
					setUpIcon();
					setUpText();
				}, 500);
			}

			removeOpacity.then(removeMyDiv).then(createNew);
			return ObjData;
		} else {
			setTimeout(() => {
				setUpIcon();
				setUpText();
			}, 500);
			return ObjData;
		}
	};

	const _weatherInfoAir = (ObjData) => {
		const previousImg = document.querySelector('.imgAir');
		const previousText = document.querySelector('.textAir');
		const previousTemp = document.querySelector('.numAir');

		function setUpIcon() {
			const airDiv = document.querySelector('.airQuality');
			const img = document.createElement('img');
			img.classList.add('img');
			img.classList.add('imgAir');
			img.src = '../src/SASS/Images/co2.png';

			airDiv.appendChild(img);

			setTimeout(function () {
				img.style.opacity = 1;
			}, 150);
		}

		function setUpText() {
			const textdiv3 = document.querySelector('.textdiv3');
			const AirArray = ['GOOD', ' MODERATE', 'UNHEALTHY', 'VERY UNHEALTHY'];

			const text = document.createElement('div');
			text.classList.add('text');
			text.classList.add('textAir');
			text.innerHTML = 'AIR QUALITY';
			textdiv3.appendChild(text);

			const temp = document.createElement('div');
			temp.classList.add('temp');
			temp.classList.add('numAir');
			temp.innerHTML =
				ObjData.airPollution + ' - ' + AirArray[ObjData.airPollution - 1];
			textdiv3.appendChild(temp);

			setTimeout(function () {
				text.style.opacity = 1;
				temp.style.opacity = 1;
			}, 500);
		}

		if (previousImg != null) {
			let removeOpacity = new Promise((resolve) => {
				setTimeout(function () {
					previousImg.style.opacity = 0;
				}, 150);
				previousText.style.opacity = 0;
				previousTemp.style.opacity = 0;
				previousImg.classList.add('done');

				if (previousImg.classList.contains('done') == true) {
					setTimeout(function () {
						resolve(true);
					}, 1550);
				}
			});

			function removeMyDiv() {
				return new Promise((resolve) => {
					previousText.remove();
					previousTemp.remove();
					previousImg.remove();

					const previousImgTemp = document.querySelector('imgAir');

					if (previousImgTemp == null) {
						resolve(true);
					}
				});
			}

			async function createNew() {
				setTimeout(() => {
					setUpIcon();
					setUpText();
				}, 1000);
			}

			removeOpacity.then(removeMyDiv).then(createNew);
			return ObjData;
		} else {
			setTimeout(() => {
				setUpIcon();
				setUpText();
			}, 1000);
			return ObjData;
		}
	};
	const inputValue = document.querySelector('.searchI');
	if (inputValue.value !== '') {
		_weatherData(inputValue.value)
			.then(_weatherInfo)
			.then(_weatherInfoHumidity)
			.then(_weatherInfoAir)
			.then(_randomGif)
			.then(_getCurrentWeeklyInfo);
	}
}

async function _getCurrentWeeklyInfo() {
	const inputValue = document.querySelector('.searchI');
	const _weatherInfo = (ObjData) => {
		let placeholderImg = '.img' + (ObjData.day + 10);
		let placeholderText = '.subdiv' + (ObjData.day + 20);
		let placeholderTemp = '.subdiv' + (ObjData.day + 30);
		const previousImg = document.querySelector(placeholderImg);
		const previousText = document.querySelector(placeholderText);
		const previousTemp = document.querySelector(placeholderTemp);

		function setUpIcon() {
			const divTemp = '.subdiv' + (ObjData.day + 10);
			const imgTemp = 'img' + (ObjData.day + 10);

			const daydiv = document.querySelector(divTemp);
			const img = document.createElement('img');

			img.classList.add(imgTemp);
			img.classList.add('img');
			let imgURL =
				'http://openweathermap.org/img/wn/' + ObjData.icon + '@2x.png';
			img.src = imgURL;

			daydiv.appendChild(img);

			setTimeout(function () {
				img.style.opacity = 1;
			}, 2000);
		}

		function setUpText() {
			const divText = '.subdiv' + (ObjData.day + 20);
			const divTemp = '.subdiv' + (ObjData.day + 30);

			const textdiv = document.querySelector(divText);
			const tempdiv = document.querySelector(divTemp);

			let description = ObjData.description.toUpperCase();

			// const text = document.createElement('div');
			// text.classList.add('text');
			// text.classList.add('text'+divText);
			textdiv.innerHTML = description;
			// textdiv.appendChild(text);

			// const temp = document.createElement('div');
			// temp.classList.add('temp');
			// temp.classList.add('temp'+divTemp);
			tempdiv.innerHTML = ObjData.temperature + ' °C';
			// tempdiv.appendChild(temp);

			setTimeout(function () {
				textdiv.style.opacity = 1;
				tempdiv.style.opacity = 1;
			}, 2000);
		}
		// setUpIcon()
		// setUpText()

		if (previousImg != null) {
			let removeOpacity = new Promise((resolve) => {
				setTimeout(function () {
					previousImg.style.opacity = 0;
				}, 0);
				previousText.style.opacity = 0;
				previousTemp.style.opacity = 0;
				previousImg.classList.add('done');

				if (previousImg.classList.contains('done') == true) {
					setTimeout(function () {
						resolve(true);
					}, 1550);
				}
			});

			function removeMyDiv() {
				return new Promise((resolve) => {
					previousText.innerHTML=null;
					previousTemp.innerHTML=null;
					previousImg.remove();

					const previousImgTemp = document.querySelector(placeholderImg);

					if (previousImgTemp == null) {
						resolve(true);
					}
				});
			}

			async function createNew() {
				setUpIcon();
				setUpText();
			}

			removeOpacity
			.then(removeMyDiv);
			//.then(createNew);
			return ObjData;
		} else {
			setUpIcon();
			setUpText();
			return ObjData;
		}
	};
	if (inputValue.value !== '') {
		for (let i = 0; i < 7; i++)
			_weatherDaily(inputValue.value, i).then(_weatherInfo);
	}
}

export { _createLayout, _getCurrentDayInfo, _getCurrentWeeklyInfo };
