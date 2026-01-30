import React from "react";
import styles from "./css/Comp.module.scss";

export default class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      count: 1,
      vals: [],
      vals1: [],
      sum: 0,
      sum1: 0,
      radio: 1,
      allMaterials: [0],
      show: false,
      selectedMaterials: [],
      csvData: [],
      results: [],
    };

    this.exportToCsv = this.exportToCsv.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.radio !== this.props.radio) {
      this.radC(this.props.radio);
    }
  }

  // ---------- helpers ----------
  getAllMaterialsForRadio(radio) {
    if (radio == 1) return this.props.tenY;
    if (radio == 2) return this.props.sixty1;
    return this.props.sixty2;
  }

  getMultiplierForMaterial(materialKey) {
    const list = this.state.allMaterials || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].material == materialKey) return Number(list[i].value) || 0;
    }
    return 0;
  }

  getRPerInch(materialKey) {
    const map = this.props.rPerInchByMaterial || {};
    const v = map[materialKey];
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  // 解析 id 的末尾：...{option}{row}
  // 你现在的逻辑默认 option / row 都是 1 位数字（原项目也是这样）
  parseSuffixFromId(id) {
    const row = parseInt(id[id.length - 1], 10);
    const opt = id[id.length - 2]; // string
    return { opt, row };
  }

  computeAndUpdateRow(opt, row) {
    const suffix = opt + String(row);

    const currentSelect = document.getElementById("select-type" + suffix);
    const gwpDisplay = document.getElementById("displayGWP" + suffix);

    if (!currentSelect || !gwpDisplay) return;

    const matKey = currentSelect.options[currentSelect.selectedIndex].value;
    const myMult = this.getMultiplierForMaterial(matKey);

    // ---- INSULATION mode ----
    if (this.props.isInsulation) {
      const sqftEl = document.getElementById("select-sqft" + suffix);
      const rEl = document.getElementById("select-rvalue" + suffix);
      const tEl = document.getElementById("select-thickness" + suffix);

      if (!sqftEl || !rEl || !tEl) return;

      const sqft = Number(sqftEl.value) || 0;
      const rperinch = this.getRPerInch(matKey);

      let rVal = Number(rEl.value);
      let thick = Number(tEl.value);

      // 联动：如果只填了一个，就推另一个
      if (rperinch > 0) {
        const rHas = rEl.value !== "" && Number.isFinite(rVal);
        const tHas = tEl.value !== "" && Number.isFinite(thick);

        if (rHas && !tHas) {
          thick = rVal / rperinch;
          tEl.value = Number.isFinite(thick) && thick !== 0 ? thick.toFixed(2) : "";
        } else if (tHas && !rHas) {
          rVal = thick * rperinch;
          rEl.value = Number.isFinite(rVal) && rVal !== 0 ? rVal.toFixed(2) : "";
        }
      }

      if (!Number.isFinite(rVal) || rEl.value === "") rVal = 0;

      const gwp = sqft * rVal * myMult; // myMult = kgCO2eq/sf per R-1
      gwpDisplay.innerHTML = gwp.toFixed(2);

      this.state.vals[row - 1] = gwp;
      this.state.vals1[row - 1] = sqft;

      return;
    }

    // ---- default mode (other pages) ----
    const currentPos = document.getElementById("select-position" + suffix);
    if (!currentPos) return;

    const num = parseInt(currentPos.value, 10) || 0;
    const gwp = Number(num) * myMult;

    gwpDisplay.innerHTML = gwp.toFixed(2);
    this.state.vals[row - 1] = gwp;
    this.state.vals1[row - 1] = num;
  }

  recomputeTotals() {
    let mRes = 0;
    let mRes1 = 0;

    for (let i = 0; i < this.state.vals.length; i++) {
      const v = this.state.vals[i];
      mRes += v == undefined || isNaN(v) ? 0 : v;
    }
    for (let i = 0; i < this.state.vals1.length; i++) {
      const v1 = this.state.vals1[i];
      mRes1 += v1 == undefined || isNaN(v1) ? 0 : v1;
    }

    this.setState({ sum: this.formatNumber(mRes.toFixed(2)) });
    this.setState({ sum1: this.formatNumber(mRes1) });
  }

  // ---------- events ----------
  radC(e) {
    const currentRadio = e;
    this.state.allMaterials = this.getAllMaterialsForRadio(currentRadio);

    for (let i = 0; i < this.state.count; i++) {
      const row = i + 1;
      const opt = this.props.name; // option id (1/2/3...)
      this.computeAndUpdateRow(opt, row);
    }

    this.recomputeTotals();
  }

  selectChange(e) {
    const currentRadio = this.props.radio;
    this.state.allMaterials = this.getAllMaterialsForRadio(currentRadio);

    const { opt, row } = this.parseSuffixFromId(e.target.id);

    // 更新 selected material 文本（CSV 用）
    const suffix = opt + String(row);
    const currentSelect = document.getElementById("select-type" + suffix);
    if (currentSelect) {
      const theCurrentMatText = currentSelect.options[currentSelect.selectedIndex].text;
      this.setState((prevState) => {
        let selectedMaterials = [...prevState.selectedMaterials];
        selectedMaterials[row - 1] = theCurrentMatText;
        return { selectedMaterials };
      });
    }

    // 换材料后重算该行
    this.computeAndUpdateRow(opt, row);
    this.recomputeTotals();
  }

  handleChange(e) {
    const currentRadio = this.props.radio;
    this.state.allMaterials = this.getAllMaterialsForRadio(currentRadio);

    const { opt, row } = this.parseSuffixFromId(e.target.id);

    // 如果是 insulation，并且改的是 r 或 thickness，优先按“用户刚改的那个”推另一个
    if (this.props.isInsulation) {
      const suffix = opt + String(row);
      const currentSelect = document.getElementById("select-type" + suffix);
      if (currentSelect) {
        const matKey = currentSelect.options[currentSelect.selectedIndex].value;
        const rperinch = this.getRPerInch(matKey);

        const rEl = document.getElementById("select-rvalue" + suffix);
        const tEl = document.getElementById("select-thickness" + suffix);

        if (rperinch > 0 && rEl && tEl) {
          const isR = e.target.id.startsWith("select-rvalue");
          const isT = e.target.id.startsWith("select-thickness");

          if (isR) {
            const rVal = Number(rEl.value);
            if (rEl.value !== "" && Number.isFinite(rVal)) {
              const thick = rVal / rperinch;
              tEl.value = Number.isFinite(thick) && thick !== 0 ? thick.toFixed(2) : "";
            }
          } else if (isT) {
            const thick = Number(tEl.value);
            if (tEl.value !== "" && Number.isFinite(thick)) {
              const rVal = thick * rperinch;
              rEl.value = Number.isFinite(rVal) && rVal !== 0 ? rVal.toFixed(2) : "";
            }
          }
        }
      }
    }

    // 再统一重算该行
    this.computeAndUpdateRow(opt, row);
    this.recomputeTotals();
  }

  // ---------- rows ----------
  appendRow(event) {
    const rel = parseInt(event.target.getAttribute("rel"), 10) + 1;
    this.state.count++;

    let joined;

    if (this.props.isInsulation) {
      joined = this.state.rows.concat(
        <tr key={`row-${this.props.name}-${this.state.count}`}>
          <td>
            <select
              name="mat"
              onChange={this.selectChange.bind(this)}
              id={`select-type` + this.props.name + this.state.count}
              className="calculator select"
            >
              {this.props.materialList.map((m) => (
                <option value={m.value} key={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </td>

          <td>
            <input
              type="number"
              onChange={this.handleChange.bind(this)}
              id={`select-rvalue` + this.props.name + this.state.count}
            />
          </td>

          <td>
            <input
              type="number"
              onChange={this.handleChange.bind(this)}
              id={`select-thickness` + this.props.name + this.state.count}
            />
          </td>

          <td>
            <input
              type="number"
              onChange={this.handleChange.bind(this)}
              id={`select-sqft` + this.props.name + this.state.count}
            />
          </td>

          <td id={`displayGWP` + this.props.name + this.state.count}>0.00</td>
        </tr>
      );
    } else {
      joined = this.state.rows.concat(
        <tr key={`row-${this.props.name}-${this.state.count}`}>
          <td>
            <select
              name="mat"
              onChange={this.selectChange.bind(this)}
              id={`select-type` + this.props.name + this.state.count}
              className="calculator select"
            >
              {this.props.materialList.map((m) => (
                <option value={m.value} key={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="number"
              onChange={this.handleChange.bind(this)}
              id={`select-position` + this.props.name + this.state.count}
            />
          </td>
          <td id={`displayGWP` + this.props.name + this.state.count}>0.00</td>
        </tr>
      );
    }

    this.setState({ rows: joined });
  }

  removeRow() {
    if (this.state.rows.length === 0) return;

    const newRows = this.state.rows.slice(0, -1);
    const newVals = this.state.vals.slice(0, -1);
    const newVals1 = this.state.vals1.slice(0, -1);

    const newSum = newVals.reduce((acc, val) => acc + (Number(val) || 0), 0);
    const newSum1 = newVals1.reduce((acc, val) => acc + (Number(val) || 0), 0);

    this.setState({
      rows: newRows,
      vals: newVals,
      vals1: newVals1,
      sum: this.formatNumber(newSum.toFixed(2)),
      sum1: this.formatNumber(newSum1),
      count: this.state.count - 1,
    });
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // ---------- CSV ----------
  toCsv(data) {
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(data[0]);
    let csv = data.map((row) =>
      header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(",")
    );
    csv.unshift(header.join(","));
    return csv.join("\r\n");
  }

  generateCsvData() {
    const units = this.props.units;

    const data = this.state.vals.map((val, i) => {
      const row = {
        MaterialType: this.state.selectedMaterials[i] || "Not selected",
        Area: this.state.vals1[i],
        GWP: val,
      };
      return row;
    });

    data.push({
      MaterialType: "Sum",
      Area: `${this.state.sum1} ${units?.qtyCsv || "ft2"}`,
      GWP: `${this.state.sum} kgCO2eq`,
    });

    return this.toCsv(data);
  }

  exportToCsv() {
    const csv = this.generateCsvData();

    this.setState(
      (prevState) => ({
        results: [...prevState.results, csv],
      }),
      () => {
        // console.log(this.state.results);
      }
    );

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "Calculator.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ---------- render ----------
  render() {
    const units = this.props.units;

    return (
      <div className={styles.calculator}>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
          <thead>
            <tr>
              <td colSpan={this.props.isInsulation ? 5 : 3} style={{ textAlign: "left", height: "25px" }}>
                &nbsp;&nbsp;<strong>Option {this.props.name}</strong>
              </td>
            </tr>
          </thead>

          <tbody>
            {!this.props.isInsulation ? (
              <>
                <tr>
                  <td>Type</td>
                  <td>{units?.qtyLabel || "Square Feet"}</td>
                  <td>GWP</td>
                </tr>

                <tr>
                  <td>
                    <select
                      name="mat"
                      onChange={this.selectChange.bind(this)}
                      id={`select-type` + this.props.name + `1`}
                      className="calculator select"
                    >
                      {this.props.materialList.map((m) => (
                        <option value={m.value} key={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      onChange={this.handleChange.bind(this)}
                      id={`select-position` + this.props.name + `1`}
                    />
                  </td>

                  <td id={`displayGWP` + this.props.name + `1`}></td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>Type</td>
                  <td>R-value</td>
                  <td>Thickness(in)</td>
                  <td>{units?.qtyLabel || "Square Feet"}</td>
                  <td>GWP</td>
                </tr>

                <tr>
                  <td>
                    <select
                      name="mat"
                      onChange={this.selectChange.bind(this)}
                      id={`select-type` + this.props.name + `1`}
                      className="calculator select"
                    >
                      {this.props.materialList.map((m) => (
                        <option value={m.value} key={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      onChange={this.handleChange.bind(this)}
                      id={`select-rvalue` + this.props.name + `1`}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      onChange={this.handleChange.bind(this)}
                      id={`select-thickness` + this.props.name + `1`}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      onChange={this.handleChange.bind(this)}
                      id={`select-sqft` + this.props.name + `1`}
                    />
                  </td>

                  <td id={`displayGWP` + this.props.name + `1`}></td>
                </tr>
              </>
            )}

            {this.state.rows}
          </tbody>

          <tfoot>
            <tr style={{ height: "35px" }}>
              {/* col 1: Type */}
              <td></td>

              {/* insulation 有 R-value / Thickness 两列：补两个空格对齐 */}
              {this.props.isInsulation && <td></td>}
              {this.props.isInsulation && <td></td>}

              {/* col: Square Feet（或非-insulation 的 qty 列） */}
              <td>
                <strong style={{ color: "#dc1a55", fontSize: "1.3em" }}>{this.state.sum1}</strong>{" "}
                {this.props.units?.qtyTotalHtml || (
                  <>
                    ft<sup>2</sup>
                  </>
                )}
              </td>

              {/* col: GWP */}
              <td>
                <strong style={{ color: "#dc1a55", fontSize: "1.3em" }}>{this.state.sum}</strong>{" "}
                kgCO<sub>2</sub>eq
              </td>
            </tr>
          </tfoot>

        </table>

        <br />

        <button rel="1" onClick={this.appendRow.bind(this)}>
          Add row
        </button>
        &nbsp;
        <button rel="1" onClick={this.removeRow.bind(this)}>
          Remove row
        </button>
      </div>
    );
  }
}
