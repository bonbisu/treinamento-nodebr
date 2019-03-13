/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

function obterUsuario() {
    // o callback é apenas o padrao function (erro, sucesso)
    // não importando o nome da mesma, podendo ser anonima(arrow)
    // o callback, por padrão é o ultimo parametro

    return new Promise(function resolvePromise(resolve, reject) {
        // quando der algum problema -> reject(erro)
        // quando sucesso -> resolve

        setTimeout(function() {
            // return reject(new Error('DEU RUIM DE VERDADE!')); // evita quebrar a execucao indo para o catch e retornando o erro

            return resolve({
                // retorna usuario para obterUsuario após 1 segundo
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date('06/05/1991 16:20:07')
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '99999-9999',
                ddd: 11
            });
        }, 2000);
    });
}

function obterEndereco(idUsuario, callbackson) {
    setTimeout(() => {
        return callbackson(null, {
            rua: 'dos bobos',
            numero: 0
        });
    }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a funcao .then
// para manipular erros, usamos .catch
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id);
    })
    .then(function(resultado) {
        console.log('resultado', resultado);
    })
    .catch(function(erro) {
        console.error('DEU RUIM', erro);
    });

// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error);
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error1);
//             return;
//         }
//         obterEndereco(usuario.id, (error2, endereco) => {
//             if (error2) {
//                 console.error('DEU RUIM em ENDERECO', error2);
//             }
//             // usando um string dinamica com variaveis
//             console.log(`
//             Nome: ${usuario.nome},
//             Endereco: ${endereco.rua}, ${endereco.numero}
//             Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `);
//             console.log(
//                 // devolvendo tbm como json
//                 JSON.stringify({
//                     nome: usuario.nome,
//                     endereco: endereco.rua + ', ' + endereco.numero,
//                     telefone: '(' + telefone.ddd + ') ' + telefone.telefone
//                 })
//             );
//         });
//     });
// });
// // passando uma função como callback
