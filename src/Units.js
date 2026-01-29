// Units.js
import { SYSTEM_TYPE_PARTITIONS } from "./CommonUtil";
import { SYSTEM_TYPE_INSULATION } from "./CommonUtil";

export const UNIT_PRESETS = {
  SF: {
    qtyLabel: "Square Feet",
    qtyTotalHtml: "sf²",
    qtyCsv: "sf²",
    gwpUnit: "kgCO₂eq/sf",
    gwpAxisHtml: "kgCO₂eq/sf",
    gwpTrail: "(kgCO2eq/sf)",
    allImpactsSuffix: "/sf",
  },
  LF: {
    qtyLabel: "Linear Feet",
    qtyTotalHtml: "ft",
    qtyCsv: "ft",
    gwpUnit: "kgCO₂eq/lf",
    gwpAxisHtml: "kgCO₂eq/lf",
    gwpTrail: "(kgCO2eq/lf)",
    allImpactsSuffix: "/lf",
  },
  R_SF: {
    qtyLabel: "Square Feet",
    qtyTotalHtml: "sf²",
    qtyCsv: "sf²",
    gwpUnit: "kgCO₂eq/sf per R-1",
    gwpAxisHtml: "kgCO₂eq/sf per R-1",
    gwpTrail: "(kgCO2eq/sf per R-1)",
    allImpactsSuffix: "/sf per R-1",
  }
};

export const unitsForType = (type) => {
  if (type === SYSTEM_TYPE_PARTITIONS) return UNIT_PRESETS.LF;
    if (type === SYSTEM_TYPE_INSULATION) return UNIT_PRESETS.R_SF;
  return UNIT_PRESETS.SF;
};
