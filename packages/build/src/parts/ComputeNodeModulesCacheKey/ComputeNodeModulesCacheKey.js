import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import * as Root from "../Root/Root.js";

const locations = [
  "lerna.json",
  "package-lock.json",
  "packages/build/package-lock.json",
  "packages/demo/package-lock.json",
  "packages/library/package-lock.json",
  ".github/workflows/ci.yml",
  ".github/workflows/pr.yml",
  ".github/workflows/release.yml",
  "scripts/computeNodeModulesCacheKey.js",
];

const getAbsolutePath = (relativePath) => {
  return join(Root.root, relativePath);
};

const getContent = (absolutePath) => {
  return readFile(absolutePath, "utf8");
};

export const computeHash = (contents) => {
  const hash = createHash("sha1");
  if (Array.isArray(contents)) {
    for (const content of contents) {
      hash.update(content);
    }
  } else if (typeof contents === "string") {
    hash.update(contents);
  }
  return hash.digest("hex");
};

const computeCacheKey = async (locations) => {
  const absolutePaths = locations.map(getAbsolutePath);
  const contents = await Promise.all(absolutePaths.map(getContent));
  const hash = computeHash(contents);
  return hash;
};

const main = async () => {
  const hash = await computeCacheKey(locations);
  process.stdout.write(hash);
};

main();
