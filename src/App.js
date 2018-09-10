import React, { Component } from "react";
import Axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    list: [],
    newTask: "",
    done: false
  };

  url = "http://localhost:3000/todos/";

  componentDidMount() {
    Axios.get(this.url).then(res => {
      this.setState({
        list: res.data
      });
    });
  }

  addNew = () => {
    Axios.post(this.url, { text: this.state.newTask, done: false }).then(
      res => {
        this.setState({
          list: [...this.state.list, res.data]
        });
      }
    );
  };

  toDone = data => {
    Axios.put(this.url + data.id, {
      text: data.text,
      done: !this.state.done
    }).then(res => {
      this.setState({
        list: this.state.list.map(r => {
          if (r.id === res.data.id) {
            return res.data;
          }
          return r;
        })
      });
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <input
            className="newtaskclass"
            type="text"
            name="task"
            value={this.state.newTask}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                this.addNew();
              }
            }}
            onChange={e => {
              this.setState({ newTask: e.target.value });
            }}
            placeholder="Add a to-do in &quot;Inbox&quot;..."
          />
        </div>
        <div className="todo">
          {this.state.list
            .filter(x => {
              return x.done === false;
            })
            .map((eachOne, i) => (
              <div key={i} className="task">
                <input type="checkbox" onChange={() => this.toDone(eachOne)} />
                {eachOne.text}
              </div>
            ))}
        </div>
        <hr />
        <div className="done">
          {this.state.list
            .filter(x => {
              return x.done === true;
            })
            .map((eachOne, i) => (
              <div key={i} className="task">
                <input
                  type="checkbox"
                  onChange={() => this.toDone(eachOne)}
                  checked
                />
                {eachOne.text}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
