import '/src/SASS/main.scss';
import './_layout';
import './_weather';
import { _createLayout, _getInput, _weatherInfo } from './_layout';
import { _getAirPollution, _getLatLon, _weatherData } from './_weather';

_createLayout()
;

document.querySelector('button').addEventListener('click',_getInput);
