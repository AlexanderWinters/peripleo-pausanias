## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Run the development server:**
   ```
   npm start
   ```
   This uses [Vite](https://vitejs.dev/) for fast development.

3. **Build for production:**
   ```
   npm run build
   ```

4. **Preview the production build:**
   ```
   npm run preview
   ```

---

## Configuration

The main configuration is in `docs/config.json`:

```json
{
  "map": "https://api.maptiler.com/maps/basic-v2-light/style.json?key=...",
  "gazetteer": "pleiades-all-located-places.lp.json",
  "tei": {
    "name": "Pausanias Book 1",
    "url": "pausanias-book1.tei.xml"
  },
  "layers": [{
    "name": "ASCSA Monuments",
    "url": "ascsa-monuments-places.lp.json"
  }]
}
```

- **map**: URL to the map style (MapLibre/MapTiler).
- **gazetteer**: Path to the main places GeoJSON.
- **tei**: The TEI file to display, with a name and URL.
- **layers**: Additional data layers to show on the map.

The config is loaded at runtime by the `useConfig` hook in `src/Config.ts`.

---

## Core Concepts

### 1. **TEI Texts**
- TEI XML files are used to encode ancient texts with rich markup.
- The app parses and displays these texts, highlighting place names and linking them to map features.

### 2. **Map and Layers**
- The map is rendered using [MapLibre GL JS](https://maplibre.org/).
- Gazetteer and additional layers are loaded as GeoJSON and visualized with custom styles.

### 3. **Data Importers**
- TEI place references are parsed and converted into map annotations.
- The main importer is in `src/pausanias/importer/placeRefImporter.ts`.

---

## TEI Integration

- **Parsing**: TEI files are loaded and parsed using [CETEIcean](https://github.com/TEIC/CETEIcean), which converts TEI XML to HTML5 for display.
- **Viewer**: The main TEI viewer is in `src/peripleo-ext/tei/TEIView.tsx`.
  - Highlights place names.
  - Synchronizes map and text selection.
  - Allows toggling between "map all places" and "text window" modes.
- **Customization**: TEI CSS in `src/peripleo-ext/tei/TEITextView/TEITextView.css` provides detailed styling for TEI elements.

---

## Map and Data Layers

- **Gazetteer**: The main set of places, loaded from GeoJSON.
- **Additional Layers**: Configurable via `config.json`, can include monuments, archaeological sites, etc.
- **Layer Switcher**: UI component to toggle visibility of layers.
- **Popups and Tooltips**: Show information about places and layers.

---

## Extending the Project

- **Adding TEI Files**: Place new TEI XML files in `docs/` and update `config.json`.
- **Adding Data Layers**: Add new GeoJSON files and reference them in `config.json`.
- **TEI Parsing**: The TEI importer can be extended to handle new or non-standard TEI markup (see `src/pausanias/importer/`).
- **UI Customization**: Theming and layout can be adjusted in the `theme/` directories.

---

## Development Scripts

Defined in `package.json`:

- `start`: Launches the Vite dev server.
- `build`: Builds the app for production.
- `preview`: Previews the production build.

---

## Dependencies

Key dependencies include:

- **React**: UI framework.
- **MapLibre GL JS**: Map rendering.
- **CETEIcean**: TEI XML to HTML5 conversion.
- **@turf/bbox**: Geospatial utilities.
- **Radix UI**: UI primitives.
- **Chroma.js**: Color utilities.

See `package.json` for the full list.

---

## Notes

- The app is designed to be extensible for other ancient texts and datasets.
- The TEI parser and viewer can be customized for different markup conventions.
- All configuration and data files are expected in the `docs/` directory for easy deployment.

---

# Peripleo-Pausanias Documentation

## Overview

**Peripleo-Pausanias** is a web application for visualizing and exploring ancient texts (in TEI XML format) alongside geospatial data. It integrates a map interface, text viewer, and data layers, allowing users to interactively explore places mentioned in historical sources.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
3. [Configuration](#configuration)
4. [Core Concepts](#core-concepts)
5. [TEI Integration](#tei-integration)
6. [Map and Data Layers](#map-and-data-layers)
7. [Extending the Project](#extending-the-project)
8. [Development Scripts](#development-scripts)
9. [Dependencies](#dependencies)
10. [To Do](#to-do)

---

## Project Structure
