import React from 'react';
import {
    CanvasArea,
    TextInput,
    Generate,
    GalleryView,
    ImagePicker,
} from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPane } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { style } from 'd3-selection';

let urls = [
    'images/vg.svg',
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
    'images/paris.jpg',
];

let photos = [
    {
        src: 'images/vg.svg',
        width: 4,
        height: 3,
    },
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
    constructor(props) {
        super(props);
        this.state = {
            flows: null,
        };
        this.callbackFromChild = this.callbackFromChild.bind(this);
    }

    callbackFromChild(dataFromChild) {
        this.setState(dataFromChild, () => console.log(this.state));
    }
    render() {
        return (
            <Tabs defaultActiveKey="Draw" id="tabs">
                <Tab eventKey="View" title="View">
                    <div className={styles.ViewBody}>
                        <Generate imageUrls={urls} />
                    </div>
                </Tab>
                <Tab eventKey="Draw" title="Draw">
                    <div className={styles.AppBody}>
                        <div className={styles.leftContainer}>
                            <CanvasArea callbackFromChild={this.callbackFromChild} />
                        </div>
                        <div className={styles.rightContainer}>
                            <TextInput />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="Recommendations" title="Recommendations">
                    <div className={styles.galleryContainer}>
                        <GalleryView photos={photos} />
                    </div>
                    <div className={styles.galleryContainer}>
                        <ImagePicker images={urls} />
                    </div>
                </Tab>
            </Tabs>
        );
    }
}

export default App;
