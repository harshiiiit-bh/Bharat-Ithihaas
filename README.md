# Bhārat Itihās — The Living Chronicle of India

An interactive, static website for exploring Indian history, from early civilizations through empires, battles, rulers, monuments and the independence movement. The site is published with GitHub Pages; it has no required build step or application server.

## Pages

- `index.html` — the original interactive chronicle, with the empire, ruler, monument, quiz and search experiences.
- `independence.html` — a dated timeline from the East India Company's 1600 charter through the 1947 transfer of power, a searchable war/campaign register and directories of central office-holders.
- `revolutionaries.html` — searchable profiles of people associated with underground, militant, armed and overseas anti-colonial activity.

## Project structure

```text
.
├── index.html
├── independence.html
├── revolutionaries.html
└── assets/
    ├── css/
    │   ├── chronicle.css
    │   └── archive.css
    ├── js/
    │   ├── chronicle.js
    │   ├── independence.js
    │   └── revolutionaries.js
    └── data/
        ├── guess-bank.json
        ├── story-library.json
        ├── extended-quotes.json
        ├── independence-events.json
        ├── wars.json
        ├── administrators.json
        └── revolutionaries.json
```

## Editing the history archive

The Independence and Revolutionaries pages load data from JSON, separately from their presentation and behaviour.

- Add or correct timeline entries in `assets/data/independence-events.json`. Keep `year`, `dateLabel`, `category`, `title`, `summary`, `detail`, `people` and `sourceIds` together.
- Add wars, battles, campaigns or uprisings in `assets/data/wars.json`. Use the conflict type that best describes the record; not every armed event was a conventional war.
- Maintain governors, viceroys, acting office-holders and India Office secretaries in `assets/data/administrators.json`.
- Add biographies to `assets/data/revolutionaries.json`. The profiles are summaries, not exhaustive biographies.
- Shared archive styling lives in `assets/css/archive.css`; page-specific rendering lives in `assets/js/independence.js` and `assets/js/revolutionaries.js`.

Every `sourceIds` value should match a source object's `id` in the relevant JSON data. Prefer primary documents, public institutions, university material and reputable scholarly references. Preserve date precision: use a year or range when a reliable day-level date is unavailable. Mark disputed estimates, contested interpretations and regional variations in the entry's detail/notes.

## Scope and historical notes

The 1600–1947 timeline is a curated, searchable chronology of important and regionally significant milestones. It is not a claim to include every local action, raid, battle or every day over the entire period. The Company’s governing powers in India ended in 1858 when administration passed to the Crown; the East India Company’s formal corporate dissolution came later, in 1874. The 1947 transfer created the Dominions of India and Pakistan and was accompanied by Partition.

The office directory separates Company-era governors, Governors-General, Viceroys, acting holders, Dominion Governors-General and Presidents. The Secretary of State for India was a separate office in London; from 1937 its designation included Burma, and its India role ended with independence.

## Deployment

The repository's GitHub Pages configuration publishes the `main` branch. Commits to `main` trigger the Pages deployment workflow. All links to assets and pages are relative, so the site works from the repository's project path.

No framework, package manager or database is required for the static archive.
