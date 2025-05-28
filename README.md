# Peripleo-Pausanias

An interactive viewer for exploring Pausanias' Description of Greece with geospatial visualization. The application connects ancient text with modern geographical representations.

## Features

- Interactive map displaying places mentioned in Pausanias' texts
- TEI XML rendering of Pausanias' books (Books 1-10)
- Synchronized text and map navigation
- Tag filtering for place types
- Place name identification and linking

## Development

- Built with React 18.2.0 and TypeScript
- Map visualization using MapLibre GL
- TEI document rendering with CETEIcean
- Configuration via `config.json`
- Bundle visualization: `npx vite-bundle-visualizer`

## Setup

1. Install dependencies: `npm install`
2. Start development server: `vite`
3. Build for production: `docker compose build`

## Docker Deployment

```bash
docker-compose up -d
```

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

