import React from 'react';
import Draggable from './components/Draggable/Draggable';
import Canvas from './components/Canvas/Canvas';
import TextContent from './components/TextContent/TextContent';
import ImageContent from './components/ImageContent/ImageContent';
import styles from './App.module.scss';

import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends React.Component {
    constructor(props) {
        super(props);
        // text handles input text and items contains all elements added
        // on the canvas
        this.state = {
            text: '',
            items: [],
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmitPic = this.handleSubmitPic.bind(this);
        this.handleChangePic = this.handleChangePic.bind(this);
    }

    // Removes the element when delete button is pressed
    handleRemove(key) {
        const new_items = this.state.items.filter((item) => item.key !== key);
        this.setState({ text: this.state.text, items: new_items });
    }

    handleChangeText(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmitText(e) {
        //if nothing input or only whitespace, ignore it
        e.preventDefault();
        if (this.state.text.trim().length === 0) {
            return;
        }

        // Unique id generated from time in milliseconds since epoch
        const id =
            this.state.text.trim()[0] === '#'
                ? 'title_' + Date.now().toString()
                : 'text_' + Date.now().toString();

        const newItem = (
            //must have unique key to identify the Draggable class
            <Draggable
                key={id}
                // Deletes the object if delete button pressed
                deleteButtonPressed={this.handleRemove.bind(this, id)}
            >
                <TextContent text={this.state.text.trim()} />
            </Draggable>
        );

        // Adds new draggable item to the list
        this.setState({
            items: this.state.items.concat(newItem),
            text: '',
        });
    }

    handleChangePic(e) {
        e.preventDefault();
        if (!e.target.files[0]) {
            return;
        }

        // Unique id generated from time in milliseconds since epoch
        const id = 'img_' + Date.now().toString();

        const newItem = (
            //must have unique key to identify the Draggable class
            <Draggable
                key={id}
                // Deletes the object if delete button pressed
                deleteButtonPressed={this.handleRemove.bind(this, id)}
            >
                <ImageContent imageFile={URL.createObjectURL(e.target.files[0])} />
            </Draggable>
        );

        // Adds new draggable image to the list
        this.setState({
            items: this.state.items.concat(newItem),
        });
    }

    // Clicks on the form element to take in file output
    handleSubmitPic = () => {
        document.getElementById('fileInput').click();
    };

    render() {
        return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <div className={styles.headerContainer}>
                        <form
                            onSubmit={this.handleSubmitText}
                            className={styles.textBox}
                        >
                            <input
                                id="input_dragable_text"
                                onChange={this.handleChangeText}
                                value={this.state.text}
                                placeholder="Press Enter to input"
                            />
                        </form>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            id="fileInput"
                            name="fileInput"
                            onChange={this.handleChangePic}
                            style={{ display: 'none' }}
                        />
                        <button
                            className={styles.addImageButton}
                            onClick={this.handleSubmitPic}
                        >
                            <FontAwesomeIcon icon={faFileImage} />
                        </button>
                    </div>
                </header>
                <div className={styles.AppBody}>
                    <Canvas>{this.state.items}</Canvas>
                </div>
            </div>
        );
    }
}

export default App;
