const { get } = require('axios');

const URL = `https://swapi.co/api/people`;

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`;
    const result = await get(url);
    // console.log(JSON.stringify(result.data));
    return result.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
    return {
        nome: item.name,
        altura: item.height
    };
}
// no json se a chave tiver o mesmo nome do valor, pode se passar apenas o valor
// passando a chave e o valor:
// module.exports = { obterPessoas: obterPessoas };
module.exports = { obterPessoas };
