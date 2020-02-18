import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { scaleLinear } from '@vx/scale';

// accessors
const categoryData = d => d.letter;
const valueData = d => +d.frequency * 100;

export default ({ width, height, data }) => {
  console.log(data);

  // bounds
  const horizontalPadding = 60;
  const horizontalMax = width - 2*horizontalPadding;

  // scales
  const horizontalScale = scaleLinear({
    rangeRound: [horizontalMax, 0],
    domain: [0, Math.max(...data.map(valueData))]
  });

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
      <Group top={40}>
        {data.map((d, i) => {
          const letter = categoryData(d);
          const barHeight = 20;
          const barWidth = horizontalMax - horizontalScale(valueData(d));
          const barY = (barHeight + 5) * i;
          const barX = horizontalPadding;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={event => {
                alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
};
