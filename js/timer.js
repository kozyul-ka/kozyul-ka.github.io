
const timerElem = document.querySelector(".timer");
export const timeToResolveTestMinutes = 10;

setTimeout(TimerCallback, 0, timeToResolveTestMinutes);

function TimerCallback(currentTime){

	const minutes = Math.floor(currentTime/60).toString();
	const seconds = currentTime%60;
    if(minutes < 0) {
        return;
    }
    const minutesToString = minutes.toString().length > 1 ? minutes.toString() : "0" + minutes.toString();
    const secondsToString = seconds.toString().length > 1 ? seconds.toString() : "0" + seconds.toString();
	timerElem.innerText = `${minutesToString} : ${secondsToString}`;

	let afterCurrTime = --currentTime;
	
	setTimeout(TimerCallback, 1000, afterCurrTime);
}