// importa apenas o objeto(metodo, variavel, funcao) desejado de uma classe
const { obterPessoas } = require('./service');

/*
ex:

const item = {
    nome: 'Raiza',
    idade: 27
};

const { nome, idade } = item;
console.log(nome + ',', idade);
*/

// criando um filter
Array.prototype.meuFilter = function(callback) {
    const lista = [];
    for (index in this) {
        const item = this[index];
        const result = callback(item, index, this);
        // 0, "", null, undefined === false
        // a cada item na lista, passar pela função callback(definida na implementacao)
        // o que retornar passa pelo if(nesse caso true ou false) e realiza o codigo
        if (!result) continue;
        lista.push(item);
    }
    return lista;
};

async function main() {
    try {
        const { results } = await obterPessoas(`a`);
        // const familiaLars = results.filter(function(item) {
        //     // por padrão precisa retornar um booleano
        //     // para informar se deve manter ou remover da lista
        //     // false -> 'remove'(filtra) da lista
        //     // true -> mantem
        //     // filter remove o objeto para a nova lista sem modificar

        //     // indexOf
        //     // -> não encontrou o item/string = -1
        //     // -> encontrou o item/string = posicaoNoArrayOuString
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1; // retorna true or false
        //     return result;
        // });

        // com meuFilter()
        const familiaLars = results.meuFilter((item, index, lista) => {
            const result = item.name.toLowerCase().indexOf('lars') !== -1;
            console.log(`index: ${index}`, item.name, `isLars: ${result}`);
            return result;
        });

        const names = familiaLars.map(pessoa => pessoa.name);
        console.log('Lars', names);
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}
main();
