const assert = require('assert');
const { obterPessoas } = require('./service');

// instalamos o pacote nock, para simular requisicoes
const nock = require('nock');

// Mocha needs for test
// nomeia a suite de testes
describe('Star Wars Tests', () => {
    // roda antes de tudo com 'before' ou antes de cada funcao(teste) 'beforeEach'
    // temos também 'after' e 'afterEach'
    // Comentario pertinente a respeito do before*
    // Você fez assim: describe('Star Wars tests', function () {})
    // Ou assim: describe('Star Wars tests', () => {}) ?
    // Se tiver usado o arrow function ele vai dar erro no this.
    // O this do function () e do () => são diferentes.

    // O mocha disponibiliza 2 formas de voce criar os testes
    // (https://mochajs.org/#interfaces): uma mais orientada a
    // Behavior Driven Development, usando describe();
    // e outra orientada a Test Driven Development usando suite().
    // Como no exemplo o Erick usou describe(), você poderia usar o método
    // before() sem o this, como o Marcelo comentou, que funcionaria mesmo
    // se voce usasse arrow function.
    before(() => {
        // extraimos o valor exemplo dando um log no result.data em service.js
        const response = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.co/api/planets/8/',
                    films: [
                        'https://swapi.co/api/films/2/',
                        'https://swapi.co/api/films/5/',
                        'https://swapi.co/api/films/4/',
                        'https://swapi.co/api/films/6/',
                        'https://swapi.co/api/films/3/',
                        'https://swapi.co/api/films/1/',
                        'https://swapi.co/api/films/7/'
                    ],
                    species: ['https://swapi.co/api/species/2/'],
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.co/api/people/3/'
                }
            ]
        };

        nock('https://swapi.co/api/people') // sempre que tentar acessar esse path
            .get('/?search=r2-d2&format=json') // usando o metodo get passando essa query string
            .reply(200, response); // responder com codigo 200 passando response como body
    });

    // os testes são definidos
    it('deve buscar o r2d2 com o formato correto', async () => {
        const expected = [{ nome: 'R2-D2', altura: '96' }];
        const nomeBase = `r2-d2`;
        const resultado = await obterPessoas(nomeBase);
        // primeiro verificamos mesmo sem saber se o teste irá passar
        assert.deepEqual(resultado, expected);
        // para rodar usamos $ mocha <nome do arquivo>
        // se o nome do arquivo for diferente de test.js
    });
});
