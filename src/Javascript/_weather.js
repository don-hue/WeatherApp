async function _weatherData(City) {
	const LatLon = await _getLatLon(City);
	const response = await fetch(_makeOneCall(LatLon.lat, LatLon.lon), {
		mode: 'cors',
	});
	const weatherData = await response.json();

	let temperature = weatherData.current.temp;
	let humidity = weatherData.current.humidity;
	let windSpeed = weatherData.current.wind_speed;
	let icon = weatherData.current.weather[0].icon;
	let description = weatherData.current.weather[0].description;
	let airPollution= await _getAirPollution(City);

	return {temperature,humidity,windSpeed,icon,description,airPollution}
}

async function _getLatLon(Input) {
	const response = await fetch(_makeStandardCall(Input), { mode: 'cors' });
	const city = await response.json();
	let temp = city.coord.lon;
	let lon = temp.toString();

	temp = city.coord.lat;
	let lat = temp.toString();

	return { lat, lon };
}

async function _getAirPollution(City){
	const LatLon = await _getLatLon(City);
	const response = await fetch(_makePollution(LatLon.lat,LatLon.lon), { mode: 'cors' });
	const data = await response.json();
	let pollution=data.list[0].main.aqi;

	return pollution;
}

function _makeStandardCall(city) {
	let standardBase =
		'http://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&appid=ce59c8408c117bb31164aed23f826a51';
	return standardBase;
}

function _makeOneCall(lat, lon) {
	let onecall =
		'https://api.openweathermap.org/data/2.5/onecall?lat=' +
		lat +
		'&lon=' +
		lon +
		'&units=metric&appid=ce59c8408c117bb31164aed23f826a51';
	return onecall;
}

function _makePollution(lat, lon) {
	let pollution =
		'http://api.openweathermap.org/data/2.5/air_pollution?lat=' +
		lat +
		'&lon=' +
		lon +
		'&appid=ce59c8408c117bb31164aed23f826a51';
	return pollution;
}

export { _weatherData};
