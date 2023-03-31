const cluster = require('cluster');
const os = require('os');

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
    // total number of logical CPU cores
    const NUM_WORKERS = os.cpus().length;
    console.log('Total logical CPU cores:', NUM_WORKERS);

    // total number of worker process = total number of logical CPU cores
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log('Worker process started.');
    app.listen(8000);
}