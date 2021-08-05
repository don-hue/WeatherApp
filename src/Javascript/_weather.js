async function _weatherData(City) {
    const LatLon =await _getLatLon(City);
	const response = await fetch(_makeString2(LatLon.lat,LatLon.lon), { mode: 'cors' });
	const weatherData = await response.json();
	console.log(weatherData)
}

function _makeString1(city) {
	let standardBase =
		'http://api.openweathermap.org/data/2.5/weather?q=' +
		city +
		'&appid=ce59c8408c117bb31164aed23f826a51';
	return standardBase;
}

function _makeString2(lat, lon) {
	let onecall =
		'https://api.openweathermap.org/data/2.5/onecall?lat=' +
		lat +
		'&lon=' +
		lon +
		'&units=metric&appid=ce59c8408c117bb31164aed23f826a51';
	return onecall;
}

async function _getLatLon(Input) {
    const response = await fetch(_makeString1(Input), { mode: 'cors' });
	const city = await response.json();
	let temp=city.coord.lon;
	let lon=temp.toString();

	temp=city.coord.lat
	let lat=temp.toString();

    return {lat,lon};
}

export {_weatherData };
