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
        // console.log("id="+id)
        var input_text = this.state.text;
        // number_sign = 1 means there's a '#' symbol in prefix and hence,
        // it's a heading. Can be increased to add more Markdown-style
        // heading levels
        var number_sign = 0;
        var input_size = 1;
        // Normal text weight for body text; bold for headings
        var text_weight = 'normal';
        var input_length = input_text.length

        if (input_text[0] === '#') {
            number_sign++;
        }

        if (number_sign !== 0) {
            text_weight = 'bold'
        }

        // TODO(pushkar): Use setState here. Using the syntax directly doesn't works.
        this.state.text = input_text.substring(number_sign, input_length);

        input_size = input_size + 1*number_sign;

        const newItem =
            //must have unique key to identify the Draggable class
            <Draggable
                key={id}
                // Deletes the object if delete button pressed
                deleteButtonPressed={this.handleRemove.bind(this,id)}
            >
                <TextContent
                    text={this.state.text}
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
