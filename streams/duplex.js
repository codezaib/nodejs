const { Duplex } = require("stream");

// Simple duplex stream that echoes input back in uppercase
class EchoStream extends Duplex {
  constructor() {
    super();
    this.data = [];
  }

  // Write side - receives data
  _write(chunk, encoding, callback) {
    // Convert to uppercase and store
    const uppercased = chunk.toString().toUpperCase();
    this.data.push(uppercased);
    callback();
  }

  // Read side - sends data out
  _read() {
    if (this.data.length > 0) {
      this.push(this.data.shift());
    }
  }
}

// Usage
const echo = new EchoStream();

// Listen for output (readable side)
echo.on("data", (chunk) => {
  console.log("Output:", chunk.toString());
});

// Send input (writable side)
echo.write("hello");
echo.write("world");
echo.write("duplex stream");

echo.end();
