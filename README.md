# Write Somewhere — official content

Static content packs for the Write Somewhere app: public templates, surfaces, and finish recipes.

This repo is **read-only public data**. The app engine never writes here from production. There are no accounts and no public upload path.

Host `manifest.json` (and the folders beside it) on Cloudflare Pages, Vercel, or GitHub Pages. Point the app at that manifest with `VITE_CONTENT_MANIFEST_URL`.

## Layout

```
manifest.json          # packs + template ids + finish catalog path
templates/<id>/        # template.json + background + thumbnail
finishes/recipes.json  # data-only finish recipes (no executable code)
packs/                 # optional pack notes
scripts/               # maintenance helpers
```

## Add an official template

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

## Finish recipes

`finishes/recipes.json` lists grade numbers plus **allowed operation names** (`color-grade`, `grain`, `vignette`, `bloom`, …). The engine implements those ops. The content repo must not ship JavaScript.

To add a finish: add a preset object with an `id`, `label`, `ops` from the allowed list, and a `grade` object. Unknown ops are ignored. The engine still ships built-in finishes if the remote catalog is missing.

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
