# Svelte SDC Development

This directory contains the source code for Svelte-based Single Directory Components (SDCs) used in the Drupal theme. The components are built as Web Components (Custom Elements) to ensure encapsulation and compatibility.

## Prerequisites

- Node.js
- pnpm (or npm)

## Project Structure

- `src/`: Contains the source code for components. Each subdirectory represents a component.
- `app.css`: Global styles (Tailwind CSS) shared across components.
- `drupal.build.ts`: A custom Vite plugin that automates the generation of Drupal SDC files (`.component.yml` and `.twig`).
- `vite.config.ts`: Configuration for building the components as libraries.

## Creating a New Component

To create a new Svelte SDC, follow these steps:

1. **Create a Component Directory**
   Create a new directory in `src/` with your component name (e.g., `my-component`).

   ```bash
   mkdir src/my-component
   ```

2. **Create the Svelte Component**
   Create a `.svelte` file inside your new directory (e.g., `src/my-component/my-component.svelte`).

   **Important Requirements:**
   - Define the custom element tag name using `<svelte:options>`.
   - Import and inject `app.css` to ensure Tailwind styles are applied within the Shadow DOM.

   ```svelte
   <svelte:options customElement="my-component" />

   <script>
     // Import global Tailwind styles
     import globalStyles from "../app.css?inline";
     
     // Define props
     export let title = "Default Title";
   </script>

   <!-- Inject styles into Shadow DOM -->
   {@html `<style>${globalStyles}</style>`}

   <div class="p-4 bg-white rounded shadow">
     <h2 class="text-xl font-bold">{title}</h2>
     <slot></slot>
   </div>

   <style>
     /* Component-specific styles */
   </style>
   ```

3. **Create the Entry File**
   Create a `main.ts` file in your component directory to export the component. This acts as the entry point for the build process.

   ```typescript
   import './my-component.svelte';
   ```

## Building Components

Run the build command to compile the components and generate the necessary Drupal files:

```bash
pnpm build
```

### What happens during build?

1. **Compilation**: Vite compiles the Svelte components into standard JavaScript Custom Elements.
2. **Output**: The compiled files are output to `../components/<component-name>/`.
3. **SDC Generation**: The `drupal-sdc-generator` plugin automatically:
   - Copies or generates a `<component-name>.component.yml` file.
   - Copies or generates a `<component-name>.twig` file that renders the custom element.
   - Updates the YAML file to include the generated JS and CSS assets.

## Using Components in Drupal

Once built, the component exists as a standard SDC in the `components` directory of the theme. You can use it in Drupal templates (Twig) just like any other SDC.

**Example usage in a Twig template:**

```twig
{{ include('sacda_test_islandora_theme:my-component', {
  title: 'Hello Drupal',
}) }}
```

## Styling

- **Tailwind CSS**: The project is configured to use Tailwind CSS. Styles defined in `app.css` are available to all components that import it.
- **Shadow DOM**: Because components use Shadow DOM, global styles from the Drupal theme won't leak in. You **must** inject `app.css` (as shown above) to use utility classes.

## Development

Currently, the workflow relies on `pnpm build` to generate the artifacts Drupal expects. 

If you are modifying a component, run `pnpm build` to regenerate the assets in the `../components` directory.
