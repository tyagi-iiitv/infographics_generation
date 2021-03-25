import React, { Component } from 'react';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';

let imgUrls = [
    'flowImages/flow_0.jpg',
    'flowImages/flow_1.jpg',
    'flowImages/flow_2.jpg',
    'flowImages/flow_3.jpg',
    'flowImages/flow_4.jpg',
];
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
                    images={imgUrls.map((image, i) => ({
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
