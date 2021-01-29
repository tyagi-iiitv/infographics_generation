import React from 'react';
import styles from './ImageContent.module.scss';

/*
Image Content Class
Will be a child component inside the Draggable class for images.
*/
class ImageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: this.props.hovering,
            imageFile: this.props.imageFile, // Image
        };
    }

    componentDidUpdate(prevProps) {
        // Handles change on hover property on change in Draggable class
        // Implemented from: https://stackoverflow.com/a/54568167/10307491
        if (prevProps.hovering !== this.props.hovering) {
            this.setState({ hovering: this.props.hovering });
        }
    }

    render() {
        return (
            <div
                className={styles.imgContainer}
                style={{
                    // Black dashed border if hovering; transparent otherwise
                    border: this.state.hovering
                        ? '0.5px dashed black'
                        : '0.5px dashed transparent',
                }}
            >
                <img
                    src={this.state.imageFile}
                    className={styles.image}
                    alt="Draggable Content"
                />
            </div>
        );
    }
}

export default ImageContent;
