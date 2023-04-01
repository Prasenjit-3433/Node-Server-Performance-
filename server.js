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
    delay(4000);
    res.send(`Beep beep! - ${process.pid}`);
});

console.log('Worker process started.');
app.listen(8000);