/**
<Scale type="category" data={data} width={256}>
  <Scale.Marker />
  <Scale.Colors colors="YlGnBu" />
  <Scale.Ticks />
</Scale>
*/

import React, { useState } from "react";
import { ScaleProvider } from "./hooks/useScaleContext";
import { getPositionScale } from "./utils";

/**
 * Parent scale component that provides context to child components
 */
function Scale({
  type,
  data,
  domain: initialDomain,
  sorter,
  notNice,
  width,
  order,
  margin,
  children,
}) {
  // get domain for the scale, or generate based on data
  const [domain, setDomain] = useState(
    initialDomain || getDomain(type, data, { sorter })
  );
  // scale to map values to percent value
  const [positionScale, setPositionScale] = useState(
    getPositionScale(type, domain, [0, 1], { options: { nice: !notNice } })
  );
  // scale that maps values to colors
  const [colorScale, setColorScale] = useState(null);
  return (
    <ScaleProvider
      value={{
        type,
        width,
        margin,
        order,
        nice: !notNice,
        positionScale,
        colorScale,
        setPositionScale,
        setColorScale,
      }}
    >
      {children}
    </ScaleProvider>
  );
}

Scale.Marker = Marker;
Scale.Ticks = Ticks;
Scale.Colors = Colors;

export { Scale };
