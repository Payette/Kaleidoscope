import React from 'react';
import {BarStackHorizontal} from '@vx/shape';
import {Group} from '@vx/group';
import {AxisBottom, AxisLeft} from '@vx/axis';
import {scaleBand, scaleLinear, scaleOrdinal} from '@vx/scale';
import {timeParse, timeFormat} from 'd3-time-format';
import {withTooltip, Tooltip} from '@vx/tooltip';
import {LegendOrdinal} from '@vx/legend';
import {ParentSize} from '@vx/responsive';

export default withTooltip(({
  barHeight,
  selectedMaterials,
  xAxisLabel,
  events = false,
  margin = {
    top: 40,
    left: 100,
    right: 40,
    bottom: 100
  },
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip
}) => {


  // bounds
  // const xMax = width - margin.left - margin.right;
  const headerFooterHeight = 160;
  const height = headerFooterHeight + (barHeight * selectedMaterials.length);
  const yMax = height - margin.top - margin.bottom;

  const purple1 = '#6c5efb';
  const purple2 = '#c998ff';
  const purple3 = '#a44afe';
  const bg = '#eaedff';

  const keys = Object.keys(selectedMaterials[0]).filter(d => d !== 'material');

  const totals = selectedMaterials.reduce((ret, cur) => {
    const t = keys.reduce((dailyTotal, k) => {
      dailyTotal += + cur[k];
      return dailyTotal;
    }, 0);
    ret.push(t);
    return ret;
  }, []);

  const parseDate = timeParse('%Y%m%d');
  const format = timeFormat('%b %d');
  const formatDate = date => format(parseDate(date));

  // accessors
  const y = d => d.material;

  // scales
  const xScale = scaleLinear({
    domain: [
      0,
      Math.max(...totals)
    ],
    nice: true
  });
  const yScale = scaleBand({domain: selectedMaterials.map(y), padding: 0.2});
  const color = scaleOrdinal({
    domain: keys,
    range: [purple1, purple2, purple3]
  });

  let tooltipTimeout;

  yScale.rangeRound([yMax, 0]);

  return (<ParentSize>
    {
      ({width: w}) => {
        const xMax = w - margin.left - margin.right;
        xScale.rangeRound([0, xMax]);
        // w = w- 100;

        return (<div style={{
            position: 'relative'
          }}>

          <svg width={w} height={height}>
            <rect width={w} height={height} fill={bg} rx={14}/>
            <Group top={margin.top} left={margin.left}>
              <BarStackHorizontal data={selectedMaterials} keys={keys} height={yMax} y={y} xScale={xScale} yScale={yScale} color={color}>
                {
                  barStacks => {
                    return barStacks.map(barStack => {
                      return barStack.bars.map(bar => {
                        return (<rect key={`barstack-horizontal-${barStack.index}-${bar.index}`} x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.color} onClick={event => {
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
                            const top = bar.y + margin.top;
                            const left = bar.x + bar.width + margin.left;
                            showTooltip({tooltipData: bar, tooltipTop: top, tooltipLeft: left});
                          }}/>);
                      });
                    });
                  }
                }
              </BarStackHorizontal>
              <AxisLeft hideAxisLine={true} hideTicks={true} scale={yScale} /* tickFormat={formatDate} */

                stroke={purple3} tickStroke={purple3} tickLabelProps={(value, index) => ({fill: purple3, fontSize: 11, textAnchor: 'end', dy: '0.33em'})}/>
              <AxisBottom top={yMax} scale={xScale} stroke={purple3} tickStroke={purple3} hideAxisLine={true} hideTicks={true} label={xAxisLabel} tickLabelProps={(value, index) => ({fill: purple3, fontSize: 11, textAnchor: 'middle'})} labelProps={{
                  fontSize: 18,
                  fill: purple3
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
            <LegendOrdinal scale={color} direction="row" labelMargin="0 15px 0 0"/>
          </div>
          {
            tooltipOpen && (<Tooltip top={tooltipTop} left={tooltipLeft} style={{
                minWidth: 60,
                backgroundColor: 'rgba(0,0,0,0.9)',
                color: 'white'
              }}>
              <div style={{
                  color: color(tooltipData.key)
                }}>
                <strong>{tooltipData.key}</strong>
              </div>
              <div>{tooltipData.bar.data[tooltipData.key]}</div>
              <div>
                <small>{y(tooltipData.bar.data)}</small>
              </div>
            </Tooltip>)
          }
        </div>);
      }
    }
  </ParentSize>);

});
