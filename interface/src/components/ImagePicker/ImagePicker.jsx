import React, { Component } from 'react';
import ImagePicker from './react-image-picker';
// import 'react-image-picker/dist/index.css';

export default class ImageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
    }
    onPickImages(images) {
        this.setState({ images });
    }

    render() {
        return (
            <div>
                <ImagePicker
                    images={this.props.imgUrls.map((image, i) => ({
                        src: image,
                        value: i,
                    }))}
                    onPick={this.onPickImages.bind(this)}
                    multiple
                />
            </div>
        );
    }
}
