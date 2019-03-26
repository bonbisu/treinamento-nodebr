const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander.version('v1')
        .option('-n , --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')
        .option('-i, --id [value]', 'Id do Heroi')

        .option('-c, --cadastrar', 'Cadastrar um Heroi')
        .option('-l, --listar', 'Listar um heroi')
        .option('-r, --remover [value]', 'Remove um heroi pelo id')
        .option('-a, --atualizar [value]', 'Atualizar um heroi pelo id')
        .parse(process.argv); // implementa comandos e parseia para o programa
    const heroi = new Heroi(Commander);
    try {
        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.cadastrar) {
            if (!heroi.id) {
                delete heroi.id; // se estiver undefined, é removido
            }
            const resultado = await Database.cadastrar(heroi);
            const cadastrado = await Database.listar();
            if (!resultado) {
                console.error('Heroi não foi cadastrado!');
                return;
            }
            console.log(
                'Heroi Cadastrado com sucesso!',
                cadastrado.slice(-1)[0] // pegar ultimo valor do array
            );
        }

        if (Commander.remover) {
            const removido = await Database.listar(heroi.id);
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('Não foi possivel remover o heroi', heroi.id);
                return;
            }
            console.log('Heroi removido com sucesso!', removido);
        }

        if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            // remover todas as chaves undefined | null
            if (!heroi.id) {
                delete heroi.id; // se estiver undefined, é removido
            }
            const dado = JSON.stringify({ ...heroi });
            const heroiAtualizar = JSON.parse(dado);

            const resultado = await Database.atualizar(
                idParaAtualizar,
                heroiAtualizar
            );

            const atualizado = await Database.listar(idParaAtualizar);
            if (!resultado) {
                console.error('Não foi possivel atualizar o heroi');
            }
            console.log('Heroi atualizado com sucesso!', atualizado);
        }
    } catch (error) {
        console.error('DEU RUIM', error);
    }
}

main();
