const { deepEqual, ok } = require('assert');
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
};

describe('Suite de manipulação de Heróis', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    });

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        // passando [resultado, resultado2] podemos extrair pela posição do array, caso exista
        // e.g. resultado[0], resultado[1]
        const [resultado] = await database.listar();

        deepEqual(resultado, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = {
            ...DEFAULT_ITEM_CADASTRAR,
            id: 2,
            nome: 'Batman'
        }; // passando os todos os parametros e modificando alguns
        const resultado = await database.cadastrar(expected);
        const [actual] = await database.listar(expected.id);
        ok(resultado, expected);
        deepEqual(actual, expected);
    });
});
