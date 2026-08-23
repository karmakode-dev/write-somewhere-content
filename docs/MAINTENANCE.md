# Maintenance

Internal notes. Not for the public README.

Static content packs for the Write Somewhere app: public templates, finish recipes, material recipes, fonts, and optional sticker packs.

This repo is **read-only public data**. The app engine never writes here from production. There are no accounts and no public upload path.

Host `manifest.json` (and the folders beside it) on Cloudflare Pages, Vercel, or GitHub Pages. Point the app at that manifest with `VITE_CONTENT_MANIFEST_URL`.

## Layout

```
manifest.json             # packs + template ids + catalog paths
templates/<id>/           # template.json + background + thumbnail
finishes/recipes.json     # data-only finish recipes (no executable code)
materials/recipes.json    # data-only material recipes
fonts/catalog.json        # font metadata; optional fonts/files/
stickers/catalog.json     # optional extra stickers
packs/                    # optional pack notes
scripts/                  # maintenance helpers
```

## Author from the local app

Do not hand-edit JSON for normal official content.

1. Run the **local** Write Somewhere app (`npm run dev`).
2. Open **Studio** (landing header, or `?studio=1`).
3. Create or edit Finishes / Materials / Fonts / Templates / Stickers visually.
4. **Save local draft**, then **Publish official**. That writes this repo and updates `manifest.json`.
5. **Commit & push** from Studio if git/GitHub auth works, or commit this repo in the terminal.

Templates are still authored in the editor (Save as Template), then published from Studio or the save dialog.

## Add an official template (same pipeline)

1. Author it in the **local** Write Somewhere app (dev).
2. **Save as Template** (personal/local draft on your machine).
3. In dev, **Publish to official content repo**. That writes `templates/<id>/` here and updates `manifest.json`.
4. Commit and push this repo.
5. After the static host updates, production loads it from the remote manifest.

You can also copy a folder into `templates/<id>/` by hand. `template.json` should use **relative** asset names (`background.png`, `thumbnail.png`), not `/content/...` engine paths.

## Edit / update an official template

1. Open it in the local app.
2. Save as Template (creates/updates your local draft).
3. **Publish to official content repo** again with the **same id** to overwrite the official files.
4. Commit and push.

Production users cannot overwrite official templates. If they edit one, Save as Template makes a **personal copy** on their device only.

## Personal vs official

| | Official | Personal / local |
|---|---|---|
| Where | this repo, loaded from the remote manifest | IndexedDB in that browser |
| Who sees it | everyone | only that device |
| Editable in production | no (read-only) | yes |
| Publish to this repo | local/dev only | never from production |

Dev-authored files still live in the engine repo at `app/public/content/dev-authored/` for local testing. They are **not** production content.

## Finish / material / font recipes

Catalogs list numbers and allowed names. The engine implements those ops. This repo must not ship JavaScript.

Fonts: prefer a Google Fonts `googleName`. Only add font files when the license allows redistribution in this public repo.

Studio delete of engine/legacy items may add ids to `manifest.json` `hidden` (`fonts`, `materials`, `finishes`, `stickers`, `templates`) so they leave the public library after deploy.

## App config

In the engine app:

```
VITE_CONTENT_MANIFEST_URL=https://<your-pages-host>/manifest.json
```

If that is unset, the app still runs using local/dev templates and personal drafts.

Local/dev authoring can also serve this folder from the Vite dev server at `/__official/` when the sibling repo exists. Optional override:

```
WRITE_SOMEWHERE_CONTENT_REPO=C:\path\to\write-somewhere-content
```

That path is **dev-server only**. It is never exposed as a public write API.
