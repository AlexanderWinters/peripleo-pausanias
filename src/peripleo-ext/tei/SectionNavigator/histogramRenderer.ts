import { HistogramConfig } from './HistogramConfig';
import { Section } from './Section';

const DEFAULT_CONFIG: HistogramConfig = {

  backgroundColor: '#fff',

  gap: 2,

  maxBars: 120

}

const fillDefaults = (config: HistogramConfig) => ({

  backgroundColor: config.backgroundColor || DEFAULT_CONFIG.backgroundColor,

  gap: config.gap || DEFAULT_CONFIG.gap,

  maxBars: config.maxBars || DEFAULT_CONFIG.maxBars

});

const chunkArray = <T extends unknown>(arr: T[], n: number): T[][] => {
  const chunkedArrays = [];

  for (let i = 0; i < arr.length; i += n) {
    chunkedArrays.push(arr.slice(i, i + n));
  }

  return chunkedArrays;
}

export const createRenderer = (canvas: HTMLCanvasElement, sections: Section[], config?: HistogramConfig) => {
  const conf = fillDefaults(config || {});

  const width = 2 * canvas.offsetWidth;
  const height = 2 * canvas.offsetHeight;

  canvas.width= width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  // console.log(sections);

  // Number of buckets to render as histogram bars
  const maxBuckets = Math.min(sections.length, conf.maxBars);

  // Number of buckets and sections per bucket. (Last bucket will have fewer sections!)
  const sectionsPerBucket = maxBuckets ? Math.ceil(sections.length / maxBuckets) : 0;

  const buckets = chunkArray(sections, sectionsPerBucket);

  // Width of each bar (=one bucket) in pixels
  const barWidth = Math.max(1, Math.round(width / (buckets.length - 1) - conf.gap));

  // Number of placenames in each bucket (1 or more sections!)
  const bucketValues = buckets.map(sections => sections.reduce((val, { placenames }) => val + placenames.length, 0));

  // Highest bucket + Y-scaling factor
  const maxValue = Math.max(...bucketValues);
  const k = height / maxValue;

  // console.log(`${sections.length} sections. Drawing ${buckets.length} bars with ${sectionsPerBucket} sections each`);
  // console.log(`Bucket width in pixel: ${barWidth} (${conf.gap} gap)`);
  // console.log(`Maximum bucket value is ${maxValue}`);

  const render = (cursor: number = 0) => {
    ctx.fillStyle = conf.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  
    // Cursor number refers to the section. Determine
    // which bucket number this correpsonds to
    const cursorPosition = Math.round(cursor / sectionsPerBucket);

    bucketValues.forEach((val, idx) => {
      const height = val * k;

      const gradient = ctx.createLinearGradient(
        idx * (barWidth + conf.gap), canvas.height - height,
        idx * (barWidth + conf.gap), canvas.height
      );

      gradient.addColorStop(0, 'rgba(170, 170, 255, 1)');   // Start with full opacity
      gradient.addColorStop(1, 'rgba(170, 170, 255, 0.65)'); // End with 50% opacity

      ctx.fillStyle = idx === cursorPosition ? '#ff0000' : gradient;
      ctx.fillRect(idx * (barWidth + conf.gap), canvas.height - height, barWidth, height);
    });
  }

  return { render };

}