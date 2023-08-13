import { useEffect, useState } from 'react';
import CETEI from 'CETEIcean';
import Switch from 'react-switch';
import { useSearch } from '../../peripleo/state';
import { TEITextView } from './TEITextView';
import { SectionNavigator } from './SectionNavigator';

import './TEIView.css';

interface TEIViewProps {

  title: string;

  src: string;

  onLoad(placeNames: Element[]): void;

}

// Shorthand
const addClass = (id: string, cls: string) => {
  const elem = document.getElementById(id);

  if (elem)
    elem.classList.add(cls);
}

// Shorthand
const deselect = (root: Element) => {
  root.querySelectorAll('.p6o-tei-selected').forEach(elem => {
    elem.classList.remove('p6o-tei-selected');
    elem.classList.remove('p6o-tei-primary');
  });
}

export const TEIView = (props: TEIViewProps) => {

  const { clearFilter, getFilter, setFilter } = useSearch();

  const [showAll, setShowAll] = useState(false);

  const [tei, setTEI] = useState<Element>(null);

  const [inViewport, setInViewport] = useState<Element[]>([]);

  useEffect(() => {
    const CETEIcean = new CETEI();

    CETEIcean.getHTML5(props.src, (data: Element) => {
      setTEI(data);

      const placeNames = Array.from(data.querySelectorAll('tei-body tei-placename'));
      props.onLoad(placeNames);
    });
  }, []);

  const onViewportChange = (placenames: Element[]) =>
    setInViewport(placenames);

  useEffect(() => {
    if (showAll) {
      if (getFilter('visible-waypoints'))
        clearFilter('visible-waypoints');
    } else {
      const ids = inViewport.map(el => el.getAttribute('xml:id'));
      setFilter({ name: 'visible-waypoints', value: ids });
    }
  }, [inViewport, showAll]);

  return (
    <article className="p6o-teiview-container">
      <header>
        <h1>{props.title}</h1>

        <div className="p6o-teiview-mode-switch">
          <span>All Places</span>

          <Switch 
            height={18}
            width={34}
            onColor="#ced0d1"
            offColor="#ced0d1"
            checkedIcon={false}
            uncheckedIcon={false}
            checked={!showAll}
            onChange={checked => setShowAll(!checked)} />
          <span>Places in View</span>
        </div>
      </header>

      <TEITextView 
        tei={tei}
        onViewportChange={onViewportChange} />

      <footer>
        <SectionNavigator
          tei={tei}
          width={640} 
          height={120} />
      </footer>
    </article>
  )

}