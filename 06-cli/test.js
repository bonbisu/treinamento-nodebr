const { deepEqual, ok } = require('assert');
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
};
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
};

describe('Suite de manipulação de Heróis', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
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
            ...DEFAULT_ITEM_CADASTRAR
        }; // passando os todos os parametros e modificando alguns
        const resultado = await database.cadastrar(expected);
        const [actual] = await database.listar(expected.id);
        ok(resultado, expected);
        deepEqual(actual, expected);
    });

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(resultado, expected);
    });

    it('deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        };
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        };
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
        deepEqual(resultado, expected);
    });
});
/**lino coutinho 75 -ap74 recanto */
