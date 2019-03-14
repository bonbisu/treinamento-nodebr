const service = require('./service');

// criando um map para 'substituir' o nativo do JS
Array.prototype.meuMap = function(callback) {
    const novoArrayMapeado = [];
    for (let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }
    return novoArrayMapeado;
};

async function main() {
    try {
        let results = await service.obterPessoas('a');
        // // using forEach
        // console.time('forEach');
        // const names = [];
        // results.results.forEach(function(item) {
        //     names.push(item.name); // .split(' ').slice(-1)[0] // mostra apenas os sobrenomes
        // });
        // console.timeEnd('forEach');

        // // using map
        // console.time('map');
        // const names = results.results.map(function(item) {
        //     return item.name;
        // });
        // console.timeEnd('map');

        // pode ser escrito em 1 linha
        // const names = results.results.map(pessoa => pessoa.name);

        console.time('meuMap');
        const names = results.results.meuMap((pessoa, indice) => pessoa.name);
        console.timeEnd('meuMap');

        console.log('resultado', names);
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

// const main = async () => {
//     try {
//     } catch (error) {
//         console.error('DEU RUIM', error);
//     }
// };

main();
