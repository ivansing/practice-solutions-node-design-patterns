import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Level } from "level";
import { createFSAdapter } from "./fsAdapter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Level(join(__dirname, "test.db"), {
  valueEncoding: "binary",
});
const fs = createFSAdapter(db);

fs.writeFile("file.txt", "Hello Ivan", () => {
  fs.readFile("file.txt", { encoding: "utf-8" }, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log(res);
  });
});

// try to read a missing file
fs.readFile("missing.txt", { encoding: "utf-8" }, (err, res) => {
  console.error(err);
});
