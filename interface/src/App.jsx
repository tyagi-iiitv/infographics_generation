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
    ShowCanvas,
} from './components';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import {
    uploadButtonState,
    colorButtonState,
    connectionButtonState,
    exampleButtonState,
} from './state';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recoMax: 3, // To check the cur value of recommendations being displayed from the configurations array
            recoLen: 48,
            textInfo: null,
            selectedLayouts: null,
            selectedVGs: null,
            selectedConns: null,
            isGetDesignsPressed: false,
            canvasView: true,
            canvasBg: 'images/background4.jpg',
            flowUrls: ['flows/flow0.jpg', 'flows/flow1.jpg'],
            VGUrls: ['rawvg/vg0.svg', 'rawvg/vg1.svg'],
            connUrls: ['getcon/conn0.svg', 'getcon/conn1.svg'],
            inputText: ``,
            curFlowIndex: 0,
            curVGIndex: 0,
            curConnIndex: 0,
            flowLen: 2,
            VGLen: 23,
            connLen: 12,
            innerHtml: { __html: `` },
            innerHtml1: { __html: `` },
            innerHtml2: { __html: `` },
            innerHtml3: { __html: `` },
            innerHtml4: { __html: `` },
            colorPallete: [
                '#7fc97f',
                '#beaed4',
                '#fdc086',
                '#ffff99',
                '#386cb0',
                '#f0027f',
                '#bf5b17',
                '#666666',
            ],
            uploadPivot: false,
        };
        this.callbackFromChild = this.callbackFromChild.bind(this);
        this.getDesignsPressed = this.getDesignsPressed.bind(this);
        this.prevLayoutClick = this.prevLayoutClick.bind(this);
        this.nextLayoutClick = this.nextLayoutClick.bind(this);
        this.prevVGClick = this.prevVGClick.bind(this);
        this.nextVGClick = this.nextVGClick.bind(this);
        this.prevConClick = this.prevConClick.bind(this);
        this.nextConClick = this.nextConClick.bind(this);
        this.prevInfoClick = this.prevInfoClick.bind(this);
        this.nextInfoClick = this.nextInfoClick.bind(this);
        this.info1Click = this.info1Click.bind(this);
        this.info2Click = this.info2Click.bind(this);
        this.info3Click = this.info3Click.bind(this);
        this.info4Click = this.info4Click.bind(this);
    }

    prevInfoClick() {
        this.setState({ recoMax: this.state.recoMax - 4 });
    }
    nextInfoClick() {
        this.setState({ recoMax: this.state.recoMax + 4 }, () =>
            console.log(this.state)
        );
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

    prevVGClick() {
        let curState = { ...this.state };
        curState.curVGIndex -= 2;
        let time = performance.now();
        curState.VGUrls = [
            'rawvg/vg' + curState.curVGIndex.toString() + '.svg?' + time.toString(),
            'rawvg/vg' +
                (curState.curVGIndex + 1).toString() +
                '.svg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    nextVGClick() {
        let curState = { ...this.state };
        curState.curVGIndex += 2;
        let time = performance.now();
        curState.VGUrls = [
            'rawvg/vg' + curState.curVGIndex.toString() + '.svg?' + time.toString(),
            'rawvg/vg' +
                (curState.curVGIndex + 1).toString() +
                '.svg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    prevConClick() {
        let curState = { ...this.state };
        curState.curConnIndex -= 2;
        let time = performance.now();
        curState.connUrls = [
            'getcon/conn' +
                curState.curConnIndex.toString() +
                '.svg?' +
                time.toString(),
            'getcon/conn' +
                (curState.curConnIndex + 1).toString() +
                '.svg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    nextConClick() {
        let curState = { ...this.state };
        curState.curConnIndex += 2;
        let time = performance.now();
        curState.connUrls = [
            'getcon/conn' +
                curState.curConnIndex.toString() +
                '.svg?' +
                time.toString(),
            'getcon/conn' +
                (curState.curConnIndex + 1).toString() +
                '.svg?' +
                time.toString(),
        ];
        this.setState(curState, () => console.log(curState));
    }

    info1Click() {
        this.setState({ canvasView: false, innerHtml: this.state.innerHtml1 });
    }

    info2Click() {
        this.setState({ canvasView: false, innerHtml: this.state.innerHtml2 });
    }

    info3Click() {
        this.setState({ canvasView: false, innerHtml: this.state.innerHtml3 });
    }

    info4Click() {
        this.setState({ canvasView: false, innerHtml: this.state.innerHtml4 });
    }

    callbackFromChild(dataFromChild) {
        console.log(dataFromChild);
        this.setState(dataFromChild, () => console.log(this.state));
    }

    getDesignsPressed = () => {
        this.setState({
            isGetDesignsPressed: true,
        });
    };

    render() {
        // console.log(
        //     this.state.selectedConns,
        //     this.state.selectedLayouts,
        //     this.state.selectedVGs
        // );
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand style={{ fontSize: 30, padding: '5 0' }}>
                        Infographics Wizard
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Upload
                            values={uploadButtonState}
                            callbackFromChild={this.callbackFromChild}
                        />
                        <Export />
                        <ColorPallets
                            values={colorButtonState}
                            callbackFromChild={this.callbackFromChild}
                        />
                        <ConnectionTypes values={connectionButtonState} />
                        <ShowCanvas callbackFromChild={this.callbackFromChild} />
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
                            width: this.state.isGetDesignsPressed ? '70%' : '80%',
                        }}
                    >
                        <div
                            className={styles.svgContainer}
                            dangerouslySetInnerHTML={this.state.innerHtml}
                            style={{
                                display: this.state.canvasView ? 'none' : 'flex',
                            }}
                        />
                        {this.state.canvasView && (
                            <CanvasArea
                                getDesignsPressed={this.getDesignsPressed}
                                callbackFromChild={this.callbackFromChild}
                                inputText={this.state.inputText}
                                backgroundSVG={this.state.innerHtml}
                                colorPallete={this.state.colorPallete}
                                uploadPivot={this.state.uploadPivot}
                                background={this.state.canvasBg}
                                recoMax={this.state.recoMax}
                                selectedVGs={this.state.selectedVGs}
                                selectedConns={this.state.selectedConns}
                                selectedLayouts={this.state.selectedLayouts}
                            />
                        )}
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
                                <Badge
                                    pill
                                    variant="info"
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        fontSize: 15,
                                    }}
                                >
                                    Layouts
                                </Badge>
                            </div>
                            <ImagePicker
                                imgUrls={this.state.flowUrls}
                                id={0}
                                curFlowIndex={this.state.curFlowIndex}
                                callbackFromChild={this.callbackFromChild}
                            />
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
                                    style={{ marginRight: 20 }}
                                    onClick={this.prevLayoutClick}
                                    disabled={
                                        this.state.curFlowIndex <= 0 ? true : false
                                    }
                                >
                                    Prev
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={this.nextLayoutClick}
                                    disabled={
                                        this.state.curFlowIndex + 1 >=
                                        Math.min(this.state.flowLen, 49)
                                            ? true
                                            : false
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Badge
                                    pill
                                    variant="info"
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        fontSize: 15,
                                    }}
                                >
                                    Visual Groups
                                </Badge>
                            </div>
                            <ImagePicker
                                id={1}
                                imgUrls={this.state.VGUrls}
                                callbackFromChild={this.callbackFromChild}
                            />
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
                                    style={{ marginRight: 20 }}
                                    onClick={this.prevVGClick}
                                    disabled={
                                        this.state.curVGIndex <= 0 ? true : false
                                    }
                                >
                                    Prev
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={this.nextVGClick}
                                    disabled={
                                        this.state.curVGIndex + 1 >= this.state.VGLen
                                            ? true
                                            : false
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Badge
                                    pill
                                    variant="info"
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        fontSize: 15,
                                    }}
                                >
                                    Connections
                                </Badge>
                            </div>
                            <ImagePicker
                                id={2}
                                callbackFromChild={this.callbackFromChild}
                                imgUrls={this.state.connUrls}
                            />
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
                                    style={{ marginRight: 20 }}
                                    onClick={this.prevConClick}
                                    disabled={
                                        this.state.curConnIndex <= 0 ? true : false
                                    }
                                >
                                    Prev
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={this.nextConClick}
                                    disabled={
                                        this.state.curConnIndex + 1 >=
                                        this.state.connLen
                                            ? true
                                            : false
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className={styles.infographicContainer}>
                            <div
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Badge
                                    pill
                                    variant="info"
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 10,
                                        fontSize: 15,
                                    }}
                                >
                                    Infographics
                                </Badge>
                            </div>
                            {/* <div className={styles.infographics} dangerouslySetInnerHTML={this.state.innerHtml}/> */}
                            <div
                                dangerouslySetInnerHTML={this.state.innerHtml1}
                                className={styles.infographics}
                                onClick={this.info1Click}
                            ></div>
                            <div
                                dangerouslySetInnerHTML={this.state.innerHtml2}
                                className={styles.infographics}
                                onClick={this.info2Click}
                            ></div>
                            <div
                                dangerouslySetInnerHTML={this.state.innerHtml3}
                                className={styles.infographics}
                                onClick={this.info3Click}
                            ></div>
                            <div
                                dangerouslySetInnerHTML={this.state.innerHtml4}
                                className={styles.infographics}
                                onClick={this.info4Click}
                            ></div>
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
                                    style={{ marginRight: 20 }}
                                    onClick={this.prevInfoClick}
                                    disabled={this.state.recoMax <= 3 ? true : false}
                                >
                                    Prev
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={this.nextInfoClick}
                                    disabled={
                                        this.state.recoMax >= this.state.recoLen
                                            ? true
                                            : false
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
