import React, { useState } from 'react';
import { Crosshair } from 'react-vis';

const createPropsBuilder = (data, setCrosshairValues) => isfirst => ({
  onNearestX: isfirst
    ? (value, { index }) => {
        setCrosshairValues(data.map(elt => elt.data[index]));
      }
    : null,
});

export default function useCrosshair(props) {
  const { data } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);

  const XYprops = { onMouseLeave: () => setCrosshairValues([]) };

  const buildProps = createPropsBuilder(data, setCrosshairValues);
  const customProps = data.map((_, idx) => buildProps(idx === 0));

  return {
    component: <Crosshair key="crosshair" values={crosshairValues} />,
    customProps,
    XYprops,
  };
}
