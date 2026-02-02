import Papa from 'papaparse';

import dataGWP from './insulation/insulation_gwp_10y_n.csv';
import dataAllImpacts from './insulation/insulation_allImpact_10y_n.csv';
import dataLCS from './insulation/insulation_lcs_10y_n.csv';


import dataGWP1 from './insulation/insulation_gwp_10y_y.csv';
import dataAllImpacts1 from './insulation/insulation_allImpact_10y_y.csv';
import dataLCS1 from './insulation/insulation_lcs_10y_y.csv';


import dataGWP2 from './insulation/insulation_gwp_60y_n.csv';
import dataAllImpacts2 from './insulation/insulation_allImpact_60y_n.csv';
import dataLCS2 from './insulation/insulation_lcs_60y_n.csv';


import dataGWP3 from './insulation/insulation_gwp_60y_y.csv';
import dataAllImpacts3 from './insulation/insulation_allImpact_60y_y.csv';
import dataLCS3 from './insulation/insulation_lcs_60y_y.csv';


import dataGWP4 from './insulation/insulation_gwp_60yd_n.csv';
import dataAllImpacts4 from './insulation/insulation_allImpact_60yd_n.csv';
import dataLCS4 from './insulation/insulation_lcs_60yd_n.csv';


import dataGWP5 from './insulation/insulation_gwp_60yd_y.csv';
import dataAllImpacts5 from './insulation/insulation_allImpact_60yd_y.csv';
import dataLCS5 from './insulation/insulation_lcs_60yd_y.csv';

import dataRValues from './insulation/insulation_rvalues.csv';


const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    blSprayClosedHFC: "#FCC05E",
    blSprayClosedHFO: "#F9CB97",
    blSprayOpen: "#FEE6BF",
    blCellulose: "#FEF2DF",
    bdXPSlegacy: "#4B803D",
    bdXPS60: "#5CA040",
    bdMinWoolHighDens: "#70BF51",
    bdXPS40: "#8EE05F",
    bdXPS25: "#ADE589",
    bdEPS: "#C2EAA7",
    bdPolyiso: "#DBF2CC",
    btGlassWoolFoil: "#8BD3F7",
    btSheepWool: "#5CBDFF",
    btMinWoolLowDens: "#00AAFF",
    btGlassWoolPaper: "#4497EA",
    btGlassWool: "#4169E1",
    btGlassWoolLowGWP: "#283CDC"
  },


  materialHealth: {
    blSprayClosedHFC: "#febe10",
    blSprayClosedHFO: "#febe10",
    blSprayOpen: "#febe10",
    blCellulose: "#febe10",

    bdXPSlegacy: "#febe10",
    bdXPS60: "#febe10",
    bdMinWoolHighDens: "#97cd78",
    bdXPS40: "#febe10",
    bdXPS25: "#febe10",
    bdEPS: "#febe10",
    bdPolyiso: "#febe10",

    btGlassWoolFoil: "#97cd78",
    btSheepWool: "#febe10",
    btMinWoolLowDens: "#97cd78",
    btGlassWoolPaper: "#97cd78",
    btGlassWool: "#97cd78",
    btGlassWoolLowGWP: "#97cd78",
  },



  materialHealthText: {
    blSprayClosedHFC: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent",
        "Potential off-gassing hazard during installation and beyond"
    ],
    blSprayClosedHFO: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent",
        "Potential off-gassing hazard during installation and beyond"
    ],
    blSprayOpen: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent",
        "Potential off-gassing hazard during installation and beyond"
    ],
    blCellulose: [
        "Typically includes flame retardants",
        "Use mineral based instead of halogenated/organophosphate"
    ],
    bdXPSlegacy: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent"
    ],
    bdXPS60: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent"
    ],
    bdMinWoolHighDens: [
        "Specify formaldehyde-free insulation"
    ],
    bdXPS40: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent"
    ],
    bdXPS25: [
        "Includes halogenated flame retardants",
        "Can also contain PFAS as a blowing agent"
    ],
    bdEPS: [
        "Includes halogenated flame retardants",
        "Could contain insecticides"
    ],
    bdPolyiso: [
        "Typically Includes halogenated flame retardants",
        "Specify halogen-free boards 'NH'"
    ],
    btGlassWoolFoil: [
        "Specify formaldehyde-free insulation",
        "Faced products may contain flame retardants"
    ],
    btSheepWool: [
        "Typically includes mineral based flame retardants"
    ],
    btMinWoolLowDens: [
        "Specify formaldehyde-free insulation"
    ],
    btGlassWoolPaper: [
        "Specify formaldehyde-free insulation",
        "Faced products may contain flame retardants"
    ],
    btGlassWool: [
        "Specify formaldehyde-free insulation"
    ],
    btGlassWoolLowGWP: [
        "Specify formaldehyde-free insulation"
    ]
  },


  // hover on bar chart
  materialTexts: {
    blSprayClosedHFC: "closed cell HFC spray polyurethane (PU) foam, 0.16 inches thick for R-1",
    blSprayClosedHFO: "closed cell HFO spray polyurethane (PU) foam, 0.16 inches thick for R-1",
    blSprayOpen: "open cell spray polyurethane (PU) foam, 0.28 inches thick for R-1",
    blCellulose: "blown cellulose, 0.27 inches thick for R-1",
    bdXPSlegacy: "XPS/extruded polystyrene, legacy HFC blowing agents, 30 psi, 0.20 inches thick for R-1",
    bdXPS60: "XPS/extruded polystyrene with low GWP blowing agents, 60 psi, 0.20 inches thick for R-1 (EPD specific)",
    bdMinWoolHighDens: "high density mineral wool board, 0.24 inches thick for R-1",
    bdXPS40: "XPS/extruded polystyrene with low GWP blowing agents, 40 psi, 0.20 inches thick for R-1 (EPD specific)",
    bdXPS25: "XPS/extruded polystyrene with low GWP blowing agents, 25 psi, 0.20 inches thick for R-1 (EPD specific)",
    bdEPS: "EPS/expanded polystyrene, 0.25 inches thick for R-1",
    bdPolyiso: "polyiso/polyisocyanurate with glass fiber reinforced facer, 0.17 inches thick for R-1",
    btGlassWoolFoil: "foil faced glass wool, 0.32 inches thick for R-1",
    btSheepWool: "sheep's wool, 0.28 inches thick for R-1 (EPD specific)",
    btMinWoolLowDens: "low density mineral wool board, 0.27 inches thick for R-1",
    btGlassWoolPaper: "paper faced glass wool, 0.32 inches thick for R-1",
    btGlassWool: "unfaced glass wool, 0.32 inches thick for R-1",
    btGlassWoolLowGWP: "unfaced low carbon glass wool, 0.32 inches thick for R-1",
  },



  // modal popup text
  materialNotes: {
    blSprayClosedHFC: [
      "Data in square feet per R-1 at 0.16 inches thick",
      "Insulation R-6.2 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts",
    ],
    blSprayClosedHFO: [
      "Data in square feet per R-1 at 0.16 inches thick",
      "Insulation R-6.2 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts",
    ],
    blSprayOpen: [
      "Data in square feet per R-1 at 0.28 inches thick",
      "Insulation R-3.6 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts",
    ],
    blCellulose: [
      "Data in square feet per R-1 at 0.27 inches thick",
      "Insulation R-3.7 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts",
    ],
    bdXPSlegacy: [
      "Data in square feet per R-1 at 0.20 inches thick",
      "Insulation R-5 per inch",
      "Compressive strength 30 psi",
      "Check your jurisdiction to see if the use of HFC-134a blowing agents are banned", 
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    bdXPS60: [
      "Data in square feet per R-1 at 0.20 inches thick",
      "Insulation R-5 per inch",
      "Compressive strength 60 psi",
      "Low GWP blowing agents free of HFC-134a",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to EPD 75 years",
      "If assembly gets replaced consider B4 impacts",
      "Data from product-specific EPD: Foamular NGX XPS Insulation, Date of issue: January 1, 2021"
    ],
    bdMinWoolHighDens: [
      "Data in square feet per R-1 at 0.24 inches thick",
      "Insulation R-4.2 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    bdXPS40: [
      "Data in square feet per R-1 at 0.20 inches thick",
      "Insulation R-5 per inch",
      "Compressive strength 40 psi",
      "Low GWP blowing agents free of HFC-134a",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to EPD of 75 years",
      "If assembly gets replaced consider B4 impacts",
      "Data from product-specific EPD: Foamular NGX XPS Insulation, Date of issue: January 1, 2021"
    ],
    bdXPS25: [
      "Data in square feet per R-1 at 0.20 inches thick",
      "Insulation R-5 per inch",
      "Compressive strength 25 psi",
      "Low GWP blowing agents free of HFC-134a",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to EPD of 75 years",
      "If assembly gets replaced consider B4 impacts",
      "Data from product-specific EPD: Foamular NGX XPS Insulation, Date of issue: January 1, 2021"
    ],
    bdEPS: [
      "Data in square feet per R-1 at 0.25 inches thick",
      "Insulation R-4 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    bdPolyiso: [
      "Data in square feet per R-1 at 0.17 inches thick",
      "Insulation R-5.8 per inch",
      "R-value varies slightly with thickness due to facer, but is negligible in LCA scope",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    btGlassWoolFoil: [
      "Data in square feet per R-1 at 0.32 inches thick",
      "Insulation R-3.14 per inch",
      "R-value varies slightly with thickness due to facer, but is negligible in LCA scope",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    btSheepWool: [
      "Data in square feet per R-1 at 0.28 inches thick",
      "Insulation R-3.62 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to EPD of 60 years",
      "If assembly gets replaced consider B4 impacts",
      "Data from product-specific EPD: Havelock Wool Batt and Loose-Fill Insulation, Date of issue: June 5, 2020"
    ],
    btMinWoolLowDens: [
      "Data in square feet per R-1 at 0.27 inches thick",
      "Insulation R-3.7 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    btGlassWoolPaper: [
      "Data in square feet per R-1 at 0.32 inches thick",
      "Insulation R-3.14 per inch",
      "R-value varies slightly with thickness due to facer, but is negligible in LCA scope",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    btGlassWool: [
      "Data in square feet per R-1 at 0.32 inches thick",
      "Insulation R-3.14 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts"
    ],
    btGlassWoolLowGWP: [
      "Data in square feet per R-1 at 0.32 inches thick",
      "Insulation R-3.1 per inch",
      "The rest of any assembly is not included in LCA calculations",
      "Service life set to Tally default of 75 years",
      "If assembly gets replaced consider B4 impacts",
      "Data from Tally based on Knauf EcoBatt"
    ],
  },


    // used by MaterialList modal (can be empty; prevents crash)
  sectionIcons: {},



  // Life Cycle Stages
  impactColors: {
    impact1: "#85e2bd",
    impact2: "#fcc05e",
    impact3: "#001489",
    impact4: "#4095ee",
    impact5: "#a2d3eb",
  },

  // All Impacts - Categories
  iColors: {
    i1: "#87cde9",
    i2: "#6495ed",
    i3: "#fcc05e",
    i4: "#0090ff",
    i5: "#85e2bd",
    i6: "#283cdc"
  },

  
  // Material Breakdown Colors
  matColors: {
    mat1: "#4169e1",
    mat2: "#4169e1",
    mat3: "#4169e1",
    mat4: "#4169e1",
    mat5: "#4169e1",
    mat6: "#4169e1",
    mat7: "#9be0bf",
    mat8: "#9be0bf",
    mat9: "#9be0bf",
    mat10: "#9be0bf",
    mat11: "#9be0bf",
    mat12: "#9be0bf",
    mat13: "#9be0bf",
    mat14: "#9be0bf",
    mat15: "#9be0bf",
    mat16: "#9be0bf",
    mat17: "#9be0bf",

  },

  materialOrdering: {
    blSprayClosedHFC: 1,
    blSprayClosedHFO: 2,
    blSprayOpen: 3,
    blCellulose: 4,

    bdXPSlegacy: 5,
    bdXPS60: 6,
    bdMinWoolHighDens: 7,
    bdXPS40: 8,
    bdXPS25: 9,
    bdEPS: 10,
    bdPolyiso: 11,

    btGlassWoolFoil: 12,
    btSheepWool: 13,
    btMinWoolLowDens: 14,
    btGlassWoolPaper: 15,
    btGlassWool: 16,
    btGlassWoolLowGWP: 17
  },

  typeOrdering: {
    "Blown": 1,
    "Board": 5,
    "Batt": 12
  },


  materialType: {
    blSprayClosedHFC: "Blown - Spray Polyurethane Foam (Closed Cell HFC)",
    blSprayClosedHFO: "Blown - Spray Polyurethane Foam (Closed Cell HFO)",
    blSprayOpen: "Blown - Spray Polyurethane Foam (Open Cell)",
    blCellulose: "Blown - Cellulose",

    bdXPSlegacy: "Board - XPS / Extruded Polystyrene (Legacy HFC)",
    bdXPS60: "Board - XPS / Extruded Polystyrene 60 (Low GWP)",
    bdMinWoolHighDens: "Board - Mineral Wool (High Density)",
    bdXPS40: "Board - XPS / Extruded Polystyrene 40 (Low GWP)",
    bdXPS25: "Board - XPS / Extruded Polystyrene 25 (Low GWP)",
    bdEPS: "Board - EPS / Expanded Polystyrene",
    bdPolyiso: "Board - Polyiso / Polyisocyanurate (GRF Facer)",

    btGlassWoolFoil: "Batt - Glass Wool (Foil Faced)",
    btSheepWool: "Batt - Sheep's Wool",
    btMinWoolLowDens: "Batt - Mineral Wool (Low Density)",
    btGlassWoolPaper: "Batt - Glass Wool (Paper Faced)",
    btGlassWool: "Batt - Glass Wool (Unfaced)",
    btGlassWoolLowGWP: "Batt - Glass Wool (Unfaced, Low GWP)"
  },


  // Shortish name used in chart row labels (does not have type).
  // (如果你 csv 里 material 字段本身就用 assembly_variable_name，这个只是 UI 显示名)
  materialName: {
    blSprayClosedHFC: "Spray Foam (Closed Cell HFC)",
    blSprayClosedHFO: "Spray Foam (Closed Cell HFO)",
    blSprayOpen: "Spray Foam (Open Cell)",
    blCellulose: "Cellulose",

    bdXPSlegacy: "XPS (Legacy HFC)",
    bdXPS60: "XPS 60 (Low GWP)",
    bdMinWoolHighDens: "Mineral Wool (High Density)",
    bdXPS40: "XPS 40 (Low GWP)",
    bdXPS25: "XPS 25 (Low GWP)",
    bdEPS: "EPS",
    bdPolyiso: "Polyiso (GRF Facer)",

    btGlassWoolFoil: "Glass Wool (Foil Faced)",
    btSheepWool: "Sheep's Wool",
    btMinWoolLowDens: "Mineral Wool (Low Density)",
    btGlassWoolPaper: "Glass Wool (Paper Faced)",
    btGlassWool: "Glass Wool (Unfaced)",
    btGlassWoolLowGWP: "Glass Wool (Unfaced, Low GWP)"
  },

  // Name with Longer Type prefix used in Chart Hover Popup and Modal Material Popup
  materialName2: {
    blSprayClosedHFC: "Blown - Spray Polyurethane Foam (Closed Cell HFC)",
    blSprayClosedHFO: "Blown - Spray Polyurethane Foam (Closed Cell HFO)",
    blSprayOpen: "Blown - Spray Polyurethane Foam (Open Cell)",
    blCellulose: "Blown - Cellulose",

    bdXPSlegacy: "Board - XPS / Extruded Polystyrene (Legacy HFC)",
    bdXPS60: "Board - XPS / Extruded Polystyrene 60 (Low GWP)",
    bdMinWoolHighDens: "Board - Mineral Wool (High Density)",
    bdXPS40: "Board - XPS / Extruded Polystyrene 40 (Low GWP)",
    bdXPS25: "Board - XPS / Extruded Polystyrene 25 (Low GWP)",
    bdEPS: "Board - EPS / Expanded Polystyrene",
    bdPolyiso: "Board - Polyiso / Polyisocyanurate (GRF Facer)",

    btGlassWoolFoil: "Batt - Glass Wool (Foil Faced)",
    btSheepWool: "Batt - Sheep's Wool",
    btMinWoolLowDens: "Batt - Mineral Wool (Low Density)",
    btGlassWoolPaper: "Batt - Glass Wool (Paper Faced)",
    btGlassWool: "Batt - Glass Wool (Unfaced)",
    btGlassWoolLowGWP: "Batt - Glass Wool (Unfaced, Low GWP)"
  },

};

export default {

  rValuesData: (cb) => {
    Papa.parse(dataRValues, {
      ...PAPAPARSE_CONFIG,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (Array.isArray(results.data)) {
          const rows = results.data
            .filter(d => d.material)
            .map(d => ({
              material: d.material,
              rperinch: parseFloat(d.rperinch)
            }));
          cb(rows);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },


  metaData: metaData,

  gwpData: (cb) => {
    Papa.parse(dataGWP, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  allImpactsData: (cb) => {
    Papa.parse(dataAllImpacts, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData: (cb) => {
    Papa.parse(dataLCS, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  // Insulation chapter does NOT have "Material Breakdown" dataset.
  // Keep these keys to satisfy App/ChartContainer’s shared interface.
  materialData:  (cb) => cb([]),
  materialData1: (cb) => cb([]),
  materialData2: (cb) => cb([]),
  materialData3: (cb) => cb([]),
  materialData4: (cb) => cb([]),
  materialData5: (cb) => cb([]),


  gwpData1: (cb) => {
    Papa.parse(dataGWP1, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  allImpactsData1: (cb) => {
    Papa.parse(dataAllImpacts1, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData1: (cb) => {
    Papa.parse(dataLCS1, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },



  gwpData2: (cb) => {
    Papa.parse(dataGWP2, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  allImpactsData2: (cb) => {
    Papa.parse(dataAllImpacts2, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData2: (cb) => {
    Papa.parse(dataLCS2, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => { // impact4: parseFloat(d.impact4), 
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },



  gwpData3: (cb) => {
    Papa.parse(dataGWP3, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  allImpactsData3: (cb) => {
    Papa.parse(dataAllImpacts3, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData3: (cb) => {
    Papa.parse(dataLCS3, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },



  gwpData4: (cb) => {
    Papa.parse(dataGWP4, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  allImpactsData4: (cb) => {
    Papa.parse(dataAllImpacts4, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData4: (cb) => {
    Papa.parse(dataLCS4, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },



  gwpData5: (cb) => {
    Papa.parse(dataGWP5, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },



  allImpactsData5: (cb) => {
    Papa.parse(dataAllImpacts5, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          const resultData = results.data.map(d => {
            return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6) }
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

  lcsData5: (cb) => {
    Papa.parse(dataLCS5, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), name: d.name, img: d.img }
          });

          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },


};
