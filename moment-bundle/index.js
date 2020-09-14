import moment from 'moment'
const currentTime = moment().format('DD/MM/YYYY HH:mm');
document.body.innerHTML = `<h1>Сейсчас ${currentTime}</h1>`;
document.body.innerHTML += `<h2>${top.location.href}</h2>`;
