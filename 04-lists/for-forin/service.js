const axios = require('axios');
const URL = 'https://swapi.co/api/people';

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const response = await axios.get(url);
    return response.data;
}
// // testando a funcao
// obterPessoa()
//     .then(resultado => {
//         console.log('resultado', resultado);
//     })
//     .catch(error => {
//         console.error('DEU RUIM', error);
//     });

// exportando a classe
module.exports = {
    obterPessoas
};
