import { useState } from 'react';
import { PushPinSimple } from '@phosphor-icons/react';
import { useSearch } from '../../../../peripleo/state';
import { MoreTags } from './MoreTags';

import './TagFilter.css';

interface TagFilterProps {

  placesInViewport: Element[];

}

const getUniqueSortedByOccurrences = (arr: string[]) => {
  const occurrences = {} as { [key: string]: number };
  
  arr.forEach(str => 
    occurrences[str] = (occurrences[str] || 0) + 1);
  
  const occurrencePairs = Object.entries(occurrences);

  occurrencePairs.sort((a, b) => b[1] - a[1]);
  const sortedUniqueStrings = occurrencePairs.map(pair => pair[0]);
  
  return sortedUniqueStrings;
}

export const TagFilter = (props: TagFilterProps) => {

  const { clearFilter, setFilter } = useSearch();

  const [pinned, setPinned] = useState<string | undefined>();

  const togglePin = (tag: string) => {
    if (pinned === tag) {
      clearFilter('tag');
      setPinned(undefined);
    } else {
      setFilter({ name: 'tag', value: tag });
      setPinned(tag);
    }
  }

  const setPin = (tag?: string) => {
    if (tag) {
      setFilter({ name: 'tag', value: tag });
      setPinned(tag);
    } else {
      clearFilter('tag');
      setPinned(undefined);
    }
  }

  const tags = props.placesInViewport.reduce((tags, placeName) => {
    const anaAttr = placeName.getAttribute('ana');

    if (!anaAttr) return tags; // Skip elements without 'ana' attribute

    const ana = anaAttr
        .trim()
        .split('#')
        .filter(str => str) // Filter first empty string
        .map(str => `#${str}`.trim());

    return [...tags, ...ana];
  }, [] as string[]);

  const unique = getUniqueSortedByOccurrences(tags);

  // Always keep the pinned tag displayed
  const first = unique.slice(0, 2);

  const displayed = pinned ? 
    first.includes(pinned) ? first : [ pinned, first[0] ] : 
    first;

  return (
    <div className="p6o-teiview-tags">
      {displayed.map(tag => (
        <button key={tag}
          className={pinned === tag ? 'pinned' : undefined}
          onClick={() => togglePin(tag)}>
          {pinned === tag && (
            <PushPinSimple size={14} weight="fill" />
          )} {tag}
        </button>
      ))} {unique.length > first.length && (
        <MoreTags 
          tags={unique} 
          pinned={pinned} 
          onSetPin={setPin}
          onTogglePin={togglePin} />
      )}
    </div>
  )

}