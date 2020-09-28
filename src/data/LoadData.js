import Papa from 'papaparse';

import dataGWP from './gwp_10y_n.csv';
import dataAllImpacts from './allImpact_10y_n.csv';
import dataLCS from './lcs_10y_n.csv';
import dataMaterial from './material_10y_n.csv';

import dataGWP1 from './gwp_10y_y.csv';
import dataAllImpacts1 from './allImpact_10y_y.csv';
import dataLCS1 from './lcs_10y_y.csv';
import dataMaterial1 from './material_10y_y.csv';

import dataGWP2 from './gwp_60y_n.csv';
import dataAllImpacts2 from './allImpact_60y_n.csv';
import dataLCS2 from './lcs_60y_n.csv';
import dataMaterial2 from './material_60y_n.csv';

import dataGWP3 from './gwp_60y_y.csv';
import dataAllImpacts3 from './allImpact_60y_y.csv';
import dataLCS3 from './lcs_60y_y.csv';
import dataMaterial3 from './material_60y_y.csv';

import dataGWP4 from './gwp_60yd_n.csv';
import dataAllImpacts4 from './allImpact_60yd_n.csv';
import dataLCS4 from './lcs_60yd_n.csv';
import dataMaterial4 from './material_60yd_n.csv';

import dataGWP5 from './gwp_60yd_y.csv';
import dataAllImpacts5 from './allImpact_60yd_y.csv';
import dataLCS5 from './lcs_60yd_y.csv';
import dataMaterial5 from './material_60yd_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    Granite:"#fcc05e",
    Limestone:"#efcb97",
    Brick:"#fce7cc",
    InsMetPanel:"#c7e9b7",
    Spandrel:"#85e2bd",
    UHPC:"#c1e9ec",
    GFRC:"#a2d3eb",
    ACM:"#87cee9",
    Terracotta:"#44b3f8",
    PhenResin:"#0090ff",
    FiberCement:"#4095ee",
    Zinc:"#6495ed",
    Granite1:"#4169e1",
    Limestone1:"#283cdc",
    Steel:"#0000cd",
    Wood:"#001489"
  },

  materialTexts: {
    Granite:'4" granite veneer, shelf angle with knife plate connection',
    Limestone:'4" limestone veneer, shelf angle with knife plate connection',
    Brick:"Brick with mortar, shelf angle with knife plate connection",
    InsMetPanel:"Steel foamed insulated metal panel, thermally broken connection",
    Spandrel:"Double glazed IGU with low-e coating and argon fill, aluminum structurally glazed mullions",
    UHPC:"Fibre C ultra high performance concrete panel with thermally broken galvanized steel support",
    GFRC:"Glass fiber reinforced concrete panel with thermally broken galvanized steel support",
    ACM:"Aluminum faced composite panel with thermally broken aluminum support",
    Terracotta:"1'x4' hollow terracotta tile with thermally broken aluminum support",
    PhenResin:"Phenolic resin panels with thermally broken aluminum support",
    FiberCement:"Fiber cement panels with thermally broken aluminum support",
    Zinc:"Fluoro-polymer coated formed zinc metal panels with thermally broken galvanized steel support",
    Granite1:'1/4" granite on aluminum honeycomb backer with thermally broken aluminum support',
    Limestone1:'1/4" limestone on aluminum honeycomb backer with thermally broken aluminum support',
    Steel:"Painted formed steel metal panels with thermally broken galvanized steel support",
    Wood:"Hardwood (beech) rainscreen with water-based wood stain and thermally broken galvanized steel support"
  },

  materialIcons: {
    Granite:"./images/granite.png",
    Limestone:"images/limestone.png",
    Brick:"images/brick.png",
    Spandrel:"images/insmetalpanel.png",
    UHPC:"images/insmetalpanel.png",
    InsMetPanel:"images/insmetalpanel.png",
    GFRC:"images/gfrc.png",
    ACM:"images/acm.png",
    Terracotta:"images/terracotta.png",
    PhenResin:"images/phenresin.png",
    FiberCement:"images/fibercement.png",
    Zinc:"images/zinc.png",
    Granite1:"images/granite1.png",
    Limestone1:"images/limestone1.png",
    Steel:"images/steel.png",
    Wood:"images/wood.png"
  },

  impactColors: {
    impact1:"#85e2bd",
    impact2:"#fcc05e",
    impact3:"#001489",
    impact4:"#4095ee",
    impact5:"#a2d3eb",
  },

  iColors: {
    i1:"#87cde8",
    i2:"#6d91cb",
    i3:"#fbc05d",
    i4:"#4686c6",
    i5:"#90d0b6",
    i6: "#4154a5"
  },

  matColors: {
    mat1:"#cccccc",
    mat2:"#cccccc",
    mat3:"#cccccc",
    mat4:"#cccccc",
    mat5:"#cccccc",
    mat6:"#fcc05e",
    mat7:"#4169e1",
    mat8:"#4169e1",
    mat9:"#4169e1",
    mat10:"#4169e1",
    mat11:"#4169e1",
    mat12:"#85e2bd",
    mat13:"#85e2bd",
    mat14:"#85e2bd",
    mat15:"#85e2bd",
    mat16:"#85e2bd",
    mat17:"#85e2bd",
    mat18:"#85e2bd",
    mat19:"#85e2bd",
    mat20:"#85e2bd",
    mat21:"#85e2bd",
    mat22:"#85e2bd",
    mat23:"#85e2bd",
    mat24:"#85e2bd",
    mat25:"#85e2bd",
    mat26:"#85e2bd",
    mat27:"#85e2bd",
    mat28:"#85e2bd",
    mat29:"#85e2bd",
    mat30:"#85e2bd",
    mat31:"#85e2bd",
    mat32:"#85e2bd",
    mat33:"#85e2bd",
    mat34:"#85e2bd",
    mat35:"#85e2bd",
    mat36:"#85e2bd",
    mat37:"#85e2bd",
  },

  materialOrdering: {
    Wood: 16,
    Steel: 15,
    Limestone1: 14,
    Granite1: 13,
    Zinc: 12,
    Spandrel: 11,
    FiberCement: 10,
    PhenResin: 9,
    Terracotta: 8,
    ACM: 7,
    GFRC: 6,
    UHPC: 5,
    InsMetPanel: 4,
    Brick: 3,
    Limestone: 2,
    Granite: 1
  },

  typeOrdering: {
    "Masonry Veneer": 1,
    "Face Sealed": 2,
    "Curtain Wall": 3,
    "Rainscreen": 4
  },

  materialType:{
    Wood: "RS - Wood",
    Steel: "RS - Steel",
    Limestone1: "RS - Limestone",
    Granite1: "RS - Granite",
    Zinc: "RS - Zinc",
    FiberCement: "RS - Fiber Cement",
    PhenResin: "RS - Phenolic Resin",
    Terracotta: "RS - Terracotta",
    ACM: "RS - ACM",
    GFRC: "RS - GFRC",
    UHPC: "RS - UHPC",
    Spandrel: "CW- Spandrel",
    InsMetPanel: "FS- Insulated Metal",
    Brick: "MV - Brick",
    Limestone: "MV - Limestone",
    Granite: "MV - Granite"
  },

  materialName:{
    Wood: "Wood",
    Steel: "Formed Steel Panel",
    Limestone1: "Limestone",
    Granite1: "Granite",
    Zinc: "Formed Zinc Panel",
    FiberCement: "Fiber Cement",
    PhenResin: "Phoenolic Resin",
    Terracotta: "Terracotta",
    ACM: "Aluminum Composite Material (ACM)",
    GFRC: "Glass Fiber Reinforced Concrete (GFRC)",
    UHPC: "Ultra-Hight Performance Concrete (UHPC)",
    Spandrel: "Spandrel",
    InsMetPanel: "Insulated Metal Panel",
    Brick: "Brick",
    Limestone: "Limestone",
    Granite: "Granite"
  },

  materialImg:{
    Wood: "./img/wood1.png",
    Steel: "./img/steel1.png",
    Limestone1: "./img/limestone1.png",
    Granite1: "./img/granite1.png",
    Zinc: "./img/zinc.png",
    FiberCement: "./img/fibercement.png",
    PhenResin: "./img/phenresin.png",
    Terracotta: "./img/terracotta.png",
    ACM: "./img/acm.png",
    GFRC: "./img/gfrc.png",
    UHPC: "Ultr./img/uhpc.png",
    Spandrel: "./img/spandrel.png",
    InsMetPanel: "./img/insmetalpanel.png",
    Brick: "./img/brick.png",
    Limestone: "./img/limestone.png",
    Granite: "./img/granite.png"
  }
};

export default {
  metaData: metaData,

  gwpData: (cb) => {
    Papa.parse(dataGWP, {
      ...PAPAPARSE_CONFIG,
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
         const resultData = results.data.map(d => {
           return { material: d.material, type: d.type, name: d.name, img: d.img, i1: parseFloat(d.i1), i2: parseFloat(d.i2), i3: parseFloat(d.i3), i4: parseFloat(d.i4), i5: parseFloat(d.i5), i6: parseFloat(d.i6)}
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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

  materialData2: (cb) => {
    Papa.parse(dataMaterial2, {
      ...PAPAPARSE_CONFIG,
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
         var resultData = results.data.map(d => {
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5:parseFloat(d.impact5), name: d.name, img: d.img }
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
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
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
            mat28: parseFloat(d.mat28),
            mat29: parseFloat(d.mat29),
            mat30: parseFloat(d.mat30),
            mat31: parseFloat(d.mat31),
            mat32: parseFloat(d.mat32),
            mat33: parseFloat(d.mat33),
            mat34: parseFloat(d.mat34),
            mat35: parseFloat(d.mat35),
            mat36: parseFloat(d.mat36),
            mat37: parseFloat(d.mat37),
             name: d.name, 
             img: d.img }
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
