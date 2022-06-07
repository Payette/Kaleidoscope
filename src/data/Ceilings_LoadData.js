import Papa from 'papaparse';

import dataGWP from './ceilings/ceilings_gwp_10y_n.csv';
import dataAllImpacts from './ceilings/ceilings_allImpact_10y_n.csv';
import dataLCS from './ceilings/ceilings_lcs_10y_n.csv';
import dataMaterial from './ceilings/ceilings_material_10y_n.csv';

import dataGWP1 from './ceilings/ceilings_gwp_10y_y.csv';
import dataAllImpacts1 from './ceilings/ceilings_allImpact_10y_y.csv';
import dataLCS1 from './ceilings/ceilings_lcs_10y_y.csv';
import dataMaterial1 from './ceilings/ceilings_material_10y_y.csv';

import dataGWP2 from './ceilings/ceilings_gwp_60y_n.csv';
import dataAllImpacts2 from './ceilings/ceilings_allImpact_60y_n.csv';
import dataLCS2 from './ceilings/ceilings_lcs_60y_n.csv';
import dataMaterial2 from './ceilings/ceilings_material_60y_n.csv';

import dataGWP4 from './ceilings/ceilings_gwp_60y_y.csv';
import dataAllImpacts4 from './ceilings/ceilings_allImpact_60y_y.csv';
import dataLCS4 from './ceilings/ceilings_lcs_60y_y.csv';
import dataMaterial4 from './ceilings/ceilings_material_60y_y.csv';

import dataGWP3 from './ceilings/ceilings_gwp_60yd_n.csv';
import dataAllImpacts3 from './ceilings/ceilings_allImpact_60yd_n.csv';
import dataLCS3 from './ceilings/ceilings_lcs_60yd_n.csv';
import dataMaterial3 from './ceilings/ceilings_material_60yd_n.csv';

import dataGWP5 from './ceilings/ceilings_gwp_60yd_y.csv';
import dataAllImpacts5 from './ceilings/ceilings_allImpact_60yd_y.csv';
import dataLCS5 from './ceilings/ceilings_lcs_60yd_y.csv';
import dataMaterial5 from './ceilings/ceilings_material_60yd_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    mBaffle: "#9E005D",
    mPan: "#C3426B",
    mPerforatedPan: "#EBB3C3",
    hcGypsum: "#F78461",
    hcMoistureResistantGyp: "#FAB5A0",
    cFiberglassTrim: "#FCC05E",
    cFiberglass: "#FCE4C3",
    ltFiberglass: "#8EE05F",
    ltMineralBoard: "#C2EAA7",
    ocAcousticalSpray: "#89EFC0",
    ocPaint: "#B8F5D9",
    wVeneerDense: "#87CEE9",
    wVeneerOpen: "#8BD3F7",
    wPoplarDense: "#5CBDFF",
    wPoplarOpen: "#00AAFF",
    wWalnutDense: "#4497EA",
    wWalnutOpen: "#6495ED",
    wMapleDense: "#4169E1",
    wMapleOpen: "#283CDC"
  },

  materialHealth: {
    mBaffle: "#00ae5e",
    mPan: "#00ae5e",
    mPerforatedPan: "#00ae5e",
    hcGypsum: "#97cd78",
    hcMoistureResistantGyp: "#febe10",
    cFiberglassTrim: "#febe10",
    cFiberglass: "#febe10",
    ltFiberglass: "#febe10",
    ltMineralBoard: "#febe10",
    ocAcousticalSpray: "#febe10",
    ocPaint: "#97cd78",
    wVeneerDense: "#00ae5e",
    wVeneerOpen: "#00ae5e",
    wPoplarDense: "#00ae5e",
    wPoplarOpen: "#00ae5e",
    wWalnutDense: "#00ae5e",
    wWalnutOpen: "#00ae5e",
    wMapleDense: "#00ae5e",
    wMapleOpen: "#00ae5e"
  },

  materialHealthText: {
    mBaffle: [""],
    mPan: [""],
    mPerforatedPan: [""],
    hcGypsum: ["Watch for VOC content for interior paint","Type X gypsum board includes flame retardants"],
    hcMoistureResistantGyp: ["Watch for VOC content for interior paint","Typically includes antimicrobials"],
    cFiberglassTrim: ["Antimicrobials included as a preservative are acceptable","Avoid products that add antimicrobials as part of a health claim"],
    cFiberglass: ["Antimicrobials included as a preservative are acceptable","Avoid products that add antimicrobials as part of a health claim"],
    ltFiberglass: ["Antimicrobials included as a preservative are acceptable","Avoid products that add antimicrobials as part of a health claim"],
    ltMineralBoard: ["Antimicrobials included as a preservative are acceptable","Avoid products that add antimicrobials as part of a health claim"],
    ocAcousticalSpray: ["Watch for flame retardants and anti-microbials"],
    ocPaint: ["Avoid products that add antimicrobials","Watch for VOC content of coatings"],
    wVeneerDense: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings","Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    wVeneerOpen: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings","Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    wPoplarDense: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"],
    wPoplarOpen: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"],
    wWalnutDense: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"],
    wWalnutOpen: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"],
    wMapleDense: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"],
    wMapleOpen: ["Specify FSC Wood or other responsible source","Watch for VOC content of coatings"]
  },

  // hover on bar chart
  materialTexts: {
    mBaffle: "Metal baffles composed of enamel painted aluminum sheet cold-formed into shapes",
    mPan: "Tile composed of powder coated standard 24 ga. aluminum ceiling tile",
    mPerforatedPan: "TODO M Text",
    hcGypsum: "TODO M Text",
    hcMoistureResistantGyp: "TODO M Text",
    cFiberglassTrim: "TODO M Text",
    cFiberglass: "TODO M Text",
    ltFiberglass: "TODO M Text",
    ltMineralBoard: "TODO M Text",
    ocAcousticalSpray: "TODO M Text",
    ocPaint: "TODO M Text",
    wVeneerDense: "TODO M Text",
    wVeneerOpen: "TODO M Text",
    wPoplarDense: "TODO M Text",
    wPoplarOpen: "TODO M Text",
    wWalnutDense: "TODO M Text",
    wWalnutOpen: "TODO M Text",
    wMapleDense: "TODO M Text",
    wMapleOpen: "TODO M Text"
  },

  // modal popup text
  materialNotes: {
    mBaffle: ['Building structure is not included in LCA calculations',
    'Acoustical infill pad not included as part of system',
    'Service life 60 year Tally default and some materials adjusted to match',
    'Metal baffles are 1 1/4" wide x 3 1/4" deep and spaced 2 3/4" apart'],
    mPan: ["Check TODO", "Line 2", "Line 3"],
    mPerforatedPan: ["Check TODO"],
    hcGypsum: ["Check TODO"],
    hcMoistureResistantGyp: ["Check TODO"],
    cFiberglassTrim: ["Check TODO"],
    cFiberglass: ["Check TODO"],
    ltFiberglass: ["Check TODO"],
    ltMineralBoard: ["Check TODO"],
    ocAcousticalSpray: ["Check TODO"],
    ocPaint: ["Check TODO"],
    wVeneerDense: ['Building structure is not included in LCA calculations',
    'Acoustical infill pad not included as part of system',
    'Service life 50 year Tally default and some materials adjusted to match',
    'Veneer composed of medium thickness (0.6 mm) hardwood veneer adhered to unfinished Medium Density Fiberboard (MDF)',
    '"Dense" wood grilles are 5/8" wide x 2 1/4" deep and spaced 7/8" apart',
    'End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.)'],
    wVeneerOpen: ['Building structure is not included in LCA calculations',
    'Acoustical infill pad not included as part of system',
    'Service life 50 year Tally default and some materials adjusted to match',
    'Veneer composed of medium thickness (0.6 mm) hardwood veneer adhered to unfinished Medium Density Fiberboard (MDF)',
    '"Open" wood grilles are 1 1/4" wide x 3 1/4" deep and spaced 2 3/4" apart',
    'End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.)'],
    wPoplarDense: ["Check TODO"],
    wPoplarOpen: ["Check TODO"],
    wWalnutDense: ["Check TODO"],
    wWalnutOpen: ["Check TODO"],
    wMapleDense: ["Check TODO"],
    wMapleOpen: ["Check TODO"]
  },

  // section graphic material modal popup
  sectionIcons: {
    mBaffle: "./img/Ceilings/Sections/M-BAFFLE.png",
    mPan: "./img/Ceilings/Sections/M-PAN.png",
    mPerforatedPan: "./img/Ceilings/Sections/M-PERFORATEDPAN.png",
    hcGypsum: "./img/Ceilings/Sections/HC-GYPSUM.png",
    hcMoistureResistantGyp: "./img/Ceilings/Sections/HC-MOISTURERESISTANTGYPSUM.png",
    cFiberglassTrim: "./img/Ceilings/Sections/C-FIBERGLASSWTRIM.png",
    cFiberglass: "./img/Ceilings/Sections/C-FIBERGLASS.png",
    ltFiberglass: "./img/Ceilings/Sections/LT-FIBERGLASS.png",
    ltMineralBoard: "./img/Ceilings/Sections/LT-MINERALBOARD.png",
    ocAcousticalSpray: "./img/Ceilings/Sections/OC-ACOUSTICALSPRAY.png",
    ocPaint: "./img/Ceilings/Sections/OC-PAINT.png",
    wVeneerDense: "./img/Ceilings/Sections/W-DENSEGRILLEVENEER.png",
    wVeneerOpen: "./img/Ceilings/Sections/W-OPENGRILLEVENEER.png",
    wPoplarDense: "./img/Ceilings/Sections/W-DENSEGRILLEPOPLAR.png",
    wPoplarOpen: "./img/Ceilings/Sections/W-OPENGRILLEPOPLAR.png",
    wWalnutDense: "./img/Ceilings/Sections/W-DENSEGRILLEWALNUT.png",
    wWalnutOpen: "./img/Ceilings/Sections/W-OPENGRILLEWALNUT.png",
    wMapleDense: "./img/Ceilings/Sections/W-DENSEGRILLEMAPLE.png",
    wMapleOpen: "./img/Ceilings/Sections/W-OPENGRILLEMAPLE.png",
  },

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
    i1: "#87cde8",
    i2: "#6d91cb",
    i3: "#fbc05d",
    i4: "#4686c6",
    i5: "#90d0b6",
    i6: "#4154a5"
  },

  // Material Breakdown Colors
  matColors: {
    mat1: "#4169e1",
    mat2: "#4169e1",
    mat3: "#4169e1",
    mat4: "#4169e1",
    mat5: "#4169e1",
    mat6: "#85e2bd",
    mat7: "#85e2bd",
    mat8: "#85e2bd",
    mat9: "#85e2bd",
    mat10: "#85e2bd",
    mat11: "#85e2bd",
    mat12: "#85e2bd",
    mat13: "#85e2bd",
    mat14: "#85e2bd",
    mat15: "#85e2bd",
    mat16: "#85e2bd",
    mat17: "#85e2bd",
    mat18: "#85e2bd",
    mat19: "#85e2bd",
    mat20: "#85e2bd",
    mat21: "#85e2bd",
    mat22: "#cccccc",
    mat23: "#cccccc",
    mat24: "#cccccc",
    mat25: "#CCCCCC"    
  },

  materialOrdering: {
    mBaffle: 1,
    mPan: 2,
    mPerforatedPan: 3,
    hcGypsum: 4,
    hcMoistureResistantGyp: 5,
    cFiberglassTrim: 6,
    cFiberglass: 7,
    ltFiberglass: 8,
    ltMineralBoard: 9,
    ocAcousticalSpray: 10,
    ocPaint: 11,
    wVeneerDense: 12,
    wVeneerOpen: 13,
    wPoplarDense: 14,
    wPoplarOpen: 15,
    wWalnutDense: 16,
    wWalnutOpen: 17,
    wMapleDense: 18,
    wMapleOpen: 19 
  },

  typeOrdering: {
    "Metal": 1,
    "Hard Ceiling": 2,
    "Cloud": 3,
    "Lay-In Tile": 4,
    "Open Ceiling": 5,
    "Wood": 6    
  },

  // Name with Type prefix used in Material List
  materialType: {
    mBaffle: "M - Baffle (Metal)",
    mPan: "M -  Metal Pan",
    mPerforatedPan: "M - Perf Metal Pan",
    hcGypsum: "HC - Gyp",
    hcMoistureResistantGyp: "HC - Moisture Resistant Gyp",
    cFiberglassTrim: "C - Fiberglass (w/ Trim)",
    cFiberglass: "C - Fiberglass",
    ltFiberglass: "LT - Fiberglass",
    ltMineralBoard: "LT - Mineral Board",
    ocAcousticalSpray: "OC - Acoustical Spray",
    ocPaint: "OC - Paint",
    wVeneerDense: "W - Dense Grille (Veneer)",
    wVeneerOpen: "W - Open Grille (Veneer)",
    wPoplarDense: "W - Dense Grille (Poplar)",
    wPoplarOpen: "W - Open Grille (Poplar)",
    wWalnutDense: "W - Dense Grille (Walnut)",
    wWalnutOpen: "W - Open Grille (Walnut)",
    wMapleDense: "W - Dense Grille (Maple)",
    wMapleOpen: "W - Open Grille (Maple)"
  },

  // Shortish name used in chart row labels (does not have type)
  materialName: {
    mBaffle: "Metal Baffle",
    mPan: "Metal Pan",
    mPerforatedPan: "Perforated Metal Pan",
    hcGypsum: "Gypsum",
    hcMoistureResistantGyp: "Moisture Resistant Gypsum",
    cFiberglassTrim: "Fiberglass (w/ Trim)",
    cFiberglass: "Fiberglass",
    ltFiberglass: "Fiberglass",
    ltMineralBoard: "Mineral Board",
    ocAcousticalSpray: "Acoustical Spray",
    ocPaint: "Paint",
    wVeneerDense: "Dense Grille (Veneer)",
    wVeneerOpen: " Open Grille (Veneer)",
    wPoplarDense: "Dense Grille (Poplar)",
    wPoplarOpen: "Open Grille (Poplar)",
    wWalnutDense: "Dense Grille (Walnut)",
    wWalnutOpen: "Open Grille (Walnut)",
    wMapleDense: "Dense Grille (Maple)",
    wMapleOpen: "Open Grille (Maple)"
  },

  // Name with Longer Type prefix used in Chart Hover Popup
  // and used in Modal Material Popup
  materialName2: {
    mBaffle: "Metal - Baffle",
    mPan: "Metal - Pan",
    mPerforatedPan: "Metal - Perforated Pan",
    hcGypsum: "Hard Ceiling - Gypsum",
    hcMoistureResistantGyp: "Hard Ceiling - Moisture Resistant Gypsum",
    cFiberglassTrim: "Cloud - Fiberglass (w/ Trim)",
    cFiberglass: "Cloud - Fiberglass",
    ltFiberglass: "Lay-In Tile - Fiberglass",
    ltMineralBoard: "Lay-In Tile - Mineral Board",
    ocAcousticalSpray: "Open Ceiling - Acoustical Spray",
    ocPaint: "Open Ceiling - Paint",
    wVeneerDense: "Wood - Dense Grille (Veneer)",
    wVeneerOpen: "Wood - Open Grille (Veneer)",
    wPoplarDense: "Wood - Dense Grille (Poplar)",
    wPoplarOpen: "Wood - Open Grille (Poplar)",
    wWalnutDense: "Wood - Dense Grille (Walnut)",
    wWalnutOpen: "Wood - Open Grille (Walnut)",
    wMapleDense: "Wood - Dense Grille (Maple)",
    wMapleOpen: "Wood - Open Grille (Maple)"
  }
};

export default {
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

  materialData: (cb) => {
    Papa.parse(dataMaterial, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  },

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

  materialData1: (cb) => {
    Papa.parse(dataMaterial1, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
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

  materialData2: (cb) => {
    Papa.parse(dataMaterial2, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
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

  materialData3: (cb) => {
    Papa.parse(dataMaterial3, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
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

  materialData4: (cb) => {
    Papa.parse(dataMaterial4, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
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

  materialData5: (cb) => {
    Papa.parse(dataMaterial5, {
      ...PAPAPARSE_CONFIG,
      complete: function (results, file) {
        if (Array.isArray(results.data)) {
          var resultData = results.data.map(d => {
            return {
              material: d.material,
              type: d.type,
              mat1: parseFloat(d.mat1),
              mat2: parseFloat(d.mat2),
              mat3: parseFloat(d.mat3),
              mat4: parseFloat(d.mat4),
              mat5: parseFloat(d.mat5),
              mat6: parseFloat(d.mat6),
              mat7: parseFloat(d.mat7),
              mat8: parseFloat(d.mat8),
              mat9: parseFloat(d.mat9),
              mat10: parseFloat(d.mat10),
              mat11: parseFloat(d.mat11),
              mat12: parseFloat(d.mat12),
              mat13: parseFloat(d.mat13),
              mat14: parseFloat(d.mat14),
              mat15: parseFloat(d.mat15),
              mat16: parseFloat(d.mat16),
              mat17: parseFloat(d.mat17),
              mat18: parseFloat(d.mat18),
              mat19: parseFloat(d.mat19),
              mat20: parseFloat(d.mat20),
              mat21: parseFloat(d.mat21),
              mat22: parseFloat(d.mat22),
              mat23: parseFloat(d.mat23),
              mat24: parseFloat(d.mat24),
              mat25: parseFloat(d.mat25),
              name: d.name,
              img: d.img
            }
          });
          resultData = resultData.sort((a, b) => {
            const orderA = metaData.materialOrdering[a.material] ? metaData.materialOrdering[a.material] : 1000;
            const orderB = metaData.materialOrdering[b.material] ? metaData.materialOrdering[b.material] : 1000;
            return orderA < orderB ? -1 : 1;
          });
          cb(resultData);
        } else {
          console.error('error trying to load file', results.errors);
        }
      }
    });
  }
};
