import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';
import { localPoint } from '@vx/event';
import { Pattern as CustomPattern, PatternLines, PatternCircles, PatternWaves } from '@vx/pattern';

let pointX = 0;
let pointY = 0;


const NO_PATTERN = 'transparent';


const white = '#fff';
let cols = ["#c7e9b7", "#c7e9b7", "#b5e2bd", "#85E2BD", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#85E2BD", "#b5e2bd", "#85E2BD", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#b5e2bd", "#0090ff", "#0090ff", "#0090ff", "#B3B3B3", "#b3b3b3", "#cccccc", "#cccccc", "#999999", "#666666"]
const black = '#000000';
const letters = letterFrequency.slice(0, 4);
// const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
// console.log(browserNames)
// console.log(browserUsage)
const materialNames = ["mat27", "mat26", "mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"];
let materialLabel = {mat1:"Polyethelene sheet vapor barrier",mat2:"Interior grade plywood",mat3:"Cement grout",mat4:"Cement mortar",mat5:"Self-leveling underlayment",mat6:"Thickset mortar",mat7:"Fasteners, galvanized steel",mat8:"Floor adhesive, carpet",mat9:"Floor adhesive, latex",mat10:"Bamboo plank",mat11:"Ceramic tile, glazed",mat12:"Commercial high-traffic carpet, high pile",mat13:"Commercial high-traffic carpet, low pile",mat14:"Commercial high-traffic carpet, medium pile",mat15:"Cork tile",mat16:"Domestic softwood",mat17:"Granite tile",mat18:"Harwood veneer, thick",mat19:"Homogeneous vinyl tile",mat20:"Linoleum tile",mat21:"SBS rubber tile",mat22:"Slate tile",mat23:"White oak lumber, 1 inch",mat24:"Terrazzo",mat25:"Epoxy",mat26:"Wood sealer, water-based",mat27:"Polyuretane floor finish"};
// const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));

const usage = d => d.usage;
console.log(usage);
const frequency = d => d.frequency;
export default ({ width, height, margin, matBreakdown, matBreakdown1, matBreakdown2,currentMat, tenYGWP, sixty1YGWP, sixty2YGWP, GWPSel }) => {

    // this.state = { textToShow: ""};
    // this.handleInputChange = this.handleInputChange.bind(this);
    
  const radius = Math.min(width, height) / 1.5;
  const centerY = height / 2;
  const centerX = width / 2;
  // console.log(matBreakdown);
  // console.log(currentMat);
  let myGWP = 0.00;
  let selGWP;
  let materials = {mat1:10, mat2:11, mat3:1, mat4:7, mat6:2, mat7:0, mat8:0, mat9:19};


    let mCurrSel = GWPSel;
  
    if(mCurrSel == "tenYGWP"){
      selGWP = tenYGWP;
      // console.log(matBreakdown)
      // console.log(selGWP)
      for(let i=0; i<matBreakdown.length; i++){
        if(matBreakdown[i].material == currentMat){
          materials = matBreakdown[i];
        }
      }
      for(let i=0; i<selGWP.length; i++){
        if(selGWP[i].material == currentMat){
          myGWP = selGWP[i].value;
        }
      }
    }else if(mCurrSel == "sixty1YGWP"){
      selGWP = sixty1YGWP;
      for(let i=0; i<matBreakdown.length; i++){
        if(matBreakdown1[i].material == currentMat){
          materials = matBreakdown1[i];
        }
      }
      for(let i=0; i<selGWP.length; i++){
        if(selGWP[i].material == currentMat){
          myGWP = selGWP[i].value;
        }
      }
    }else{
      selGWP = sixty2YGWP;
      for(let i=0; i<matBreakdown.length; i++){
        if(matBreakdown2[i].material == currentMat){
          materials = matBreakdown2[i];
        }
      }
      for(let i=0; i<selGWP.length; i++){
        if(selGWP[i].material == currentMat){
          myGWP = selGWP[i].value;
        }
      }
    }
  // }

  // console.log(selGWP)
  

  



  // console.log(materials)
  // let materialNames1 = materialNames.reverse();
  // console.log(materialNames1)

//  let  cols1 = cols.reverse();
//  console.log(cols1);
  

  const mats = materialNames.map(k => ({ label: materialLabel[k], mUsage: Math.abs(materials[k]) }));
  let mUsage = d => d.mUsage;
  let textToShow = "0.00";

  const matsAbs = materialNames.map(k => ({ label: materialLabel[k], mUsageAbs: (materials[k]) }));
  let mUsageAbs = d => d.mUsageAbs;

  // console.log(mUsage)

  let strokeVal = [];

  
  return (
    <svg width={width} height={height}>
      {/* <GradientPinkBlue id="pie-gradients" /> */}
      <rect rx={14} width={width} height={height} fill="url('#pie-gradients')" />
      <Group top={centerY} left={centerX}>
        <Pie
          data={mats}
          pieValue={mUsage}
          outerRadius={radius - 80}
          innerRadius={radius - 170}
          cornerRadius={0}
          padAngle={0}
          pieSort={null}
          pieSortValues={null}
          
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const opacity = 1;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const { startAngle, endAngle } = arc;
              const hasSpaceForLabel = endAngle - startAngle >= 0.1;
              let displayText = 1;
              let opac = 0.5;

              let currentItem;

              // console.log(arc.data)

              // for(let j = 0; j < materialNames.length; j++){
              //   if(currentMat == materialNames[j].materialLabel){
              //     currentItem = materialNames[j]
              //   }
              // }

              
              // console.log(matsAbs[i].mUsageAbs)

              if((matsAbs[i].mUsageAbs + 0) <= 0){
                strokeVal.push(2);
                // console.log("hi")
              }else{
                strokeVal.push(5);
              }

              // console.log(strokeVal)


              return (
                <g key={`browser-\${arc.data.label}-\${i}`}>
                  <PatternLines
            id={"hLines"+i}
            height={5}
            width={5}
            stroke={cols[i]}
            strokeWidth={strokeVal[i]}
            // fill={cols[i]}
            orientation={['diagonal']}
          />
                  
                  <path d={pie.path(arc)} fill={"url(#hLines"+i+")"} stroke={white} fillOpacity={opacity} onMouseMove={(event) => {
                    // console.log(arc.data)
                    // console.log(currentItem)
                    console.log(strokeVal)
                        const point = localPoint(event) || { x: 0, y: 0 };
                        pointX = point.x;
                        pointY = point.y;
                        // console.log(point);
                        // console.log(arc.data.label)
                        textToShow = arc.data.label + ": " + matsAbs[i].mUsageAbs.toFixed(2) + " kgCO₂eq/sf";
                        document.getElementById("textLabel").innerHTML = textToShow
                        // myText = textToShow;
                        displayText = 1;
                        // stroke={black}
                        // use coordinates ...
                        opac = 1;

                        //fill={cols[i]} 
                      }}/>
                
                  {/* {hasSpaceForLabel && displayText &&(
                    <text
                      fill={black}
                      fillOpacity={opac}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={13}
                      textAnchor="middle"
                      zIndex={400}
                      
                    >
                      {arc.data.label}
                      
                    </text>
                  )} */}
                </g>
              );
            });
          }}
          
        </Pie>
        
      </Group>
      <text
      textAnchor="middle"
      x={centerX}
      y={centerY}
      fill="black"
      fontSize={17}
      fontWeight={700}
      pointerEvents="none"
    >
      {myGWP}
    </text>
    <text
      textAnchor="middle"
      x={centerX}
      y={centerY+20}
      fill="black"
      fontSize={11}
      fontWeight={300}
      pointerEvents="none"
    >
      kgCO₂eq/sf
    </text>
    <text
      textAnchor="middle"
      x={centerX}
      y={centerY+32}
      fill="black"
      fontSize={11}
      fontWeight={300}
      pointerEvents="none"
    >
      GWP
    </text>
    </svg>
  );
};