### Doc card icons

Set a page's `sidebar_custom_props.card_icon` front matter to an image path
under `static/` to use a custom icon for that page in `DocCard` lists. For
example:

```md
---
sidebar_custom_props:
  card_icon: img/icons/vector-search.svg
  card_icon_invert_dark: true
---
```

Pages without `card_icon` keep the default page icon. Each page can use a
different image. Set `card_icon_invert_dark: true` for a monochrome icon with
a dark outline that should be inverted in dark mode.
