import React from 'react';
import Draggable from "./Draggable"
import Canvas from "./Canvas";
import TextContent from "./TextContent";
import styles from "./App.module.scss";

class App extends React.Component {
    constructor(props) {
        super(props);
        // text handles input text and items contains all elements added
        // on the canvas
        this.state = { text: '', items: [] };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleRemove.bind(this);
    }

    // Removes the element when delete button is pressed
    handleRemove(key) {
        const new_items = this.state.items.filter((item) => item.key !== key);
        this.setState({text: this.state.text, items: new_items})
    }

    render() {
        return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
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
                <div className={styles.AppBody}>
                    <Canvas>
                        {this.state.items}
                    </Canvas>
                </div>
            </div>
            );
        }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        //if nothing input, ignore it
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }

        // Unique id generated from time in milliseconds since epoch
        const id = Date.now().toLocaleString();

        var input_len = this.state.text.length;
        var text_weight = 'normal';
        var input_size = 1;

        if (this.state.text[0] === '#') {
            text_weight = 'bold';
            input_size = 2;
        }

        const newItem =
            //must have unique key to identify the Draggable class
            <Draggable
                key={id}
                // Deletes the object if delete button pressed
                deleteButtonPressed={this.handleRemove.bind(this,id)}
            >
                <TextContent
                    text={
                        this.state.text[0] === '#' ?
                        this.state.text.substring(1, input_len) :
                        this.state.text
                    }
                    size={input_size}
                    weight={text_weight}
                />
            </Draggable>;

        // Adds new draggable item to the list
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
        // console.log(this.state.items)
    }
}

export default App;
