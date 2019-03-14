const { obterPessoas } = require('./service');

// meuReduce
Array.prototype.meuReduce = function(callback, valorInicial) {
    // um booleano pode receber 2 argumentos como um if(?) e um else(:)
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
    // se o tipo de valorInicial for diferente de undefined usamos o valor inicial
    // caso contrario, pegamos o primeiro elemento da lista
    // se a lista for vazia, a função quebra pois não há this[0]
    for (item of this) {
        valorFinal = callback(valorFinal, item, this);
    }
    return valorFinal;
};

async function main() {
    try {
        const { results } = await obterPessoas(`a`);
        // buscar a altura de cada pessoa e somar
        const alturas = results.map(item => parseInt(item.height));
        console.log(alturas);
        // e.g. input -> [20.5, 60.2, 40.1] ==> output ->  120.80
        // const total = alturas.reduce(
        //     (anterior, proximo) => anterior + proximo,
        //     0
        // );
        // // caso o array usado seja vazio, o reduce quebra,
        // // necessitando um valor inicial para que se some com o
        // // anterior como(usando função com chaves):
        // // [].reduce((previous, next) {
        // //     return previous + next
        // // },0)

        // // usando meuReduce
        // const total = alturas.meuReduce(
        //     (anterior, proximo) => anterior + proximo,
        //     0
        // );

        const minhaLista = [['Erick', 'Wendel'], ['NodeBR', 'Nerdzão']];

        const total = minhaLista
            .meuReduce((anterior, proximo) => {
                return anterior.concat(proximo);
            }, []) //  o valor inicial define o tipo que será usado para o reduce
            .join(', ');
        console.log('total:', total);
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}
main();
