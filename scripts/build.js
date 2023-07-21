import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const root = join(__dirname, "..");

const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });

await cp(join(root, "src"), join(dist, "src"), { recursive: true });
await cp(join(root, "css"), join(dist, "css"), { recursive: true });

const pkgContent = await readFile(join(root, "package.json"), "utf8");
const pkg = JSON.parse(pkgContent);

pkg.version = process.env.RG_VERSION || "0.0.0-dev";
delete pkg.scripts;
delete pkg.jest;
delete pkg.files;
delete pkg.devDependencies;

const newPkgContent = JSON.stringify(pkg, null, 2) + "\n";
await writeFile(join(dist, "package.json"), newPkgContent);
