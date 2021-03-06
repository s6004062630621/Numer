import React from "react";
import "./App.css";
import { evaluate, parse } from "mathjs";
import api from "./api";
const { create, all } = require("mathjs");
const mathjs = create(all);
mathjs.import(require("mathjs-simple-integral"));

class simson13 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      a: "",
      b: "",
      ans: "",
      error: ""
    };

    this.BS = this.BS.bind(this);
    this.a = this.a.bind(this);
    this.b = this.b.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e7b3c42e4f2280019102ac5").then(db => {
      this.setState({
        data: db.data.data.name
      });
      this.setState({ a: db.data.data.time });
      this.setState({ b: db.data.data.rating });
    });
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
  }

  a({ target: { value } }) {
    this.setState({ a: value });
  }

  b({ target: { value } }) {
    this.setState({ b: value });
  }

  BS = e => {
    var cal;

    var fx = this.state.data;
    var a = parseFloat(this.state.a);
    var b = parseFloat(this.state.b);

    var fxig = mathjs.integral(fx, "x").toString();
    var i = evaluate(fxig, { x: b }) - evaluate(fxig, { x: a });

    console.log("fx:", fx);
    console.log("fxig:", fxig);
    console.log("i:", i);
    console.log("a:", a);
    console.log("b:", b);

    cal = evaluate(fx, { x: a });
    var fa = parseFloat(cal);
    console.log("fa:", fa);

    cal = evaluate(fx, { x: b });
    var fb = parseFloat(cal);
    console.log("fb:", fb);

    var h = (b - a) / 2;
    console.log("h:", h);
    var xi = a + h;
    cal = evaluate(fx, { x: xi });
    console.log("x1:", xi);
    var fxi = parseFloat(cal);
    console.log("fx1:", fxi);

    var ans = (h / 2) * (fa + 4 * fxi + fb);
    ans = ans.toFixed(6);
    this.setState({ ans: ans });
    console.log("ans:", ans);

    var eror = (i - ans) / i;

    eror = eror.toFixed(6);

    this.setState({ eror: eror });

    e.preventDefault();
  };

  render() {
    var i = 0;
    var eror = this.state.eror;
    var ans = this.state.ans;

    return (
      <div className="App">
        <div class="navbar">
          <a href="/">HOME</a>
          <div class="dropdown">
            <button class="dropbtn">
              Root of Equation
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/bisection">Bisection</a>
              <a href="/falseposition">Flase Position</a>
              <a href="/onepoint">Onepoint</a>
              <a href="/newton">Newton</a>
              <a href="/secant">Secent</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">
              Derivative
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/fwooh">FWO(OH)</a>
              <a href="/bwooh">BWO(OH)</a>
              <a href="/coh2">CENTRAL(OH^2)</a>
              <a href="/fwooh2">FWO(OH^2)</a>
              <a href="/bwooh2">BwO(OH^2)</a>
              <a href="/coh4">CENTRAL(OH^4)</a>
            </div>
          </div>

          <div class="dropdown">
            <button class="dropbtn">
              Integral
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="/trap">Trapezoidal rule</a>
              <a href="/comtrap">Composite Trapezoidal rule</a>
              <a href="/simson13">Simson 's rule (1/3)</a>
              <a href="/comsim">Composite Simson 's rule (1/3)</a>
            </div>
          </div>
        </div>

        <div className="App-header">
          <div>
            <form action="">
              <legend>Simson 's rule (1/3)</legend>
              <p>
                ax<sup>d</sup>+bx<sup>e</sup>+cx<sup>f</sup>
              </p>

              <div>
                <label for="">fx </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">a </label>
                <input
                  onChange={this.a}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <div>
                <label for="">b </label>
                <input
                  onChange={this.b}
                  type="text"
                  class="form-control"
                  id=""
                  placeholder="Input field"
                />
              </div>

              <button type="submit" onClick={this.BS}>
                Submit
              </button>

              <button type="submit" onClick={this.BS}>
                API
              </button>

              <div
                style={{
                  width: "50%",
                  height: "1500px"
                }}
              >
                <table style={{ width: "100%", border: "solid black" }}>
                  <tr style={{ color: "#e65100" }}>
                    <th style={{ border: "solid black" }}>I</th>
                    <th style={{ border: "solid black" }}>Error</th>
                  </tr>
                  <tr>
                    <td style={{ border: "solid black" }}>
                      <div>{ans}</div>
                    </td>
                    <td style={{ border: "solid black" }}>
                      <div>{eror}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default simson13;
