import Papa from 'papaparse';

import dataGWP from './wall/wallfinishes_gwp_10y_n.csv';
import dataAllImpacts from './wall/wallfinishes_allImpact_10y_n.csv';
import dataLCS from './wall/wallfinishes_lcs_10y_n.csv';
import dataMaterial from './wall/wallfinishes_material_10y_n.csv';

import dataGWP1 from './wall/wallfinishes_gwp_10y_y.csv';
import dataAllImpacts1 from './wall/wallfinishes_allImpact_10y_y.csv';
import dataLCS1 from './wall/wallfinishes_lcs_10y_y.csv';
import dataMaterial1 from './wall/wallfinishes_material_10y_y.csv';

import dataGWP2 from './wall/wallfinishes_gwp_60y_n.csv';
import dataAllImpacts2 from './wall/wallfinishes_allImpact_60y_n.csv';
import dataLCS2 from './wall/wallfinishes_lcs_60y_n.csv';
import dataMaterial2 from './wall/wallfinishes_material_60y_n.csv';

import dataGWP3 from './wall/wallfinishes_gwp_60y_y.csv';
import dataAllImpacts3 from './wall/wallfinishes_allImpact_60y_y.csv';
import dataLCS3 from './wall/wallfinishes_lcs_60y_y.csv';
import dataMaterial3 from './wall/wallfinishes_material_60y_y.csv';

import dataGWP4 from './wall/wallfinishes_gwp_60yd_n.csv';
import dataAllImpacts4 from './wall/wallfinishes_allImpact_60yd_n.csv';
import dataLCS4 from './wall/wallfinishes_lcs_60yd_n.csv';
import dataMaterial4 from './wall/wallfinishes_material_60yd_n.csv';

import dataGWP5 from './wall/wallfinishes_gwp_60yd_y.csv';
import dataAllImpacts5 from './wall/wallfinishes_allImpact_60yd_y.csv';
import dataLCS5 from './wall/wallfinishes_lcs_60yd_y.csv';
import dataMaterial5 from './wall/wallfinishes_material_60yd_y.csv';

const PAPAPARSE_CONFIG = {
  download: true,
  header: true,
  skipEmptyLines: true
};

const metaData = {
  materialColors: {
    wpAluminumPanelA:"#E16C46",
    wpAluminumPanelPC:"#F78461",
    wpStainlessSteelSheet:"#F99D81",
    wpPVCFreeRigidSheet:"#FAB5A0",
    wpVinylRigidSheet:"#FCD1C5",
    sSolidSurface:"#FCC05E",
    sSinteredStone:"#F9CB97",
    sPorcelainTile:"#FCE4C3",
    mMetalVeneerPanel:"#5CA040",
    mTextile:"#70BF51",
    mPaint:"#8EE05F",
    mWallpaperNW:"#ADE589",
    mWallpaperPaper:"#C2EAA7",
    mPlasticLaminate:"#DBF2CC",
    saCemWdPanel:"#87cee9",
    saAcousticWoodPanel:"#66bcff",
    saPETFeltPanel:"#4497ea",
    saCorkTile:"#283cdc",
    wBambooPanel:"#9e005d",
    wVeneerMDF:"#C3426B",
    wVeneerParticleBoard:"#DB8EA6"


  },


  materialHealth: {
    wpAluminumPanelA:"#97cd78",
    wpAluminumPanelPC:"#97cd78",
    wpStainlessSteelSheet:"#97cd78",
    wpPVCFreeRigidSheet:"#97cd78",
    wpVinylRigidSheet:"#d51c29",
    sSolidSurface:"#97cd78",
    sSinteredStone:"#97cd78",
    sPorcelainTile:"#97cd78",
    mMetalVeneerPanel:"#97cd78",
    mTextile:"#97cd78",
    mPaint:"#97cd78",
    mWallpaperNW:"#97cd78",
    mWallpaperPaper:"#97cd78",
    mPlasticLaminate:"#97cd78",
    saCemWdPanel:"#97cd78",
    saAcousticWoodPanel:"#febe10",
    saPETFeltPanel:"#febe10",
    saCorkTile:"#00ae5e",
    wBambooPanel:"#febe10",
    wVeneerMDF:"#febe10",
    wVeneerParticleBoard:"#97cd79"
  },

  materialHealthText: {
    wpAluminumPanelA: ["Check for no added antimicrobials"],
    wpAluminumPanelPC: ["Check for no added antimicrobials"],
    wpStainlessSteelSheet: ["Check for no added antimicrobials; Watch for VOC content of adhesives"],
    wpPVCFreeRigidSheet: ["Check for no added stain treatments and antimicrobials; Adhesive can contain antimicrobials; Watch for VOC content of adhesives"],
    wpVinylRigidSheet: ["Contains vinyl: not recommended per Payette Material Policy; Check for no added stain treatments and antimicrobials; Adhesive can contain antimicrobials; Watch for VOC content of adhesives"],
    sSolidSurface: ["Check for no added antimicrobial surface treatement; Ask for adhesive free of antimicrobials"],
    sSinteredStone: ["Check for no added antimicrobial surface treatement; Ask for adhesive free of antimicrobials"],
    sPorcelainTile: ["Check for no added stain treatments and antimicrobials surface treatement; Specify PFAS free grout; Ask for adhesive and grout free of antimicrobials"],
    mMetalVeneerPanel: ["Check for no added antimicrobials; Watch for VOC content of adhesives"],
    mTextile: ["Check for no added stain treatments, antimicrobials, and flame retardants; Watch for VOC content of adhesives"],
    mPaint: ["Check for no added stain treatments and antimicrobials"],
    mWallpaperNW: ["Check for no added stain treatments and antimicrobials; Specify PCV/Vinyl free type; Watch for VOC content of adhesives"],
    mWallpaperPaper: ["Check for no added stain treatments and antimicrobials; Watch for VOC content of adhesives"],
    mPlasticLaminate: ["Check for no added antimicrobials; Specify PVC/Vinyl free accessory pieces"],
    saCemWdPanel:["Check for no added antimicrobials"],
    saAcousticWoodPanel:["Flame retardants in fire treated wood; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Watch for VOC content of paints/sealants/coatings"],
    saPETFeltPanel:["Most likely contains flame retardants, specify product with none or natural wool; Check for no added antimicrobials"],
    saCorkTile:["If adding coating, check for no added stain treatments and antimicrobials"],
    wBambooPanel:["Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) binders; Watch for VOC content of paints/sealants/coatings; Check for no flame retardants if fire treated"],
    wVeneerMDF:["Flame retardants in fire treated wood; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) MDF; Watch for VOC content of paints/sealants/coatings"],
    wVeneerParticleBoard:["Flame retardants in fire treated wood; Specify FSC Wood or other responsible source; Specify no added urea-formaldehyde or ultra-low emitting formaldehyde (NAUF/ULEF) particle board; Watch for VOC content of paints/sealants/coatings"]
  },

  // hover on bar chart
  materialTexts: {
    wpAluminumPanelA:"anodized aluminum sheet, plywood furring",
    wpAluminumPanelPC:"powder coated aluminum sheet, plywood furring",
    wpStainlessSteelSheet:"stainless steel sheet",
    wpPVCFreeRigidSheet:"PVC-free rigid sheet (EPD specific)",
    wpVinylRigidSheet:"vinyl rigid sheet",
    sSolidSurface:"acrylic solid surface (acrylic polymer and ATH), laticrete cement mortar",
    sSinteredStone:"Ultra-Compact Sintered Stone (EPD specific), laticrete cement mortar",
    sPorcelainTile:"porcelain ceramic tile, glazed, thinset cement mortar, cement grout",
    mMetalVeneerPanel:"powder coated steel sheet, plywood substrate, powder coated aluminum reveal, cast aluminum z-clips, plywood blocking",
    mTextile:"nylon textile wall covering, fibrous underlayment",
    mPaint:"interior acrylic latex paint",
    mWallpaperNW:"non-woven wallpaper wall covering (EPD specific)",
    mWallpaperPaper:"wallpaper wall covering",
    mPlasticLaminate:"high pressure laminate (HPL), adhesive, particleboard substrate, ABS edgeband, HPL reveal, cast aluminum z-clips, plywood blocking",
    saCemWdPanel:"cementitious wood panel (EPD specific), wood furring strips",
    saAcousticWoodPanel:"acoustic wood veneer panel (EPD specific), solid wood edge band and reveal strip with wood stain and polyurethane top coat, polyurethane adhesive, cast aluminum z-clips, plywood blocking",
    saPETFeltPanel:"acoustic polyethylene terephthalate (PET) felt (EPD specific)",
    saCorkTile:"cork tile wall covering",
    wBambooPanel:"bamboo plank with polyurethane top coat, cast aluminum z-clips, plywood blocking",
    wVeneerMDF:"wood veneer with adhesive on MDF, solid wood edge band and reveal strip with wood stain, polyurethane adhesive, polyurethane top coat, cast aluminum z-clips, plywood blocking",
    wVeneerParticleBoard:"wood veneer with adhesive on particle board, solid wood edge band and reveal strip with wood stain, polyurethane adhesive, polyurethane top coat, cast aluminum z-clips, plywood blocking",
  },


  
  
  // modal popup text
  materialNotes: {
    wpAluminumPanelA: [  "Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to match partition of 30 years"],
    wpAluminumPanelPC: [  "Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to match partition of 30 years"],
    wpStainlessSteelSheet:["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to match partition of 30 years'],
    wpPVCFreeRigidSheet:["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to match EPD RSL of 15 years',
    'Data from product-specific EPD: Acrovyn Wall Covering Sheets, Date of issue: November 4, 2020'],
    wpVinylRigidSheet: ["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to 15 years'],
    sSolidSurface: ["Wall finish height 8', data in square feet",
    'Building structure, partition, and support system is not included in LCA calculations',
    'Additional support system used for this assembly such as backer board may increase embodied carbon',
    'Aesthetic trim accessories not included',
    'Service life set to match partition of 30 years'],
    sSinteredStone:["Wall finish height 8', data in square feet",
    'Building structure, partition, and support system is not included in LCA calculations',
    'Additional support system used for this assembly such as backer board may increase embodied carbon',
    'Aesthetic trim accessories not included',
    'Service life set to match partition of 30 years',
    'Data from product-specific EPD: Dekton, Cosentino, Ultra Compact Stone, Date of issue: April 29, 2024'],
    sPorcelainTile: ["Wall finish height 8', data in square feet",
    'Building structure, partition, and support system is not included in LCA calculations',
    'Additional support system used for this assembly such as backer board may increase embodied carbon',
    'Aesthetic trim accessories not included',
    'Tiles are 4" x 12"',
    'Service life set to match partition of 30 years'],
    mMetalVeneerPanel: ["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Panel adhesive included, additional fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to Tally default of 20 years due to adhesives, assembly adjusted to match"],
    mTextile: ["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to Tally default of 15 years'],
    mPaint: ["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to Tally default of 7 years'],
    mWallpaperNW: ["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to match EPD RSL of 10 years',
    'Data from product-specific EPD: Wall Coverings on Non-Woven Base, Date of issue: February 29, 2024'],
    mWallpaperPaper: ["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    ' Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to Tally default of 5 years'],
    mPlasticLaminate: ["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    " Panel adhesive included, additional fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to Tally default of 20 years due to adhesives, assembly adjusted to match"],
    saCemWdPanel:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included","Aesthetic trim accessories not included",
    "Service life set to match EPD RSL of 30 years",
    "Data from product-specific EPD: Tectum Ceiling + Wall Panels, Date of issue: June 15, 2022"],
    saAcousticWoodPanel:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Panel adhesive included, additional fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to Tally default of 20 years due to adhesives, assembly adjusted to match",
    "Data from product-specific EPD: WoodWorks ACGI Flat Panels: SS1, SS2, SS3, SS4, Date of issue: October 10, 2022"],
    saPETFeltPanel:["Wall finish height 8', data in square feet",
    'Building structure and partition is not included in LCA calculations',
    'Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included',
    'Aesthetic trim accessories not included',
    'Service life set to match EPD RSL of 30 years',
    'Data from product-specific EPD: Archisonic, Date of issue: April 1, 2022',
    'Data assumes 60% post-consumer recycled PET content'],
    saCorkTile:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    " Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included","Aesthetic trim accessories not included",
    "Service life set to Tally default of 25 years, assembly adjusted to match"],
    wBambooPanel:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included","Aesthetic trim accessories not included",
    "Service life set to Tally default of 25 years, assembly adjusted to match"],
    wVeneerMDF:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Panel adhesives included, additional fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to Tally default of 20 years due to adhesives, assembly adjusted to match"],
    wVeneerParticleBoard:["Hatch pattern indicates negative value for biogenic carbon credit",
    "Wall finish height 8', data in square feet",
    "Building structure and partition is not included in LCA calculations",
    "Panel adhesives included, additional fasteners, shims, and adhesives meet the ISO Standard cutoff criteria as insignificant and are therefore not included",
    "Aesthetic trim accessories not included",
    "Service life set to Tally default of 20 years due to adhesives, assembly adjusted to match"],
  },

  // section graphic material modal popup
  sectionIcons: {
    wpAluminumPanelA:"./img/WallFinishes/Sections/WallProtection_Section_WP01_AlumPlateAnodized.png",
    wpAluminumPanelPC:"./img/WallFinishes/Sections/WallProtection_Section_WP02_AlumPlatePowderCoat.png",
    wpStainlessSteelSheet:"./img/WallFinishes/Sections/WallProtection_Section_WP03_StainlessStlSheet.png",
    wpPVCFreeRigidSheet:"./img/WallFinishes/Sections/WallProtection_Section_WP04_PVCFreeRSWP.png",
    wpVinylRigidSheet:"./img/WallFinishes/Sections/WallProtection_Section_WP05_RSWP.png",
    sSolidSurface:"./img/WallFinishes/Sections/StoneCeramic_Section_SC01_SolidSurface.png",
    sSinteredStone:"./img/WallFinishes/Sections/StoneCeramic_Section_SC02_SinteredStone.png",
    sPorcelainTile:"./img/WallFinishes/Sections/StoneCeramics_Section_SC03_PorcelainTile.png",
    mMetalVeneerPanel:"./img/WallFinishes/Sections/Misc_Section_M01_MetalVeneerPanel.png",
    mTextile:"./img/WallFinishes/Sections/Misc_Section_M02_Textile.png",
    mPaint:"./img/WallFinishes/Sections/Misc_Section_M03_Paint.png",
    mWallpaperNW:"./img/WallFinishes/Sections/Misc_Section_M04_NonWovenWallpaper.png",
    mWallpaperPaper:"./img/WallFinishes/Sections/Misc_Section_M05_PaperWallpaper.png",
    mPlasticLaminate:"./img/WallFinishes/Sections/Misc_Section_M06_PlasticLaminate.png",
    saCemWdPanel:"./img/WallFinishes/Sections/SoundAbsorbing_Section_SA01_CementitiousWoodPanel.png",
    saAcousticWoodPanel:"./img/WallFinishes/Sections/SoundAbsorbing_Section_SA02_AcousticWoodPanel.png",
    saPETFeltPanel:"./img/WallFinishes/Sections/SoundAbsorbing_Section_SA03_PET.png",
    saCorkTile:"./img/WallFinishes/Sections/SoundAbsorbing_Section_SA04_CorkTile.png",
    wBambooPanel:"./img/WallFinishes/Sections/Wood_Section_W01_BambooPanel.png",
    wVeneerMDF:"./img/WallFinishes/Sections/Wood_Section_W02_VeneeronMDF.png",
    wVeneerParticleBoard:"./img/WallFinishes/Sections/Wood_Section_W03_VeneeronParticleBoard.png",
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
    mat5: "#4169e1",
    mat6: "#4169e1",
    mat7: "#9be0bf",
    mat8: "#9be0bf",
    mat9: "#9be0bf",
    mat10: "#9be0bf",
    mat11: "#9be0bf",
    mat12: "#9be0bf",
    mat13: "#9be0bf",
    mat14: "#9be0bf",
    mat15: "#9be0bf",
    mat16: "#9be0bf",
    mat17: "#9be0bf",
    mat18: "#9be0bf",
    mat19: "#9be0bf",
    mat20: "#9be0bf",
    mat21: "#9be0bf",
    mat22: "#9be0bf",
    mat23: "#9be0bf",
    mat24: "#9be0bf",
    mat25: "#9be0bf",
    mat26: "#9be0bf",
    mat27: "#9be0bf",
    mat28: "#9be0bf",
    mat29: "#9be0bf",
    mat30: "#9be0bf",
    mat31: "#9be0bf",
    mat32: "#9be0bf",
    mat33: "#9be0bf",
    mat34: "#9be0bf",
    mat35: "#9be0bf",
    mat36: "#9be0bf",
    mat37: "#CCCCCC",
    mat38: "#cccccc",
    mat39: "#cccccc",

  },

  materialOrdering: {
    wpAluminumPanelA: 1,
    wpAluminumPanelPC: 2,
    wpStainlessSteelSheet: 3,
    wpPVCFreeRigidSheet: 4,
    wpVinylRigidSheet: 5,
    sSolidSurface: 6,
    sSinteredStone: 7,
    sPorcelainTile: 8,
    mMetalVeneerPanel: 9,
    mTextile: 10,
    mPaint: 11,
    mWallpaperNW: 12,
    mWallpaperPaper: 13,
    mPlasticLaminate: 14,
    saCemWdPanel:15,
    saAcousticWoodPanel:16,
    saPETFeltPanel:17,
    saCorkTile:18,
    wBambooPanel:19,
    wVeneerMDF:20,
    wVeneerParticleBoard:21,
  },

  typeOrdering: {
    "Wall Protection": 1,
    "Stone / Ceramic": 2,
    "Misc.": 3,
    "Sound Absorbing": 4, 
    "Wood": 5,
  
  },

  // Name with Type prefix used in Material List
  materialType: {
    wpAluminumPanelA:"WP - Aluminum Panel (Anodized)",
    wpAluminumPanelPC:"WP - Aluminum Panel (Powder Coated)",
    wpStainlessSteelSheet:"WP - Stainless Steel Sheet",
    wpPVCFreeRigidSheet:"WP - PVC-Free Rigid Sheet ",
    wpVinylRigidSheet:"WP - Vinyl Rigid Sheet ",
    sSolidSurface:"SC - Solid Surface",
    sSinteredStone:"SC - Sintered Stone",
    sPorcelainTile:"SC - Porcelain Tile",
    mMetalVeneerPanel:"M - Metal Veneer Panel",
    mTextile:"M - Textile",
    mPaint:"M - Paint",
    mWallpaperNW:"M - Wallpaper (Non-Woven)",
    mWallpaperPaper:"M - Wallpaper (Paper)",
    mPlasticLaminate:"M - Plastic Laminate",
    saCemWdPanel:"SA - Cementitious Wood Panel",
    saAcousticWoodPanel:"SA - Acoustic Wood Panel",
    saPETFeltPanel:"SA - PET Felt Panel",
    saCorkTile:"SA - Cork Tile",
    wBambooPanel:"W - Bamboo Panel",
    wVeneerMDF:"W - Veneer (on MDF)",
    wVeneerParticleBoard:"W - Veneer (on Particle Board)",
  },

  // Shortish name used in chart row labels (does not have type). !This is being called from CSV files - 2022 EDIT!
  materialName: {
    wpAluminumPanelA:"Aluminum Panel (Anodized)",
    wpAluminumPanelPC:"Aluminum Panel (Powder Coated)",
    wpStainlessSteelSheet:"Stainless Steel Sheet",
    wpPVCFreeRigidSheet:"PVC-Free Rigid Sheet",
    wpVinylRigidSheet:"Vinyl Rigid Sheet",
    sSolidSurface:"Solid Surface",
    sSinteredStone:"Sintered Stone",
    sPorcelainTile:"Porcelain Tile",
    mMetalVeneerPanel:"Metal Veneer Panel",
    mTextile:"Textile",
    mPaint:"Paint",
    mWallpaperNW:"Wallpaper (Non-Woven)",
    mWallpaperPaper:"Wallpaper (Paper)",
    mPlasticLaminate:"Plastic Laminate",
    saCemWdPanel:"Cementitious Wood Panel",
    saAcousticWoodPanel:"Acoustic Wood Panel",
    saPETFeltPanel:"PET Felt Panel",
    saCorkTile:"Cork Tile",
    wBambooPanel:"Bamboo Panel",
    wVeneerMDF:"Veneer (on MDF)",
    wVeneerParticleBoard:"Veneer (on Particle Board)",
  
  },

  // Name with Longer Type prefix used in Chart Hover Popup
  // and used in Modal Material Popup
  materialName2: {
    wpAluminumPanelA:"Wall Protection - Aluminum Panel (Anodized)",
    wpAluminumPanelPC:"Wall Protection - Aluminum Panel (Powder Coated)",
    wpStainlessSteelSheet:"Wall Protection - Stainless Steel Sheet",
    wpPVCFreeRigidSheet:"Wall Protection - PVC-Free Rigid Sheet",
    wpVinylRigidSheet:"Wall Protection - Vinyl Rigid Sheet",
    sSolidSurface:"Stone/Ceramic - Solid Surface",
    sSinteredStone:"Stone/Ceramic - Sintered Stone",
    sPorcelainTile:"Stone/Ceramic - Porcelain Tile",
    mMetalVeneerPanel:"Miscellaneous - Metal Veneer Panel",
    mTextile:"Miscellaneous - Textile",
    mPaint:"Miscellaneous - Paint",
    mWallpaperNW:"Miscellaneous - Wallpaper (Non-Woven)",
    mWallpaperPaper:"Miscellaneous - Wallpaper (Paper)",
    mPlasticLaminate:"Miscellaneous - Plastic Laminate",
    saCemWdPanel:"Sound Absorbing - Cementitious Wood Panel",
    saAcousticWoodPanel:"Sound Absorbing - Acoustic Wood Panel",
    saPETFeltPanel:"Sound Absorbing - PET Felt Panel",
    wBambooPanel:"Wood - Bamboo Panel",
    saCorkTile:"Sound Absorbing - Cork Tile",
    wVeneerMDF:"Wood - Veneer (on MDF)",
    wVeneerParticleBoard:"Wood - Veneer (on Particle Board)",
    

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
