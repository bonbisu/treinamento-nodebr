const assert = require('assert');
const Postgres = require('./../db/strategies/postgres');
const Context = require('./../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'Flechas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' };

describe('Postgres Strategy', function() {
    this.timeout(Infinity);
    this.beforeAll(async () => {
        await context.connect();
        await context.create(MOCK_HEROI_ATUALIZAR);
    });
    it.only('PostgresSQL Connection', async () => {
        const result = await context.isConnected();
        assert.equal(result, true);
    });
    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });
    it('Listar', async () => {
        const [result] = await context.read({
            nome: MOCK_HEROI_CADASTRAR.nome
        });
        // const heroi = result[0]; // o mesmo que [result], ṕega a primeira posição
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });
    it('Atualizar', async () => {
        const [itemAtualizar] = await context.read({
            nome: MOCK_HEROI_ATUALIZAR.nome
        });
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Deadpool',
            poder: 'Sarcasmo'
        };
        const [result] = await context.update(itemAtualizar.id, novoItem);
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });

        /**
         * No JavaScript temo uma tecnica chamada rest/spread que é um metodo usado para mergear objetos ou separa-lo
         *
         * {
         * nome: 'Batman',
         * poder: 'Dinheiro'
         * }
         *
         * {
         * dataNascimento: '1998-01-01'
         * }
         *
         * // final
         *
         * {
         * nome: 'Batman',
         * poder:'Dinheiro',
         * dataNascimento: '1998-01-01'
         * }
         */
        // delete result.id;
        assert.deepEqual(result, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    });
    it('Remover', async () => {
        const [item] = await context.read({});
        const result = await context.delete(item.id);

        assert.deepEqual(result, 1);
    });
});
