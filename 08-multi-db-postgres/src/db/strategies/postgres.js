const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null; // inicializa metodo privado
        this._sequelize = null;
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item);
        return dataValues;
    }
    async read(item = {}) {
        return await this._heroes.findAll({ where: item, raw: true });
    }
    async update(id, item) {
        console.log('###################', id);
        return this._heroes.update(item, { where: { id: id } });
    }
    async defineModel() {
        this._heroes = this._sequelize.define(
            'herois',
            {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    required: true
                },
                poder: {
                    type: Sequelize.STRING,
                    required: true
                }
            },
            {
                tableName: 'TB_HEROIS',
                freezeTableName: false,
                timestamps: false
            }
        );
        await this._heroes.sync();
    }
    async connect() {
        this._sequelize = new Sequelize('herois', 'test', 'test', {
            host: 'localhost',
            dialect: 'postgres',
            quoteIdentifiers: false
            // operatorsAliases: false
        });

        this.defineModel();
    }
    async isConnected() {
        try {
            this._sequelize.authenticate();
            return true;
        } catch (error) {
            console.log('fail', error);
            return false;
        }
    }
}

module.exports = Postgres;
