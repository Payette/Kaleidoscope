import React from 'react';

import StackedBarChart from './StackedBarChart';

export default ({ type, chartType, lifespan, biogenicCarbon, ready, data, selectedData, metaData }) => {
    if(ready !== true) {
        return null;
    }
          
    return <div style={{ width: "100%"}}>
      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData.length > 0 && lifespan === "tenY" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData}
        allMaterials={data.gwpData}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

      {/* ALL IMPACTS*/}
      {chartType === "allImpacts" && selectedData.allImpactsData.length > 0 && lifespan === "tenY" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData}
        allMaterials={data.allImpactsData}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData.length > 0 && lifespan === "tenY" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData}
        allMaterials={data.lcsData}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData.length > 0 && lifespan === "tenY" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData}
        allMaterials={data.materialData}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData1.length > 0 && lifespan === "tenY" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData1}
        allMaterials={data.gwpData1}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

      {/* ALL IMPACTS*/}
      {chartType === "allImpacts" && selectedData.allImpactsData1.length > 0 && lifespan === "tenY" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData1}
        allMaterials={data.allImpactsData1}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData1.length > 0 && lifespan === "tenY" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData1}
        allMaterials={data.lcsData1}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData1.length > 0 && lifespan === "tenY" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData1}
        allMaterials={data.materialData1}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData2.length > 0 && lifespan === "sixty1" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData2}
        allMaterials={data.gwpData2}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

      {/* ALL IMPACTS*/}
      {chartType === "allImpacts" && selectedData.allImpactsData2.length > 0 && lifespan === "sixty1" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData2}
        allMaterials={data.allImpactsData2}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData2.length > 0 && lifespan === "sixty1" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData2}
        allMaterials={data.lcsData2}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData2 && lifespan === "sixty1" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData2}
        allMaterials={data.materialData2}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData3.length > 0 && lifespan === "sixty1" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData3}
        allMaterials={data.gwpData3}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

            {/* ALL IMPACTS*/}
            {chartType === "allImpacts" && selectedData.allImpactsData3.length > 0 && lifespan === "sixty1" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData3}
        allMaterials={data.allImpactsData3}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData3.length > 0 && lifespan === "sixty1" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData3}
        allMaterials={data.lcsData3}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData3.length > 0 && lifespan === "sixty1" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData3}
        allMaterials={data.materialData3}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData4.length > 0 && lifespan === "sixty2" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData4}
        allMaterials={data.gwpData4}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

      {/* ALL IMPACTS*/}
      {chartType === "allImpacts" && selectedData.allImpactsData4.length > 0 && lifespan === "sixty2" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData4}
        allMaterials={data.allImpactsData4}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData4.length > 0 && lifespan === "sixty2" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData4}
        allMaterials={data.lcsData4}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData4.length > 0 && lifespan === "sixty2" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData4}
        allMaterials={data.materialData4}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* GLOBAL WARMING POTENTIAL */}
      {chartType === "GWP" && data.gwpData5.length > 0 && lifespan === "sixty2" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData5}
        allMaterials={data.gwpData5}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="material"
        currentChart={chartType}
      />}

      {/* ALL IMPACTS*/}
      {chartType === "allImpacts" && selectedData.allImpactsData5.length > 0 && lifespan === "sixty2" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.allImpactsData5}
        allMaterials={data.allImpactsData5}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="Normalized % of Total"
        currentChart={chartType}
      />}

      {/* LIFE CYCLE STAGE */}
      {chartType === "LCS" && selectedData.lcsData5.length > 0 && lifespan === "sixty2" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.lcsData5}
        allMaterials={data.lcsData5}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL BREAKDOWN */}
      {chartType === "MB" && selectedData.materialData5.length > 0 && lifespan === "sixty2" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.materialData5}
        allMaterials={data.materialData5}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData.length > 0 && lifespan === "tenY" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData}
        allMaterials={data.gwpData}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData1.length > 0 && lifespan === "tenY" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData1}
        allMaterials={data.gwpData1}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData2.length > 0 && lifespan === "sixty1" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData2}
        allMaterials={data.gwpData2}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData3.length > 0 && lifespan === "sixty1" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData3}
        allMaterials={data.gwpData3}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData4.length > 0 && lifespan === "sixty2" && biogenicCarbon === "nBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData4}
        allMaterials={data.gwpData4}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}

      {/* MATERIAL HEALTH */}
      {chartType === "MH" && data.gwpData5.length > 0 && lifespan === "sixty2" && biogenicCarbon === "yBio" && <StackedBarChart type={type}
        selectedMaterials={selectedData.gwpData5}
        allMaterials={data.gwpData5}
        metaData={metaData}
        barHeight={40}
        xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
        colorBy="health"
        currentChart={chartType}
      />}
    </div>;
};