const fixedTableAdaptiveTreshold = 700;
const fixedTableAdaptiveTresholdMax = fixedTableAdaptiveTreshold - 0.1;

module.exports = {
  fixedTableAdaptiveTreshold,
  fixedTableAdaptiveTresholdMax,
  fixedTableAdaptiveMedia: `(max-width: ${fixedTableAdaptiveTresholdMax}px)`,
  fixedTableNonAdaptiveMedia: `(min-width: ${fixedTableAdaptiveTreshold}px)`,
  testBlue: '#056ef0',
};
