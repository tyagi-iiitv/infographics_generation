import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

export default class InfographicPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
        };
        this.onClickThumbnail = this.onClickThumbnail.bind(this);
    }

    onClickThumbnail(index, image) {
        var images = this.state.images.slice();
        var selectedImage = images[index];
        images.forEach((obj) => {
            if (obj !== selectedImage) {
                obj.isSelected = false;
            }
        });
        selectedImage.isSelected = true;

        this.setState({
            images: images,
            selectedImage: selectedImage,
        });
    }

    render() {
        return (
            <div
                style={{
                    height: '100%',
                    overflow: 'scroll',
                    scrollBehavior: 'auto',
                }}
            >
                <Gallery
                    images={this.state.images}
                    enableLightbox={false}
                    enableImageSelection={false}
                    onClickThumbnail={this.onClickThumbnail}
                />
            </div>
        );
    }
}
