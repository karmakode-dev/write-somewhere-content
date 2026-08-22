/**
 * Rewrites template.json background/thumbnail fields to filenames
 * relative to the template folder. Run from the content repo root:
 *   node scripts/rewrite-template-assets.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const templatesDir = path.resolve('templates')
const ids = await fs.readdir(templatesDir)
for (const id of ids) {
  const file = path.join(templatesDir, id, 'template.json')
  try {
    const tpl = JSON.parse(await fs.readFile(file, 'utf8'))
    tpl.background = path.basename(String(tpl.background || 'background.png'))
    tpl.thumbnail = path.basename(String(tpl.thumbnail || 'thumbnail.png'))
    await fs.writeFile(file, JSON.stringify(tpl, null, 2) + '\n')
    console.log('rewrote', id)
  } catch {
    // skip non-template dirs
  }
}
