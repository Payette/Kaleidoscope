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

export let materialListEnvelope = [
    { value: "MVGranite", label: "MV - Granite" },
    { value: "MVLimestone", label: "MV - Limestone" },
    { value: "MVBrick", label: "MV - Brick" },
    { value: "MVTBrick", label: "MV - Thin Brick" },
    { value: "MInsMePanel", label: "M - Insulated Metal Panel" },
    { value: "MEIFS", label: "M - EIFS (XPS)" },
    { value: "MPrecast", label: "M - Precast Concrete" },
    { value: "MMinWool", label: "M - EIFS (Min Wool)" },
    { value: "CSpandrelAlumB", label: "CW - Spandrel (Alum w/ Backpan)" },
    { value: "CSpandrelSteel", label: "CW - Spandrel (Steel)" },
    { value: "CSpandrelAlum", label: "CW - Spandrel (Alum)" },
    { value: "CSpandrelWood", label: "CW - Spandrel (Wood)" },
    { value: "RGFRC", label: "RS - GFRC" },
    { value: "RACM", label: "RS - ACM" },
    { value: "RTerracotta", label: "RS - Terracotta" },
    { value: "RPhenResin", label: "RS - Phenolic Resin" },
    { value: "RFiberCement", label: "RS - Fiber Cement" },
    { value: "RZinc", label: "RS - Formed Zinc Panel" },
    { value: "RUHPC", label: "RS - UHPC (fibreC)" },
    { value: "RGranite", label: "RS - Granite" },
    { value: "RTBrick", label: "RS - Thin Brick" },
    { value: "RLimestone", label: "RS - Limestone" },
    { value: "RSteel", label: "RS - Formed Steel Panel" },
    { value: "RWood", label: "RS - Wood" }
  ];
  
export let materialListFlooring = [
    { value: "sGranite", label: "S - Granite" },
    { value: "sSlate", label: "S - Slate" },
    { value: "sCeramic", label: "S - Porcelain" },
    { value: "rRubber", label: "R - Rubber" },
    { value: "rVinyl", label: "R - Vinyl" },
    { value: "rLinoTile", label: "R - Linoleum Tile" },
    { value: "mConcrete", label: "M - Concrete" },
    { value: "mTerrazzo", label: "M - Terrazzo" },
    { value: "mSealedC", label: "M - Sealed Concrete" },
    { value: "mEpoxy", label: "M - Epoxy" },
    { value: "cHigh", label: "C - High Pile" },
    { value: "cMedium", label: "C - Medium Pile" },
    { value: "cLow", label: "C - Low Pile" },
    { value: "wEngineered", label: "W - Engineered" },
    { value: "wBamboo", label: "W - Bamboo" },
    { value: "wCork", label: "W - Cork" },
    { value: "wSoftwood", label: "W - Softwood Plank" },
    { value: "wHardwood", label: "W - Hardwood Plank" }
  ];