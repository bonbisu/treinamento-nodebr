const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoBD = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoBD());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
