module.exports = {
    migrations: { tableName: 'knex_migrations' },
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        charset: 'utf8',
    },
    useNullAsDefault: true,
    seeds: {
        directory: __dirname + '/seeds'
    }
};