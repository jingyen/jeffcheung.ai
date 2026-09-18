import { removeBackground } from "@imgly/background-removal-node";
import { writeFileSync, readFileSync } from "fs";

const input = "/Users/leonardodapinchy/.hermes/profiles/research/cache/images/img_f760e033e438.jpg";
const output = "/Users/leonardodapinchy/.hermes/workspace/jeff-cheung-ai-consultant/html/headshot_nobg.png";

console.log("Removing background...");
const blob = await removeBackground(input);
const buffer = Buffer.from(await blob.arrayBuffer());
writeFileSync(output, buffer);
console.log("Saved:", output);
