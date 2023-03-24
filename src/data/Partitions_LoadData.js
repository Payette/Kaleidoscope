import Papa from 'papaparse';

import dataGWP from './partitions/partitions_gwp_10y_n.csv';
import dataAllImpacts from './partitions/partitions_allImpact_10y_n.csv';
import dataLCS from './partitions/partitions_lcs_10y_n.csv';
import dataMaterial from './partitions/partitions_material_10y_n.csv';

import dataGWP1 from './partitions/partitions_gwp_10y_y.csv';
import dataAllImpacts1 from './partitions/partitions_allImpact_10y_y.csv';
import dataLCS1 from './partitions/partitions_lcs_10y_y.csv';
import dataMaterial1 from './partitions/partitions_material_10y_y.csv';

import dataGWP2 from './partitions/partitions_gwp_60y_n.csv';
import dataAllImpacts2 from './partitions/partitions_allImpact_60y_n.csv';
import dataLCS2 from './partitions/partitions_lcs_60y_n.csv';
import dataMaterial2 from './partitions/partitions_material_60y_n.csv';

import dataGWP3 from './partitions/partitions_gwp_60y_y.csv';
import dataAllImpacts3 from './partitions/partitions_allImpact_60y_y.csv';
import dataLCS3 from './partitions/partitions_lcs_60y_y.csv';
import dataMaterial3 from './partitions/partitions_material_60y_y.csv';

import dataGWP4 from './partitions/partitions_gwp_60yd_n.csv';
import dataAllImpacts4 from './partitions/partitions_allImpact_60yd_n.csv';
import dataLCS4 from './partitions/partitions_lcs_60yd_n.csv';
import dataMaterial4 from './partitions/partitions_material_60yd_n.csv';

import dataGWP5 from './partitions/partitions_gwp_60yd_y.csv';
import dataAllImpacts5 from './partitions/partitions_allImpact_60yd_y.csv';
import dataLCS5 from './partitions/partitions_lcs_60yd_y.csv';
import dataMaterial5 from './partitions/partitions_material_60yd_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};


const metaData = {
  materialColors: {
    gButtGlazed: "#FCC05E",
    gHollowMetalFrame: "#F9CB97",
    gWoodFrame: "#FCE4C3",
    cFurredOutMFB: "#70BF51",
    cFurredOutEcosmart: "#8EE05F",
    cPaintedBlock: "#ADE589",
    cJandris: "#C2EAA7",
    cFurredOutMDF: "#DBF2CC",
    ms16MinWoolMFB: "#C1E9EC",
    msEmb16MinWoolMFB: "#A2D3EB",
    ms24MinWoolMFB: "#87CEE9",
    msCut24MinWoolMFB: "#8BD3F7",
    ms16MinWoolEcosmart: "#5CBDFF",
    msEmb24MinWoolMFB: "#00AAFF",
    ms16GlassWoolMFB: "#4497EA",
    ms16MFB: "#6495ED",
    ms16CelluloselMFB: "#4169E1",
    msIndustryBest: "#283CDC",
    ms16MinWoolMDF: "#0000CD",
    msReimagined: "#001489",
    ws24MinWoolMFB: "#4F002F",
    ws16MinWoolMFB: "#770046",
    ws16MinWoolEcosmart: "#9E005D",
    ws16GlassWoolMFB: "#B13675",
    ws16MFB: "#C3426B",
    ws16CelluloseMFB: "#CF6889",
    wsIndustryBest: "#DB8EA6",
    ws16MinWoolMDF: "#EBB3C3",
    wsReimagined: "#F3D1DB",
  },
  
  
  materialHealth: {
    gButtGlazed: "#febe10",
    gHollowMetalFrame: "#97cd78",
    gWoodFrame: "#00ae5e",
    cFurredOutMFB: "#00ae5e",
    cFurredOutEcosmart: "#00ae5e",
    cPaintedBlock: "#00ae5e",
    cJandris: "#00ae5e",
    cFurredOutMDF: "#00ae5e",
    ms16MinWoolMFB: "#00ae5e",
    msEmb16MinWoolMFB: "#00ae5e",
    ms24MinWoolMFB: "#00ae5e",
    msCut24MinWoolMFB: "#97cd78",
    ms16MinWoolEcosmart: "#febe10",
    msEmb24MinWoolMFB: "#febe10",
    ms16GlassWoolMFB: "#febe10",
    ms16MFB: "#febe10",
    ms16CelluloselMFB: "#febe10",
    msIndustryBest: "#febe10",
    ms16MinWoolMDF: "#97cd78",
    msReimagined: "#00ae5e",
    ws24MinWoolMFB: "#00ae5e",
    ws16MinWoolMFB: "#00ae5e",
    ws16MinWoolEcosmart: "#00ae5e",
    ws16GlassWoolMFB: "#00ae5e",
    ws16MFB: "#00ae5e",
    ws16CelluloseMFB: "#00ae5e",
    wsIndustryBest: "#00ae5e",
    ws16MinWoolMDF: "#00ae5e",
    wsReimagined: "#00ae5e",
  },

  
  materialHealthText: {
    gButtGlazed: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings"],
    gHollowMetalFrame: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings"],
    gWoodFrame: ["Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF)"],
    cFurredOutMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify grout free of PFAS"],
    cFurredOutEcosmart: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify grout free of PFAS"],
    cPaintedBlock: ["Watch for VOC content of paints/sealants/coatings; Specify grout free of PFAS"],
    cJandris: ["Watch for VOC content of paints/sealants/coatings; Specify grout free of PFAS"],
    cFurredOutMDF: ["Watch for VOC content of paints/sealants/coatings; Specify grout free of PFAS; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF"],
    ms16MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    msEmb16MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    ms24MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    msCut24MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    ms16MinWoolEcosmart: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    msEmb24MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    ms16GlassWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    ms16MFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings"],
    ms16CelluloselMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Cellulose typically includes flame retardants"],
    msIndustryBest: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify formaldehyde-free insulation"],
    ms16MinWoolMDF: ["Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Specify formaldehyde-free insulation"],
    msReimagined: ["Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Cellulose typically includes flame retardants"],
    ws24MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify formaldehyde-free insulation"],
    ws16MinWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify formaldehyde-free insulation"],
    ws16MinWoolEcosmart: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify formaldehyde-free insulation"],
    ws16GlassWoolMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify formaldehyde-free insulation"],
    ws16MFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source"],
    ws16CelluloseMFB: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Cellulose typically includes flame retardants"],
    wsIndustryBest: ["Type X gypsum board includes flame retardants; Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify formaldehyde-free insulation"],
    ws16MinWoolMDF: ["Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Specify formaldehyde-free insulation"],
    wsReimagined: ["Watch for VOC content of paints/sealants/coatings; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Cellulose typically includes flame retardants"],
  },

  
  // hover on bar chart
  materialTexts: {
    gButtGlazed: ["tempered glass, silicone joint, aluminum top and bottom channels, metal stud, gypsum wall board type x, interior acrylic latex paint"],
    gHollowMetalFrame: ["tempered glass, hollow metal frame, metal stud, gypsum wall board type x, interior acrylic latex paint"],
    gWoodFrame: ["tempered glass, wood frame, metal stud, gypsum wall board type x, interior acrylic latex paint"],
    cFurredOutMFB: ["CMU block, mortar, grout, reinforcing rod, furring channel, gypsum wall board type x, interior acrylic latex paint"],
    cFurredOutEcosmart: ["CMU block, mortar, grout, reinforcing rod, furring channel, lightweight enhanced type x gypsum, interior acrylic latex paint"],
    cPaintedBlock: ["CMU block, mortar, grout, reinforcing rod, interior acrylic latex paint"],
    cJandris: ["low carbon CMU block, mortar, grout, reinforcing rod, interior acrylic latex paint"],
    cFurredOutMDF: ["CMU block, mortar, grout, reinforcing rod, furring channel, MDF, interior acrylic latex paint"],
    ms16MinWoolMFB: ["metal stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    msEmb16MinWoolMFB: ["embossed metal stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ms24MinWoolMFB: ["metal stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    msCut24MinWoolMFB: ["cutout metal stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ms16MinWoolEcosmart: ["metal stud, mineral wool insulation, lightweight enhanced type x gypsum wall board, interior acrylic latex paint"],
    msEmb24MinWoolMFB: ["embossed metal stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ms16GlassWoolMFB: ["metal stud, glass wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ms16MFB: ["metal stud, gypsum wall board type x, interior acrylic latex paint"],
    ms16CelluloselMFB: ["metal stud, cellulose batt insulation, gypsum wall board type x, interior acrylic latex paint"],
    msIndustryBest: ["embossed metal stud, glass wool insulation, lightweight enhanced type x gypsum wall board, interior acrylic latex paint"],
    ms16MinWoolMDF: ["metal stud, mineral wool insulation, MDF, interior acrylic latex paint"],
    msReimagined: ["embossed metal stud, cellulose batt insulation, MDF, interior acrylic latex paint"],
    ws24MinWoolMFB: ["wood stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ws16MinWoolMFB: ["wood stud, mineral wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ws16MinWoolEcosmart: ["wood stud, mineral wool insulation, lightweight enhanced type x gypsum wall board, interior acrylic latex paint"],
    ws16GlassWoolMFB: ["wood stud, glass wool insulation, gypsum wall board type x, interior acrylic latex paint"],
    ws16MFB: ["wood stud, gypsum wall board type x, interior acrylic latex paint"],
    ws16CelluloseMFB: ["wood stud, cellulose batt insulation, gypsum wall board type x, interior acrylic latex paint"],
    wsIndustryBest: ["wood stud, glass wool insulation, lightweight enhanced type x gypsum wall board, interior acrylic latex paint"],
    ws16MinWoolMDF: ["wood stud, mineral wool insulation, MDF, interior acrylic latex paint"],
    wsReimagined: ["wood stud, cellulose insulation, MDF, interior acrylic latex paint"],
  },
  

  // modal popup text
  materialNotes: {
    gButtGlazed: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; 5' wide by 10' tall glazing panels with 3.5' of metal stud wall to deck above; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults"],
    gHollowMetalFrame: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; 5' wide by 10' tall glazing panels with 3.5' of metal stud wall to deck above; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults"],
    gWoodFrame: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; 5' wide by 10' tall glazing panels with 3.5' of metal stud wall to deck above; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults"],
    cFurredOutMFB: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Partial reinforcing with steel rod and grout 48"" on center; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults'],
    cFurredOutEcosmart: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Partial reinforcing with steel rod and grout 48"" on center; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Data from product-specific EPD: 5/8"" Sheetrock Brand EcoSmart Panels Firecode X, Date of issue: June 04, 2021; Service life set to Tally defaults'],
    cPaintedBlock: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Partial reinforcing with steel rod and grout 48"" on center; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults'],
    cJandris: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Partial reinforcing with steel rod and grout 48"" on center; Data from product-specific EPD: Jandris Block CarbonX Normal Weight, Date of issue: December 03, 2021; Service life set to Tally defaults'],
    cFurredOutMDF: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Partial reinforcing with steel rod and grout 48"" on center; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults'],
    ms16MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    msEmb16MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    ms24MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    msCut24MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; GWP reduction calculated from R-stud, 39% reduction in material for standard 362S162-33 to 362RS162-30 equivalent; Service life set to Tally defaults, except insulation matched to assembly"],
    ms16MinWoolEcosmart: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Data from product-specific EPD: 5/8"" Sheetrock Brand EcoSmart Panels Firecode X, Date of issue: June 04, 2021; Service life set to Tally defaults, except insulation matched to assembly'],
    msEmb24MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    ms16GlassWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    ms16MFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults"],
    ms16CelluloselMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Service life set to Tally defaults, except insulation matched to assembly"],
    msIndustryBest: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Data from product-specific EPD: 5/8"" Sheetrock Brand EcoSmart Panels Firecode X, Date of issue: June 04, 2021; Service life set to Tally defaults, except insulation matched to assembly'],
    ms16MinWoolMDF: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    msReimagined: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    ws24MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    ws16MinWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    ws16MinWoolEcosmart: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Data from product-specific EPD: 5/8"" Sheetrock Brand EcoSmart Panels Firecode X, Date of issue: June 04, 2021; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly'],
    ws16GlassWoolMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    ws16MFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults"],
    ws16CelluloseMFB: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    wsIndustryBest: ["Partition height 13.5'", 'data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; Gypsum board inclusive of taping compounds, topping compounds, and joint compounds; Data from product-specific EPD: 5/8"" Sheetrock Brand EcoSmart Panels Firecode X, Date of issue: June 04, 2021; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly'],
    ws16MinWoolMDF: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
    wsReimagined: ["Partition height 13.5', data in linear feet; Building structure is not included in LCA calculations; Wood studs not fire treated; End of life based on assumption that 63.5% of wood sent to landfill. (Tally data source based on 2014 Municipal Solid Waste and Construction Demolition Wood Waste Generation and Recovery in the United States report by Dovetail Partners, Inc.); Service life set to Tally defaults, except insulation matched to assembly"],
  },

  // section graphic material modal popup
  sectionIcons: {
    gButtGlazed: "./img/Partitions/Plans/Glass_Plan_G01_ButtGlazed.png",
    gHollowMetalFrame: "./img/Partitions/Plans/Glass_Plan_G02_HollowMetalFrame.png",
    gWoodFrame: "./img/Partitions/Plans/Glass_Plan_G03_WoodFrame.png",
    cFurredOutMFB: "./img/Partitions/Plans/CMU_Plan_C01_FurredOut_MFB.png",
    cFurredOutEcosmart: "./img/Partitions/Plans/CMU_Plan_C02_FurredOut_Ecosmart.png",
    cPaintedBlock: "./img/Partitions/Plans/CMU_Plan_C03_PaintedBlock.png",
    cJandris: "./img/Partitions/Plans/CMU_Plan_C04_Jandris.png",
    cFurredOutMDF: "./img/Partitions/Plans/CMU_Plan_C05_FurredOut_MDF.png",
    ms16MinWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS01_16_MinWool_MFB.png",
    msEmb16MinWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS02_16_Emb_MinWool_MFB.png",
    ms24MinWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS03_24_MinWool_MFB.png",
    msCut24MinWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS04_24_Cut_MinWool_MFB.png",
    ms16MinWoolEcosmart: "./img/Partitions/Plans/MetalStuds_Plan_MS05_16_MinWool_Ecosmart.png",
    msEmb24MinWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS06_24_Emb_MinWool_MFB.png",
    ms16GlassWoolMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS07_16_GlassWool_MFB.png",
    ms16MFB: "./img/Partitions/Plans/MetalStuds_Plan_MS08_16_NoIns_MFB.png",
    ms16CelluloselMFB: "./img/Partitions/Plans/MetalStuds_Plan_MS09_16_Cellulose_MFB.png",
    msIndustryBest: "./img/Partitions/Plans/MetalStuds_Plan_MS10_BEST_16_Emb_GlassWool_Ecosmart.png",
    ms16MinWoolMDF: "./img/Partitions/Plans/MetalStuds_Plan_MS11_16_MinWool_MDF.png",
    msReimagined: "./img/Partitions/Plans/MetalStuds_Plan_MS12_Reimagined_24_Emb_Cellulose_MDF.png",
    ws24MinWoolMFB: "./img/Partitions/Plans/WoodStuds_Plan_WS01_24_MinWool_MFB.png",
    ws16MinWoolMFB: "./img/Partitions/Plans/WoodStuds_Plan_WS02_16_MinWool_MFB.png",
    ws16MinWoolEcosmart: "./img/Partitions/Plans/WoodStuds_Plan_WS03_16_MinWool_Ecosmart.png",
    ws16GlassWoolMFB: "./img/Partitions/Plans/WoodStuds_Plan_WS04_16_GlassWool_MFB.png",
    ws16MFB: "./img/Partitions/Plans/WoodStuds_Plan_WS05_16_NoIns_MFB.png",
    ws16CelluloseMFB: "./img/Partitions/Plans/WoodStuds_Plan_WS06_16_Cellulose_MFB.png",
    wsIndustryBest: "./img/Partitions/Plans/WoodStuds_Plan_WS07_BEST_16_GlassWool_Ecosmart.png",
    ws16MinWoolMDF: "./img/Partitions/Plans/WoodStuds_Plan_WS09_16_MinWool_MDF.png",
    wsReimagined: "./img/Partitions/Plans/WoodStuds_Plan_WS10_Reimagined_16_Cellulose_MDF.png",
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
    mat5: "#4169E1",
    mat6: "#4169E1",
    mat7: "#4169e1",
    mat8: "#4169e1",
    mat9: "#4169e1",
    mat10: "#4169e1",
    mat11: "#4169e1",
    mat12: "#4169e1",
    mat13: "#f3c26e",
    mat14: "#f3c26e",
    mat15: "#f3c26e",
    mat16: "#f3c26e",
    mat17: "#9be0bf",
    mat18: "#9be0bf",
    mat19: "#9be0bf",
    mat20: "#9be0bf",
    mat21: "#cccccc",
    mat22: "#cccccc",
  },

  materialOrdering: {
    gButtGlazed: 1,
    gHollowMetalFrame: 2,
    gWoodFrame: 3,
    cFurredOutMFB: 4,
    cFurredOutEcosmart: 5,
    cPaintedBlock: 6,
    cJandris: 7,
    cFurredOutMDF:8,
    ms16MinWoolMFB:9,
    msEmb16MinWoolMFB:10,
    ms24MinWoolMFB:11,
    msCut24MinWoolMFB:12,
    ms16MinWoolEcosmart:13,
    msEmb24MinWoolMFB:14,
    ms16GlassWoolMFB:15,
    ms16MFB:16,
    ms16CelluloselMFB:17,
    msIndustryBest:18,
    ms16MinWoolMDF:19,
    msReimagined:20,
    ws24MinWoolMFB:21,
    ws16MinWoolMFB:22,
    ws16MinWoolEcosmart:23,
    ws16GlassWoolMFB:24,
    ws16MFB:25,
    ws16CelluloseMFB:26,
    wsIndustryBest:27,
    ws16MinWoolMDF:28,
    wsReimagined:29,
  },

  typeOrdering: {
    "Glass": 1,
    "CMU": 2,
    "Metal Stud": 3,
    "Wood Stud": 4,
  },

  // Name with Type prefix used in Material List
  materialType: {
    gButtGlazed:"G - Butt-Glazed",
    gHollowMetalFrame:"G - Hollow Metal Frame",
    gWoodFrame:"G - Wood Frame",
    cFurredOutMFB:"CMU - Furred GWB",
    cFurredOutEcosmart:"CMU - Furred Low Carbon GWB",
    cPaintedBlock:"CMU - Painted",
    cJandris:"CMU - Painted Low Carbon Block",
    cFurredOutMDF:"CMU - Furred MDF",
    ms16MinWoolMFB:"MS - 16 OC w/\n Min Wool & GWB",
    msEmb16MinWoolMFB:"MS - Emb 16 OC w/\n Min Wool & GWB",
    ms24MinWoolMFB:"MS - 24 OC w/\n Min Wool & GWB",
    msCut24MinWoolMFB:"MS - Cut-out 24 OC w/\n Min Wool & GWB",
    ms16MinWoolEcosmart:"MS - 16 OC w/\n Min Wool & Low CO2 GWB",
    msEmb24MinWoolMFB:"MS - Emb 24 OC w/\n Min Wool & GWB",
    ms16GlassWoolMFB:"MS - 16 OC w/\n Glass Wool & GWB",
    ms16MFB:"MS - 16 OC & GWB",
    ms16CelluloselMFB:"MS - 16 OC w/\n Cellulose & GWB",
    msIndustryBest:"MS - Industry Best",
    ms16MinWoolMDF:"MS - 16 OC w/\n Min Wool & MDF",
    msReimagined:"MS - Reimagined",
    ws24MinWoolMFB:"WS - 24 OC w/\n Min Wool & GWB",
    ws16MinWoolMFB:"WS - 16 OC w/\n Min Wool & GWB",
    ws16MinWoolEcosmart:"WS - 16 OC w/\n Min Wool & Low CO2 GWB",
    ws16GlassWoolMFB:"WS - 16 OC w/\n Glass Wool & GWB",
    ws16MFB:"WS - 16 OC & GWB",
    ws16CelluloseMFB:"WS - 16 OC w/\n Cellulose & GWB",
    wsIndustryBest:"WS - Industry Best",
    ws16MinWoolMDF:"WS - 16 OC w/\n Min Wool & MDF",
    wsReimagined:"WS - Reimagined"
  },


  
  // Shortish name used in chart row labels (does not have type). !This is being called from CSV files - 2022 EDIT!
  materialName: {
    gButtGlazed:"Butt-Glazed",
    gHollowMetalFrame:"Hollow Metal Frame",
    gWoodFrame:"Wood Frame",
    cFurredOutMFB:"Furred GWB",
    cFurredOutEcosmart:"Furred Low Carbon GWB",
    cPaintedBlock:"Painted",
    cJandris:"Painted Low Carbon Block",
    cFurredOutMDF:"Furred MDF",
    ms16MinWoolMFB:"16 OC w/ Mineral Wool & GWB",
    msEmb16MinWoolMFB:"Embossed 16 OC w/ Mineral Wool & GWB",
    ms24MinWoolMFB:"24 OC w/ Mineral Wool & GWB",
    msCut24MinWoolMFB:"Cut-out 24 OC w/ Mineral Wool & GWB",
    ms16MinWoolEcosmart:"16 OC w/ Mineral Wool & Ecosmart",
    msEmb24MinWoolMFB:"Embossed 24 OC w/ Mineral Wool & GWB",
    ms16GlassWoolMFB:"16 OC w/ Glass Wool & GWB",
    ms16MFB:"16 OC & GWB",
    ms16CelluloselMFB:"16 OC w/ Cellulose & GWB",
    msIndustryBest:"Industry Best",
    ms16MinWoolMDF:"16 OC w/ Mineral Wool & MDF",
    msReimagined:"Reimagined",
    ws24MinWoolMFB:"24 OC w/ Mineral Wool & GWB",
    ws16MinWoolMFB:"16 OC w/ Mineral Wool & GWB",
    ws16MinWoolEcosmart:"16 OC w/ Mineral Wool & Ecosmart",
    ws16GlassWoolMFB:"16 OC w/ Glass Wool & GWB",
    ws16MFB:"16 OC & GWB",
    ws16CelluloseMFB:"16 OC w/ Cellulose & GWB",
    wsIndustryBest:"Industry Best",
    ws16MinWoolMDF:"16 OC w/ Mineral Wool & MDF",
    wsReimagined:"Reimagined",
  },
  
  
  // Name with Longer Type prefix used in Chart Hover Popup
  // and used in Modal Material Popup
  materialName2: {
    gButtGlazed:"Glass - Butt-Glazed",
    gHollowMetalFrame:"Glass - Hollow Metal Frame",
    gWoodFrame:"Glass - Wood Frame",
    cFurredOutMFB:"CMU - Furred GWB",
    cFurredOutEcosmart:"CMU - Furred Low Carbon GWB",
    cPaintedBlock:"CMU - Painted",
    cJandris:"CMU - Painted Low Carbon Block",
    cFurredOutMDF:"CMU - Furred MDF",
    ms16MinWoolMFB:"Metal Stud - 16 OC w/ Mineral Wool & GWB",
    msEmb16MinWoolMFB:"Metal Stud - Embossed 16 OC w/ Mineral Wool & GWB",
    ms24MinWoolMFB:"Metal Stud - 24 OC w/ Mineral Wool & GWB",
    msCut24MinWoolMFB:"Metal Stud - Cut-out 24 OC w/ Mineral Wool & GWB",
    ms16MinWoolEcosmart:"Metal Stud - 16 OC w/ Mineral Wool & Ecosmart",
    msEmb24MinWoolMFB:"Metal Stud - Embossed 24 OC w/ Mineral Wool & GWB",
    ms16GlassWoolMFB:"Metal Stud - 16 OC w/ Glass Wool & GWB",
    ms16MFB:"Metal Stud - 16 OC & GWB",
    ms16CelluloselMFB:"Metal Stud - 16 OC w/ Cellulose & GWB",
    msIndustryBest:"Metal Stud - Industry Best",
    ms16MinWoolMDF:"Metal Stud - 16 OC w/ Mineral Wool & MDF",
    msReimagined:"Metal Stud - Reimagined",
    ws24MinWoolMFB:"Wood Stud - 24 OC w/ Mineral Wool & GWB",
    ws16MinWoolMFB:"Wood Stud - 16 OC w/ Mineral Wool & GWB",
    ws16MinWoolEcosmart:"Wood Stud - 16 OC w/ Mineral Wool & Ecosmart",
    ws16GlassWoolMFB:"Wood Stud - 16 OC w/ Glass Wool & GWB",
    ws16MFB:"Wood Stud - 16 OC & GWB",
    ws16CelluloseMFB:"Wood Stud - 16 OC w/ Cellulose & GWB",
    wsIndustryBest:"Wood Stud - Industry Best",
    ws16MinWoolMDF:"Wood Stud - 16 OC w/ Mineral Wool & MDF",
    wsReimagined:"Wood Stud - Reimagined",
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2),name: d.name, img: d.img }
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), name: d.name, img: d.img }
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), name: d.name, img: d.img }
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), name: d.name, img: d.img }
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
            return { material: d.material, type: d.type, impact1: parseFloat(d.impact1), impact2: parseFloat(d.impact2), impact3: parseFloat(d.impact3), impact3: parseFloat(d.impact3), impact4: parseFloat(d.impact4), impact5: parseFloat(d.impact5), name: d.name, img: d.img }
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


/*
gButtGlazed
gHollowMetalFrame
gWoodFrame
cFurredOutMFB
CFurredOutEcosmart
cPaintedBlock
cJandris
CFurredOutMDF
ms16MinWoolMFB
msEmb16MinWoolMFB
ms24MinWoolMFB
msCut24MinWoolMFB
ms16MinWoolEcosmart
msEmb24MinWoolMFB
ms16GlassWoolMFB
ms16MFB
ms16CelluloselMFB
MSIndustryBest
ms16MinWoolMDF
msReimagined
ws24MinWoolMFB
ws16MinWoolMFB
ws16MinWoolEcosmart
ws16GlassWoolMFB
ws16MFB
ws16CelluloseMFB
wsIndustryBest
ws16MinWoolMDF
wsReimagined

gButtGlazed:"",
gHollowMetalFrame:"",
gWoodFrame:"",
cFurredOutMFB:"",
CFurredOutEcosmart:"",
cPaintedBlock:"",
cJandris:"",
CFurredOutMDF:"",
ms16MinWoolMFB:"",
msEmb16MinWoolMFB:"",
ms24MinWoolMFB:"",
msCut24MinWoolMFB:"",
ms16MinWoolEcosmart:"",
msEmb24MinWoolMFB:"",
ms16GlassWoolMFB:"",
ms16MFB:"",
ms16CelluloselMFB:"",
MSIndustryBest:"",
ms16MinWoolMDF:"",
msReimagined:"",
ws24MinWoolMFB:"",
ws16MinWoolMFB:"",
ws16MinWoolEcosmart:"",
ws16GlassWoolMFB:"",
ws16MFB:"",
ws16CelluloseMFB:"",
wsIndustryBest:"",
ws16MinWoolMDF:"",
wsReimagined:"",
*/