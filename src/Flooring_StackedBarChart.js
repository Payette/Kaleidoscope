import React, { useRef, useCallback } from 'react';
import {BarStackHorizontal} from '@vx/shape';
import {Group} from '@vx/group';
import {AxisBottom, AxisLeft, AxisTop} from '@vx/axis';
import { Text } from '@vx/text';
import {scaleBand, scaleLinear, scaleOrdinal} from '@vx/scale';
import {withTooltip, Tooltip, TooltipWithBounds} from '@vx/tooltip';
import {LegendOrdinal} from '@vx/legend';
import {ParentSize} from '@vx/responsive';
import { localPoint } from '@vx/event';
import * as d3 from 'd3';
import styles from './css/StackedBarChart.module.scss';
import { GridRows, GridColumns } from '@vx/grid';


    


export default withTooltip(({
  colorBy,
  barHeight,
  selectedMaterials,
  metaData,
  allMaterials,
  xAxisLabel,
  currentChart,
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

  const toolTipWidth = 320;
  const toolTipHeight = 300;

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
  const bg = 'rgba(255,255,255,0)';

  const keys = Object.keys(selectedMaterials[0]).filter(d => d !== 'material' && d !== 'type' && d !== 'name' && d !== 'img');
 

  const allMaterialTotals = allMaterials.reduce((ret, cur) => {
    const t = keys.reduce((dailyTotal, k) => {
      if(Math.abs(cur[k]) == (cur[k])){
        dailyTotal += + Math.abs(cur[k]);
      }
      return dailyTotal;
    }, 0);
    ret.push(t);
    return ret;
  }, []);

// console.log(allMaterialTotals);
// console.log(selectedMaterials)

let currentBiggest = 1;
let trail = "(kgCO2eq/sf)";


for(let i = 0; i < selectedMaterials.length; i++){
  if(selectedMaterials[i].hasOwnProperty('i1')){
    let i1 = selectedMaterials[i].i1>0 ? selectedMaterials[i].i1 : 0 
    let i2 = selectedMaterials[i].i2>0 ? selectedMaterials[i].i2 : 0
    let i3 = selectedMaterials[i].i3>0 ? selectedMaterials[i].i3 : 0
    let i4 = selectedMaterials[i].i4>0 ? selectedMaterials[i].i4 : 0
    let i5 = selectedMaterials[i].i5>0 ? selectedMaterials[i].i5 : 0
    let i6 = selectedMaterials[i].i6>0 ? selectedMaterials[i].i6 : 0
    let myTotal = i1 + i2 + i3 + i4 + i5 + i6;
    if(myTotal > currentBiggest){
      currentBiggest = myTotal;
      // console.log(myTotal);
      trail = "%";
    }
  }
  else{
    currentBiggest = 100;
  }
  // console.log(selectedMaterials[i]);
}



let multiplier = 100.0 / currentBiggest;
// console.log(multiplier);

  const allMaterialTotalsMin = allMaterials.reduce((ret, cur) => {
    const t = keys.reduce((dailyTotal, k) => {
      if(Math.abs(cur[k]) != (cur[k])){
        dailyTotal -= Math.abs(cur[k]);
      }
      return dailyTotal;
    }, 0);
    ret.push(t);
    return ret;
  }, []);


  const allImpactTotalsMin = allMaterials.reduce((ret, cur) => {
    const t = keys.reduce((dailyTotal, k) => {
      if(Math.abs(cur[k]) != (cur[k])){
        dailyTotal -= Math.abs(cur[k]);
      }
      return dailyTotal;
    }, 0);
    ret.push(t);
    return ret;
  }, []);


  // accessors
  const y = d => d.material;
  const getName = d => d.name;
   const getType = d => d.type;
   const getImg = d => d.img;
  // console.log(getName);

  

  let impactCol = [];
  // console.log(currentChart)

  Object.values(metaData.impactColors).forEach(val =>{
    impactCol.push(val)
  })

  let iCol = [];
  // console.log(currentChart)

  Object.values(metaData.iColors).forEach(val =>{
    iCol.push(val)
  })

  let matCol = [];

  Object.values(metaData.matColors).forEach(val =>{
    matCol.push(val)
  })


  let myTexts = []

  Object.values(metaData.materialOrdering).forEach(val =>{
    myTexts.push(val)
  })

  let myIndex = []

  Object.keys(metaData.materialOrdering).forEach(val =>{
    myIndex.push(val)
  })

  // scales

  let xScale = scaleLinear({
    domain: [
      Math.min(...allMaterialTotalsMin),
      Math.max(...allMaterialTotals)
    ],
    nice: true
  });


  let color = scaleOrdinal({
    domain: keys,
    // range: [purple1, purple2, purple3],
    range: impactCol
  });

  let texts = scaleOrdinal({
    domain: keys,
    // range: [purple1, purple2, purple3],
    range: myTexts
  });

  if(currentChart === "MB"){
  color = scaleOrdinal({
    domain: keys,
    // range: [purple1, purple2, purple3],
    range: matCol
  });
  xScale = scaleLinear({
    domain: [
      Math.min(...allMaterialTotalsMin),
      Math.max(...allMaterialTotals)
    ],
    nice: true
  });
}

  if(currentChart === "allImpacts"){
    color = scaleOrdinal({
      domain: keys,
      // range: [purple1, purple2, purple3],
      range: iCol
    });

    xScale = scaleLinear({
      domain: [
        Math.min(...allMaterialTotalsMin),
        100
      ],
      nice: true
    });
}

if(currentChart === "GWP"){
  color = scaleOrdinal({
    domain: keys,
    // range: [purple1, purple2, purple3],
    range: iCol
  });

  xScale = scaleLinear({
    domain: [
      Math.min(...allMaterialTotalsMin),
      Math.max(...allMaterialTotals)
    ],
    nice: true
  });
}


  let tooltipTimeout;


  return (<ParentSize>
    {
      ({width: w}) => {
        let width2 = 0;
        if(window.innerWidth > 1200){
          width2 = window.innerWidth-400
        }else{
          width2 = window.innerWidth - margin.right
        }
        // const width2 = Math.max(w, margin.left + margin.right + 1);
        
        // const xMax = width2 - margin.left - margin.right;
        const xMax = width2;
        // console.log("xMax" + width2)
        xScale.rangeRound([0, xMax-250]);
        // w = w- 100;
        var previousY = 0;

        let whichArray = 0;

        let deepClone = JSON.parse(JSON.stringify(selectedMaterialsGroupedByType))
        

        const chartHeight = (selectedMaterials.length * barHeight) + headerFooterHeight
        + (selectedMaterialsGroupedByType.length * 20);

        return (<div className={styles.container} style={{
            position: 'relative',
            // width: '100%'
            
          }}>

          <svg width={width2} height={chartHeight}>
            <rect width={width2} height={chartHeight} fill={bg} rx={14}/>
            <Group top={margin.top} left={margin.left}>
              {deepClone.map(sm => {
                const height = headerFooterHeight + (barHeight * sm.values.length);
                const yMax = height - margin.top - margin.bottom;
                const yScale = scaleBand({domain:  sm.values.map(getName), padding: 0.2});
                yScale.rangeRound([yMax, 0]);
                const yOffset = previousY;
                
                previousY += yMax;

                let myAbb = "W"

                if(sm.key[0] === "S"){
                      myAbb = "(SC)";
                }else if (sm.key[0] === "R"){
                  myAbb = "(R)";
                }else if(sm.key[0] === "M"){
                  myAbb = "(M)";
                }else if(sm.key[0] === "C"){
                  myAbb = "(C)";
                }else if(sm.key[0] === "W"){
                  myAbb = "(W)";
               }

              //  let ShallowCopy = _.cloneDeep(sm);
              //  let odashCloneDeep = 

              // console.log(selectedMaterialsGroupedByType[whichArray].values);
              // console.log(sm.values)
              

               

               for(let i = 0; i < sm.values.length; i++){
                if(selectedMaterials[i].hasOwnProperty('i1')){
                  sm.values[i].i1 = selectedMaterialsGroupedByType[whichArray].values[i].i1 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i1 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i1;
                  sm.values[i].i2 = selectedMaterialsGroupedByType[whichArray].values[i].i2 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i2 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i2
                  sm.values[i].i3 = selectedMaterialsGroupedByType[whichArray].values[i].i3 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i3 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i3
                  sm.values[i].i4 = selectedMaterialsGroupedByType[whichArray].values[i].i4 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i4 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i4
                  sm.values[i].i5 = selectedMaterialsGroupedByType[whichArray].values[i].i5 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i5 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i5
                  sm.values[i].i6 = selectedMaterialsGroupedByType[whichArray].values[i].i6 > 0 ? selectedMaterialsGroupedByType[whichArray].values[i].i6 * multiplier : selectedMaterialsGroupedByType[whichArray].values[i].i6
                }
                // console.log(selectedMaterials[i]);
              }

              whichArray++;

              // console.log(sm.values.length);


                return (
                  
                  <Group top={yOffset}>
                    
                    
                    <line className={styles.groupLine} x1={-margin.left+margin.smallGap} y1="0" x2={width2-margin.left-2*margin.smallGap} y2="0" stroke-width="3" stroke-dasharray="0 6" stroke-linecap="round" />
                    <BarStackHorizontal data={sm.values} keys={keys} height={yMax} y={getName} xScale={xScale} yScale={yScale} color={color} offset={'diverging'}>
                    {
                      
                      
                      barStacks => {
                        return barStacks.map(barStack => {
                          return barStack.bars.map(bar => {
                            var barColor = bar.color;
                            
                            // console.log(bar.bar.data.mName)
                            if(colorBy === "material" && bar.bar && bar.bar.data && bar.bar.data.material) {
                              barColor = metaData.materialColors[bar.bar.data.material] || bar.color;
                            }else if(colorBy === "health" && bar.bar && bar.bar.data && bar.bar.data.material) {
                              barColor = metaData.materialHealth[bar.bar.data.material] || bar.color;

                            }
                            return (<rect key={`barstack-horizontal-${barStack.index}-${bar.index}`} x={bar.x} y={bar.y} width={bar.width} height={bar.height} stroke={'#ffffff'} fill={barColor} onClick={event => {
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
                                let myX = localPoint(event.target.ownerSVGElement, event).x;
                                let myY = localPoint(event.target.ownerSVGElement, event).y;
                                // console.log(localPoint(event.target.ownerSVGElement, event));
                                // console.log(getImg(bar.data));
                                showTooltip({tooltipData: bar, tooltipTop: myY, tooltipLeft: myX});
                              }}/>);
                          });
                        });
                      }
                    }
                    
                  </BarStackHorizontal>
                  <AxisLeft
                    hideAxisLine={true} hideTicks={true} scale={yScale} /* tickFormat={formatDate} */
                    stroke={textColor} tickStroke={textColor}
                    tickLabelProps={(value, index) => ({fill: textColor, width: '200' , fontSize: 14, textAnchor: 'end', dy: '0.33em'})}
                  />
                  <Text
                    textAnchor="start"
                    verticalAnchor="start"
                    fontSize={14}
                    width={50}
                    className={styles.myClass}
                    x={-margin.left + margin.smallGap} y={(barHeight * sm.values.length)/2 - 10}
                  >{sm.key + " " + myAbb}</Text>
                  <line className={styles.groupLine} x1={xScale(0)} y1="0" x2={xScale(0)} y2={20+(barHeight * sm.values.length)} stroke-width="3" stroke-dasharray="0 6" stroke-linecap="round" />
                </Group>

                
                )
              })}

              

              <line className={styles.groupLine} x1={-margin.left+margin.smallGap} y1={previousY} x2={width2-margin.left-2*margin.smallGap} y2={previousY} stroke-width="3" stroke-dasharray="0 6" stroke-linecap="round" />
              <AxisBottom top={(previousY-7)} scale={xScale} stroke={textColor} tickStroke={textColor} hideAxisLine={true} hideTicks={true} label={xAxisLabel} tickLabelProps={(value, index) => ({fill: textColor, fontSize: 14, textAnchor: 'middle'})} labelProps={{
                  fontSize: 18,
                  textAnchor: 'middle',
                  fill: textColor
                }}/>
                <AxisTop top={(3)}  scale={xScale} stroke={textColor} tickStroke={textColor} hideAxisLine={true} hideTicks={true} label={xAxisLabel} tickLabelProps={(value, index) => ({fill: textColor, fontSize: 14,verticalAnchor: 'bottom', textAnchor: 'middle'})} labelProps={{
                  fontSize: 18,
                  textAnchor: 'middle',
                  verticalAnchor: 'bottom',
                  fill: textColor,
                  lineHeight: "2em"
                }}/>
            </Group>
          </svg>
          
          {
            tooltipOpen && (<Tooltip top={tooltipTop} left={tooltipLeft} key={Math.random()} style={{
              backgroundColor: 'rgba(255,255,255,0.0)',
              color: 'black',
              borderRadius: '0px',
              boxShadow:"5px 5px rgba(200, 200, 200, .0)",
              margin: 0,
              padding: 0
            }}>
                 <span style={{color: "red", margin: 0, padding:0, top: 10}}>
                 <img src={'./YellowTriangle2.png'}></img>
                  </span>

                <div style={{
                  position: 'absolute',
                border: '3px solid #ffd400',
                boxShadow:"5px 5px rgba(200, 200, 200, .4)",
                minWidth: 60,
                height: toolTipHeight+50,
                width: toolTipWidth+5,
                backgroundColor: 'rgba(255,255,255,0.8)',
                color: 'black',
                borderRadius: '0px',
                margin: 0,
                padding: 0,
                top: 15

              }}>
                 
                  
              <div className={styles.tooltipContainer}>
                <div style={{
                    // textTransform: 'uppercase',
                    paddingBottom: 2,
                    lineHeight:"1.2em",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#dc1a55",
                    paddingBottom: ".5em"
                  }}>
                  {getType(tooltipData.bar.data)} - {getName(tooltipData.bar.data)}
                </div>
                <div><strong>{tooltipData.bar.data[tooltipData.key].toFixed(2)} </strong>
                  <small>{trail}</small></div>
                <div className={styles.clearfix}>
                  
                  {/* <img className={styles.img2} src={'./Icon_FS.png'}></img> */}
                  <img className={styles.img2} src={getImg(tooltipData.bar.data)}></img>
                  
                  <small className={styles.imgText}>{metaData.materialTexts[tooltipData.bar.data.material]}</small>
                </div>
                {/* <div >
                  <small>4" granite veneer with knife edge</small>
                  
                
                  
                </div>
                <img src={'./Icon_FS.png'} alt="material icon" className={styles.materialIcon}></img> */}
             
                
              </div>
              </div>
            </Tooltip>)
          }
        </div>);
      }
    }
    
  </ParentSize>);

  

});
