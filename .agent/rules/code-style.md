---
trigger: always_on
---

You will only use the following tools for every styling and behaviour creation: 
- Tailwind v4
- GSAP

Info about code locations: 
- src: all the main code which include all js/ts files, global css and static assets live here, this is also the main entry point for the tailwind base file.
- templates: this is where all the twig templates (html code really) for drupal lives, the sub  directories are
  - page: specific pages
  - layout: page layouts, defines the structure of page
  - navigation: just contains the actual header and footer code
  - menus: how to style and structue the drupal menus
  - blocks: MAIN various different blocks which a user will be able to place using the drupal ui editor ig
- config: yml files which define settings mostly, what options any given block will have. what will show up in the forms on the site in these block settings. there is other stuff too, you can figure it out.
- components: we don't touch components for now
- dist: build output which drupal 