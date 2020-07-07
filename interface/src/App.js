import React from 'react';
import Draggable from "./Draggable"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', items: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <div>
            <form onSubmit={this.handleSubmit}>
              <input 
              id="input_dragable_text"
              onChange={this.handleChange}
              value={this.state.text}
              placeholder = "Press Enter to input"
              />
            </form>
          </div>
        </header>
        <div className="App-body">
          <DragableTextList items={this.state.items}/>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

//draw all dragable text
class DragableTextList extends React.Component {
    constructor(props) {
      super(props);
      this.items = props.items
  }


  render() {
    const elements = [];
    const text_array = this.props.items
    //console.log()
    for(const item of text_array) {
      elements.push(<Draggable>{item.text}</Draggable>)
    }
    return (
      <div>
        {elements}
      </div>
    )
  }
}

export default App;
