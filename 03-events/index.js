const EventEmitter = require('events');
// não é necessário implementar MeuEmissor caso não sejam implementados outros metodos
class MeuEmissor extends EventEmitter {}
const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';

meuEmissor.on(nomeEvento, function(click) {
    console.log('um usuario clicou', click);
});

// interagindo com eventos no console
const stdin = process.openStdin();
stdin.addListener('data', value => {
    console.log(`Voce digitou : ${value.toString().trim()}`);
});

// events e listeners podem ser chamados varias vezes enquanto promises apenas 1
// (e.g. se encapsularmos um listener ou event em uma promise, só poderemos utiliza-lo 1 vez)

// // simula o click do usuario
// let count = 0;
// let clickInterval = setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok ' + count++);
//     if (count > 3) {
//         clearInterval(clickInterval);
//         setTimeout(() => {
//             console.log('boo');
//         }, 1000);
//     }
// }, 1000);

// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
