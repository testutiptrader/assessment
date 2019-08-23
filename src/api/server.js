const axios = require("axios");
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'reactms'
});

connection.connect(() => {
    console.log('Connect...');
});

function getArrayDiff(a, b) {
    var ret = [],
        merged = [];
    merged = a.concat(b);
    for (let i = 0; i < merged.length; i++) {
        if (merged.indexOf(merged[i]) === merged.lastIndexOf(merged[i])) {
            ret.push(merged[i]);
        }
    }
    return ret;
}

app.post('/api/createProjects', async (request, response) => {
    try {
        const responseApi = await axios.get(`http://gitlab.utip.org/api/v4/projects?private_token=${request.body}&page=1&per_page=10000`);
        connection.query('SELECT * FROM project', (error, result, fields) => {
            if (error) throw error;
            if (result.length === 0) {
                responseApi.data.forEach((project, key) => {
                    connection.query(`INSERT INTO project (name, order_project, project_id) VALUES ('${project.name}', '${key + 1}', '${project.id}')`, (error, result, fields) => {
                        if (error) throw error;
                    });
                    connection.query(`UPDATE last_time_update SET last_update=UNIX_TIMESTAMP() WHERE name=project`, (error, result, fields) => {
                        if (error) throw error;
                    });
                });
            } else {
                connection.query('SELECT * FROM project', (error, result, fields) => {
                    if (error) throw error;
                    connection.query('UPDATE `last_time_update` SET `last_update`=UNIX_TIMESTAMP() WHERE `name`="project"', (error, result, fields) => {
                        if (error) throw error;
                    });
                    let projectReq = [],
                        resultDB = [];
                    responseApi.data.forEach((project, key) => {
                        projectReq.push(project.name);
                    });
                    result.forEach((projectBD, keyBD) => {
                        resultDB.push(projectBD.name);
                    });
                    const resultProject = getArrayDiff(projectReq, resultDB);
                    for (let i = 0; i < resultProject.length; i++) {
                        responseApi.data.filter(data => {
                            if (data.name === resultProject[i]) {
                                connection.query(`INSERT INTO project (name, order_project, project_id) VALUES ('${resultProject[i]}', '${resultProject.length + i + 1}', '${data.id}')`, (error, result, fields) => {
                                    if (error) throw error;
                                });
                            }
                        });
                    }
                });
            }
        });
        response.send('Ok');
    } catch (e) {

    }
});

app.get('/api/getProject', (request, response) => {
    connection.query('SELECT * FROM project', (error, result, fields) => {
        if (error) throw error;
        response.send(result);
    });
});

app.get('/api/getUsers', async (request, response) => {
    try {
        const responseApi = await axios.get(`http://gitlab.utip.org/api/v4/users?private_token=Fq7oP-fUhnaSSqVjRz3b&page=1&per_page=10000`);
        connection.query('SELECT * FROM user', (error, result, fields) => {
            if (error) throw error;
            if (result.length === 0) {
                responseApi.data.forEach((user, key) => {
                    connection.query(`INSERT INTO user (name, username, user_id) VALUES ('${user.name}', '${user.username}', '${user.id}')`, (error, result, fields) => {
                        if (error) throw error;
                    });
                });
                connection.query(`UPDATE last_time_update SET last_update=UNIX_TIMESTAMP() WHERE name=user`, (error, result, fields) => {
                    if (error) throw error;
                });
            } else {
                connection.query('SELECT * FROM user', (error, result, fields) => {
                    if (error) throw error;
                    connection.query(`UPDATE last_time_update SET last_update=UNIX_TIMESTAMP() WHERE name=user`, (error, result, fields) => {
                        if (error) throw error;
                    });
                    let UserReq = [],
                        userDB = [];
                    responseApi.data.forEach((user, key) => {
                        UserReq.push(user.name);
                    });
                    result.forEach((userBD, keyBD) => {
                        userDB.push(userBD.name);
                    });
                    const resultProject = getArrayDiff(UserReq, userDB);
                    for (let i = 0; i < resultProject.length; i++) {
                        responseApi.data.filter(data => {
                            if (data.name === resultProject[i]) {
                                connection.query(`INSERT INTO user (name, username, user_id) VALUES ('${resultProject[i]}', '${data.username}', '${data.id}')`, (error, result, fields) => {
                                    if (error) throw error;
                                });
                            }
                        });
                    }
                });
            }
        });
        response.send('Ok');
    } catch (e) {

    }
});

app.post('/api/getUpdate/',  (request, response) => {
    switch (request.body.key) {
        case 'project':
            connection.query('SELECT `last_update` FROM `last_time_update` WHERE `name`="project"', async (error, result, fields) => {
                if (error) throw error;
                if ((result[0].last_update + 86400) < Math.floor(new Date() / 1000)) {
                    await axios.post('http://localhost:5000/api/createProjects', ['Fq7oP-fUhnaSSqVjRz3b']);
                    connection.query('SELECT * FROM project', (error, result, fields) => {
                        if (error) throw error;
                        response.send(result);
                    });
                } else {
                    connection.query('SELECT * FROM project', (error, result, fields) => {
                        if (error) throw error;
                        response.send(result);
                    });
                }
            });
            break;
        case 'milestone':
            connection.query('SELECT `last_update` FROM `last_time_update` WHERE `name`="milestone"', async (error, result, fields) => {
                if (error) throw error;
                if ((result[0].last_update + 86400) < Math.floor(new Date() / 1000)) {
                    response.send('Ok');
                }
            });
            break;
        case 'user':
            connection.query('SELECT `last_update` FROM `last_time_update` WHERE `name`="user"', async (error, result, fields) => {
                if (error) throw error;
                if ((result[0].last_update + 86400) < Math.floor(new Date() / 1000)) {
                    response.send('Ok');
                }
            });
            break;
        default:
            response.send('Совпадений не найдено.');
            break;
    }
});

const port = 5000;

http.createServer({}, app).listen(port, () => `Server running on port ${port}`);