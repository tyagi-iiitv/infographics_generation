import React from 'react';
import Draggable from "./Draggable"
import './App.css';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            var input_text = this.state.text;
            var number_sign = 0;
            var input_size = 1;
            var text_weight = 'normal';
            var input_length = input_text.length
            if (input_text[0] === '#') {
                number_sign++;
            }
            // TODO(pushkar): Use setState here. Using the syntax directly doesn't works.
            this.state.text = input_text.substring(number_sign, input_length);
            if (number_sign !== 0) {
                text_weight = 'bold'
            }
            input_size = input_size + 1*number_sign;
            const newItem =
            //must have unique key to identify the Draggable class
            <Draggable key={id}>
                <div
                    onClick={() => this.handleRemove(id)}
                    className="remove_button"
                >
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </div>
                <div>
                    <text
                        style={{fontSize: input_size +'em', fontWeight: text_weight}}
                        className="draggable_text"
                    >
                        {this.state.text}
                    </text>
                </div>
            </Draggable>;
            this.setState(state => ({
                items: state.items.concat(newItem),
                text: ''
            }));
        }
    }

    export default App;
