import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';

export default class ImageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
            selectedImages: [],
        };
        this.onClickThumbnail = this.onClickThumbnail.bind(this);
    }

    onClickThumbnail(index, image) {
        var images = this.state.images.slice();
        var selectedImages = this.state.selectedImages;
        var img = images[index];
        if (img.hasOwnProperty('isSelected')) {
            img.isSelected = !img.isSelected;
            if (img.isSelected === true) {
                selectedImages.push(img);
            } else {
                selectedImages = selectedImages.filter((obj) => obj !== img);
            }
        } else {
            img.isSelected = true;
            selectedImages.push(img);
        }

        this.setState({
            images: images,
            selectedImages: selectedImages,
        });
    }

    render() {
        return (
            <div
                style={{ height: '33%', overflow: 'scroll', scrollBehavior: 'auto' }}
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
