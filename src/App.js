import React, { Component, } from 'react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 2,
      matrix: [],
      /* matrix: [
        [0, 15, 2, 1],
        [8, 9, 8, 5],
        [3, 3, 16, 7],
        [12, 5, 22, 5]
      ] */
    };

    this.handleChange = this.handleChange.bind(this);
    this.matrixChange = this.matrixChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDiagonal(matrix) {
    let i = 0;
    let j = 0;
    let diagonal = [];
    while (i < matrix.length) {
      diagonal.push(matrix[i][j])
      j++;
      i++;
    }
    return diagonal;
  }

  getSecondaryDiagonal(matrix) {
    let i = 0;
    let j = matrix.length - 1;
    let diagonal = [];
    while (i < matrix.length) {
      diagonal.push(matrix[i][j])
      j--;
      i++;
    }
    return diagonal;
  }

  createMatrix(n) {
    let matrix_temp = Array(parseInt(n)).fill().map(() => Array(parseInt(n)).fill(0));

    this.setState({
      matrix: matrix_temp
    });

    this.diagonalDifference()
  }

  diagonalDifference() {
    let primary_diagonal = this.getDiagonal(this.state.matrix);
    let secondary_diagonal = this.getSecondaryDiagonal(this.state.matrix);

    let primary_sum = primary_diagonal.reduce((i, j) => parseInt(i) + parseInt(j), 0);
    let secondary_sum = secondary_diagonal.reduce((i, j) => parseInt(i) + parseInt(j), 0);

    let result = Math.abs(primary_sum - secondary_sum)
    return result;
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.createMatrix(e.target.value)
  }

  matrixChange(e) {
    let { matrix } = this.state;
    const positions = e.target.name.split("")
    matrix[positions[0]][positions[1]] = e.target.value

    this.setState({
      matrix: matrix.map((row, i) => {
        row.map((col, j) => {
          if (parseInt(i) === parseInt(positions[0]) && parseInt(j) === parseInt(positions[1]) && col === 0) return e.target.value
          else return col;
        })
        return row;
      })
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createMatrix(this.state.value);
  }

  renderTable() {
    const { matrix } = this.state;
    return (
      <div className='div-container'>
        <table>
          <tbody>
            {
              matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) => (
                    <td key={j} style={this.tdStyle()}>
                      <input
                        type="number"
                        name={`${i}${j}`}
                        onChange={this.matrixChange}
                        style={this.inputStyle()}
                      />
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  renderFinalTable() {
    const { matrix } = this.state;
    return (
      <div className='div-container'>
        <table>
          <tbody>
            {
              matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) => (
                    <td key={j} style={this.tdStyle()}>{col}</td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  divStyle() {
    return {
      width: "50px",
      display: "inline-block",
    }
  }

  inputStyle() {
    return {
      width: "70px",
      padding: "2px",
    }
  }

  tdStyle() {
    return {
      padding: "7px",
      textAlign: "center",
    }
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Tamaño matriz:
            <input
              type="number"
              min={2}
              value={this.state.value}
              onChange={this.handleChange}
              style={this.inputStyle()}
            />
          </label>
          <input type="submit" value="Create Matrix" />
        </form>
        {this.renderTable()}
        {this.renderFinalTable()}
        <br />
        <label>Difference: </label>
        {this.diagonalDifference()}
      </div>
    )
  }
}

export default App;
