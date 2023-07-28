import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { root } from "../Root/Root.js";

const library = join(root, "packages", "library");

const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });

await cp(join(library, "src"), join(dist, "src"), { recursive: true });
await cp(join(library, "css"), join(dist, "css"), { recursive: true });
await cp(join(root, "README.md"), join(dist, "README.md"));
await cp(join(root, "LICENSE"), join(dist, "LICENSE"));

const pkgContent = await readFile(join(library, "package.json"), "utf8");
const pkg = JSON.parse(pkgContent);

pkg.version = process.env.RG_VERSION || "0.0.0-dev";
delete pkg.scripts;
delete pkg.jest;
delete pkg.files;
delete pkg.devDependencies;

const newPkgContent = JSON.stringify(pkg, null, 2) + "\n";
await writeFile(join(dist, "package.json"), newPkgContent);
