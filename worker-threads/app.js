
//* javascrpt being a single threaded language executes one line of code at a time. if we do asynchronous operations like I/O operations => writing to file, reading from file, also API operations like POST, DELETE, PUT, GET etc, Libuv, the Node hidden threads pool makes the NodeJS app to do multithreading or multitasking at the same time.

//! But there is one issue with the Libuv that it still can't perform asychronous operatons on the CPU HEAVY computational tasks which are not surely I/O tasks

//? here is an example, where i have made a fucntion which returns a promise but this asynchronous behavior won't work because it still beahves as single threaded.

const promise = () =>
  new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e70; i++) {
      sum += i;
    }
    resolve(sum);
  });

async function addNumToMillion() {
  const result = await promise();
  console.log(result);
  console.log("in the mean time subscribe to code zaib");
}
addNumToMillion();

// This problem is resolved by worker threads
const { Worker, parentPort } = require("node:worker_threads");

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js"); // Runs in a seperate thread
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

async function main() {
  console.log("Starting the main function");
  const sumResult = await runWorker(); // Non-Blockable code or execution
  console.log("Worker result: ", sumResult);
}
main();
console.log("this line will be executed before getting the result");
