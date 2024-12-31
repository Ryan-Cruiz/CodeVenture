const ORM = require('./orm');
module.exports = class mvc_model extends ORM {
    constructor() {
        super();
        this.result;
        //this.redis = require('redis');
        const { profile, config, validation } = require('../src/loaders.js');
        this.profiler = profile;
        this.Validation = validation;
        this.CONFIG = config;
        this.bcrypt = require('bcryptjs');
        // this.dbConnection();
    }
    dbConnection() {
        try {
            if (this.CONFIG.db_type === 'pg') {
                const Pool = require('pg').Pool;
                this.connection = new Pool(this.CONFIG.database);
            } else if (this.CONFIG.db_type === 'mysql') {
                this.sql = require('mysql');
                this.connection = this.sql.createConnection(this.CONFIG.database);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async redis() {
        const client = this.redis.createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        await client.connect();
    }
    /**
     * 
     * @param {*} query
     *  This function will query the statement
     * @returns A promise
     */
    Rawquery(query, arrVal = []) {
        return new Promise((resolve, reject) => {
            this.dbConnection();
            const databaseType = this.CONFIG.db_type;
            this.connection.query(databaseType === 'pg' ? query : arrVal.length > 0 ? this.sql.format(query, arrVal) : this.sql.format(query), (err, rows) => {
                if (err) reject(err);
                this.profiler.query_result = rows;
                resolve(rows);
                this.connection.destroy();
            });
        });
    }
    profiler_enable() {
        console.log('EXECUTED TIME:', this.profiler.time_exec(), 'ms');
        console.log('DATA:', {
            Url: this.profiler.req.url,
            Method: this.profiler.req.method,
            Body: this.profiler.req.body
        }, '\nQUERIES:', {
            Query_String: this.profiler.query_string,
            Results: this.profiler.query_result
        }, '\nSESSION:', {
            ID: this.profiler.req.sessionID,
            Session: this.profiler.req.session
        });
    }
}
