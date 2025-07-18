//Simulating a CPU heavy task in a seperate file
import { parentPort } from "node:worker_threads";
let sum = 0;
for (let i = 0; i < 1e10; i++) {
  sum += i;
}
parentPort.postMessage(sum);
