import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { root } from "../Root/Root.js";

const library = join(root, "packages", "library");
const demo = join(root, "packages", "demo");

const dist = join(root, "dist-static");

await rm(dist, { recursive: true, force: true });

const pathPrefix = process.env.PATH_PREFIX || "";

await cp(join(library, "src"), join(dist, "src"), { recursive: true });
await cp(join(library, "css"), join(dist, "css"), { recursive: true });
await cp(join(demo, "docs", "index.html"), join(dist, "index.html"));
await cp(join(demo, "docs", "index.js"), join(dist, "index.js"));

const replace = async ({ path, occurrence, replacement }) => {
  const oldContent = await readFile(path, "utf8");
  const newContent = oldContent.replace(occurrence, replacement);
  await writeFile(path, newContent);
};

await replace({
  path: join(dist, "index.html"),
  occurrence: `/css/termterm.css`,
  replacement: `${pathPrefix}/css/termterm.css`,
});
await replace({
  path: join(dist, "index.js"),
  occurrence: `/src/createTerminal.js  `,
  replacement: `${pathPrefix}/src/createTerminal.js`,
});
