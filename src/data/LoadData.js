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

  matColors: {
    mat1:"#f99f2d",
    mat2:"#febd2a",
    mat3:"#ffd743",
    mat4:"#ffd743",
    mat5:"#ffd743",
    mat6:"#ffd743",
    mat7:"#ffd743",
    mat8:"#ffd743",
    mat9:"#ffd743",
    mat10:"#ffd743",
    mat11:"#ffd743",
    mat12:"#ffd743",
    mat13:"#ffd743",
    mat14:"#ffd743",
    mat15:"#ffd743",
    mat16:"#ffd743",
    mat17:"#ffd743",
    mat18:"#ffd743",
    mat19:"#ffd743",
    mat20:"#ffd743",
    mat21:"#ffd743",
    mat22:"#ffd743",
    mat23:"#ffd743",
    mat24:"#ffd743",
    mat25:"#ffd743",
    mat26:"#ffd743",
    mat27:"#ffd743",
    mat28:"#ffd743",
    mat29:"#ffd743",
    mat30:"#ffd743",
    mat31:"#ffd743",
    mat32:"#ffd743",
    mat33:"#ffd743",
    mat34:"#ffd743",
    mat35:"#ffd743",
    mat36:"#ffd743",
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
    PhenResin: "RS - Phoenolic Resin",
    Terracotta: "RS - Terracotta",
    ACM: "RS - ACM",
    GFRC: "RS - GFRC",
    UHPC: "RS - UHPC",
    Spandrel: "CW- Spandrel",
    InsMetPanel: "FS- Insulated Metal",
    Brick: "MV - Brick",
    Limestone: "MV - Limestone",
    Granite: "MV - Granite"
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
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
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), name: d.name, img: d.img }
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
