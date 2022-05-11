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
let cols = ["#c8e3b6", "#74deb6", "#bfe6b1", "#74deb6", "#bfe6b1", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6", "#74deb6","#b6e6e9", "#bfe6b1", "#74deb6", "#93cee6", "#2461fa", "#2461fa", "#2461fa", "#74deb6", "#74deb6", "#bfe6b1", "#74deb6", "#bfe6b1", "#74deb6", "#93cee6", "#93cee6", "#b6e6e9", "#74deb6", "#74deb6", "#bfe6b1", "#bfe6b1", "#bfe6b1", "#93cee6", "#0087fb", "#2461fa", "#2461fa", "#00177b", "#ffe2b9", "#ffb65b", "#ffb65b", "#ffb65b", "#c5c5c5", "#aaaaaa", "#c5c5c5", "#aaaaaa", "#8e8e8e", "#5b5b5b", "#2d2d2d"]
const black = '#000000';
const letters = letterFrequency.slice(0, 4);
// const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
// console.log(browserNames)
// console.log(browserUsage)
const materialNames = ["mat49", "mat48", "mat47", "mat46", "mat45", "mat44", "mat43", "mat42", "mat41", "mat40", "mat39", "mat38","mat37", "mat36", "mat35", "mat34", "mat33", "mat32", "mat31", "mat30", "mat29", "mat28", "mat27", "mat26", "mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"];
let materialLabel = {mat1:"Paint, interior acrylic latex",mat2:"Wall board, gypsum, natural",mat3:"Cold formed structural steel",mat4:"Fiberglass mat gypsum sheathing board",mat5:"Self-adhering, polymer-modified asphalt sheet underlayment",mat6:"Aluminum Backpan",mat7:"Powder coating, metal stock",mat8:"Mineral wool, low density, NAIMA - EPD",mat9:"Spray polyurethane foal, closed cell, (HFO blowing agent)",mat10:"XPS insulation, Foamular average, Owens Corning - EPD",mat11:"Polyureathane foam (PUR) rigid board", mat12:"Adhesive, polychloroprene (neoprene)",mat13:"Galvanized steel",mat14:"Galvanized steel support",mat15:"Aluminum extrusion, AEC - EPD",mat16:"Fasteners, stainless steel",mat17:"Mortar type S",mat18:"Mortar type N",mat19:"Aluminum sheet",mat20:"Stone slab, granite",mat21:"Stone slab, limestone",mat22:"Cement bonded particle board",mat23:"Steel Sheet",mat24:"Zinc coating (galvanized) for stee G60",mat25:"Brick, generic",mat26:"Fluoropolymer coating, metal stock",mat27:"Steel insulated metal panel (IMP), MCA - EPD",mat28:"Glass fiber board, NAIMA - EPD",mat29:"Stucco synthetic",mat30:"Structural concrete, 5000 psi, 0% fly ash and slag",mat31:"Aluminum curtain wall system, YKK AP - EPD ",mat32:"Stainless steel, extruded chromium 18/8",mat33:"Glue laminated timber (Glulam), AWC - EPD",mat34:"Argon gas for IGU",mat35:"Glazing, monolithic sheet, tempered",mat36:"IGU spacer",mat37:"Low-e coating (for glazing)",mat38:"GFRC panel, Rieder, FibreC panel - EPD",mat39:"GFRC",mat40:"Aluminum-faced composite wall panel (ACM), MCA - EPD",mat41:"Terracotta",mat42:"Phenolic resin solid surfacing, sheet",mat43:"Fiber cement board",mat44:"Titanium zinc sheet, Rheinzink, prePATINA blue/graphite-grey - EPD",mat45:"Paint, enamel, solvent based",mat46:"Steel, sheet",mat47:"Wood stain, water based",mat48:"Tulipwood lumber, 1 inch",mat49:"Steel, welded wire mesh"};
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