import React from 'react';
import {BarStackHorizontal} from '@vx/shape';
import {Group} from '@vx/group';
import {AxisBottom, AxisLeft} from '@vx/axis';
import { Text } from '@vx/text';
import {scaleBand, scaleLinear, scaleOrdinal} from '@vx/scale';
import {withTooltip, Tooltip} from '@vx/tooltip';
import {LegendOrdinal} from '@vx/legend';
import {ParentSize} from '@vx/responsive';
import * as d3 from 'd3';
import styles from './css/StackedBarChart.module.scss';

export default withTooltip(({
  colorBy,
  barHeight,
  selectedMaterials,
  metaData,
  allMaterials,
  xAxisLabel,
  events = false,
  margin = {
    top: 40,
    left: 220,
    right: 40,
    bottom: 100,
    smallGap: 8
  },
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip
}) => {

  const toolTipWidth = 200;
  const toolTipHeight = 200;

  const selectedMaterialsGroupedByType = d3.nest()
  .key(function(d) { return d.type })
  .entries(selectedMaterials.sort((a, b) => {
    const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
    const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
    return orderA < orderB ? 1 : -1;
  }))
  .sort((a, b) => {
    const orderA = metaData.typeOrdering[a.key] ? metaData.typeOrdering[a.key] : 1000;
    const orderB = metaData.typeOrdering[b.key] ? metaData.typeOrdering[b.key] : 1000;
    return orderA < orderB ? -1 : 1;
  });

  // bounds
  // const xMax = width - margin.left - margin.right;
  const headerFooterHeight = 160;
  // const height = headerFooterHeight + (barHeight * selectedMaterials.length);
  // const yMax = height - margin.top - margin.bottom;

  const purple1 = "#f99f2d";
  const purple2 = "#febd2a";
  const purple3 = "#ffd743";
  const textColor = "#000000";
  const bg = '#ffffff';

  const keys = Object.keys(selectedMaterials[0]).filter(d => d !== 'material' && d !== 'type');

  const allMaterialTotals = allMaterials.reduce((ret, cur) => {
    const t = keys.reduce((dailyTotal, k) => {
      dailyTotal += + cur[k];
      return dailyTotal;
    }, 0);
    ret.push(t);
    return ret;
  }, []);

  // accessors
  const y = d => d.material;

  // scales
  const xScale = scaleLinear({
    domain: [
      0,
      Math.max(...allMaterialTotals)
    ],
    nice: true
  });
  const color = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3]
  });
  // const color = d => {
  // range: d => {
  //   console.log('hmm', d);
  //   return 'green';
  // }
  //   console.log(d);
  //   return '#ff0000';
  // }

  let tooltipTimeout;



  return (<ParentSize>
    {
      ({width: w}) => {
        const width2 = Math.max(w, margin.left + margin.right + 1);
        const xMax = width2 - margin.left - margin.right;
        xScale.rangeRound([0, xMax]);
        // w = w- 100;
        var previousY = 0;

        const chartHeight = (selectedMaterials.length * barHeight) + headerFooterHeight
        + (selectedMaterialsGroupedByType.length * 20);

        return (<div className={styles.container} style={{
            position: 'relative'
          }}>

          <svg width={width2} height={chartHeight}>
            <rect width={width2} height={chartHeight} fill={bg} rx={14}/>
            <Group top={margin.top} left={margin.left}>
              {selectedMaterialsGroupedByType.map(sm => {
                const height = headerFooterHeight + (barHeight * sm.values.length);
                const yMax = height - margin.top - margin.bottom;
                const yScale = scaleBand({domain:  sm.values.map(y), padding: 0.2});
                yScale.rangeRound([yMax, 0]);
                const yOffset = previousY;
                previousY += yMax;

                return (
                  <Group top={yOffset}>
                    <line className={styles.groupLine} x1={-margin.left+margin.smallGap} y1="0" x2={width2-margin.left-2*margin.smallGap} y2="0" stroke-width="3" stroke-dasharray="0 6" stroke-linecap="round" />
                    <BarStackHorizontal data={sm.values} keys={keys} height={yMax} y={y} xScale={xScale} yScale={yScale} color={color}>
                    {
                      barStacks => {
                        return barStacks.map(barStack => {
                          return barStack.bars.map(bar => {
                            var barColor = bar.color;
                            if(colorBy === "material" && bar.bar && bar.bar.data && bar.bar.data.material) {
                              barColor = metaData.materialColors[bar.bar.data.material] || bar.color;
                            }
                            return (<rect key={`barstack-horizontal-${barStack.index}-${bar.index}`} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={barColor} onClick={event => {
                                if (!events)
                                  return;
                                alert(`clicked: ${JSON.stringify(bar)}`);
                              }} onMouseLeave={event => {
                                tooltipTimeout = setTimeout(() => {
                                  hideTooltip();
                                }, 300);
                              }} onMouseMove={event => {
                                if (tooltipTimeout)
                                  clearTimeout(tooltipTimeout);
                                const top = yOffset + bar.y + margin.top + barHeight + 10;
                                const left = bar.x + bar.width/2 + margin.left - toolTipWidth/2;
                                showTooltip({tooltipData: bar, tooltipTop: top, tooltipLeft: left});
                              }}/>);
                          });
                        });
                      }
                    }
                  </BarStackHorizontal>
                  <AxisLeft
                    hideAxisLine={true} hideTicks={true} scale={yScale} /* tickFormat={formatDate} */
                    stroke={textColor} tickStroke={textColor}
                    tickLabelProps={(value, index) => ({fill: textColor, fontSize: 11, textAnchor: 'end', dy: '0.33em'})}
                  />
                  <Text
                    textAnchor="start"
                    verticalAnchor="start"
                    fontSize={14}
                    width={50}
                    x={-margin.left + margin.smallGap} y={(barHeight * sm.values.length)/2}
                  >{sm.key}</Text>
                </Group>
                )
              })}

              <line className={styles.groupLine} x1={-margin.left+margin.smallGap} y1={previousY} x2={width2-margin.left-2*margin.smallGap} y2={previousY} stroke-width="3" stroke-dasharray="0 6" stroke-linecap="round" />
              <AxisBottom top={(previousY + 10)} scale={xScale} stroke={textColor} tickStroke={textColor} hideAxisLine={true} hideTicks={true} label={xAxisLabel} tickLabelProps={(value, index) => ({fill: textColor, fontSize: 11, textAnchor: 'middle'})} labelProps={{
                  fontSize: 18,
                  fill: textColor
                }}/>
            </Group>
          </svg>
          <div style={{
              position: 'absolute',
              top: margin.top / 2 - 10,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
          </div>
          {
            tooltipOpen && (<Tooltip top={tooltipTop} left={tooltipLeft} style={{
                minWidth: 60,
                height: toolTipHeight,
                width: toolTipWidth,
                backgroundColor: 'rgba(0,0,0,0.9)',
                color: 'white'
              }}>
              <div className={styles.tooltipContainer}>
                <div style={{
                    color: color(tooltipData.key)
                  }}>
                  <strong>{tooltipData.key}</strong>
                </div>
                <div>{tooltipData.bar.data[tooltipData.key]}</div>
                <div>
                  <small>{y(tooltipData.bar.data)}</small>
                </div>
              </div>
            </Tooltip>)
          }
        </div>);
      }
    }
  </ParentSize>);

});
