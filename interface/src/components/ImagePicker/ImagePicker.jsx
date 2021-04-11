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
        // console.log(images);
        if (images.length === 0) {
            this.props.callbackFromChild({
                selectedConns: null,
                selectedLayouts: null,
                selectedVGs: null,
            });
        } else if (this.props.id == 0) {
            this.props.callbackFromChild({ selectedLayouts: images[0].src });
        } else if (this.props.id == 1) {
            this.props.callbackFromChild({ selectedVGs: images[0].src });
        } else {
            this.props.callbackFromChild({ selectedConns: images[0].src });
        }
    }

    render() {
        // console.log(this.state);
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
