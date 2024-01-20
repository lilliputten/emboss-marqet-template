const fixedTableAdaptiveTreshold = 700;
const fixedTableAdaptiveTresholdMax = fixedTableAdaptiveTreshold - 0.1;

const productItemSizeThreshold = 592;
const productItemSizeThresholdMax = productItemSizeThreshold - 0.1;

module.exports = {
  fixedTableAdaptiveTreshold,
  fixedTableAdaptiveTresholdMax,
  fixedTableAdaptiveMedia: `(max-width: ${fixedTableAdaptiveTresholdMax}px)`,
  fixedTableNonAdaptiveMedia: `(min-width: ${fixedTableAdaptiveTreshold}px)`,

  testBlue: '#056ef0',

  productItemSizeThreshold,
  productItemSizeThresholdMax,
  productItemNarrowMedia: `(max-width: ${fixedTableAdaptiveTresholdMax}px)`,
  productItemWideMedia: `(min-width: ${fixedTableAdaptiveTreshold}px)`,
};
