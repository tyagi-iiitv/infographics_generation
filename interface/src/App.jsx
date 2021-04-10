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
import { Navbar, Nav, Button, Badge } from 'react-bootstrap';
import {
    uploadButtonState,
    colorButtonState,
    connectionButtonState,
    exampleButtonState,
} from './state';
import generateSVG from './generateSVG';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInfo: null,
            isGetDesignsPressed: false,
            flowUrls: ['flows/flow0.jpg', 'flows/flow1.jpg'],
            VGUrls: ['getvg/vg0.svg', 'getvg/vg1.svg'],
            connUrls: ['getcon/conn0.svg', 'getcon/conn1.svg'],
            inputText: ``,
            curFlowIndex: 0,
            curVGIndex: 0,
            curConnIndex: 0,
            flowLen: 2,
            VGLen: 23,
            connLen: 12,
            innerHtml: { __html: '' },
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

    prevVGClick() {
        let curState = { ...this.state };
        curState.curVGIndex -= 2;
        let time = performance.now();
        curState.VGUrls = [
            'getvg/vg' + curState.curVGIndex.toString() + '.svg?' + time.toString(),
            'getvg/vg' +
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
            'getvg/vg' + curState.curVGIndex.toString() + '.svg?' + time.toString(),
            'getvg/vg' +
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
                            width: this.state.isGetDesignsPressed ? '70%' : '80%',
                        }}
                    >
                        <CanvasArea
                            getDesignsPressed={this.getDesignsPressed}
                            callbackFromChild={this.callbackFromChild}
                            inputText={this.state.inputText}
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
                            <ImagePicker imgUrls={this.state.VGUrls} />
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
                            <ImagePicker imgUrls={this.state.connUrls} />
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
                                dangerouslySetInnerHTML={this.state.innerHtml}
                                className={styles.infographics}
                            ></div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {/* <Button
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
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
