import Papa from 'papaparse';
import dataGWP from './gwp.csv';
import dataAllImpacts from './allimpacts.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

export default {
  allImpactsData: (cb) => {
    Papa.parse(dataAllImpacts, {
      ...PAPAPARSE_CONFIG,
      complete: function(results, file) {
       if(Array.isArray(results.data)) {
         const allImpactsData = results.data.map(d => {
           return { letter: d.Variable, frequency: parseFloat(d.Attended) }
         });
         cb(allImpactsData);
       } else {
         console.error('error trying to load file', results.errors);
       }
     }
    });
  }
};
