import React, { Component } from 'react';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';

export default class ImageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
    }
    onPickImages(images) {
        this.setState({ images }, () =>
            this.props.callbackFromChild(
                this.props.type === 'vgs'
                    ? { vg_images: this.state.images }
                    : { layout_images: this.state.images },
                'images'
            )
        );
    }
    render() {
        // console.log(this.state.images)
        // console.log("hi")
        return (
            <div>
                <ImagePicker
                    images={this.props.images.map((image, i) => ({
                        src: image.src,
                        value: image.key,
                    }))}
                    onPick={this.onPickImages.bind(this)}
                    multiple
                />
            </div>
        );
    }
}
