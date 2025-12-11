# Drupal Svelte Component Template

A template for creating Svelte components that integrate with Drupal's [Component module](https://www.drupal.org/project/component).

## Quick Start

1. **Clone this template into your Drupal module:**
   ```bash
   cd web/modules/custom/YOUR_MODULE/components/
   git clone https://github.com/YOUR_USERNAME/drupal-svelte-component-template YOUR_COMPONENT_NAME
   cd YOUR_COMPONENT_NAME
   rm -rf .git
   ```

2. **Rename files:**
   ```bash
   mv {component_name}.component.yml YOUR_COMPONENT_NAME.component.yml
   mv {component_name}.twig YOUR_COMPONENT_NAME.twig
   ```

3. **Update configurations:**
   - Edit `YOUR_COMPONENT_NAME.component.yml` - change `name` and `description`
   - Edit `YOUR_COMPONENT_NAME.twig` - update template content
   - Edit `package.json` - change `name` field to match

4. **Install and build:**
   ```bash
   pnpm install
   pnpm run build
   drush cr
   ```

## What's Included

- ✅ Vite 5 build configuration optimized for Drupal
- ✅ Svelte 5 with TypeScript support
- ✅ Pre-configured output paths for Drupal component module
- ✅ Example component structure
- ✅ Proper `.gitignore` for Drupal projects

## Configuration Files

### vite.config.ts
Configured to output predictable filenames that Drupal expects:
- `dist/assets/index.js`
- `dist/assets/index.css`

### {component_name}.component.yml
Drupal component definition with:
- Component metadata (name, description)
- Props schema (required for modules)
- Asset paths for JS/CSS
- Template reference

### {component_name}.twig
Twig template that Drupal renders. The Svelte app will mount here.

## Important: Component Naming Rules

⚠️ **MUST use underscores, NOT hyphens!**

- ✅ Good: `my_component`, `user_profile`, `image_gallery`
- ❌ Bad: `my-component`, `user-profile`, `image-gallery`

The Drupal component discovery only accepts: `[a-zA-Z_][a-zA-Z0-9_]*`

## File Structure

```
YOUR_COMPONENT_NAME/
├── {component_name}.component.yml  # Drupal config (rename this)
├── {component_name}.twig          # Twig template (rename this)
├── package.json                   # Dependencies
├── vite.config.ts                 # Build config
├── svelte.config.js              # Svelte config
├── tsconfig*.json                # TypeScript config
├── index.html                    # Dev entry point
├── src/
│   ├── main.ts                   # App entry
│   ├── App.svelte                # Root component
│   └── lib/                      # Your components
└── dist/                         # Built files (generated)
```

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (for development)
pnpm run dev

# Build for Drupal (production)
pnpm run build

# Type checking
pnpm run check
```

## Drupal Integration

After building, clear Drupal cache:
```bash
drush cr
```

Your component will appear in the block placement UI at:
`/admin/structure/block`

## Resources

- [Drupal Component Module](https://www.drupal.org/project/component)
- [Svelte Documentation](https://svelte.dev/)
- [Vite Documentation](https://vitejs.dev/)

## License

GPL-2.0-or-later
