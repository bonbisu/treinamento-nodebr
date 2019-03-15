// dependencias para ler arquivos
const { readFile } = require('fs');
const { promisify } = require('util');
// nesse caso é desnecessario pois estamos lendo um json
// podemos ler json com const dadosJson = require('./arquivo.json')

// transformar readFile em async
const readFileAsync = promisify(readFile);

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

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }
}

module.exports = new Database();
