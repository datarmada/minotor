import { zip } from 'lodash';

export default function partitionOutliers(singleFeatureData) {
  const [
    [regularValues, outlierValues],
    [regularIdx, outlierIdx]
  ] = partitionWithThresholds(
    singleFeatureData.values,
    singleFeatureData['95_percentile'],
    singleFeatureData['05_percentile'],
    [[...Array(singleFeatureData.values.length).keys()]]
  );
  return [zip(outlierIdx, outlierValues), zip(regularIdx, regularValues)];
}

function partitionWithThresholds(
  array,
  upperThreshold,
  lowerThreshold,
  siblingArrays = []
) {
  return partition(
    array,
    elem => elem <= upperThreshold && elem >= lowerThreshold,
    siblingArrays
  );
}

function partition(array, isValid, siblingArrays = []) {
  return [array, ...siblingArrays].map(arr =>
    arr.reduce(
      ([pass, fail], elem, idx) =>
        isValid(array[idx]) ? [[...pass, elem], fail] : [pass, [...fail, elem]],
      [[], []]
    )
  );
}
