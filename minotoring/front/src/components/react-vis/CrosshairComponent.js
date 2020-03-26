import React, { useState, useEffect } from 'react';
import { Crosshair } from 'react-vis';

// Utils
const createLayerMaker = (children, setCrosshairValues) => (
  first,
  data,
  layerData,
  name,
  color = '#79C7E3'
) => (
  <children.type
    key={name}
    {...children.props}
    color={color}
    opacity={0.5}
    data={layerData}
    onNearestX={
      first
        ? (value, { index }) => {
            setCrosshairValues(data.map(elt => elt.data[index]));
          }
        : null
    }
  />
);

export default function CrosshairComponent(props) {
  const { child, data, setXYPlotMouseLeave } = props;
  const [crosshairValues, setCrosshairValues] = useState([]);

  useEffect(() => {
    setXYPlotMouseLeave(() => () => setCrosshairValues([]));
  }, []);

  // Generating layers
  const makeLayer = createLayerMaker(child, setCrosshairValues);
  const renderedLayers = data.map(({ data: layerData, name, color }, idx) =>
    makeLayer(idx === 0, data, layerData, name, color)
  );

  return [<Crosshair values={crosshairValues} />, ...renderedLayers];
}
