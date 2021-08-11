import '/src/SASS/main.scss';
import './_layout';
import './_weather';
import { _createLayout, _getCurrentDayInfo, _getCurrentWeeklyInfo } from './_layout';
import { _getAirPollution, _getLatLon, _weatherDaily, _weatherData } from './_weather';

_createLayout()
;

document.querySelector('button').addEventListener('click',_getCurrentDayInfo);
// document.querySelector('button').addEventListener('click',_getCurrentWeeklyInfo);
