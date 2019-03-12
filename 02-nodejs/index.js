/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback) {
  setTimeout(function() {
    return callback(null, {
      // retorna usuario para obterUsuario após 1 segundo
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date('06/05/1991 16:20:07')
    });
  }, 1000);
}

function obterTelefone(idUsuario) {
  setTimeout(() => {
    return {
      telefone: '99999-9999',
      ddd: 11
    };
  }, 2000);
}

function obterEndereco(idUsuario) {}

function resolverUsuario(erro, usuario) {
  console.log('usuario', usuario);
}

obterUsuario(resolverUsuario); // passando uma função como callback

// const telefone = obterTelefone(usuario.id);

// console.log('telefone', telefone);
