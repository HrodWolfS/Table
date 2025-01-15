const NoiseFilter = () => (
  <svg
    className="fixed top-0 left-0 h-full w-full pointer-events-none opacity-30"
    style={{ zIndex: 1 }}
  >
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.6"
        stitchTiles="stitch"
        numOctaves="3"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

export default NoiseFilter;
