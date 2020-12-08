import React from 'react';
import Draggable from './components/Draggable/Draggable';
import Canvas from './components/Canvas/Canvas';
import TextContent from './components/TextContent/TextContent';
import ImageContent from './components/ImageContent/ImageContent';
import TextInput from './components/TextInput/TextInput';
import styles from './App.module.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        // items contains all elements added n the canvas
        this.state = {
            items: [],
        };
        // this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmitText = this.handleSubmitText.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmitPic = this.handleSubmitPic.bind(this);
        this.handleChangePic = this.handleChangePic.bind(this);
    }

    // Removes the element when delete button is pressed
    handleRemove(key) {
        const new_items = this.state.items.filter((item) => item.key !== key);
        this.setState({ items: new_items });
    }

    handleSubmitText(text) {
        // Unique id generated from time in milliseconds since epoch
        const id =
            text[0] === '#'
                ? 'title_' + Date.now().toString()
                : 'text_' + Date.now().toString();

        const newItem = (
            //must have unique key to identify the Draggable class
            <Draggable
                key={id}
                id={id}
                // Deletes the object if delete button pressed
                deleteButtonPressed={this.handleRemove.bind(this, id)}
            >
                <TextContent text={text} />
            </Draggable>
        );

        // Adds new draggable item to the list
        this.setState({
            items: this.state.items.concat(newItem),
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
                id={id}
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
                <div className={styles.AppBody}>
                    <div className={styles.leftContainer}>
                        <Canvas>{this.state.items}</Canvas>
                    </div>
                    <div className={styles.rightContainer}>
                        <TextInput submitText={this.handleSubmitText} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
