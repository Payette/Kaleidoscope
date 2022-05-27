import React, { Component } from 'react';
import _ from 'lodash';
import LoadData from './data/Envelopes_LoadData';
import FlooringLoadData from './data/Flooring_LoadData';
import MaterialList from './MaterialList';
import Row from "./Row";
import { Tabs, AppBar, Tab } from '@material-ui/core';
import TabPanel from "./TabPanel";
import withSplashScreen from './withSplashScreen';
import Dialog from 'react-a11y-dialog';
import { SYSTEM_TYPE_FLOORING, SYSTEM_TYPE_CEILINGS, SYSTEM_TYPE_ENVELOPES, DATASET_NAMES } from './Constants';
import { Helmet } from "react-helmet";
import ChartContainerEnvelopes from './ChartContainerEnvelopes';
import './css/Main.scss';
import styles from './css/App.module.scss';


let materialListEnvelope = [
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

let materialListFlooring = [
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 1,
      chartType: "GWP",
      lifespan: "tenY",
      biogenicCarbon: "yBio",

      materials: [],
      selectedMaterials: [],

      flooring_materials: [],
      flooring_selectedMaterials: [],


      currentRadio: 1,
      rows: [
        { value: 'row1', checked: false },
        { value: 'row2', checked: false },
      ],
      value: parseInt(props.item),
      anchorEl: null,
      currentToolTip: null,
      systemString: "",
      lens: "0_0_0",
      shareableUrl: "https://www.payette.com/kaleidoscope/"
    };

    DATASET_NAMES.forEach(dataSetName => {
      this.state[dataSetName] = [];
      this.state[`flooring_${dataSetName}`] = [];
    })
   
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick = (e) => {
    this.setAnchorEl(e.currentTarget);
  }

  handleClose = () => {
    this.setAnchorEl(null)
  }

  setAnchorEl = (target) => {
    let placeholder = null
    if (target) {
      placeholder = target.id
    }
    this.setState({ anchorEl: target, currentToolTip: placeholder });
  }

  handleChange = (event, newValue) => { // tab button click
    let value = newValue
    if (this.state.selectedMaterials.length != 0) {
      this.setState({ value: newValue, selectedMaterials: this.state.selectedMaterials });
    } else {
      this.setState({ value: newValue, selectedMaterials: this.state.materials });
    }

    if (this.state.flooring_selectedMaterials.length != 0) {
      this.setState({ value: newValue, flooring_selectedMaterials: this.state.flooring_selectedMaterials });
    } else {
      this.setState({ value: newValue, flooring_selectedMaterials: this.state.flooring_materials });
    }

    let urlVar = new URLSearchParams()
    urlVar.set("type", newValue)
    window.history.replaceState({}, '', "?" + urlVar.toString())
  };

  updateValue = (e, idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].value = e.target.value;
    this.setState({
      rows,
    });
  }

  onChecked = (idx) => {
    const rows = [...this.state.rows];  // copy array because we don't want to mutate the previous one
    rows[idx].checked = !rows[idx].checked;
    this.setState({
      rows,
    });
  }

  addRow = () => {
    const rows = [...this.state.rows,
    { value: '', checked: false }
    ];
    this.setState({
      rows,
    });
  }

  deleteRows = () => {
    let oh = this.state.rows.pop();
    this.setState({
      rows: this.state.rows
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevState, this.state)) {      
      // package all data into an array
      let dataEnvelopes = {};
      let selectedDataEnvelopes = {};
      DATASET_NAMES.forEach(dataSetName => {
        dataEnvelopes[dataSetName] = this.state[dataSetName] || [];
        if(this.state.selectedMaterials && this.state.selectedMaterials.length > 0) {
          selectedDataEnvelopes[dataSetName] = dataEnvelopes[dataSetName].filter(d => (this.state.selectedMaterials).includes(d.material));
        } else {
          selectedDataEnvelopes[dataSetName] = [];
        }
      });
      // data set is ready if ALL datasets have loaded
      let dataEnvelopesReady = true;
      DATASET_NAMES.forEach(dataSetName => {
        dataEnvelopesReady = dataEnvelopesReady && (dataEnvelopes[dataSetName] && dataEnvelopes[dataSetName].length > 0);
      });
      if(dataEnvelopesReady) {
        this.setState({
          dataEnvelopes, selectedDataEnvelopes, dataEnvelopesReady
        })          
      }

      // flooring
      // package all data into an array
      let flooring_dataEnvelopes = {};
      let flooring_selectedDataEnvelopes = {};
      DATASET_NAMES.forEach(dataSetName => {
        let flooring_dataSetName = `flooring_${dataSetName}`;
        flooring_dataEnvelopes[dataSetName] = this.state[flooring_dataSetName] || [];
        if(this.state.flooring_selectedMaterials && this.state.flooring_selectedMaterials.length > 0) {
          flooring_selectedDataEnvelopes[dataSetName] = flooring_dataEnvelopes[dataSetName].filter(d => (this.state.flooring_selectedMaterials).includes(d.material));
        } else {
          flooring_selectedDataEnvelopes[dataSetName] = [];
        }
      });
      // data set is ready if ALL datasets have loaded
      let flooring_dataEnvelopesReady = true;
      DATASET_NAMES.forEach(dataSetName => {
        flooring_dataEnvelopesReady = flooring_dataEnvelopesReady && (flooring_dataEnvelopes[dataSetName] && flooring_dataEnvelopes[dataSetName].length > 0);
      });
      if(flooring_dataEnvelopesReady) {
        this.setState({
          flooring_dataEnvelopes, flooring_selectedDataEnvelopes, flooring_dataEnvelopesReady
        })          
      }

      let s = new URLSearchParams(window.location.search)
      let type = s.get("type")
      let mSystem = s.get("system")
      let mLenses = s.get("lens")
      let mChartType = s.get("chartType")
      let mLifespan = s.get("lifespan")
      let mBiogenicCarbon = s.get("biogenicCarbon")

      if (mSystem == null) {
        mSystem = "0_1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_"
      }
      if (type == null) {
        type = 0
      }
      if (mLenses == null) {
        mLenses = "0_0_0"
      }

      if (mChartType == null) {
        mChartType = this.state.chartType
      }

      if (mLifespan == null) {
        mLifespan = this.state.lifespan
      }

      if (mBiogenicCarbon == null) {
        mBiogenicCarbon = this.state.biogenicCarbon
      }


      this.setState({
        systemString: mSystem,
        chartType: mChartType,
        lifespan: mLifespan,
        biogenicCarbon: mBiogenicCarbon
      })
      if (type == 0) { //envelope
        let names = mSystem.split("_")

        names.pop()

        let allSystems = [
          "MVGranite",
          "MVLimestone",
          "MVBrick",
          "MVTBrick",
          "MInsMePanel",
          "MEIFS",
          "MPrecast",
          "MMinWool",
          "CSpandrelAlumB",
          "CSpandrelSteel",
          "CSpandrelAlum",
          "CSpandrelWood",
          "RGFRC",
          "RACM",
          "RTerracotta",
          "RPhenResin",
          "RFiberCement",
          "RZinc",
          "RUHPC",
          "RGranite",
          "RTBrick",
          "RLimestone",
          "RSteel",
          "RWood"
        ]
        let urlSelectedMaterials = []

        for (let i = 0; i < names.length; i++) {
          urlSelectedMaterials.push(allSystems[parseInt(names[i])])
        }

        this.setState(
          {
            value: 0,
            systemString: mSystem,
            selectedMaterials: urlSelectedMaterials
          }
        )
      } else if (type == 1) { //flooring
        let names = mSystem.split("_")

        names.pop()

        let allSystems = [
          "sGranite",
          "sSlate",
          "sCeramic",
          "rRubber",
          "rVinyl",
          "rLinoTile",
          "mConcrete",
          "mTerrazzo",
          "mEpoxy",
          "cHigh",
          "cMedium",
          "cLow",
          "wEngineered",
          "wBamboo",
          "wCork",
          "wSoftwood",
          "wHardwood"
        ]
        let urlSelectedMaterials = []

        for (let i = 0; i < names.length; i++) {
          urlSelectedMaterials.push(allSystems[parseInt(names[i])])
        }

        this.setState(
          {
            value: 1,
            systemString: mSystem,
            flooring_selectedMaterials: urlSelectedMaterials
          }
        )
      }


      let urlVar = new URLSearchParams()
      urlVar.set("type", this.state.value)
      urlVar.set("system", this.state.systemString)
    }
  }

  componentDidMount() {
    let s = new URLSearchParams(window.location.search)
    let type = s.get("type")
    let mSystem = s.get("system")
    this.setState({ systemString: mSystem })
    if (type == 0) { //envelope
      let names = this.state.systemString.split("_")

      names.pop()

      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
      ]

      let urlSelectedMaterials = []

      for (let i = 0; i < names.length; i++) {
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      this.setState(
        {
          value: 0,
          systemString: mSystem,
          selectedMaterials: urlSelectedMaterials
        }
      )
    } else if (type == 1) { //envelope
      let names = this.state.systemString.split("_")

      names.pop()

      let allSystems = [
        "sGranite",
        "sSlate",
        "sCeramic",
        "rRubber",
        "rVinyl",
        "rLinoTile",
        "mConcrete",
        "mTerrazzo",
        "mEpoxy",
        "cHigh",
        "cMedium",
        "cLow",
        "wEngineered",
        "wBamboo",
        "wCork",
        "wSoftwood",
        "wHardwood"
      ]

      let urlSelectedMaterials = []

      for (let i = 0; i < names.length; i++) {
        urlSelectedMaterials.push(allSystems[parseInt(names[i])])
      }

      this.setState(
        {
          value: 1,
          systemString: mSystem,
          flooring_selectedMaterials: urlSelectedMaterials
        }
      )
    }

    DATASET_NAMES.forEach((dataSetName, idx) => {
      LoadData[dataSetName](data => {        
        if(idx === 0) {
          const materials = data.map(d => d.material);
          const names = data.map(d => d.name);
          this.setState({
            [dataSetName]: data,
            materials: materials,
            names: names
          });
        } else {
          this.setState({ [dataSetName]: data });
        }
      });

      FlooringLoadData[dataSetName](data => {        
        if(idx === 0) {
          const materials = data.map(d => d.material);
          const names = data.map(d => d.name);
          this.setState({
            [`flooring_${dataSetName}`]: data,
            flooring_materials: materials,
            flooring_names: names
          });
        } else {
          this.setState({ [`flooring_${dataSetName}`]: data });
        }
      });
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      // nothing
    });
  }

  constructURL() {
    let urlVar = new URLSearchParams()
    urlVar.set("type", this.state.value)
    let selectedString = ""
    if (this.state.value == 0) {
      let allSystems = [
        "MVGranite",
        "MVLimestone",
        "MVBrick",
        "MVTBrick",
        "MInsMePanel",
        "MEIFS",
        "MPrecast",
        "MMinWool",
        "CSpandrelAlumB",
        "CSpandrelSteel",
        "CSpandrelAlum",
        "CSpandrelWood",
        "RGFRC",
        "RACM",
        "RTerracotta",
        "RPhenResin",
        "RFiberCement",
        "RZinc",
        "RUHPC",
        "RGranite",
        "RTBrick",
        "RLimestone",
        "RSteel",
        "RWood"
      ]
      for (let i = 0; i < allSystems.length; i++) {
        if (this.state.selectedMaterials.includes(allSystems[i])) {
          selectedString += i + "_"
        }
      }
    } else {
      let allSystems = [
        "sGranite",
        "sSlate",
        "sCeramic",
        "rRubber",
        "rVinyl",
        "rLinoTile",
        "mConcrete",
        "mTerrazzo",
        "mEpoxy",
        "cHigh",
        "cMedium",
        "cLow",
        "wEngineered",
        "wBamboo",
        "wCork",
        "wSoftwood",
        "wHardwood"
      ]
      for (let i = 0; i < allSystems.length; i++) {
        if (this.state.flooring_selectedMaterials.includes(allSystems[i])) {
          selectedString += i + "_"
        }
      }
    }
    urlVar.set("system", selectedString)

    urlVar.set("chartType", this.state.chartType)
    urlVar.set("lifespan", this.state.lifespan)
    urlVar.set("biogenicCarbon", this.state.biogenicCarbon)

    this.setState({
      shareableUrl: "https://www.payette.com/kaleidoscope/?" + urlVar.toString()
    }, () => {
      this.materialsDialogRef.show();
    })
  }

  updateSelectedMaterials(newSelectedMaterials) {
    let selectedString = ""
    let allSystems = [
      "MVGranite",
      "MVLimestone",
      "MVBrick",
      "MVTBrick",
      "MInsMePanel",
      "MEIFS",
      "MPrecast",
      "MMinWool",
      "CSpandrelAlumB",
      "CSpandrelSteel",
      "CSpandrelAlum",
      "CSpandrelWood",
      "RGFRC",
      "RACM",
      "RTerracotta",
      "RPhenResin",
      "RFiberCement",
      "RZinc",
      "RUHPC",
      "RGranite",
      "RTBrick",
      "RLimestone",
      "RSteel",
      "RWood"
    ]
    for (let i = 0; i < allSystems.length; i++) {
      if (newSelectedMaterials.includes(allSystems[i])) {
        selectedString += i + "_"
      }
    }

    this.setState({ systemString: selectedString })

    let urlVar = new URLSearchParams()
    urlVar.set("type", this.state.value)
    this.setState({
      selectedMaterials: newSelectedMaterials
    })
    urlVar.set("system", selectedString)
    window.history.replaceState({}, '', "?" + urlVar.toString())
  }

  updateSelectedFlooringMaterials(flooring_newSelectedMaterials) {
    let selectedString = ""
    let allSystems = [
      "sGranite",
      "sSlate",
      "sCeramic",
      "rRubber",
      "rVinyl",
      "rLinoTile",
      "mConcrete",
      "mTerrazzo",
      "mEpoxy",
      "cHigh",
      "cMedium",
      "cLow",
      "wEngineered",
      "wBamboo",
      "wCork",
      "wSoftwood",
      "wHardwood"
    ]
    for (let i = 0; i < allSystems.length; i++) {
      if (flooring_newSelectedMaterials.includes(allSystems[i])) {
        selectedString += i + "_"
      }
    }

    this.setState({ systemString: selectedString })

    let urlVar = new URLSearchParams()
    urlVar.set("type", this.state.value)
    this.setState({
      flooring_selectedMaterials: flooring_newSelectedMaterials
    })
    urlVar.set("system", selectedString)
    window.history.replaceState({}, '', "?" + urlVar.toString())
  }

  radioChange(e) {
    let currentRad = e.target.value;
    this.state.currentRadio = currentRad;
    this.setState({ currentRadio: currentRad });
  }

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? 'simple-popover' : undefined;

    var obj = {
      "Material": "void"
    };

    if(this.state.dataEnvelopesReady) {
      for (let i = 0; i < this.state.selectedDataEnvelopes.gwpData.length; i++) {
        let myName = this.state.selectedDataEnvelopes.gwpData[i].material;
        let myVal = this.state.selectedDataEnvelopes.gwpData[i].value;
        obj[myName] = myVal;
      }
    }

    var flooring_obj = {
      "Material": "void"
    };

    if(this.state.flooring_dataEnvelopesReady) {
      for (let i = 0; i < this.state.flooring_selectedDataEnvelopes.gwpData.length; i++) {
        let myName = this.state.flooring_selectedDataEnvelopes.gwpData[i].material;
        let myVal = this.state.flooring_selectedDataEnvelopes.gwpData[i].value;
        flooring_obj[myName] = myVal;
      }
    }

    let chartTitle = "";

    if (this.state.chartType === "GWP") {
      chartTitle = "Global Warming Potential"
    } else if (this.state.chartType === "allImpacts") {
      chartTitle = "All Impacts"
    } else if (this.state.chartType === "LCS") {
      chartTitle = "Life Cycle Stage"
    } else if (this.state.chartType === "MB") {
      chartTitle = "Material Breakdown"
    } else if (this.state.chartType === "MH") {
      chartTitle = "Material Health Impact"
    }

    // DETERMINE THE SIZE OF THE ENVELOPE CALCULATOR
    let sidebar1 = document.getElementById("sidebar123");
    let parentD = document.getElementById("parentDiv");

    let calcWidth = 31
    let sidebarHeight = 0

    if (sidebar1 && parentD && window.innerWidth > 1200) {
      sidebarHeight = 300 + sidebar1.offsetHeight;
      calcWidth = (((window.innerWidth - 355) - (window.innerWidth / 25)) / 2) / window.innerWidth * 100
    } else if (window.innerWidth <= 1200 && window.innerWidth > 800) {
      calcWidth = 48
    } else {
      calcWidth = 98
    }

    var divStyle = {
      width: calcWidth + '%',
      display: 'inline-block',
      marginRight: '1%',
      marginLeft: '1%',
      marginBottom: "10px"
    };

    return (
      <div className="App" style={{ minHeight: sidebarHeight }}>
        <Dialog id="materialdetailsdialog"
          appRoot="#root"
          dialogRoot="#dialog-root"
          dialogRef={(dialog) => (this.materialsDialogRef = dialog)}
          // title={this.state.materialPopup.name}
          classNames={{
            overlay: "dialog-overlay",
            closeButton: "dialog-close",
            element: "dialog-content-top",
            base: "dialog"
          }}
          style={{ width: 500 }}
        >
          <span>
            <h2 style={{ fontSize: "40px" }}>Copy Link Below to Share URL</h2>
            <h2 style={{ fontSize: "12px", textAlign: "center" }}>{this.state.shareableUrl}</h2>

          </span>
        </Dialog>

        <h3 style={{ position: "absolute", right: "25px", top: "120px" }}>
          <button onClick={this.constructURL.bind(this)} style={{ borderRadius: "5px", padding: "5px" }}>Share Link</button>
        </h3>

        <AppBar position="static" style={{ background: 'white', color: 'black', boxShadow: "none" }}>
          <Tabs value={this.state.value} indicatorColor="secondary" textColor="secondary"
            centered onChange={this.handleChange}>
            <Tab label="ENVELOPES" />
            <Tab label="FLOORING" />
            <Tab label="CEILINGS" />
            <Tab label="OTHER" disabled />
          </Tabs>
        </AppBar>

        {/* ENVELOPES */}
        <TabPanel value={this.state.value} index={0}>
          <Helmet>
            <script type="text/javascript" src="bf.js"></script>
          </Helmet>
          <form>
            <h1>ENVELOPE ASSEMBLIES</h1>

            <div className={styles.topcontrols}>

              <div className={styles.inputgroup}>
                <h3>CHART TYPE</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                  <label htmlFor="fGWP">Global Warming Potential <sup id="fnref:1"><a href="#fn:1" rel="footnote"></a></sup></label>
                </div>

                <div className={styles.inputitem}>
                  <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                  <label htmlFor="allImpacts">All Impacts <sup id={"fnref:2"}><a href={"#fn:2"} rel="footnote"></a></sup></label>
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
                  <label htmlFor="tenY">Initial Carbon (only Module A)</label> <sup id="fnref:5"><a href="#fn:5" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty2">60 Year (With Module D)</label> <sup id="fnref:6"><a href="#fn:6" rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty1">60 Year (No Module D)</label> <sup id="fnref:7"><a href="#fn:7" rel="footnote"></a></sup>
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

          </form>
          <div style={{ display: "inline-block", height: "100%" }} id="parentDiv">
            {this.state.materials.length > 0 &&
              <div className={styles.sidebar} id="sidebar123">
                <MaterialList
                  type={SYSTEM_TYPE_ENVELOPES}
                  gwp={obj}
                  materials={this.state.materials}
                  names={this.state.names}
                  updateSelectedMaterials={this.updateSelectedMaterials.bind(this)}
                  initialSelectedMaterials={this.state.selectedMaterials}
                  metaData={LoadData.metaData}
                  currentSel={this.state.chartType}
                  matBreakdown={this.state.materialData1}
                  matBreakdown1={this.state.materialData3}
                  matBreakdown2={this.state.materialData5}
                  tenYGWP={this.state.gwpData1}
                  sixty1YGWP={this.state.gwpData3}
                  sixty2YGWP={this.state.gwpData5}
                />
              </div>
            }
            <h2>{chartTitle}</h2>
            <div className={styles.chartContainer}>
              {this.state.dataEnvelopesReady && <ChartContainerEnvelopes
                type={SYSTEM_TYPE_ENVELOPES}
                chartTitle
                chartType={this.state.chartType}
                lifespan={this.state.lifespan}
                biogenicCarbon={this.state.biogenicCarbon}
                selectedMaterials={this.state.selectedMaterials}
                metaData={LoadData.metaData}
                data={this.state.dataEnvelopes || {}}
                selectedData={this.state.selectedDataEnvelopes || {}}
                ready={this.state.dataEnvelopesReady === true}
              />}
            </div>
          </div>

          {/* Envelope Calculator */}
          <div style={{ display: "inline-block", width: "100%" }}>
            <h1>ENVELOPE CALCULATOR</h1>
            <div className={styles.calc} style={{ minHeight: '60px', display: "block" }}>

              <div style={{ margin: "auto" }}>
                <input type="radio" id="ten" name={"gender"} value="1" onChange={this.radioChange.bind(this)} defaultChecked></input>
                <label for="ten"> Initial Carbon (only Module A) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty2" name={"gender"} value="3" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty2"> 60 Year (with Module D) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty1" name={"gender"} value="2" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty1"> 60 Year (no Module D) &nbsp;&nbsp;</label>
              </div><br></br>

              {this.state.rows.map((row, idx) => {
                return (
                  <Row
                    materialList={materialListEnvelope}
                    key={idx}
                    value={row.value}
                    checked={row.checked}
                    name={idx + 1}
                    count={0}
                    tenY={this.state.gwpData1}
                    sixty1={this.state.gwpData3}
                    sixty2={this.state.gwpData5}
                    radio={this.state.currentRadio}
                    divStyle={divStyle}
                    onChange={(e) => this.updateValue(e, idx)}
                    onChecked={() => this.onChecked(idx)}
                  />
                )
              })
              }
              <br></br>

              <button onClick={this.addRow}>
                Add Option
              </button>
              <button onClick={this.deleteRows}>
                Delete Option
              </button>


              <br></br>


            </div>

            <div style={{ paddingTop: 0, top: 0, marginTop: 0 }}>
              <p className={styles.serif} style={{ display: "inline-block" }}>
                Last updated April 2021<br></br>
                Credit: <i>Data analysis run using Tally version 2020.06.09.01 by KT Innovations, thinkstep, and Autodesk using industry standard EPDs unless otherwise noted </i><br></br>
                For questions or comments: <h5 style={{ display: "inline-block" }}>tools@payette.com</h5>, Source code: <h5 style={{ display: "inline-block" }}><a href="https://github.com/Payette/Kaleidoscope">github.com/Payette/Kaleidoscope</a></h5>
              </p>
            </div>

          </div>
          <br></br>
        </TabPanel>

        {/* FLOORING */}
        <TabPanel value={this.state.value} index={1}>
          <Helmet>
            <script type="text/javascript" src="bf3.js"></script>
          </Helmet>
          <form>
            <h1>FLOOR ASSEMBLIES</h1>
            <div className={styles.topcontrols}>

              <div className={styles.inputgroup} style={{ minHeight: 195 }}>
                <h3>CHART TYPE</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="GWP" value="GWP" name="chartType" checked={this.state.chartType === "GWP"} onChange={this.handleInputChange} />
                  <label htmlFor="fGWP">Global Warming Potential <sup id={"fnref:11"}><a href={"#fn:11"} rel="footnote"></a></sup></label>

                </div>

                <div className={styles.inputitem}>
                  <input type="radio" id="allImpacts" name="chartType" value="allImpacts" checked={this.state.chartType === "allImpacts"} onChange={this.handleInputChange} />
                  <label htmlFor="allImpacts">All Impacts <sup id={"fnref:" + this.state.clicks + "2"}><a href={"#fn:" + this.state.clicks + "2"} rel="footnote"></a></sup></label>


                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="LCS" value="LCS" name="chartType" checked={this.state.chartType === "LCS"} onChange={this.handleInputChange} />
                  <label htmlFor="LCS">Life Cycle Stage</label> <sup id={"fnref:" + this.state.clicks + "3"}><a href={"#fn:" + this.state.clicks + "3"} rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="MB" value="MB" name="chartType" checked={this.state.chartType === "MB"} onChange={this.handleInputChange} />
                  <label htmlFor="MB">Material Breakdown</label> <sup id={"fnref:" + this.state.clicks + "4"}><a href={"#fn:" + this.state.clicks + "4"} rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="MH" value="MH" name="chartType" checked={this.state.chartType === "MH"} onChange={this.handleInputChange} />
                  <label htmlFor="MH">Material Health Impacts</label> <sup id="fnref:10"><a href="#fn:10" rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup} style={{ minHeight: 195 }}>
                <h3>LIFESPAN</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="tenY" name="lifespan" value="tenY" checked={this.state.lifespan === "tenY"} onChange={this.handleInputChange} />
                  <label htmlFor="tenY">Initial Carbon (only Module A)</label> <sup id={"fnref:" + this.state.clicks + "5"}><a href={"#fn:" + this.state.clicks + "5"} rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty2" name="lifespan" value="sixty2" checked={this.state.lifespan === "sixty2"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty2">60 Year (With Module D)</label> <sup id={"fnref:" + this.state.clicks + "6"}><a href={"#fn:" + this.state.clicks + "6"} rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="sixty1" name="lifespan" value="sixty1" checked={this.state.lifespan === "sixty1"} onChange={this.handleInputChange} />
                  <label htmlFor="sixty1">60 Year (No Module D)</label> <sup id={"fnref:" + this.state.clicks + "7"}><a href={"#fn:" + this.state.clicks + "7"} rel="footnote"></a></sup>
                </div>
              </div>

              <div className={styles.inputgroup} style={{ minHeight: 195 }}>
                <h3>BIOGENIC CARBON</h3>
                <div className={styles.inputitem}>
                  <input type="radio" id="yBio" name="biogenicCarbon" value="yBio" checked={this.state.biogenicCarbon === "yBio"} onChange={this.handleInputChange} />
                  <label htmlFor="yBio">With Biogenic Carbon</label> <sup id={"fnref:" + this.state.clicks + "8"}><a href={"#fn:" + this.state.clicks + "8"} rel="footnote"></a></sup>
                </div>
                <div className={styles.inputitem}>
                  <input type="radio" id="nBio" name="biogenicCarbon" value="nBio" checked={this.state.biogenicCarbon === "nBio"} onChange={this.handleInputChange} />
                  <label htmlFor="nBio">No Biogenic Carbon</label> <sup id={"fnref:" + this.state.clicks + "9"}><a href={"#fn:" + this.state.clicks + "9"} rel="footnote"></a></sup>
                </div>
              </div>
            </div>

          </form>
          <div style={{ display: "inline-block", height: "100%" }} id="parentDiv">

            {this.state.flooring_materials.length > 0 &&
              <div className={styles.sidebar} id="sidebar123">
                <MaterialList
                  type={SYSTEM_TYPE_FLOORING}
                  gwp={flooring_obj}
                  materials={this.state.flooring_materials}
                  names={this.state.flooring_names}
                  updateSelectedMaterials={this.updateSelectedFlooringMaterials.bind(this)}
                  initialSelectedMaterials={this.state.flooring_selectedMaterials}
                  metaData={FlooringLoadData.metaData}
                  currentSel={this.state.chartType}
                  matBreakdown={this.state.flooring_materialData1}
                  matBreakdown1={this.state.flooring_materialData3}
                  matBreakdown2={this.state.flooring_materialData5}
                  tenYGWP={this.state.flooring_gwpData1}
                  sixty1YGWP={this.state.flooring_gwpData3}
                  sixty2YGWP={this.state.flooring_gwpData5}
                />
              </div>
            }
            <h2>{chartTitle}</h2>
            <div className={styles.chartContainer}>
              {this.state.flooring_dataEnvelopesReady && <ChartContainerEnvelopes
                  type={SYSTEM_TYPE_FLOORING}
                  chartTitle
                  chartType={this.state.chartType}
                  lifespan={this.state.lifespan}
                  biogenicCarbon={this.state.biogenicCarbon}
                  selectedMaterials={this.state.selectedMaterials}
                  metaData={FlooringLoadData.metaData}
                  data={this.state.flooring_dataEnvelopes || {}}
                  selectedData={this.state.flooring_selectedDataEnvelopes || {}}
                  ready={this.state.flooring_dataEnvelopesReady === true}
                />}
            </div>
          </div>
          <div style={{ display: "inline-block", width: "100%" }}>
            <h1>FLOORING CALCULATOR</h1>
            <div className={styles.calc} style={{ minHeight: '60px', display: "block" }}>

              <div style={{ margin: "auto" }}>
                <input type="radio" id="ten" name={"gender"} value="1" onChange={this.radioChange.bind(this)} defaultChecked></input>
                <label for="ten"> Initial Carbon (only Module A) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty2" name={"gender"} value="3" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty2"> 60 Year (with Module D) &nbsp;&nbsp;</label>
                <input type="radio" id="sixty1" name={"gender"} value="2" onChange={this.radioChange.bind(this)} ></input>
                <label for="sixty1"> 60 Year (no Module D) &nbsp;&nbsp;</label>



              </div><br></br>

              {this.state.rows.map((row, idx) => {
                return (
                  <Row
                    materialList={materialListFlooring}
                    key={idx}
                    value={row.value}
                    checked={row.checked}
                    name={idx + 1}
                    count={0}
                    tenY={this.state.flooring_gwpData1}
                    sixty1={this.state.flooring_gwpData3}
                    sixty2={this.state.flooring_gwpData5}
                    radio={this.state.currentRadio}
                    divStyle={divStyle}
                    onChange={(e) => this.updateValue(e, idx)}
                    onChecked={() => this.onChecked(idx)}
                  />
                )
              })
              }
              <br></br>

              <button onClick={this.addRow}>
                Add Option
              </button>
              <button onClick={this.deleteRows}>
                Delete Option
              </button>


              <br></br>


            </div>

            <div style={{ paddingTop: 0, top: 0, marginTop: 0 }}>
              <p className={styles.serif} style={{ display: "inline-block" }}>
                Last updated April 2021<br></br>
                Credit: <i>Data analysis run using Tally version 2020.06.09.01 by KT Innovations, thinkstep, and Autodesk using industry standard EPDs unless otherwise noted </i><br></br>
                For questions or comments: <h5 style={{ display: "inline-block" }}>tools@payette.com</h5>, Source code: <h5 style={{ display: "inline-block" }}><a href="https://github.com/Payette/Kaleidoscope">github.com/Payette/Kaleidoscope</a></h5>

              </p>
            </div>
          </div>
        </TabPanel>

        {/* CEILINGS */}
        <TabPanel value={this.state.value} index={2}>
          Ceilings
        </TabPanel>

        {/* OTHER */}
        <TabPanel value={this.state.value} index={3}>
          Other
        </TabPanel>

        <div className="footnotes" style={{ visibility: "hidden", height: "0px" }}>
          <ol>
            <li className="footnote" id="fn:1">
              <p>Greenhouse gas emissions shown in equivalent units of carbon dioxide. Most impactful factor to reduce to meet climate change goals.</p>
            </li>
            <li className="footnote" id={"fn:2"}>
              <p>Weighted LCA normalized across all systems. Includes global warming potential, non-renewable energy demand, eutrophication, smog creation, acidification, and ozone depletion. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:3">
              <p>Results broken into life cycle stage as defined by standard EN 15978.</p>
            </li>
            <li className="footnote" id="fn:4">
              <p>Global Warming Potential broken down into parts of the assembly: exterior finish, finish support, thermal insulation, and other.</p>
            </li>
            <li className="footnote" id="fn:5">
              <p>Includes Cradle-to-Gate (A1-3) + Transport (A4).  Data for the time value of carbon and the 2030 carbon reduction goals. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:6">
              <p>Data included Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info. In some graphs this will be represented as a negative credit.</p>
            </li>
            <li className="footnote" id="fn:7">
              <p>Data does not include Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:8">
              <p>Takes into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents FSC or sustainable forestry. Sequestered carbon will show up as a negative credit when looking at biomass materials in the Material Breakdown chart.</p>
            </li>
            <li className="footnote" id="fn:9">
              <p>Does not take into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents typical forestry practices.</p>

            </li>
            <li className="footnote" id="fn:10">
              <p>Evaluates assemblies based on Payette's Material Health Policy. Read more about it <a href="https://www.payette.com/wp-content/uploads/2019/06/policy_and_letter.pdf" target="_blank">here</a>.</p>

            </li>
            <li className="footnote" id="fn:11">
              <p>Greenhouse gas emissions shown in equivalent units of carbon dioxide. Most impactful factor to reduce to meet climate change goals.</p>
            </li>
            <li className="footnote" id={"fn:12"}>
              <p>Weighted LCA normalized across all systems. Includes global warming potential, non-renewable energy demand, eutrophication, smog creation, acidification, and ozone depletion. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:13">
              <p>Results broken into life cycle stage as defined by standard EN 15978.</p>
            </li>
            <li className="footnote" id="fn:14">
              <p>Global Warming Potential broken down into parts of the assembly: exterior finish, finish support, thermal insulation, and other.</p>
            </li>
            <li className="footnote" id="fn:15">
              <p>Includes Cradle-to-Gate (A1-3) + Transport (A4).  Data for the time value of carbon and the 2030 carbon reduction goals. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:16">
              <p>Data included Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info. In some graphs this will be represented as a negative credit.</p>
            </li>
            <li className="footnote" id="fn:17">
              <p>Data does not include Module D life cycle stage, which accounts for reuse potential beyond system boundary. See methodology below for more info.</p>
            </li>
            <li className="footnote" id="fn:18">
              <p>Takes into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents FSC or sustainable forestry. Sequestered carbon will show up as a negative credit when looking at biomass materials in the Material Breakdown chart.</p>
            </li>
            <li className="footnote" id="fn:19">
              <p>Does not take into account carbon that is sequestered from the atmosphere during biomass growth. If this option is chosen, it represents typical forestry practices.</p>

            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default withSplashScreen(App);
