// dependencias para ler arquivos
const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
// nesse caso é desnecessario pois estamos lendo um json
// podemos ler json com const dadosJson = require('./arquivo.json')

// transformar readFile em async
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = './herois.json';
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(item =>
            id ? item.id === id : true
        );
        // equivalente if(id) {return item.id===id} else {return true}
        // afim de trazer a lista completa caso não seja fornecido o id
        return dadosFiltrados;
    }
    async cadastrar(heroi) {
        const arquivo = await this.obterDadosArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        // adicionar o id ao mesmo objero heroi com '...' e o objeto a ser concatenado
        const heroiComId = { id, ...heroi };
        // para não sobrescrever
        const dadosFinal = [...arquivo, heroiComId];
        const resultado = await this.escreverArquivo(dadosFinal);
        return resultado;
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
            throw Error('O usuário informado não existe');
        }
        dados.splice(indice, 1);
        return await this.escreverArquivo(dados);
    }

    async atualizar(id, update) {
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1) {
            throw Error('O heroi informado não existe');
        }
        const atual = dados[indice];
        const objetoAtualizar = {
            ...atual,
            ...update
        };
        dados.splice(indice, 1);
        return await this.escreverArquivo([...dados, objetoAtualizar]);
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }
}

module.exports = new Database();
