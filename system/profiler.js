module.exports = {
    query_string: '',
    res: () => { },
    req: () => { },
    query_result: [],
    time: 0,
    appServiceRole: false,
    queries(string, result) {
        this.query_string = string;
        this.query_result = result;
    },
    time_exec() {
        //for (let i = 0; i < 100000; i++) { }
        let end = Date.now();
        return new_time = end - this.time;
    }
}