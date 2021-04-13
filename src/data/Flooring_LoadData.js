import Papa from 'papaparse';

// import dataHealth from './flooring_healthymats_10y_y.csv';
import dataGWP from './flooring_gwp_10y_y.csv';
import dataAllImpacts from './flooring_allImpact_10y_y.csv';
import dataLCS from './flooring_lcs_10y_y.csv';
import dataMaterial from './flooring_material_10y_y.csv';

// import dataHealth1 from './flooring_healthymats_10y_y.csv';
import dataGWP1 from './flooring_gwp_10y_y.csv';
import dataAllImpacts1 from './flooring_allImpact_10y_y.csv';
import dataLCS1 from './flooring_lcs_10y_y.csv';
import dataMaterial1 from './flooring_material_10y_y.csv';

// import dataHealth2 from './flooring_healthymats_10y_y.csv';
import dataGWP2 from './flooring_gwp_10y_y.csv';
import dataAllImpacts2 from './flooring_allImpact_10y_y.csv';
import dataLCS2 from './flooring_lcs_10y_y.csv';
import dataMaterial2 from './flooring_material_10y_y.csv';

// import dataHealth3 from './flooring_healthymats_10y_y.csv';
import dataGWP3 from './flooring_gwp_60y_y.csv';
import dataAllImpacts3 from './flooring_allImpact_60y_y.csv';
import dataLCS3 from './flooring_lcs_60y_y.csv';
import dataMaterial3 from './flooring_material_60y_y.csv';

// import dataHealth4 from './flooring_healthymats_10y_y.csv';
import dataGWP4 from './flooring_gwp_10y_y.csv';
import dataAllImpacts4 from './flooring_allImpact_10y_y.csv';
import dataLCS4 from './flooring_lcs_10y_y.csv';
import dataMaterial4 from './flooring_material_10y_y.csv';

// import dataHealth5 from './flooring_healthymats_10y_y.csv';
import dataGWP5 from './flooring_gwp_10y_y.csv';
import dataAllImpacts5 from './flooring_allImpact_10y_y.csv';
import dataLCS5 from './flooring_lcs_10y_y.csv';
import dataMaterial5 from './flooring_material_10y_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    sGranite:"#d15476",
    sSlate:"#e6a7bb",
    sCeramic:"#eec8d5",
    rRubber:"#f3c36f",
    rVinyl:"#f2cd9e",
    rLinoTile:"#f9e6c4",
    mConcrete:"#b2edb0",
    mTerrazzo:"#d2f6d2",
    mSealedC:"#e0f8e1",
    mEpoxy:"#eafbea",
    cHigh:"#9ce0bf",
    cMedium:"#c1ecd6",
    cLow:"#daf5e7",
    wEngineered:"#e0eaf5",
    wBamboo:"#a4c1e3",
    wCork:"#a3c1e2",
    wSoftwood:"#4f71be",
    wHardwood:"#0b00c4"
  },


  //green = 00AE5E
  //light green = 97CD78
  //yellow = FEBE10
  //red = D51C29

  materialHealth: {
    sGranite:"#97CD78",
    sSlate:"#97CD78",
    sCeramic:"#97CD78",
    rRubber:"#97CD78",
    rVinyl:"#D51C29",
    rLinoTile:"#97CD78",
    mConcrete:"#00AE5E",
    mTerrazzo:"#00AE5E",
    mSealedC:"#00AE5E",
    mEpoxy:"#D51C29",
    cHigh:"#97CD78",
    cMedium:"#97CD78",
    cLow:"#97CD78",
    wEngineered:"#00AE5E",
    wBamboo:"#00AE5E",
    wCork:"#00AE5E",
    wSoftwood:"#00AE5E",
    wHardwood:"#00AE5E"
  },

  materialTexts: {
    sGranite:"hello #d15476",
    sSlate:"hi #e6a7bb",
    sCeramic:"#eec8d5",
    rRubber:"#f3c36f",
    rVinyl:"#f2cd9e",
    rLinoTile:"#f9e6c4",
    mConcrete:"#b2edb0",
    mTerrazzo:"#d2f6d2",
    mSealedC:"#e0f8e1",
    mEpoxy:"#eafbea",
    cHigh:"#9ce0bf",
    cMedium:"#c1ecd6",
    cLow:"#daf5e7",
    wEngineered:"#e0eaf5",
    wBamboo:"#a4c1e3",
    wCork:"#a3c1e2",
    wSoftwood:"#4f71be",
    wHardwood:"goodbye 0b00c4"
  },

  materialNotes:{
    sGranite:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    sSlate:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    sCeramic:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    rRubber:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    rVinyl:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    rLinoTile:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    mConcrete:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    mTerrazzo:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    mSealedC:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    mEpoxy:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    cHigh:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    cMedium:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    cLow:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    wEngineered:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    wBamboo:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    wCork:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    wSoftwood:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher'],
    wHardwood:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials default of 60 years or higher']
  },

  materialIcons: { 
    sGranite:"./images/granite.png",
  sSlate:"./images/granite.png",
  sCeramic:"./images/granite.png",
  rRubber:"./images/granite.png",
  rVinyl:"./images/granite.png",
  rLinoTile:"./images/granite.png",
  mConcrete:"./images/granite.png",
  mTerrazzo:"./images/granite.png",
  mSealedC:"./images/granite.png",
  mEpoxy:"./images/granite.png",
  cHigh:"./images/granite.png",
  cMedium:"./images/granite.png",
  cLow:"./images/granite.png",
  wEngineered:"./images/granite.png",
  wBamboo:"./images/granite.png",
  wCork:"./images/granite.png",
  wSoftwood:"./images/granite.png",
  wHardwood:"./images/granite.png"
  },

  pieIcons: {
    sGranite:"./images/MV-Granite-Pie.png",
    sSlate:"./images/MV-Granite-Pie.png",
    sCeramic:"./images/MV-Granite-Pie.png",
    rRubber:"./images/MV-Granite-Pie.png",
    rVinyl:"./images/MV-Granite-Pie.png",
    rLinoTile:"./images/MV-Granite-Pie.png",
    mConcrete:"./images/MV-Granite-Pie.png",
    mTerrazzo:"./images/MV-Granite-Pie.png",
    mSealedC:"./images/MV-Granite-Pie.png",
    mEpoxy:"./images/MV-Granite-Pie.png",
    cHigh:"./images/MV-Granite-Pie.png",
    cMedium:"./images/MV-Granite-Pie.png",
    cLow:"./images/MV-Granite-Pie.png",
    wEngineered:"./images/MV-Granite-Pie.png",
    wBamboo:"./images/MV-Granite-Pie.png",
    wCork:"./images/MV-Granite-Pie.png",
    wSoftwood:"./images/MV-Granite-Pie.png",
    wHardwood:"./images/MV-Granite-Pie.png"
  },

  sectionIcons: {
    sGranite:"./img/Wall Section Drawings_01_MV_Granite.png",
    sSlate:"./img/Wall Section Drawings_01_MV_Granite.png",
    sCeramic:"./img/Wall Section Drawings_01_MV_Granite.png",
    rRubber:"./img/Wall Section Drawings_01_MV_Granite.png",
    rVinyl:"./img/Wall Section Drawings_01_MV_Granite.png",
    rLinoTile:"./img/Wall Section Drawings_01_MV_Granite.png",
    mConcrete:"./img/Wall Section Drawings_01_MV_Granite.png",
    mTerrazzo:"./img/Wall Section Drawings_01_MV_Granite.png",
    mSealedC:"./img/Wall Section Drawings_01_MV_Granite.png",
    mEpoxy:"./img/Wall Section Drawings_01_MV_Granite.png",
    cHigh:"./img/Wall Section Drawings_01_MV_Granite.png",
    cMedium:"./img/Wall Section Drawings_01_MV_Granite.png",
    cLow:"./img/Wall Section Drawings_01_MV_Granite.png",
    wEngineered:"./img/Wall Section Drawings_01_MV_Granite.png",
    wBamboo:"./img/Wall Section Drawings_01_MV_Granite.png",
    wCork:"./img/Wall Section Drawings_01_MV_Granite.png",
    wSoftwood:"./img/Wall Section Drawings_01_MV_Granite.png",
    wHardwood:"./img/Wall Section Drawings_01_MV_Granite.png",
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
    mat1:"#666666",
    mat2:"#999999",
    mat3:"#cccccc",
    mat4:"#cccccc",
    mat5:"#b3b3b3",
    mat6:"#b3b3b3",
    mat7:"#0090ff",
    mat8:"#0090ff",
    mat9:"#0090ff",
    mat10:"#85e2bd",
    mat11:"#85e2bd",
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
    mat27:"#c7e9b7",
    mat28:"#c7e9b7",
  },

  materialOrdering: {
    sGranite:1,
    sSlate:2,
    sCeramic:3,
    rRubber:4,
    rVinyl:5,
    rLinoTile:6,
    mConcrete:7,
    mTerrazzo:8,
    mSealedC:9,
    mEpoxy:10,
    cHigh:11,
    cMedium:12,
    cLow:13,
    wEngineered:14,
    wBamboo:15,
    wCork:16,
    wSoftwood:17,
    wHardwood:18,
  },

  typeOrdering: {
    "Stone / Ceramic": 1,
    "Resilient": 2,
    "Misc.": 3,
    "Carpet": 4,
    "Wood": 5
  },

  materialType:{
    sGranite:"SC - Granite",
    sSlate:"SC - Slate",
    sCeramic:"SC - Ceramic",
    rRubber:"R - Rubber",
    rVinyl:"R - Vinyl",
    rLinoTile:"R - Linoleum",
    mConcrete:"M - Concrete",
    mTerrazzo:"M - Terrazzo",
    mSealedC:"M - Sealed",
    mEpoxy:"M - Epoxy",
    cHigh:"C - High Pile",
    cMedium:"C - Med Pile",
    cLow:"C - Low Pile",
    wEngineered:"W - Engineered",
    wBamboo:"W - Bamboo",
    wCork:"W - Cork",
    wSoftwood:"W - Softwood",
    wHardwood:"W - Hardwood",
  },

  materialName:{
    sGranite:"Granite",
    sSlate:"Slate",
    sCeramic:"Ceramic",
    rRubber:"Rubber",
    rVinyl:"Vinyl",
    rLinoTile:"Linoleum",
    mConcrete:"Concrete",
    mTerrazzo:"Terrazzo",
    mSealedC:"Sealed",
    mEpoxy:"Epoxy",
    cHigh:"High Pile",
    cMedium:"Med Pile",
    cLow:"Low Pile",
    wEngineered:"Engineered",
    wBamboo:"Bamboo",
    wCork:"Cork",
    wSoftwood:"Softwood",
    wHardwood:"Hardwood",
  },

  materialName2:{
    sGranite:"Stone/Ceramic - Granite",
    sSlate:"Stone/Ceramic - Slate",
    sCeramic:"Stone/Ceramic - Ceramic",
    rRubber:"Resilient - Rubber",
    rVinyl:"Resilient - Vinyl",
    rLinoTile:"Resilient - Linoleum",
    mConcrete:"Miscellaneous - Concrete",
    mTerrazzo:"Miscellaneous - Terrazzo",
    mSealedC:"Miscellaneous - Sealed",
    mEpoxy:"Miscellaneous - Epoxy",
    cHigh:"Carpet - High Pile",
    cMedium:"Carpet - Med Pile",
    cLow:"Carpet - Low Pile",
    wEngineered:"Wood - Engineered",
    wBamboo:"Wood - Bamboo",
    wCork:"Wood - Cork",
    wSoftwood:"Wood - Softwood",
    wHardwood:"Wood - Hardwood",
  },

  materialImg:{
    sGranite:"./img/RS_wood.png",
    sSlate:"./img/RS_wood.png",
    sCeramic:"./img/RS_wood.png",
    rRubber:"./img/RS_wood.png",
    rVinyl:"./img/RS_wood.png",
    rLinoTile:"./img/RS_wood.png",
    mConcrete:"./img/RS_wood.png",
    mTerrazzo:"./img/RS_wood.png",
    mSealedC:"./img/RS_wood.png",
    mEpoxy:"./img/RS_wood.png",
    cHigh:"./img/RS_wood.png",
    cMedium:"./img/RS_wood.png",
    cLow:"./img/RS_wood.png",
    wEngineered:"./img/RS_wood.png",
    wBamboo:"./img/RS_wood.png",
    wCork:"./img/RS_wood.png",
    wSoftwood:"./img/RS_wood.png",
    wHardwood:"./img/RS_wood.png",
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

  // healthyMatsData: (cb) => {
  //   Papa.parse(dataHealth, {
  //     ...PAPAPARSE_CONFIG,
  //     complete: function(results, file) {
  //      if(Array.isArray(results.data)) {
  //        const resultData = results.data.map(d => {
  //          return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
  //        });
  //        cb(resultData);
  //      } else {
  //        console.error('error trying to load file', results.errors);
  //      }
  //    }
  //   });
  // },

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

  // healthyMatsData1: (cb) => {
  //   Papa.parse(dataHealth1, {
  //     ...PAPAPARSE_CONFIG,
  //     complete: function(results, file) {
  //      if(Array.isArray(results.data)) {
  //        const resultData = results.data.map(d => {
  //          return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
  //        });
  //        cb(resultData);
  //      } else {
  //        console.error('error trying to load file', results.errors);
  //      }
  //    }
  //   });
  // },

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

  // healthyMatsData2: (cb) => {
  //   Papa.parse(dataHealth2, {
  //     ...PAPAPARSE_CONFIG,
  //     complete: function(results, file) {
  //      if(Array.isArray(results.data)) {
  //        const resultData = results.data.map(d => {
  //          return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
  //        });
  //        cb(resultData);
  //      } else {
  //        console.error('error trying to load file', results.errors);
  //      }
  //    }
  //   });
  // },

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
         var resultData = results.data.map(d => { // impact4: parseFloat(d.impact4), 
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3),name: d.name, img: d.img }
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

  // healthyMatsData3: (cb) => {
  //   Papa.parse(dataHealth3, {
  //     ...PAPAPARSE_CONFIG,
  //     complete: function(results, file) {
  //      if(Array.isArray(results.data)) {
  //        const resultData = results.data.map(d => {
  //          return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
  //        });
  //        cb(resultData);
  //      } else {
  //        console.error('error trying to load file', results.errors);
  //      }
  //    }
  //   });
  // },

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
         var resultData = results.data.map(d => { // impact4: parseFloat(d.impact4), 
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), name: d.name, img: d.img }
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

  // healthyMatsData4: (cb) => {
  //   Papa.parse(dataHealth4, {
  //     ...PAPAPARSE_CONFIG,
  //     complete: function(results, file) {
  //      if(Array.isArray(results.data)) {
  //        const resultData = results.data.map(d => {
  //          return { material: d.material, type: d.type, value: parseFloat(d.value), name: d.name, img: d.img }
  //        });
  //        cb(resultData);
  //      } else {
  //        console.error('error trying to load file', results.errors);
  //      }
  //    }
  //   });
  // },

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
         var resultData = results.data.map(d => { //impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), 
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), name: d.name, img: d.img }
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
         var resultData = results.data.map(d => { //impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), 
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), name: d.name, img: d.img }
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
