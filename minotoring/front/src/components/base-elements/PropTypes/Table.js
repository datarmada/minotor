// eslint recommended the use of default, but if other proptypes are shared in table
// and its subcomponents, it will be removed.
export default function VERBOSE_COL_NAMES_PROPTYPE(
  props,
  propName,
  componentName
) {
  const areEqual = (a, b) => a.sort().join('') === b.sort().join(''); // ugly
  const { verboseColNames, orderedColumns } = props;
  if (!areEqual(Object.keys(verboseColNames), orderedColumns)) {
    return new Error(
      `One or several column has no verbose equivalent. Make sure prop ${propName} \
in ${componentName} is an object with a key for each column and its verbose equivalent as a value.`
    );
  }
  return null;
}
