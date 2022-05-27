import LoadData from './data/Envelopes_LoadData';
import FlooringLoadData from './data/Flooring_LoadData';
import CeilingsLoadData from './data/Ceilings_LoadData';

export let TAB_INDEX_ENVELOPES = 0;
export let TAB_INDEX_FLOORING = 1;
export let TAB_INDEX_CEILINGS = 2;
export let TAB_INDEX_OTHER = 3;

export let SYSTEM_TYPE_FLOORING = "flooring";
export let SYSTEM_TYPE_CEILINGS = "ceilings";
export let SYSTEM_TYPE_ENVELOPES = "envelopes";

export let CHART_TYPES_ENVELOPES = ["GWP","allImpacts","LCS","MB"]; // does not have material health
export let CHART_TYPES_FLOORING = ["GWP","allImpacts","LCS","MB","MH"];
export let CHART_TYPES_CEILINGS = ["GWP","allImpacts","LCS","MB","MH"];

export let DATASET_NAMES = [
'allImpactsData',
'gwpData',
'lcsData',
'materialData',
'allImpactsData1',
'gwpData1',
'lcsData1',
'materialData1',
'allImpactsData2',
'gwpData2',
'lcsData2',
'materialData2',
'allImpactsData3',
'gwpData3',
'lcsData3',
'materialData3',
'allImpactsData4',
'gwpData4',
'lcsData4',
'materialData4',
'allImpactsData5',
'gwpData5',
'lcsData5',
'materialData5',
];

export let materialListEnvelope = Object.keys(LoadData.metaData.materialType).map(variableName => {
  return { value: variableName, label: LoadData.metaData.materialType[variableName] };
});

export let materialListFlooring = Object.keys(FlooringLoadData.metaData.materialType).map(variableName => {
  return { value: variableName, label: FlooringLoadData.metaData.materialType[variableName] };
});

export let materialListCeilings = Object.keys(CeilingsLoadData.metaData.materialType).map(variableName => {
  return { value: variableName, label: CeilingsLoadData.metaData.materialType[variableName] };
});