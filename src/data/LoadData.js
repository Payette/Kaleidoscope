import Papa from 'papaparse';
import dataGWP from './gwp.csv';
import dataAllImpacts from './allimpacts.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    Wood: '#ff0000',
    Steel: '#ff0000',
    Limestone1: '#ff0000',
    Granite1: '#ff0000',
    Zinc: '#ff0000',
    FiberCement: '#ff0000',
    PhenResin: '#ff0000',
    Terracotta: '#ff0000',
    ACM: '#ff0000',
    GFRC: '#ff0000',
    InsMetPanel: '#ff0000',
    Brick: '#ff0000',
    Limestone: '#ff0000',
    Granite: '#ff0000'
  },

  materialOrdering: {
    Wood: 14,
    Steel: 13,
    Limestone1: 12,
    Granite1: 11,
    Zinc: 10,
    FiberCement: 9,
    PhenResin: 8,
    Terracotta: 7,
    ACM: 6,
    GFRC: 5,
    InsMetPanel: 4,
    Brick: 3,
    Limestone: 2,
    Granite: 1
  },

  typeOrdering: {
    "Masonry Veneer": 1,
    "Face Sealed": 2,
    "Rainscreen": 3
  }
};

export default {
  metaData: metaData,

  allImpactsData: (cb) => {
    Papa.parse(dataAllImpacts, {
      ...PAPAPARSE_CONFIG,
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
         var resultData = results.data.map(d => {
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3) }
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

  gwpData: (cb) => {
    Papa.parse(dataGWP, {
      ...PAPAPARSE_CONFIG,
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
         const resultData = results.data.map(d => {
           return { letter: d.Variable, frequency: parseFloat(d.Attended) }
         });
         cb(resultData);
       } else {
         console.error('error trying to load file', results.errors);
       }
     }
    });
  }
};
