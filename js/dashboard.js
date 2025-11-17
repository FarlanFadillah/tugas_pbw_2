const daytime = document.querySelector('.daytime');
window.onload = function (event){
    const hours = new Date().getHours()
    if(hours >= 6 && hours < 11) daytime.innerHTML = 'Pagi';
    else if(hours >= 11 && hours < 15) daytime.innerHTML = 'Siang';
    else if(hours >= 15 && hours < 18) daytime.innerHTML = 'Sore';
    else daytime.innerHTML = 'Malam'
}