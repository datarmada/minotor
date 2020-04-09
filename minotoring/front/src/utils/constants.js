export const FULL_ORDERED_COLUMNS = [
  'featureName',
  'KLDivergence',
  'mean',
  'std',
  'nanPercentage',
  'percentile05',
  'percentile95',
];

export const VERBOSE_COLUMN_NAMES = {
  featureName: 'Feature name',
  KLDivergence: 'KL Divergence',
  mean: 'Mean',
  std: 'Standard Deviation',
  nanPercentage: '% NaN',
  percentile05: '5th perc.',
  percentile95: '95th perc.',
};

export const COLUMN_HINTS = {
  KLDivergence:
    'Kullback-Leibner divergence between prediction and training data. It measures how much the prediction data differs from the training.',
  nanPercentage: 'Percentage of NaN in your data',
  percentile05:
    '5th percentile of your data. 95% of the values for this feature are above this value',
  percentile95:
    '95th percentile of your data. 95% of the values for this feature are below this value',
};
