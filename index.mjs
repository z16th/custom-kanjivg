import { existsSync, mkdirSync } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";

const SVG_FOLDER_PATH = `./kanji`;
const OUTPUT_FOLDER_PATH = "./output";
const STROKE_PATHS_STYLE = `style="fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;"`;
const STROKE_NUMBERS_STYLE = `style="font-size:8;fill:#808080"`;

let fileNames = await readdir(SVG_FOLDER_PATH);

const kvgAttributes = /kvg:(?=\w+=")/gm;

if (!existsSync(OUTPUT_FOLDER_PATH)) {
  mkdirSync(OUTPUT_FOLDER_PATH);
}

for (const file of fileNames) {
  const oldsvg = await readFile(`${SVG_FOLDER_PATH}/${file}`, {
    encoding: "utf-8",
  });
  const start = oldsvg.indexOf("<svg");
  const newsvg = oldsvg
    .slice(start)
    .replace(kvgAttributes, "data-")
    .replace(STROKE_PATHS_STYLE, `class="KVG-StrokePaths"`)
    .replace(STROKE_NUMBERS_STYLE, `class="KVG-StrokeNumbers"`);

  console.log("Creating: ", file);
  await writeFile(`${OUTPUT_FOLDER_PATH}/${file}`, newsvg, (err) => {
    if (err) throw err;
  });
}
