import React from 'react';
import PropTypes from 'prop-types';
import styles from './Generate.module.scss';

class Generate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: null,
            canvasDims: null,
            svgs: null,
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

export default Generate;
