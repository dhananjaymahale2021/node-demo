const mysql = require("mysql");

const getConnection = function() {
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "studentManagement"
    });

    return connection;
};

module.exports = {
    getConnection: getConnection
};
