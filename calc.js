var runPointArray = [0,1,2,4,6,8,10,12,14,16,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,35,36,36,37,37,38,38,39,39,40,40,41,42,43,44,46,48,49,50];
var runTimeArray = [970, 960, 950, 940, 930, 920, 910, 900, 890, 880, 870, 860, 850, 840, 830, 820, 810, 800, 790, 780, 770, 760, 750, 740, 730, 720, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 580, 570, 560, 550, 540, 530, 520, 510];

document.getElementById("submit").addEventListener("click", calculateEverything);
document.getElementById("restart").addEventListener("click", reload);

function reload(){
	document.getElementById('user_input').style.display = 'block';
	document.getElementById('user_stats').style.display = 'none';
}

function calculateEverything(){
	getData();
	calculateKMTime();
	calculate24Time();
	calculateSpeed();
	calculateRoundTime();
	calculateRoundNo();
	calculateScore(TIME_TAKEN_24);


	document.getElementById('user_input').style.display = 'none';
	document.getElementById('user_stats').style.display = 'block';
	document.getElementById('stats_header').innerHTML = NAME + "'s" + ' Stats';
}

function getData() {
	//Let's get some global variables!! 
	/* According to Douglas Crockford's coding conventions, global variables
	should be uppercased */

	temp1 = document.getElementById('distance_ran').value;
	temp2 = document.getElementById('time_taken_min').value;
	temp3 = document.getElementById('time_taken_sec').value;
	temp4 = document.getElementById('track_length').value;
	temp5 = document.getElementById('name').value;

	// Best practices to do nice nice strict typing!!

	DISTANCE_RAN = Number(temp1);
	TIME_TAKEN_MIN = Number(temp2);
	TIME_TAKEN_SEC = Number(temp3);
	TRACK_LENGTH = Number(temp4);
	TIME_TAKEN_24 = 0;

	NAME = temp5;

	//For ease of calculation:

	TIME_TAKEN = ((TIME_TAKEN_MIN * 60) + TIME_TAKEN_SEC);
}

function calculateScore(TIME_TAKEN) {
	if (TIME_TAKEN < 510) {
		TIME_TAKEN = 510;
	}
	else if (TIME_TAKEN > 970) {
		TIME_TAKEN = 970;
	}
	else {
		for (i = 0; i < runTimeArray.length; i++) {
			if (TIME_TAKEN > runTimeArray[i]) {
				score =  runPointArray[i-1];
				console.log(score);
				document.getElementById('ippt_score').innerHTML = 'Your IPPT score: ' + score;
				break;
			}
			else {}
		}

	}
}

function calculateKMTime() {
	var kmTimeInSeconds =  (TIME_TAKEN / DISTANCE_RAN);
	convertToMinSec(kmTimeInSeconds);
	document.getElementById('km_time').innerHTML = 'Time taken to run 1 km: ' + (MIN + ' min ' + SEC + ' sec');
}

function calculate24Time() {
	var kmTimeInSeconds =  ((TIME_TAKEN / DISTANCE_RAN)*2.4);
	convertToMinSec(kmTimeInSeconds);
	TIME_TAKEN_24 = kmTimeInSeconds;
	console.log(TIME_TAKEN_24); 
	document.getElementById('2.4_time').innerHTML = '2.4km timing: ' + (MIN + ' min ' + SEC + ' sec');
}

function calculateSpeed() {
	//Find the km/second
	var kmPerSecond = (DISTANCE_RAN/TIME_TAKEN);
	//km per hour
	var kmPerHour =  (kmPerSecond * 3600).toFixed(3);
	var mPerSecond = (kmPerSecond * 1000).toFixed(2);
	document.getElementById('running_speed_km').innerHTML = 'Your speed, in km/h: ' + (kmPerHour + " km/h");
	document.getElementById('running_speed_m').innerHTML = 'Your speed, in m/s: ' + (mPerSecond + " m/s");			
}

function calculateRoundTime(){
	/* First we find the time taken per KM,
	then afterwards we find the time taken per ROUND */

	var perRoundTime = ((TIME_TAKEN/DISTANCE_RAN) * (TRACK_LENGTH/1000));
	convertToMinSec(perRoundTime);
	document.getElementById('round_time').innerHTML = 'Your average time per round: ' + (MIN + ' min ' + SEC + ' sec');
}

function calculateRoundNo(){
	var roundNo = (DISTANCE_RAN * 1000/TRACK_LENGTH).toFixed(2);
	document.getElementById('round_count').innerHTML = 'How many rounds you ran: ' + (roundNo + " rounds");
}

function convertToMinSec(time){

	MIN = Math.floor(time / 60);
	SEC = (time % 60).toFixed(1);

}
