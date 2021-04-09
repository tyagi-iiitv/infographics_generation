import React from 'react';
import {
    CanvasArea,
    TextInput,
    GenerateSVG,
    GalleryView,
    ImagePicker,
    InfographicPicker,
    Upload,
    Export,
    ColorPallets,
    ConnectionTypes,
    Examples,
    About,
} from './components';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, FormControl, Button, Form, Tooltip } from 'react-bootstrap';
import {
    uploadButtonState,
    colorButtonState,
    connectionButtonState,
    exampleButtonState,
} from './state';

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flows: null,
            textInfo: null,
            isGetDesignsPressed: false,
            flowUrls: ['flows/flow0.jpg', 'flows/flow1.jpg'],
            inputText: ``,
            curFlowIndex: 0,
        };
        this.callbackFromChild = this.callbackFromChild.bind(this);
        this.getDesignsPressed = this.getDesignsPressed.bind(this);
        this.prevLayoutClick = this.prevLayoutClick.bind(this);
        this.nextLayoutClick = this.nextLayoutClick.bind(this);
        this.prevVGClick = this.prevVGClick.bind(this);
        this.nextVGClick = this.nextVGClick.bind(this);
        this.prevConClick = this.prevConClick.bind(this);
        this.nextConClick = this.nextConClick.bind(this);
    }

    prevLayoutClick() {
        let curState = { ...this.state };
        curState.curFlowIndex -= 2;
        let time = performance.now();
        curState.flowUrls = [
            'flows/flow' +
                curState.curFlowIndex.toString() +
                '.jpg?' +
                time.toString(),
            'flows/flow' +
                (curState.curFlowIndex + 1).toString() +
                '.jpg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    nextLayoutClick() {
        let curState = { ...this.state };
        curState.curFlowIndex += 2;
        let time = performance.now();
        curState.flowUrls = [
            'flows/flow' +
                curState.curFlowIndex.toString() +
                '.jpg?' +
                time.toString(),
            'flows/flow' +
                (curState.curFlowIndex + 1).toString() +
                '.jpg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    prevVGClick(event) {}

    nextVGClick(event) {}

    prevConClick(event) {}

    nextConClick(event) {}

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
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand style={{ fontSize: 30, padding: '5 0' }}>
                        Infographics Wizard
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Upload values={uploadButtonState} />
                        <Export />
                        <ColorPallets values={colorButtonState} />
                        <ConnectionTypes values={connectionButtonState} />
                    </Nav>
                    <Nav>
                        <Examples
                            values={exampleButtonState}
                            callbackFromChild={this.callbackFromChild}
                        />
                        <About />
                    </Nav>
                </Navbar>
                <div className={styles.AppBody}>
                    <div className={styles.leftContainer}>
                        <TextInput
                            inputText={this.state.inputText}
                            callbackFromChild={this.callbackFromChild}
                        />
                    </div>
                    <div
                        className={styles.middleContainer}
                        style={{
                            width: this.state.isGetDesignsPressed ? '50%' : '80%',
                        }}
                    >
                        <CanvasArea
                            getDesignsPressed={this.getDesignsPressed}
                            callbackFromChild={this.callbackFromChild}
                        />
                    </div>
                    <div
                        className={styles.rightContainer}
                        style={{
                            width: this.state.isGetDesignsPressed ? '30%' : '0%',
                            display: this.state.isGetDesignsPressed
                                ? 'flex'
                                : 'none',
                        }}
                    >
                        <div className={styles.pickerContainer}>
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="danger"
                                    style={{ marginTop: 10, marginBottom: 10 }}
                                >
                                    Layouts
                                </Button>
                            </div>
                            <ImagePicker imgUrls={this.state.flowUrls} />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    variant="danger"
                                    style={{ marginRight: 20, marginTop: 10 }}
                                    onClick={this.prevLayoutClick}
                                >
                                    Prev
                                </Button>
                                <Button
                                    variant="danger"
                                    style={{ marginTop: 10 }}
                                    onClick={this.nextLayoutClick}
                                >
                                    Next
                                </Button>
                            </div>
                            {/* <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <Button variant="danger" style={{marginTop: 10}}>Visual Groups</Button>
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
                                <Button variant="danger" style={{marginTop: 10}}>Connections</Button>
                            </div>
                            <ImagePicker images={flowUrls} />
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
                                <Button variant="danger">Infographics</Button>
                            </div>
                            <InfographicPicker images={photos} /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
