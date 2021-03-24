import React from 'react';
import { CanvasArea, TextInput, Gallery, GalleryView } from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPane } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { style } from 'd3-selection';

let urls = [
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
    'images/paris.jpg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
];

let photos = [
    {
        src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
        width: 4,
        height: 3,
    },
    {
        src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
        width: 1,
        height: 1,
    },
    {
        src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
        width: 3,
        height: 4,
    },
    {
        src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
        width: 3,
        height: 4,
    },
    {
        src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
        width: 3,
        height: 4,
    },
    {
        src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
        width: 4,
        height: 3,
    },
    {
        src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
        width: 3,
        height: 4,
    },
    {
        src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
        width: 4,
        height: 3,
    },
    {
        src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
        width: 4,
        height: 3,
    },
];

class App extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="Draw" id="tabs">
                <Tab eventKey="Draw" title="Draw">
                    <div className={styles.AppBody}>
                        <div className={styles.leftContainer}>
                            <CanvasArea />
                        </div>
                        <div className={styles.rightContainer}>
                            <TextInput />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="VIF Recommendation" title="VIF Recommendation">
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="VG Recommendation" title="VG Recommendation">
                    <div className={styles.App}>
                        <div className={styles.AppBody}>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                            <div className={styles.leftContainer}>
                                <CanvasArea />
                            </div>
                            <div className={styles.galleryContainer}>
                                <Gallery imageUrls={urls} />
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="Explore Connections" title="Explore Connections">
                    <GalleryView photos={photos} />
                </Tab>
            </Tabs>
        );
    }
}

export default App;
