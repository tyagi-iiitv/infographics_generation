import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.scss';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: null,
            canvasDims: null,
            numVisGrps: null,
            imgLinks: null,
        };
    }

    renderImage(imageUrl) {
        return (
            <div>
                <img
                    src={imageUrl}
                    onLoad={this.handleImageChange}
                    onError={this.handleImageChange}
                    className={styles.images}
                />
            </div>
        );
    }

    componentWillMount() {}

    render() {
        return (
            <div
                className={styles.gallery}
                ref={(element) => {
                    this.galleryElement = element;
                }}
            >
                {/* {this.renderSpinner()} */}
                <div className={styles.images}>
                    {this.props.imageUrls.map((imageUrl) =>
                        this.renderImage(imageUrl)
                    )}
                </div>
            </div>
        );
    }
}

export default Gallery;
