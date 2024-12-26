class ORM {
    constructor() {
        this.queries = '';
        this.select_tbl = '';
        this.arrVal = [];
    }
    select(tbl_name, arr_values) {
        this.queries = `SELECT `;
        if (arr_values[0] === '*' && arr_values.length === 1 || arr_values === '*') {
            this.queries += `* FROM `;
        } else {
            for (let i = 0; i < arr_values.length; i++) {
                if (i !== arr_values.length - 1) {
                    this.queries += `${arr_values[i]},`;
                } else {
                    this.queries += `${arr_values[i]} FROM `;
                }
            }
        }
        this.select_tbl = tbl_name;
        this.queries += tbl_name;
        return this;
    }

    /**
     * 
     * @param {*} condition_arr 
     * @returns 
     * This will take an array of condition e.g WHERE([t1, ORM.and(t2) , ORM.or(t3) ])
     */
    where(condition_arr) {
        this.queries += ` WHERE `
        for (let i = 0; i < condition_arr.length; i++) {
            this.queries += `${condition_arr[i]}  `;
        }
        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns 
     * will take the value and return it to append
     * e.g  WHERE([t1, ORM.or(t3) ])
     */
    or(value) {
        return `OR ${value}`;
    }

    /**
     * 
     * @param {*} value 
     * @returns 
     * will take the value and return it to append
     * e.g  WHERE([t1, ORM.and(t2)])
     */
    and(value) {
        return `AND ${value}`;
    }

    /**
     * 
     * @param {*} tbl_name 
     * TABLE OF THE NEW TABLE THAT WANT TO JOIN
     * @param {*} tbl_columns 
     * WILL TAKE 2 VALUES IN ARRAY THE FIRST IS ON NEW SELECTED
     * TABLE AND SECOND IS ON SELECTED TABLE
     * selected table = test1
     * e.g INNER(test2,[ id,user_id ])
     */
    inner(tbl_name, tbl_columns) {
        let output = ` INNER JOIN ${tbl_name} ON ${tbl_name}.${tbl_columns[0]} = ${this.select_tbl}.${tbl_columns[1]}`;
        this.queries += output;
        return this;
    }
    left(tbl_name, tbl_columns) {
        let output = ` LEFT JOIN ${tbl_name} ON ${tbl_name}.${tbl_columns[0]} = ${this.select_tbl}.${tbl_columns[1]}`;
        this.queries += output;
        return this;
    }

    destroy(tbl_name) {
        let output = `DELETE FROM ${tbl_name}`;
        this.queries += output;
        return this;
    }

    insert(table, query_fields_arr) {
        this.queries = `INSERT INTO ${table}(`;
        for (let i = 0; i < query_fields_arr.length; i++) {
            if (i >= query_fields_arr.length - 1) {
                this.queries += `${query_fields_arr[i]})`;
            } else {
                this.queries += `${query_fields_arr[i]},`;
            }
        }
        this.queries += ` VALUES(`;
        for (let i = 0; i < query_fields_arr.length; i++) {
            if (i >= query_fields_arr.length - 1) {
                this.queries += `?);`;
                break;
            } else {
                this.queries += `?,`;
            }
        }
        // console.log(this.queries)
        return this;
    }
    update(table, query_fields_arr) {
        this.queries = `UPDATE ${table} SET `;
        for (let i = 0; i < query_fields_arr.length; i++) {
            if (i >= query_fields_arr.length - 1) {
                this.queries += `${query_fields_arr[i]}`;
            } else {
                this.queries += `${query_fields_arr[i]},`;
            }
        }
        return this;
    }
    /**
     * 
     * @param {*} attr 
     * table attribute
     * @param {*} type
     * ASC OR DESC DEFAULT IS ASC 
     */
    order(attr, type) {
        this.queries += ` ORDER BY ${attr} ${type != "" ? type : "ASC"}`;
        return this;
    }
    // UPDATE `codeventure`.`users` SET `email` = 'developer.access@email.coms' WHERE (`id` = '1');
    values(arrVal) {
        this.arrVal = arrVal;
        return this;
    }
    exec() {
        // console.log(this.queries,'exec funct'); // debugger console
        return new Promise((resolve, reject) => {
            this.connection.connect(function (err) {
                if (err) throw err;
                console.log("SQL Connected!");
            });
            const databaseType = this.CONFIG.db_type;
            // console.log(this.arrVal.length > 0 ? [this.queries,this.arrVal] : this.queries,'from exec')
            this.connection.query(databaseType === 'pg' ? this.queries : this.arrVal.length > 0 ? this.sql.format(this.queries, this.arrVal) : this.sql.format(this.queries), (err, rows) => {
                //  this.profiler.queries(query,rows);
                // if (err) {
                //     reject(fase);
                // } else {
                //     this.queries = '';
                //     this.select_tbl = '';
                //     this.arrVal = [];
                //     resolve(rows);
                // }
                setTimeout(() => {
                    resolve(rows);
                    this.queries = '';
                    this.select_tbl = '';
                    this.arrVal = [];
                    this.connection.destroy();
                }, 300);
            });
        });
    }
}
module.exports = ORM;