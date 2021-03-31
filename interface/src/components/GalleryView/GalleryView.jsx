import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Button from '@material-ui/core/Button';
import styles from './GalleryView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function GalleryView(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const CustomFooter = ({ innerProps, isModal }) =>
        isModal ? (
            <div {...innerProps}>
                <div align="center">
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        style={{ margin: '10px' }}
                    >
                        <FontAwesomeIcon icon={faDownload} />
                    </Button>
                </div>
            </div>
        ) : null;

    console.log(props.combine_images);
    return (
        <div className={styles.fullGallery}>
            <Gallery photos={props.photos} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={props.photos.map((x) => ({
                                ...x,
                            }))}
                            components={{ Footer: CustomFooter }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}
