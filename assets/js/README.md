# Front-end assets

- `chronicle.js` contains the existing main chronicle application logic.
- `independence.js` renders the dated timeline, war register and office-holder directories.
- `revolutionaries.js` renders and filters the revolutionary archive.
- `chronicle.css` contains the original site's extracted styles.
- `archive.css` styles the two dedicated archive pages.

The pages use relative paths and vanilla JavaScript; there is no bundler or runtime framework. Keep script files syntax-valid and avoid changing the original chronicle engine while working on the separate archive renderers.
