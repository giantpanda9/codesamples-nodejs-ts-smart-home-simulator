import { exec } from 'child_process';
import { Brain} from './brain/brain';
import path = require("path");
import { Logger } from "tslog";

const port = 8080; // default port to listen
const smartDev = exec(path.join(__dirname,'/bios/goSmart'));
const log: Logger = new Logger();

smartDev.stdout.on('data', (data) => {
  log.info(`stderr: ${data}`);
});

smartDev.stderr.on('data', (data) => {
  log.info(`stderr: ${data}`);
});

smartDev.on('close', (code) => {
  log.info(`child process exited with code ${code}`);
});

const brainobj = new Brain();
brainobj.startActivity()

