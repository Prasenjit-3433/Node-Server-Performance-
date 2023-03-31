const cluster = require('cluster');

const express = require('express');

cluster.schedulingPolicy = cluster.SCHED_RR;

const app = express();

function delay(duration) {
    const startTime = Date.now();

    while(Date.now() - startTime < duration) {
        // event-loop is blocked...
    }
}

app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Ding dong! - ${process.pid}`);
});

if (cluster.isMaster) {
    console.log('Master has been started...');
    cluster.fork();
    cluster.fork();
} else {
    console.log('Worker process started.');
    app.listen(8000);
}

console.log('Running server.js');