const ChildProcess = require('child_process');

if (process.argv[2]) {
    ChildProcess.spawnSync(`yarn`, ['inject', ...process.argv.slice(2)], {stdio: [0, 1, 2]});
} else {
    ChildProcess.spawnSync(`yarn`, ['inject'], {stdio: [0, 1, 2]});
}

ChildProcess.spawnSync(`yarn`, ['sketch.json'], {stdio: [0, 1, 2]});