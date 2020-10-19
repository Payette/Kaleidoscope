import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';
import { localPoint } from '@vx/event';

let pointX = 0;
let pointY = 0;



const white = '#fff';
let cols = ["#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#85E2BD", "#C7E9B7", "#C7E9B7", "#85E2BD", "#4169E1", "#4169E1", "#C7E9B7", "#85E2BD", "#C7E9B7", "#85E2BD", "#85E2BD", "#85E2BD", "#C7E9B8", "#C7E9B7", "#0090FF", "#0090FF", "#4169E1", "#4169E1", "#001488", "#FCC05E", "#CCCCCC", "#B3B3B3", "#E6E6E6", "#B3B3B3", "#808080", "#666666", "#333333"]
const black = '#000000';
const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
console.log(browserNames)
console.log(browserUsage)
const materialNames = ["mat37", "mat36", "mat35", "mat34", "mat33", "mat32", "mat31", "mat30", "mat29", "mat28", "mat27", "mat26", "mat25", "mat24", "mat23", "mat22", "mat21", "mat20", "mat19", "mat18", "mat17", "mat16", "mat15", "mat14", "mat13", "mat12", "mat11", "mat10", "mat9", "mat8", "mat7", "mat6", "mat5", "mat4", "mat3", "mat2", "mat1"];
let materialLabel = {mat1:"Paint, interior acrylic latex",mat2:"Wall board, gypsum, natural",mat3:"Cold formed structural steel",mat4:"Fiberglass mat gypsum sheathing board",mat5:"Self-adhering, polymer-modified asphalt sheet underlayment",mat6:"Aluminum Backpan",mat7:"Powder coating, metal stock",mat8:"Mineral wool, low density, NAIMA - EPD",mat9:"Adhesive, polychloroprene (neoprene)",mat10:"Galvanized steel",mat11:"Galvanized steel support",mat12:"Aluminum extrusion, AEC - EPD",mat13:"Fasteners, stainless steel",mat14:"Mortar type S",mat15:"Mortar type N",mat16:"Stone slab, granite",mat17:"Stone slab, limestone",mat18:"Brick, generic",mat19:"Fluoropolymer coating, metal stock",mat20:"Steel insulated metal panel (IMP), MCA - EPD",mat21:"Aluminum, sheet",mat22:"Aluminum curtain wall system, YKK AP - EPD ",mat23:"Argon gas for IGU",mat24:"Glazing, monolithic sheet, tempered",mat25:"IGU spacer",mat26:"Low-e coating (for glazing)",mat27:"GFRC panel, Rieder, FibreC panel - EPD",mat28:"GFRC",mat29:"Aluminum-faced composite wall panel (ACM), MCA - EPD",mat30:"Terracotta",mat31:"Phenolic resin solid surfacing, sheet",mat32:"Fiber cement board",mat33:"Titanium zinc sheet, Rheinzink, prePATINA blue/graphite-grey - EPD",mat34:"Paint, enamel, solvent based",mat35:"Steel, sheet",mat36:"Wood stain, water based",mat37:"Beech lumber, 1 inch"};
const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));

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
      for(let i=0; i<matBreakdown.length; i++){
        if(matBreakdown[i].material == currentMat){
          // console.log(matBreakdown[i])
          materials = matBreakdown[i];
          // console.log(tenYGWP)
    
          myGWP = selGWP[i].value;
        }
      }
    }else if(mCurrSel == "sixty1YGWP"){
      selGWP = sixty1YGWP;
      for(let i=0; i<matBreakdown1.length; i++){
        if(matBreakdown1[i].material == currentMat){
          // console.log(matBreakdown[i])
          materials = matBreakdown1[i];
          // console.log(tenYGWP)
    
          myGWP = selGWP[i].value;
        }
      }
    }else{
      selGWP = sixty2YGWP;
      for(let i=0; i<matBreakdown2.length; i++){
        if(matBreakdown2[i].material == currentMat){
          // console.log(matBreakdown[i])
          materials = matBreakdown2[i];
          // console.log(tenYGWP)
    
          myGWP = selGWP[i].value;
        }
      }
    }
  // }

  // console.log(selGWP)
  

  



  console.log(materials)
  // let materialNames1 = materialNames.reverse();
  // console.log(materialNames1)

//  let  cols1 = cols.reverse();
//  console.log(cols1);
  

  const mats = materialNames.map(k => ({ label: materialLabel[k], mUsage: materials[k] }));
  let mUsage = d => d.mUsage;
  let textToShow = "0.00";

  
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
              return (
                <g key={`browser-\${arc.data.label}-\${i}`}>
                  
                  <path d={pie.path(arc)} fill={cols[i]} stroke={white} fillOpacity={opacity} onMouseMove={(event: MouseEvent) => {
                        const point = localPoint(event) || { x: 0, y: 0 };
                        pointX = point.x;
                        pointY = point.y;
                        // console.log(point);
                        console.log(arc.data.label)
                        textToShow = arc.data.label + ": " + arc.data.mUsage.toFixed(2) + " kgCO₂eq/sf";
                        document.getElementById("textLabel").innerHTML = textToShow
                        // myText = textToShow;
                        displayText = 1;
                        // stroke={black}
                        // use coordinates ...
                        opac = 1;
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