const ICrud = require('./interfaces/interfaceCrud');

class MongoBD extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em MongoDB');
    }
}

module.exports = MongoBD;
