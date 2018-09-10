import React, { Component } from "react";
import Axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";

class App extends Component {
  state = {
    list: [],
    newTask: ""
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
      done: true,
      fav: data.fav
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

  toFav = data => {
    Axios.put(this.url + data.id, {
      text: data.text,
      done: data.done,
      fav: true
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
  unFav = data => {
    Axios.put(this.url + data.id, {
      text: data.text,
      done: data.done,
      fav: false
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

  unDone = data => {
    Axios.put(this.url + data.id, {
      text: data.text,
      done: false,
      fav: data.fav
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
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => this.toDone(eachOne)}
                />
                {eachOne.text}
                <span>
                  {eachOne.fav ? (
                    <i
                      onClick={() => {
                        this.toFav(eachOne);
                      }}
                      class="fas fa-star"
                    />
                  ) : (
                    <i
                      onClick={() => {
                        this.unFav(eachOne);
                      }}
                      class="far fa-star"
                    />
                  )}
                </span>
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
                  onChange={() => this.unDone(eachOne)}
                  checked
                />
                {eachOne.text}
                <span>
                  {eachOne.fav ? (
                    <i
                      onClick={() => {
                        this.toFav(eachOne);
                      }}
                      class="fas fa-star"
                    />
                  ) : (
                    <i
                      onClick={() => {
                        this.unFav(eachOne);
                      }}
                      class="far fa-star"
                    />
                  )}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
