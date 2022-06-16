import Papa from 'papaparse';

import dataGWP from './flooring/flooring_gwp_10y_n.csv';
import dataAllImpacts from './flooring/flooring_allImpact_10y_n.csv';
import dataLCS from './flooring/flooring_lcs_10y_n.csv';
import dataMaterial from './flooring/flooring_material_10y_n.csv';

import dataGWP1 from './flooring/flooring_gwp_10y_y.csv';
import dataAllImpacts1 from './flooring/flooring_allImpact_10y_y.csv';
import dataLCS1 from './flooring/flooring_lcs_10y_y.csv';
import dataMaterial1 from './flooring/flooring_material_10y_y.csv';

import dataGWP2 from './flooring/flooring_gwp_60y_n.csv';
import dataAllImpacts2 from './flooring/flooring_allImpact_60y_n.csv';
import dataLCS2 from './flooring/flooring_lcs_60y_n.csv';
import dataMaterial2 from './flooring/flooring_material_60y_n.csv';

import dataGWP3 from './flooring/flooring_gwp_60y_y.csv';
import dataAllImpacts3 from './flooring/flooring_allImpact_60y_y.csv';
import dataLCS3 from './flooring/flooring_lcs_60y_y.csv';
import dataMaterial3 from './flooring/flooring_material_60y_y.csv';

import dataGWP4 from './flooring/flooring_gwp_60yd_n.csv';
import dataAllImpacts4 from './flooring/flooring_allImpact_60yd_n.csv';
import dataLCS4 from './flooring/flooring_lcs_60yd_n.csv';
import dataMaterial4 from './flooring/flooring_material_60yd_n.csv';

import dataGWP5 from './flooring/flooring_gwp_60yd_y.csv';
import dataAllImpacts5 from './flooring/flooring_allImpact_60yd_y.csv';
import dataLCS5 from './flooring/flooring_lcs_60yd_y.csv';
import dataMaterial5 from './flooring/flooring_material_60yd_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    sGranite: "#F78461",
    sSlate: "#F99D81",
    sCeramic: "#FAB5A0",
    rRubber: "#FCC05E",
    rVinyl: "#F9CB97",
    rLinoTile: "#FEE6BF",
    mConcrete: "#8EE05F",
    mTerrazzo: "#ADE589",
    mEpoxy: "#C2EAA7",
    cHigh: "#89EFC0",
    cMedium: "#A1F2CD",
    cLow: "#B8F5D9",
    wEngineered: "#87CEE9",
    wBamboo: "#66BCFF",
    wCork: "#4497EA",
    wSoftwood: "#4169E1",
    wHardwood: "#283CDC"
  },

  materialHealth: {
    sGranite: "#8cc672",
    sSlate: "#8cc672",
    sCeramic: "#8cc672",
    rRubber: "#8cc672",
    rVinyl: "#d51128",
    rLinoTile: "#8cc672",
    mConcrete: "#00a558",
    mTerrazzo: "#00a558",
    mEpoxy: "#febe10",
    cHigh: "#8cc672",
    cMedium: "#8cc672",
    cLow: "#8cc672",
    wEngineered: "#00a558",
    wBamboo: "#00a558",
    wCork: "#00a558",
    wSoftwood: "#00a558",
    wHardwood: "#00a558"
  },

  materialHealthText: {
    sGranite: ["Check that no antimicrobial coatings are included"],
    sSlate: ["Check that no antimicrobial coatings are included"],
    sCeramic: ["Check that no antimicrobial coatings are included"],
    rRubber: ["Check that no antimicrobial coatings are included"],
    rVinyl: ["Not recommended per Payette Material Policy"],
    rLinoTile: ["Check that no antimicrobial coatings are included"],
    mConcrete: ["Meets Payette Material Health Policy"],
    mTerrazzo: ["Watch for VOC Content"],
    mEpoxy: ["Watch for VOC Content", "Watch for Vinyl Content  'color chips', choose alternate if possible"],
    cHigh: ["Specify Vinyl Free backing", "Watch for stain treatments, flame retardants and anti-microbials", "Consider solution-dyed; solution-dyed with waterproof backing is stain resistant without added treatments"],
    cMedium: ["Specify Vinyl Free backing", "Watch for stain treatments, flame retardants and anti-microbials", "Consider solution-dyed; solution-dyed with waterproof backing is stain resistant without added treatments"],
    cLow: ["Specify Vinyl Free backing", "Watch for stain treatments, flame retardants and anti-microbials", "Consider solution-dyed; solution-dyed with waterproof backing is stain resistant without added treatments"],
    wEngineered: ["Specify FSC or other responsible source", "Watch for VOC content of coatings", "Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    wBamboo: ["Specify FSC or other responsible source", "Watch for VOC content of coatings", "Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    wCork: ["Specify FSC or other responsible source", "Watch for VOC content of coatings", "Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    wSoftwood: ["Specify FSC or other responsible source", "Watch for VOC content of coatings."],
    wHardwood: ["Specify FSC or other responsible source", "Watch for VOC content of coatings."]
  },

  materialTexts: {
    sGranite: "Granite stone tile; cement grout; thickset mortar",
    sSlate: "Slate stone tile; cement grout; thickset mortar",
    sCeramic: "Porcelain ceramic tile; cement grout; thin-set mortar",
    rRubber: "Rubber tile; HDPE vapor barrier; cementitious underlayment",
    rVinyl: "Solid vinyl flooring; HDPE vapor barrier; cementitious underlayment",
    rLinoTile: "Linoleum flooring; HDPE vapor barrier; cementitious underlayment",
    mConcrete: '2" Concrete topping slab',
    mTerrazzo: "Thin-set Epoxy Terrazzo (EPD specific)",
    mEpoxy: "Decorative Mosaic Epoxy Coating System (EPD Specific)",
    cHigh: "High-pile carpet; HDPE vapor barrier; cementitious underlayment",
    cMedium: "Medium-pile nylon carpet; HDPE vapor barrier; cementitious underlayment",
    cLow: "Low-pile nylon carpet; HDPE vapor barrier; cementitious underlayment",
    wEngineered: "Hardwood veneer flooring; HDPE vapor barrier; plywood substrate",
    wBamboo: "Bamboo plank flooring; HDPE vapor barrier; plywood substrate",
    wCork: "Cork tile flooring; HDPE vapor barrier; plywood substrate",
    wSoftwood: "Softwood solid plank flooring; HDPE vapor barrier; plywood substrate",
    wHardwood: "Hardwood solid plank flooring; HPDE vapor barrier; plywood substrate"
  },

  materialNotes: {
    sGranite: ['Structural slab not included in LCA calculations',
      'Flooring only; no wall bases included',
      'Service life of materials set to Tally default',
      '1/2" Granite stone tile flooring',
      '1" Thickset mortar'],
    sSlate: ['Structural slab not included in LCA calculations',
      'Flooring only; no wall bases included',
      'Service life of materials set to Tally default',
      '1/2" Slate stone tile flooring',
      '1" Thickset mortar'],
    sCeramic: ['Structural slab not included in LCA calculations',
      'Flooring only; no wall bases included',
      'Service life of materials set to Tally default',
      '1/4" Porcelain ceramic tile, glazed',
      '3/8" thin-set mortar'],
    rRubber: ['Structural slab not included in LCA calculations',
      'Data is for sheet or tile flooring',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of polyurethane-based flooring finish',
      'Inclusive of latex-based adhesive',
      '1/2" cementitious underlayment'],
    rVinyl: ['Structural slab not included in LCA calculations',
      'Data is for sheet or tile flooring',
      'Data assumed similar for Vinyl Composite Tyle (VCT)',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of polyurethane-based flooring finish',
      'Inclusive of latex-based adhesive',
      '1/2" cementitious underlayment'],
    rLinoTile: ['Structural slab not included in LCA calculations',
      'Data is for sheet or tile flooring',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of polyurethane-based flooring finish',
      'Inclusive of latex-based adhesive',
      '1/2" cementitious underlayment'],
    mConcrete: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      '2" self-leveling concrete'],
    mTerrazzo: ["Structural slab not included in LCA calculations",
      "Flooring only; no wall bases included",
      "Sherwin-Williams Thin-set Epoxy Terrazzo #1100 System Date of issue: April 10, 2019",
      "EPD includes: primer and matrix layer, moisture vapor treatment and iso-crack membrane"],
    mEpoxy: ['Structural slab not included in LCA calculations',
      'Flooring only; no wall bases included',
      'Sherwin-Williams Decorative Mosaic Epoxy Coating System  Date of issue: April 10, 2019'],
    cHigh: ['Structural slab not included in LCA calculations',
      'Commercial, high-traffic carpet application',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of latex-based carpet adhesive',
      '1/2" cementitious underlayment'],
    cMedium: ['Structural slab not included in LCA calculations',
      'Commercial, high-traffic carpet application',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of latex-based carpet adhesive',
      '1/2" cementitious underlayment'],
    cLow: ['Structural slab not included in LCA calculations',
      'Commercial, high-traffic carpet application',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of latex-based carpet adhesive',
      '1/2" cementitious underlayment'],
    wEngineered: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      '3/32" Hardwood veneer flooring',
      'Includes galvanized steel fasteners'],
    wBamboo: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      '1/2" Bamboo plank flooring',
      'Flooring only; no wall bases included',
      'Includes galvanized steel fasteners'],
    wCork: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      'Inclusive of latex-based flooring adhesive'],
    wSoftwood: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      '3/4" Domestic softwood solid plank flooring',
      'Inclusive of galvanized steel fasteners'],
    wHardwood: ['Structural slab not included in LCA calculations',
      'Service life of materials set to Tally default',
      'Flooring only; no wall bases included',
      '3/4" White Oak solid plank flooring',
      'Inclusive of galvanized steel fasteners']
  },

  sectionIcons: {
    sGranite: "./img/Flooring_S-Granite.png",
    sSlate: "./img/Flooring_S-Slate.png",
    sCeramic: "./img/Flooring_S-Porcelain.png",
    rRubber: "./img/Flooring_R-Rubber.png",
    rVinyl: "./img/Flooring_R-Vinyl.png",
    rLinoTile: "./img/Flooring_R-Linoleum.png",
    mConcrete: "./img/Flooring_M-Concrete.png",
    mTerrazzo: "./img/Flooring_M-Terrazzo.png",
    mEpoxy: "./img/Flooring_M-Epoxy.png",
    cHigh: "./img/Flooring_C-HighPile.png",
    cMedium: "./img/Flooring_C-MediumPile.png",
    cLow: "./img/Flooring_C-LowPile.png",
    wEngineered: "./img/Flooring_W-Engineered.png",
    wBamboo: "./img/Flooring_W-Bamboo.png",
    wCork: "./img/Flooring_W-Cork.png",
    wSoftwood: "./img/Flooring_W-Softwood.png",
    wHardwood: "./img/Flooring_W-Hardwood.png",
  },

  impactColors: {
    impact1: "#85e2bd",
    impact2: "#fcc05e",
    impact3: "#001489",
    impact4: "#4095ee",
    impact5: "#a2d3eb",
  },

  iColors: {
    i1: "#87cde8",
    i2: "#6d91cb",
    i3: "#fbc05d",
    i4: "#4686c6",
    i5: "#90d0b6",
    i6: "#4154a5"
  },

  //Material Breakdown Colors
  matColors: {
    mat1: "#CCCCCC",
    mat2: "#CCCCCC",
    mat3: "#cccccc",
    mat4: "#cccccc",
    mat5: "#CCCCCC",
    mat6: "#CCCCCC",
    mat7: "#4169e1",
    mat8: "#4169e1",
    mat9: "#4169e1",
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
    mat22: "#85e2bd",
    mat23: "#85e2bd",
    mat24: "#85e2bd",
    mat25: "#85e2bd",
    mat26: "#85e2bd",
    mat27: "#85e2bd",
  },

  materialOrdering: {
    sGranite: 1,
    sSlate: 2,
    sCeramic: 3,
    rRubber: 4,
    rVinyl: 5,
    rLinoTile: 6,
    mConcrete: 7,
    mTerrazzo: 8,
    mEpoxy: 9,
    cHigh: 10,
    cMedium: 11,
    cLow: 12,
    wEngineered: 13,
    wBamboo: 14,
    wCork: 15,
    wSoftwood: 16,
    wHardwood: 17,
  },

  typeOrdering: {
    "Stone / Ceramic": 1,
    "Resilient": 2,
    "Misc.": 3,
    "Carpet": 4,
    "Wood": 5
  },

  materialType: {
    sGranite: "SC - Granite",
    sSlate: "SC - Slate",
    sCeramic: "SC - Porcelain",
    rRubber: "R - Rubber",
    rVinyl: "R - Vinyl",
    rLinoTile: "R - Linoleum",
    mConcrete: "M - Concrete",
    mTerrazzo: "M - Terrazzo",
    mEpoxy: "M - Epoxy",
    cHigh: "C - High Pile",
    cMedium: "C - Med Pile",
    cLow: "C - Low Pile",
    wEngineered: "W - Engineered",
    wBamboo: "W - Bamboo",
    wCork: "W - Cork",
    wSoftwood: "W - Softwood",
    wHardwood: "W - Hardwood",
  },

  materialName: {
    sGranite: "Granite",
    sSlate: "Slate",
    sCeramic: "Porcelain",
    rRubber: "Rubber",
    rVinyl: "Vinyl",
    rLinoTile: "Linoleum",
    mConcrete: "Concrete",
    mTerrazzo: "Terrazzo",
    mEpoxy: "Epoxy",
    cHigh: "High Pile",
    cMedium: "Med Pile",
    cLow: "Low Pile",
    wEngineered: "Engineered",
    wBamboo: "Bamboo",
    wCork: "Cork",
    wSoftwood: "Softwood",
    wHardwood: "Hardwood",
  },

  materialName2: {
    sGranite: "Stone/Ceramic - Granite",
    sSlate: "Stone/Ceramic - Slate",
    sCeramic: "Stone/Ceramic - Porcelain",
    rRubber: "Resilient - Rubber",
    rVinyl: "Resilient - Vinyl",
    rLinoTile: "Resilient - Linoleum",
    mConcrete: "Miscellaneous - Concrete",
    mTerrazzo: "Miscellaneous - Terrazzo",
    mEpoxy: "Miscellaneous - Epoxy",
    cHigh: "Carpet - High Pile",
    cMedium: "Carpet - Med Pile",
    cLow: "Carpet - Low Pile",
    wEngineered: "Wood - Engineered",
    wBamboo: "Wood - Bamboo",
    wCork: "Wood - Cork",
    wSoftwood: "Wood - Softwood",
    wHardwood: "Wood - Hardwood",
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), name: d.name, img: d.img }
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), name: d.name, img: d.img }
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
          var resultData = results.data.map(d => { //impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), 
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
          var resultData = results.data.map(d => { //impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), 
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
              mat26: parseFloat(d.mat26),
              mat27: parseFloat(d.mat27),
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
