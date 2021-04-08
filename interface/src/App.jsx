import React from 'react';
import {
    CanvasArea,
    TextInput,
    GenerateSVG,
    GalleryView,
    ImagePicker,
    InfographicPicker,
} from './components';
import styles from './App.module.scss';
import { Tabs, Tab, TabPane } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { style } from 'd3-selection';

let urls = [
    'images/canary_islands.jpg',
    'images/indonesia.jpg',
    'images/la.jpg',
    'images/vg.svg',
    'images/paris.jpg',
];

let photos = [
    {
        src: 'https://source.unsplash.com/2ShvY8Lf6l0/600x599',
        thumbnail: 'https://source.unsplash.com/2ShvY8Lf6l0/600x599',
        thumbnailWidth: 80,
        thumbnailHeight: 60,
    },
    {
        src: 'https://source.unsplash.com/Dm-qxdynoEc/600x799',
        thumbnail: 'https://source.unsplash.com/Dm-qxdynoEc/600x799',
        thumbnailWidth: 80,
        thumbnailHeight: 80,
    },
    {
        src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
        thumbnail: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
        thumbnailWidth: 60,
        thumbnailHeight: 80,
    },
    {
        src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
        thumbnail: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
        thumbnailWidth: 60,
        thumbnailHeight: 80,
    },
    {
        src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
        thumbnail: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
        thumbnailWidth: 60,
        thumbnailHeight: 80,
    },
    {
        src: 'https://source.unsplash.com/NQSWvyVRIJk/600x599',
        thumbnail: 'https://source.unsplash.com/NQSWvyVRIJk/600x599',
        thumbnailWidth: 80,
        thumbnailHeight: 60,
    },
    {
        src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
        thumbnail: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
        thumbnailWidth: 60,
        thumbnailHeight: 80,
    },
    {
        src: 'https://source.unsplash.com/PpOHJezOalU/600x599',
        thumbnail: 'https://source.unsplash.com/PpOHJezOalU/600x599',
        thumbnailWidth: 80,
        thumbnailHeight: 60,
    },
    {
        src: 'https://source.unsplash.com/I1ASdgphUH4/600x599',
        thumbnail: 'https://source.unsplash.com/I1ASdgphUH4/600x599',
        thumbnailWidth: 80,
        thumbnailHeight: 60,
    },
];

let flowUrls = [],
    svgUrls = [],
    connectionUrls = [],
    connectionNames = [
        'arrow',
        'arrow2',
        'arrow3',
        'arrow4',
        'curved_rect',
        'curved-arrow',
        'glasses',
        'minus-line',
        'striped-arrow',
        'striped-stick',
        'three-curved-arrows',
        'three-dots',
    ];

for (var i = 0; i < 5; i++) {
    flowUrls.push({
        src: `flowImages/flow_${i}.jpg`,
        thumbnail: `flowImages/flow_${i}.jpg`,
        thumbnailWidth: 50,
        thumbnailHeight: 50,
    });
}

for (var i = 1; i < 26; i++) {
    svgUrls.push({
        src: `svgImages/vg${i}.svg`,
        thumbnail: `svgImages/vg${i}.svg`,
        thumbnailWidth: 50,
        thumbnailHeight: 50,
    });
}

for (var connectionName of connectionNames) {
    connectionUrls.push({
        src: `connections/${connectionName}.svg`,
        thumbnail: `connections/${connectionName}.svg`,
        thumbnailWidth: 50,
        thumbnailHeight: 50,
    });
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: null,
            textInfo: null,
            isGetDesignsPressed: false,
        };
        this.callbackFromChild = this.callbackFromChild.bind(this);
        this.getDesignsPressed = this.getDesignsPressed.bind(this);
    }

    callbackFromChild(dataFromChild) {
        this.setState(dataFromChild, () => console.log(this.state));
    }

    getDesignsPressed = () => {
        this.setState({
            isGetDesignsPressed: true,
        });
    };

    render() {
        return (
            <div className={styles.AppBody}>
                <div className={styles.leftContainer}>
                    <TextInput callbackFromChild={this.callbackFromChild} />
                </div>
                <div
                    className={styles.middleContainer}
                    style={{
                        width: this.state.isGetDesignsPressed ? '50%' : '80%',
                    }}
                >
                    <CanvasArea getDesignsPressed={this.getDesignsPressed} />
                </div>
                <div
                    className={styles.rightContainer}
                    style={{
                        width: this.state.isGetDesignsPressed ? '30%' : '0%',
                        display: this.state.isGetDesignsPressed ? 'flex' : 'none',
                    }}
                >
                    <div className={styles.pickerContainer}>
                        <div
                            style={{
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            Layouts
                        </div>
                        <ImagePicker images={flowUrls} />
                        <div
                            style={{
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            Visual Groups
                        </div>
                        <ImagePicker images={svgUrls} />
                        <div
                            style={{
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            Connections
                        </div>
                        <ImagePicker images={connectionUrls} />
                    </div>
                    <div className={styles.infographicContainer}>
                        <div
                            style={{
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            Infographics
                        </div>
                        <InfographicPicker images={photos} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
