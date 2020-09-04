import React, { Component } from 'react';
import StackedBarChart from './StackedBarChart';
import LoadData from './data/LoadData';
import MaterialList from './MaterialList';
import './css/Main.scss';
import styles from './css/App.module.scss';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: "GWP",
      lifespan: "tenY",
      biogenicCarbon: "yBio",
      allImpactsData: [],
      gwpData: [],
      lcsData: [],
      materialData: [],
      allImpactsData1: [],
      gwpData1: [],
      lcsData1: [],
      materialData1: [],
      allImpactsData2: [],
      gwpData2: [],
      lcsData2: [],
      materialData2: [],
      allImpactsData3: [],
      gwpData3: [],
      lcsData3: [],
      materialData3: [],
      allImpactsData4: [],
      gwpData4: [],
      lcsData4: [],
      materialData4: [],
      allImpactsData5: [],
      gwpData5: [],
      lcsData5: [],
      materialData5: [],
      materials: [],
      selectedMaterials: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    LoadData.lcsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData(data => this.setState({ gwpData: data }));

    LoadData.lcsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData1: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData1: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData1(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData1: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData1(data => this.setState({ gwpData1: data }));

    LoadData.lcsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData2: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData2: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData2(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData2: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData2(data => this.setState({ gwpData2: data }));

    LoadData.lcsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData3: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData3: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData3(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData3: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData3(data => this.setState({ gwpData3: data }));

    LoadData.lcsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData4: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData4: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData4(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData4: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData4(data => this.setState({ gwpData4: data }));

    LoadData.lcsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        lcsData5: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.allImpactsData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        allImpactsData5: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });  
    
    LoadData.materialData5(data => {
      const materials = data.map(d => d.material);
      const names = data.map(d => d.name);
      this.setState({
        materialData5: data,
        materials: materials,
        selectedMaterials: materials,
        names: names
      });
    });

    LoadData.gwpData5(data => this.setState({ gwpData5: data }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      console.log('new state: ', this.state);
    });
  }

  updateSelectedMaterials(newSelectedMaterials) {
    this.setState({
      selectedMaterials: newSelectedMaterials
    })
  }

  

  render() {
    const allImpactsDataSelectedMaterialsOnly = this.state.allImpactsData.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly = this.state.gwpData.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly = this.state.lcsData.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly = this.state.materialData.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly1 = this.state.allImpactsData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly1 = this.state.gwpData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly1 = this.state.lcsData1.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly1 = this.state.materialData1.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly2 = this.state.allImpactsData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly2 = this.state.gwpData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly2 = this.state.lcsData2.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly2 = this.state.materialData2.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly3 = this.state.allImpactsData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly3 = this.state.gwpData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly3 = this.state.lcsData3.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly3 = this.state.materialData3.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly4 = this.state.allImpactsData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly4 = this.state.gwpData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly4 = this.state.lcsData4.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly4 = this.state.materialData4.filter(d => this.state.selectedMaterials.includes(d.material));

    const allImpactsDataSelectedMaterialsOnly5 = this.state.allImpactsData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const gwpDataSelectedMaterialsOnly5 = this.state.gwpData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const lcsDataSelectedMaterialsOnly5 = this.state.lcsData5.filter(d => this.state.selectedMaterials.includes(d.material));
    const materialDataSelectedMaterialsOnly5 = this.state.materialData5.filter(d => this.state.selectedMaterials.includes(d.material));

    let chartTitle = "";


    if(this.state.chartType == "GWP"){
      chartTitle = "Global Warming Potential"
    }else if(this.state.chartType == "allImpacts"){
      chartTitle = "All Impacts"
    }else if(this.state.chartType == "LCS"){
      chartTitle = "Life Cycle Stage"
    }else if(this.state.chartType == "MB"){
      chartTitle = "Material Breakdown"
    }

    return (
      <div className="App">
          <form>
          <h1>ENVELOPE ASSEMBLIES</h1>
            <div className={styles.topcontrols}>
              
              <div className={styles.inputgroup}>
                <h3>CHART TYPE</h3>
                  <div className={styles.inputitem}>
                    <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                    <label htmlFor="fGWP">Global Warming Potential</label> <sup id="fnref:1"><a href="#fn:1" rel="footnote"></a></sup>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                    <label htmlFor="allImpacts">All Impacts</label> <sup id="fnref:2"><a href="#fn:2" rel="footnote"></a></sup>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
                    <label htmlFor="LCS">Life Cycle Stage</label> <sup id="fnref:3"><a href="#fn:3" rel="footnote"></a></sup>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
                    <label htmlFor="MB">Material Breakdown</label> <sup id="fnref:4"><a href="#fn:4" rel="footnote"></a></sup>
                  </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>LIFESPAN</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="tenY" name="lifespan" value="tenY" checked={this.state.lifespan === "tenY"} onChange={this.handleInputChange} />
                  <label htmlFor="tenY">10 Year (No Module D.)</label> <sup id="fnref:5"><a href="#fn:5" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty1">60 Year (With Module D)</label> <sup id="fnref:6"><a href="#fn:6" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty2">60 Year (No Module D)</label> <sup id="fnref:7"><a href="#fn:7" rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>BIOGENIC CARBON</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked={this.state.biogenicCarbon === "yBio"} onChange={this.handleInputChange} />
                  <label htmlFor="yBio">With Biogenic Carbon</label> <sup id="fnref:8"><a href="#fn:8" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" checked={this.state.biogenicCarbon === "nBio"} onChange={this.handleInputChange} />
                  <label htmlFor="nBio">No Biogenic Carbon</label> <sup id="fnref:9"><a href="#fn:9" rel="footnote"></a></sup>
                </div>
              </div>
            </div>

            {this.state.materials.length > 0 &&
              <div className={styles.sidebar}>
                <MaterialList
                  materials={this.state.materials}
                  names={this.state.names}
                  updateSelectedMaterials={this.updateSelectedMaterials.bind(this)}
                  initialSelectedMaterials={this.state.selectedMaterials}
                  metaData={LoadData.metaData}
                  currentSel={this.state.chartType}
                />
              </div>
             }

        </form>
        <h2>{chartTitle}</h2>
        {/* GLOBAL WARMING POTENTIAL */}
        <div className={styles.chartContainer}>
        {this.state.chartType === "GWP" && this.state.gwpData.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly}
          allMaterials={this.state.gwpData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly}
          allMaterials={this.state.allImpactsData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly}
          allMaterials={this.state.lcsData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly}
          allMaterials={this.state.materialData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}




        {/* GLOBAL WARMING POTENTIAL */}

        {this.state.chartType === "GWP" && this.state.gwpData1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly1}
          allMaterials={this.state.gwpData1}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly1}
          allMaterials={this.state.allImpactsData1}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly1}
          allMaterials={this.state.lcsData1}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly1.length > 0 && this.state.lifespan === "tenY" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly1}
          allMaterials={this.state.materialData1}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}





        {/* GLOBAL WARMING POTENTIAL */}

        {this.state.chartType === "GWP" && this.state.gwpData2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly2}
          allMaterials={this.state.gwpData2}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly2}
          allMaterials={this.state.allImpactsData2}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly2}
          allMaterials={this.state.lcsData2}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly2.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly2}
          allMaterials={this.state.materialData2}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}





        {/* GLOBAL WARMING POTENTIAL */}

        {this.state.chartType === "GWP" && this.state.gwpData4.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly4}
          allMaterials={this.state.gwpData4}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly4.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly4}
          allMaterials={this.state.allImpactsData4}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly4.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly4}
          allMaterials={this.state.lcsData4}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty1" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly3}
          allMaterials={this.state.materialData3}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}



        {/* GLOBAL WARMING POTENTIAL */}

        {this.state.chartType === "GWP" && this.state.gwpData3.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly3}
          allMaterials={this.state.gwpData3}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly3}
          allMaterials={this.state.allImpactsData3}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly3}
          allMaterials={this.state.lcsData3}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly3.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "nBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly3}
          allMaterials={this.state.materialData3}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}





        {/* GLOBAL WARMING POTENTIAL */}

        {this.state.chartType === "GWP" && this.state.gwpData5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" &&<StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly5}
          allMaterials={this.state.gwpData5}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          colorBy="material"
          currentChart={this.state.chartType}
        />}
        {/* ALL IMPACTS*/}
        
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly5}
          allMaterials={this.state.allImpactsData5}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="Normalized % of Total"
          currentChart={this.state.chartType}
        />}
        {/* LIFE CYCLE STAGE */}
        
        {this.state.chartType === "LCS" && lcsDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={lcsDataSelectedMaterialsOnly5}
          allMaterials={this.state.lcsData5}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        {/* MATERIAL BREAKDOWN */}
       
        {this.state.chartType === "MB" && materialDataSelectedMaterialsOnly5.length > 0 && this.state.lifespan === "sixty2" && this.state.biogenicCarbon === "yBio" && <StackedBarChart
          selectedMaterials={materialDataSelectedMaterialsOnly5}
          allMaterials={this.state.materialData5}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="GWP (kgCO&#x2082;eq/sf)"
          currentChart={this.state.chartType}
        />}
        
        </div>
        <div className="footnotes">
        <ol>
          <li className="footnote" id="fn:1">
					<p>Greenhouse gas emissions shown in equivalent units of carbon dioxide. Most impactful factor to reduce to meet climate change goals.</p>
			</li>
            <li className="footnote" id="fn:2">
            <p>Weighted LCA normalized across all systems. Includes global warming potential, non-renewable energy demand, eutrophication, smog creation, acidification, and ozone depletion. See methodology below for more info.</p>
			</li>
      <li className="footnote" id="fn:3">
					<p>Results broken into life cycle stage.</p>
			</li>
            <li className="footnote" id="fn:4">
            <p>Global Warming Potential broken down into parts of the assembly: exterior finish, finish support, thermal insulation, and other.</p>
			</li>
      <li className="footnote" id="fn:5">
					<p>Data adjusted for the time value of carbon. It does not include End of Life or Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
			</li>
            <li className="footnote" id="fn:6">
            <p>Data included Module D life cycle stage, which accounts for reuse potential beyond system boundary.</p>
			</li>
      <li className="footnote" id="fn:7">
					<p>Data does not include Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
			</li>
            <li className="footnote" id="fn:8">
            <p>Takes into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents FSC or sustainable forestry. </p>
			</li>
      <li className="footnote" id="fn:9">
					<p>Does not take into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents typical forestry practices.</p>

			</li>


        </ol>
        </div>




      </div>
    );
  }
}

export default App;

