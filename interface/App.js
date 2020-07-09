import React from 'react';
import Draggable from "./Draggable"
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', items: [] };
        this.elements = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleRemove.bind(this);
    }

    handleRemove(key) {
        const new_items = this.state.items.filter((item) => item.key !== key);
        this.setState({text: this.state.text, items: new_items})
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
            {this.state.items}
            </div>
        </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
        //show the remove button
        function show(e) {
            e.target.style.opacity= 1;
        }

        //hide the remove button
        function hide(e) {
            e.target.style.opacity= 0;
        }
        //if nothing input, ignore it
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const id =new Date().toLocaleString();
        const newItem = 
        //must have unique key to identify the Draggable class
        <Draggable key={id}>
            <div className="draggable_content">
            <div onClick={() => this.handleRemove(id)} className="remove_button" 
            onMouseEnter={show}
            onMouseLeave={hide}>remove</div> 
            <div>{this.state.text}</div>
            </div>
        </Draggable>;
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

export default App;
