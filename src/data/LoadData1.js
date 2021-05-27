import Papa from 'papaparse';

import dataGWP from './gwp_10y_n-1.csv';
import dataAllImpacts from './allImpact_10y_n-1.csv';
import dataLCS from './lcs_10y_n-1.csv';
import dataMaterial from './material_10y_n-1.csv';

import dataGWP1 from './gwp_10y_y-1.csv';
import dataAllImpacts1 from './allImpact_10y_y-1.csv';
import dataLCS1 from './lcs_10y_y-1.csv';
import dataMaterial1 from './material_10y_y-1.csv';

import dataGWP2 from './gwp_60y_n-1.csv';
import dataAllImpacts2 from './allImpact_60y_n-1.csv';
import dataLCS2 from './lcs_60y_n-1.csv';
import dataMaterial2 from './material_60y_n-1.csv';

import dataGWP3 from './gwp_60y_y-1.csv';
import dataAllImpacts3 from './allImpact_60y_y-1.csv';
import dataLCS3 from './lcs_60y_y-1.csv';
import dataMaterial3 from './material_60y_y-1.csv';

import dataGWP4 from './gwp_60yd_n-1.csv';
import dataAllImpacts4 from './allImpact_60yd_n-1.csv';
import dataLCS4 from './lcs_60yd_n-1.csv';
import dataMaterial4 from './material_60yd_n-1.csv';

import dataGWP5 from './gwp_60yd_y-1.csv';
import dataAllImpacts5 from './allImpact_60yd_y-1.csv';
import dataLCS5 from './lcs_60yd_y-1.csv';
import dataMaterial5 from './material_60yd_y-1.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    MVGranite:"#FCC05E",
MVLimestone:"#F9CB97",
MVBrick:"#FEE6BF",
MVTBrick:"#FEF2DF",
MInsMePanel:"#8EE05F",
MEIFS:"#ADE589",
MPrecast:"#C2EAA7",
MMinWool:"#DBF2CC",
CSpandrelAlumB:"#89EFC0",
CSpandrelSteel:"#A1F2CD",
CSpandrelAlum:"#B8F5D9",
CSpandrelWood:"#D0F9E6",
RGFRC:"#C1E9EC",
RACM:"#A2D3EB",
RTerracotta:"#87CEE9",
RPhenResin:"#8FD1FB",
RFiberCement:"#66BCFF",
RZinc:"#00AAFF",
RUHPC:"#4497EA",
RGranite:"#6495ED",
RTBrick:"#4169E1",
RLimestone:"#283CDC",
RSteel:"#0000CD",
RWood:"#001489"
  },

  materialTexts: {
    MVGranite:'4" granite veneer, shelf angle with knife plate connection, continuous mineral wool insulation',
MVLimestone:'4" limestone veneer, shelf angle with knife plate connection, continuous mineral wool insulation',
MVBrick:"Brick with mortar, shelf angle with knife plate connection, continuous mineral wool insulation",
MVTBrick:"Thin set thin brick with mortar, on cement board backer, continuous mineral wool insulation",
MInsMePanel:"Steel foamed insulated metal panel, thermally broken connection",
MEIFS:"Exterior insulation and finish system (EIFS) with XPS insulation core and synthetic stucco",
MPrecast:"Precast concrete panel with spray foam insulation with HFO blowing agent",
MMinWool:"Exterior insulation and finish system (EIFS) with mineral wool insulation core and synthetic stucco",
CSpandrelAlumB:"Double glazed IGU with low-e coating and argon fill, aluminum structurally glazed mullions, mineral wool insulation and PUR board blocking, backpan finish",
CSpandrelSteel:"Double glazed IGU with low-e coating and argon fill, steel structurally glazed mullions, mineral wool insulation",
CSpandrelAlum:"Double glazed IGU with low-e coating and argon fill, aluminum structurally glazed mullions, mineral wool insulation",
CSpandrelWood:"Double glazed IGU with low-e coating and argon fill, glulam timber structurally glazed mullions, mineral wool insulation",
RGFRC:"Glass fiber reinforced concrete panel with thermally broken galvanized steel support, continuous mineral wool insulation",
RACM:"Aluminum faced composite panel with thermally broken aluminum support, continuous mineral wool insulation",
RTerracotta:"1'x4' hollow terracotta tile with thermally broken aluminum support, continuous mineral wool insulation",
RPhenResin:"Phenolic resin panels with thermally broken aluminum support, continuous mineral wool insulation",
RFiberCement:"Fiber cement panels with thermally broken aluminum support, continuous mineral wool insulation",
RZinc:"Fluoro-polymer coated formed zinc metal panels with thermally broken galvanized steel support, continuous mineral wool insulation",
RUHPC:"Fibre C ultra high performance concrete panel with thermally broken galvanized steel support, continuous mineral wool insulation",
RGranite:'1/4" granite on aluminum honeycomb backer with thermally broken aluminum support, continuous mineral wool insulation',
RTBrick:"Modular panel system thin brick with mortar, on galvanized steel panel, continuous mineral wool insulation",
RLimestone:'1/4" limestone on aluminum honeycomb backer with thermally broken aluminum support, continuous mineral wool insulation',
RSteel:"Painted formed steel metal panels with thermally broken galvanized steel support, continuous mineral wool insulation",
RWood:"Hardwood (Tulipwood/ Poplar) rainscreen with water-based wood stain and thermally broken galvanized steel support, continuous mineral wool insulation"
  },

  materialNotes:{
    MVGranite:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      'Section includes steel shelf angle with knife plate connection for thermal performance',
      '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      'Service life of exterior materials Tally default of 60 years or higher'],
    MVLimestone:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials Tally default of 60 years or higher'],
    MVBrick:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    'Section includes steel shelf angle with knife plate connection for thermal performance',
    '4" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials Tally default of 60 years or higher'],
    MVTBrick:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '3.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
    'Service life of exterior materials Tally default of 60 years or higher'],
    MInsMePanel:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '24-gauge steel insulated metal panel',
      '2" polyurethane foam insulation thickness set to reach system R-value 15.625',
      'Service life of exterior materials Tally default and adjusted to 40 years'],
      MEIFS:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      'Latex/acrylic based stucco on fiberglass reinforcement mesh',
      '2.5" XPS insulation thickness set to reach system R-value 15.625',
      'Service life of exterior materials Tally default of 60 years or higher'],
      MPrecast:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      'Gravity load structural haunch included',
      '2.5" closed cell spray polyurethane foam insulation with HFO blowing agent, thickness set to reach system R-value 15.625',
      'Service life of exterior materials Tally default of 60 years or higher'],
      MMinWool:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      'Latex/acrylic based stucco on fiberglass reinforcement mesh',
      '3.5" mineral wool insulation thickness set to reach system R-value 15.625',
      'Service life of exterior materials Tally default of 60 years or higher'],
    CSpandrelAlumB:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    "5in mineral wool insulation thickness and PUR board blocking set to reach system R-value 15.625 for 4'x7' panel",
    'Structurally glazed curtain wall system',
    '1/8" painted aluminum metal backpan instead of stud fit out',
      'Service life of exterior glazing system default of 40 years, aluminum mullions default of 60 years'],
      CSpandrelSteel:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      "5in mineral wool insulation thickness and PUR board blocking set to reach system R-value 15.625 for 4'x7' panel",
      'Structurally glazed curtain wall system',
      '5" long T shape steel mullion',
      'Service life of exterior materials Tally default of 60 years or higher'],
      CSpandrelAlum: ['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      "5in mineral wool insulation thickness and PUR board blocking set to reach system R-value 15.625 for 4'x7' panel",
      'Structurally glazed curtain wall system',
      'Service life of exterior materials Tally default of 60 years or higher'],
      CSpandrelWood:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      "5in mineral wool insulation thickness and PUR board blocking set to reach system R-value 15.625 for 4'x7' panel",
      'Structurally glazed curtain wall system',
      '3 1/8" x 10 3/4" glulam mullion size',
      'Service life of exterior materials Tally default of 60 years or higher'],
    RGFRC:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '4.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      '19 mm thick GFRC panels',
      'Service life of exterior materials Tally default or adjusted to 60 years or higher'],
    RACM:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      '4 mm Aluminum facings bonded to thermoplastic core',
      'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
    RTerracotta:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      "1' x 4' hollow terracotta tile",
      'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
    RPhenResin:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '4.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      '10 mm phenolic resin panel, exposed fasteners',
      'Service life of exterior materials Tally default or adjusted to 50 years'],
    RFiberCement:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    '4.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    '5/16" fiber cement panels, exposed fasteners',
    'Service life of exterior materials Tally default or adjusted to 50 years'],
    RZinc:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '3.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      'prePATINA blue/graphite grey titanium zinc sheets by Rheinzink GmbH & Co. KG. with fluoropolymer coating',
      'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
      RUHPC:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '4.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      '13 mm thick FibreC by Rieder GFRC Panels',
      'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
    RGranite:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      '1/4" granite on 3/4" aluminum honeycomb backer board',
      'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
      RTBrick:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '3.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      'Service life of exterior materials Tally default of 60 years or higher'],
    RLimestone:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    '5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    '1/4" Indiana limestone on 3/4" aluminum honeycomb backer board',
    'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
    RSteel:['Building structure not included in LCA calculations',
    'Opaque wall only; fenestrations not included',
    '3.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
    'Fiberglass mat gypsum sheathing',
    'Painted steel sheet panel',
    'Service life of exterior materials Tally default or adjusted to 60 years or higher' ],
    RWood:['Building structure not included in LCA calculations',
      'Opaque wall only; fenestrations not included',
      '3.5" continuous mineral wool insulation thickness set to reach system R-value 15.625',
      'Fiberglass mat gypsum sheathing',
      'Hardwood 1"x6" Tulipwood/Poplar lumber with water based wood stain',
      'When biogenic carbon selected, the GWP values for wood are a negative credit',
      'Service life of exterior materials Tally default or adjusted to 50 years, exterior paint service life of 10 years']
  },

  materialIcons: {
    MVGranite:"./images/granite.png",
MVLimestone:"images/limestone.png",
MVBrick:"images/brick.png",
MVTBrick:"images/insmetalpanel.png",
MInsMePanel:"images/insmetalpanel.png",
MEIFS:"images/insmetalpanel.png",
MPrecast:"images/insmetalpanel.png",
MMinWool:"images/insmetalpanel.png",
CSpandrelAlumB:"images/insmetalpanel.png",
CSpandrelSteel:"images/insmetalpanel.png",
CSpandrelAlum:"images/insmetalpanel.png",
CSpandrelWood:"images/insmetalpanel.png",
RGFRC:"images/gfrc.png",
RACM:"images/acm.png",
RTerracotta:"images/terracotta.png",
RPhenResin:"images/phenresin.png",
RFiberCement:"images/fibercement.png",
RZinc:"images/zinc.png",
RUHPC:"images/insmetalpanel.png",
RGranite:"images/granite1.png",
RTBrick:"images/limestone1.png",
RLimestone:"images/limestone1.png",
RSteel:"images/steel.png",
RWood:"images/wood.png",
  },

  pieIcons: {
    MVGranite:"./images/MV-Granite-Pie.png",
    MVLimestone:"images/MV-Limestone-Pie.png",
    MVBrick:"images/MV-Brick-Pie.png",
    MVTBrick:"images/MV-Brick-Pie.png",
    InsMetPanel:"images/FS-Metal-Pie.png",
    MEIFS:"images/CW-Spandrel-Pie.png",
    MPrecast:"images/CW-Spandrel-Pie.png",
    MMinWool:"images/CW-Spandrel-Pie.png",
    CSpandrelAlumB:"images/CW-Spandrel-Pie.png",
    CSpandrelSteel:"images/CW-Spandrel-Pie.png",
    CSpandrelAlum:"images/CW-Spandrel-Pie.png",
    CSpandrelWood:"images/CW-Spandrel-Pie.png",
    RGFRC:"images/RS-GFRC-Pie.png",
    RACM:"images/RS-ACM-Pie.png",
    RTerracotta:"images/RS-Terracotta-Pie.png",
    RPhenResin:"images/RS-Resin-Pie.png",
    RFiberCement:"images/RS-FiberCement-Pie.png",
    RZinc:"images/RS-Zinc-Pie.png",
    RUHPC:"images/RS-UHPC-Pie.png",
    RGranite:"images/RS-Granite-Pie.png",
    RTBrick:"images/RS-Granite-Pie.png",
    RLimestone:"images/RS-Limestone-Pie.png",
    RSteel:"images/RS-Steel-Pie.png",
    RWood:"images/RS-Wood-Pie.png"
  },

  sectionIcons: {
    MVGranite:"./img/Wall Section Drawings_01_MV_Granite.png",
    MVLimestone:"img/Wall Section Drawings_02_MV_Limestone.png",
    MVBrick:"img/Wall Section Drawings_03_MV_Brick.png",
    MVTBrick:"img/Wall Section Drawings__04_MV_TBrick.png",
    MInsMePanel:"img/Wall Section Drawings__01_MISC_Metal Panel.png",
    MEIFS:"img/Wall Section Drawings__02_MISC_EFIS.png",
    MPrecast:"img/Wall Section Drawings__03_MISC_Precast.png",
    MMinWool:"img/Wall Section Drawings__04_MISC_MinWool.png",
    CSpandrelAlumB:"img/Wall Section Drawings__01_CW_SpandrelAB.png",
    CSpandrelSteel:"img/Wall Section Drawings__02_CW_SpandrelS.png",
    CSpandrelAlum:"img/Wall Section Drawings__03_CW_SpandrelA.png",
    CSpandrelWood:"img/Wall Section Drawings__04_CW_SpandrelW.png",
    RGFRC:"img/Wall Section Drawings_02_RS_GFRC.png",
    RACM:"img/Wall Section Drawings_03_RS_ACM.png",
    RTerracotta:"img/Wall Section Drawings__04_RS_Terracotta.png",
    RPhenResin:"img/Wall Section Drawings__05_RS_Phenolic Resin.png",
    RFiberCement:"img/Wall Section Drawings__06_RS_Fiber Cement.png",
    RZinc:"img/Wall Section Drawings__07_RS_Zinc.png",
    RUHPC:"images/Wall Section Drawings_01_RS_UHPC.png",
    RGranite:"img/Wall Section Drawings__08_RS_Granite.png",
    RTBrick:"img/Wall Section Drawings__12_RS_ThinBrick.png",
    RLimestone:"img/Wall Section Drawings__09_RS_Limestone.png",
    RSteel:"img/Wall Section Drawings__10_RS_Steel.png",
    RWood:"img/Wall Section Drawings__11_RS_Wood.png"
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
    mat6:"#cccccc",
    mat7:"#cccccc",
    mat8:"#f3c26e",
    mat9:"#f3c26e",
    mat10:"#f3c26e",
    mat11:"#f3c26e",
    mat12:"#4a68d9",
    mat13:"#4a68d9",
    mat14:"#4a68d9",
    mat15:"#4a68d9",
    mat16:"#4a68d9",
    mat17:"#9be0bf",
    mat18:"#9be0bf",
    mat19:"#9be0bf",
    mat20:"#9be0bf",
    mat21:"#9be0bf",
    mat22:"#9be0bf",
    mat23:"#9be0bf",
    mat24:"#9be0bf",
    mat25:"#9be0bf",
    mat26:"#9be0bf",
    mat27:"#9be0bf",
    mat28:"#9be0bf",
    mat29:"#9be0bf",
    mat30:"#9be0bf",
    mat31:"#4a68d9",
    mat32:"#4a68d9",
    mat33:"#4a68d9",
    mat34:"#9be0bf",
    mat35:"#9be0bf",
    mat36:"#9be0bf",
    mat37:"#9be0bf",
    mat38:"#9be0bf",
    mat39:"#9be0bf",
    mat40:"#9be0bf",
    mat41:"#9be0bf",
    mat42:"#9be0bf",
    mat43:"#9be0bf",
    mat44:"#9be0bf",
    mat45:"#9be0bf",
    mat46:"#9be0bf",
    mat47:"#9be0bf",
    mat48:"#9be0bf",
    mat49:"#9be0bf",
  },

  materialOrdering: {
    MVGranite:1,
    MVLimestone:2,
    MVBrick:3,
    MVTBrick:4,
    MInsMePanel:5,
    MEIFS:6,
    MPrecast:7,
    MMinWool:8,
    CSpandrelAlumB:9,
    CSpandrelSteel:10,
    CSpandrelAlum:11,
    CSpandrelWood:12,
    RGFRC:13,
    RACM:14,
    RTerracotta:15,
    RPhenResin:16,
    RFiberCement:17,
    RZinc:18,
    RUHPC:19,
    RGranite:20,
    RTBrick:21,
    RLimestone:22,
    RSteel:23,
    RWood:24
  },

  typeOrdering: {
    "Masonry Veneer": 1,
    "Misc": 2,
    "Curtain Wall": 3,
    "Rainscreen": 4
  },

  materialType:{
    MVGranite: "MV - Granite",
    MVLimestone: "MV - Limestone",
    MVBrick: "MV - Brick",
    MVTBrick:"MV - Thin Brick",
    MInsMePanel:"M - Insulated Metal",
    MEIFS: "M - EIFS (XPS)",
    MPrecast:"M - Precast Concrete",
    MMinWool:"M - EIFS (Min Wool)",
    CSpandrelAlumB:"CW - Backpan Spandrel",
    CSpandrelSteel:"CW - Steel Spandrel",
    CSpandrelAlum:"CW - Alum Spandrel",
    CSpandrelWood:"CW - Wood Spandrel",
    RGFRC:"RS - GFRC",
    RACM: "RS - ACM",
    RTerracotta:"RS - Terracotta",
    RPhenResin:"RS - Phenolic Resin",
    RFiberCement:"RS - Fiber Cement",
    RZinc:"RS - Zinc",
    RUHPC:"RS - UHPC",
    RGranite:"RS - Granite",
    RTBrick:"RS - Thin Brick",
    RLimestone:"RS - Limestone",
    RSteel:"RS - Steel",
    RWood:"RS - Wood",
  },

  materialName:{
    MVGranite:	"Granite",
MVLimestone:	"Limestone",
MVBrick:	"Brick",
MVTBrick:	"Thin Brick",
MInsMePanel:	"Insulated Metal Panel",
MEIFS:	"EIFS (XPS)",
MPrecast:	"Precast Concrete",
MMinWool:	"EIFS (Min Wool)",
CSpandrelAlumB:	"Spandrel (Alum w/ Backpan)",
CSpandrelSteel:	"Spandrel (Steel)",
CSpandrelAlum:	"Spandrel (Alum)",
CSpandrelWood:	"Spandrel (Wood)",
RGFRC:	"Glass Fiber Reinforced Concrete (GFRC)",
RACM:	"Aluminum Composite Material (ACM)",
RTerracotta:	"Terracotta",
RPhenResin:	"Phenolic Resin",
RFiberCement:	"Fiber Cement",
RZinc:	"Formed Zinc Panel",
RUHPC:	"UHPC (fibreC)",
RGranite:	"Granite",
RTBrick:	"Thin Brick",
RLimestone:	"Limestone",
RSteel:	"Formed Steel Panel",
RWood:	"Wood"
  },

  materialName2:{
    MVGranite:	"Masonry Veneer - Granite",
MVLimestone:	"Masonry Veneer - Limestone",
MVBrick:	"Masonry Veneer - Brick",
MVTBrick:	"Masonry Veneer - Thin Brick",
MInsMePanel:	"Misc. - Insulated Metal Panel",
MEIFS:	"Misc. - EIFS (XPS)",
Mprecast:	"Misc. - Precast Concrete",
MMinWool:	"Misc. - EIFS (Min Wool)",
CSpandrelAlumB:	"Curtain Wall - Spandrel (Alum w/ Backpan)",
CSpandrelSteel:	"Curtain Wall - Spandrel (Steel)",
CSpandrelAlum:	"Curtain Wall - Spandrel (Alum)",
CSpandrelWood:	"Curtain Wall - Spandrel (Wood)",
RGFRC:	"Rainscreen - Glass Fiber Reinforced Concrete (GFRC)",
RACM:	"Rainscreen - Aluminum Composite Material (ACM)",
RTerracotta:	"Rainscreen - Terracotta",
RPhenResin:	"Rainscreen - Phenolic Resin",
RFiberCement:	"Rainscreen - Fiber Cement",
RZinc:	"Rainscreen - Formed Zinc Panel",
RUHPC:	"Rainscreen - UHPC (fibreC)",
RGranite:	"Rainscreen - Granite",
RTBrick:	"Rainscreen - Thin Brick",
RLimestone:	"Rainscreen - Limestone",
RSteel:	"Rainscreen - Formed Steel Panel",
RWood:	"Rainscreen - Wood"
  },

  materialImg:{
    MVGranite:	"./img/MV_Axon.png",
MVLimestone:	"./img/MV_Axon.png",
MVBrick:	"./img/MV_Axon.png",
MVTBrick:	"./img/MV_Axon.png",
MInsMePanel:	"./img/FS_Axon.png",
MEIFS:	"./img/FS_Axon.png",
MPrecast:	"./img/FS_Axon.png",
MMinWool:	"./img/FS_Axon.png",
CSpandrelAlumB:	"./img/CW_Axon.png",
CSpandrelSteel:	"./img/CW_Axon.png",
CSpandrelAlum:	"./img/CW_Axon.png",
CSpandrelWood:	"./img/CW_Axon.png",
RGFRC:	"./img/RS_GFRC.png",
RACM:	"./img/RS_GFRC.png",
RTerracotta:	"./img/RS_GFRC.png",
RPhenResin:	"./img/RS_GFRC.png",
RFiberCement:	"./img/RS_GFRC.png",
RZinc:	"./img/RS_GFRC.png",
RUHPC:	"./img/RS_GFRC.png",
RGranite:	"./img/RS_GFRC.png",
RTBrick:	"./img/RS_GFRC.png",
RLimestone:	"./img/RS_GFRC.png",
RSteel:	"./img/RS_GFRC.png",
RWood:	"./img/RS_GFRC.png",
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3),
           return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2),  name: d.name, img: d.img }
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3), 
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4),
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4),
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5),
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
         var resultData = results.data.map(d => { //impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5:parseFloat(d.impact5),
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
            mat38: parseFloat(d.mat38),
            mat39: parseFloat(d.mat39),
            mat40: parseFloat(d.mat40),
            mat41: parseFloat(d.mat41),
            mat42: parseFloat(d.mat42),
            mat43: parseFloat(d.mat43),
            mat44: parseFloat(d.mat44),
            mat45: parseFloat(d.mat45),
            mat46: parseFloat(d.mat46),
            mat47: parseFloat(d.mat47),
            mat48: parseFloat(d.mat48),
            mat49: parseFloat(d.mat49),
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
