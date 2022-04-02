"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const brain_1 = require("./brain/brain");
const path = require("path");
const tslog_1 = require("tslog");
const port = 8080; // default port to listen
const smartDev = (0, child_process_1.exec)(path.join(__dirname, '/bios/goSmart'));
const log = new tslog_1.Logger();
smartDev.stdout.on('data', (data) => {
    log.info(`stderr: ${data}`);
});
smartDev.stderr.on('data', (data) => {
    log.info(`stderr: ${data}`);
});
smartDev.on('close', (code) => {
    log.info(`child process exited with code ${code}`);
});
const brainobj = new brain_1.Brain();
brainobj.startActivity();
//# sourceMappingURL=app.js.map