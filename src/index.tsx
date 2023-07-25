import { createRoot } from 'react-dom/client';
import { Peripleo, Controls, DraggablePanel } from './peripleo';
import { Map, Zoom } from './peripleo/maplibre';
import { TEI } from './peripleo-ext';

import './peripleo/theme/default/index.css';
import './pausanias/index.css';

export const App = () => {

  const MAP_STYLE = document.querySelector('meta[name="map.style"]')?.getAttribute('content');

  return (
    <Peripleo>
      <Map 
        style={MAP_STYLE} 
        defaultBounds={[[14.3, 47.5], [17.1, 49.2]]}>
        
        <Controls position="topright">
          <Zoom />
        </Controls>

        <DraggablePanel>
          <TEI src="sample.tei.xml" />
        </DraggablePanel>
      </Map>
    </Peripleo>
  )

}

const root = createRoot(document.getElementById('app'));
root.render(<App />);