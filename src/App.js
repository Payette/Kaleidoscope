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
      materials: [],
      selectedMaterials: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    LoadData.allImpactsData(data => {
      const materials = data.map(d => d.material);
      this.setState({
        allImpactsData: data,
        materials: materials,
        selectedMaterials: materials
      });
    });
    LoadData.gwpData(data => this.setState({ gwpData: data }));
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

    return (
      <div className="App">
          <form>
            <div className={styles.topcontrols}>
              <div className={styles.inputgroup}>
                <h3>CHART TYPE</h3>
                  <div className={styles.inputitem}>
                    <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                    <label htmlFor="fGWP">Global Warming Potential</label>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                    <label htmlFor="allImpacts">All Impacts</label>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
                    <label htmlFor="LCS">Life Cycle Stage</label>
                  </div>
                  <div className={styles.inputitem}>
                    <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
                    <label htmlFor="MB">Material Breakdown</label>
                  </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>LIFESPAN</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="tenY" name="lifespan" value="tenY" checked={this.state.lifespan === "tenY"} onChange={this.handleInputChange} />
                  <label for="tenY">10 Year (No Mod D.)</label>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label for="sixty1">60 Year (With Mod D)</label>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label for="sixty2">60 Year (No Mod D)</label>
                </div>
              </div>

              <div className={styles.inputgroup}>
                <h3>BIOGENIC CARBON</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked={this.state.biogenicCarbon === "yBio"} onChange={this.handleInputChange} />
                  <label for="yBio">With Biogenic Carbon</label>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" checked={this.state.biogenicCarbon === "nBio"} onChange={this.handleInputChange} />
                  <label for="nBio">No Biogenic Carbon</label>
                </div>
              </div>
            </div>

            {this.state.materials.length > 0 &&
              <div className={styles.sidebar}>
                <MaterialList
                  materials={this.state.materials}
                  updateSelectedMaterials={this.updateSelectedMaterials.bind(this)}
                  initialSelectedMaterials={this.state.selectedMaterials}
                  metaData={LoadData.metaData}
                />
              </div>
             }

        </form>

        <div className={styles.chartContainer}>
        {this.state.chartType === "allImpacts" && allImpactsDataSelectedMaterialsOnly.length > 0 && <StackedBarChart
          selectedMaterials={allImpactsDataSelectedMaterialsOnly}
          allMaterials={this.state.allImpactsData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="% of Total"
        />}

        {this.state.chartType === "GWP" && this.state.gwpData.length > 0 && <StackedBarChart
          selectedMaterials={gwpDataSelectedMaterialsOnly}
          allMaterials={this.state.gwpData}
          metaData={LoadData.metaData}
          barHeight={40}
          xAxisLabel="kg CO2eq"
          colorBy="material"
        />}
        </div>




      </div>
    );
  }
}

export default App;
