/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

function obterUsuario() {
  setTimeout(function() {
    return {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    };
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

const usuario = obterUsuario();
const telefone = obterTelefone(usuario.id);

console.log('usuario', usuario);
console.log('telefone', telefone);
