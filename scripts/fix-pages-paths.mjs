import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

async function updateJavaScript(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) {
      await updateJavaScript(path)
    } else if (entry.name.endsWith(".js")) {
      const source = await readFile(path, "utf8")
      const updated = source.replace(/(?<!\.)\/assets\//g, "./assets/")
      if (updated !== source) await writeFile(path, updated)
    }
  }
}

await updateJavaScript("dist")

