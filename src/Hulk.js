import React, { Component } from 'react'

class Hulk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.hulk(e.target.value);
  }

  hulk(hate_or_love) {
    const feelings = ["I hate it", "I hate that I love it", "I hate that I love that I hate it"]
    hate_or_love = parseInt(hate_or_love);
    let what_is = ""
    if (hate_or_love !== "" && !isNaN(hate_or_love)) {
      if (hate_or_love % 2 === 0) {
        what_is = feelings[1]
      } else {
        if (hate_or_love % 3 === 0) {
          what_is = feelings[2]
        } else {
          what_is = feelings[0]
        }
      }
    }

    document.getElementById("hate_or_love").innerHTML = what_is
  }

  render() {
    return (
      <div>
        <h3>Hulk</h3>
        <input type="number" min={1} max={100} onChange={this.handleChange} />
        <br />
        <label>Hulk feel as: </label><br />
        <span id='hate_or_love'></span>
      </div>
    )
  }
}

export default Hulk;