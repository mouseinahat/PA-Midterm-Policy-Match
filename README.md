# Sources Page Patch

Add these files to your existing PA Policy Match repo:

```text
sources.html
src/sources.js
data/position-sources.json
```

Then append the contents of:

```text
src/sources-page-css-append.txt
```

to the bottom of your existing:

```text
src/styles.css
```

Optional but recommended: update the nav links in `index.html`, `methodology.html`, and `privacy.html` to include:

```html
<a href="./sources.html">Sources</a>
```
