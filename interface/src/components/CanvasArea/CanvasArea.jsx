import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import styles from './CanvasArea.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faEraser,
    faTrash,
    faUpload,
    faExpand,
} from '@fortawesome/free-solid-svg-icons';

/*
CanvasArea Class
Area where elements would be added
*/
class CanvasArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRes: '4:3',
            imgIdx: -1,
        };
        this.draw_canvas = React.createRef();
        this.imgForm = React.createRef();
        this.clearCanvas = this.clearCanvas.bind(this);
        this.setCanvasRes = this.setCanvasRes.bind(this);
        this.redrawPics = this.redrawPics.bind(this);
        this.addPic = this.addPic.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.imgs = [];
    }

    componentDidMount() {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        this.setCanvasRes(1280, 960);
        ctx.fillStyle = 'ghostwhite';
        ctx.lineWidth = 1;
    }

    clearCanvas = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'ghostwhite';
        this.imgs = [];
        this.setState({
            imgIdx: -1,
        });
    };

    setCanvasRes(width, height) {
        const canvas = this.draw_canvas.current;
        canvas.width = width;
        canvas.height = height;
        this.clearCanvas();
    }

    redrawPics = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'ghostwhite';
        for (const img of this.imgs) {
            ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
        }
    };

    addPic(e) {
        e.preventDefault();
        if (!e.target.files[0]) {
            return;
        }

        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.src = URL.createObjectURL(e.target.files[0]);
        e.target.value = '';
        img.onload = () => {
            ctx.drawImage(img, 50, 50, 200, (img.height * 200) / img.width);

            const newImg = {
                image: img,
                x: 50,
                y: 50,
                width: 200,
                height: (img.height * 200) / img.width,
                isDragged: false,
            };
            this.imgs = this.imgs.concat(newImg);
        };
    }

    onMouseUp(e) {
        for (var img of this.imgs) {
            img.isDragged = false;
        }
        this.setState({
            imgIdx: -1,
        });
        e.preventDefault();
    }

    onMouseMove(e) {
        const canvas = this.draw_canvas.current;
        const i = this.state.imgIdx;
        if (i !== -1 && this.imgs[i].isDragged) {
            const scaledCanvas = canvas.getBoundingClientRect();
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            const img = this.imgs[i];
            const width = img.width;
            const height = img.height;
            img.x = canX - width / 2;
            img.y = canY - height / 2;
            this.redrawPics();
        }
        e.preventDefault();
    }

    onMouseDown(e) {
        const canvas = this.draw_canvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        const canX =
            ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
            canvas.width;
        const canY =
            ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
            canvas.height;
        var i,
            x,
            y,
            flag = false;
        for (i in this.imgs) {
            const img = this.imgs[i];
            const width = img.width;
            const height = img.height;
            x = img.x;
            y = img.y;
            console.log(canX, canY, x, y, width, height);
            if (canX < x + width && canX > x && canY > y && canY < y + height) {
                flag = true;
                break;
            }
        }
        if (flag === true) {
            this.setState({
                imgIdx: i,
            });
            const img = this.imgs[i];
            const width = img.width;
            const height = img.height;
            img.x = canX - width / 2;
            img.y = canY - height / 2;
            this.redrawPics();
            this.imgs[i].isDragged = true;
        }
        e.preventDefault();
    }

    render() {
        return (
            <div className={styles.canvasAreaContainer}>
                <canvas
                    id="draw_canvas"
                    ref={this.draw_canvas}
                    width="0"
                    height="0"
                    style={{
                        margin: 'auto',
                        display: 'block',
                        maxWidth: '95%',
                        maxHeight: '89%',
                        backgroundColor: 'ghostwhite',
                    }}
                    className={styles.canvasArea}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                />
                <div className={styles.canvasToolbox}>
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Resolution change button group"
                    >
                        <Button
                            size="medium"
                            variant="contained"
                            color="default"
                            className={styles.toolButton}
                            style={
                                this.state.canvasRes === '4:3'
                                    ? { pointerEvents: 'none' }
                                    : {}
                            }
                            onClick={() => {
                                this.setState({
                                    canvasRes: '4:3',
                                });
                                this.setCanvasRes(1280, 960);
                            }}
                            disabled={this.state.canvasRes === '4:3'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '4:3'
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <div>4:3</div>
                            </div>
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="default"
                            className={styles.toolButton}
                            style={
                                this.state.canvasRes === '3:4'
                                    ? { pointerEvents: 'none' }
                                    : {}
                            }
                            onClick={() => {
                                this.setState({
                                    canvasRes: '3:4',
                                });
                                this.setCanvasRes(960, 1280);
                            }}
                            disabled={this.state.canvasRes === '3:4'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '3:4'
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <div>3:4</div>
                            </div>
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="default"
                            className={styles.toolButton}
                            style={
                                this.state.canvasRes === '1:1'
                                    ? { pointerEvents: 'none' }
                                    : {}
                            }
                            onClick={() => {
                                this.setState({
                                    canvasRes: '1:1',
                                });
                                this.setCanvasRes(1280, 1280);
                            }}
                            disabled={this.state.canvasRes === '1:1'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '1:1'
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <div>1:1</div>
                            </div>
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="default"
                            className={styles.toolButton}
                            style={
                                this.state.canvasRes === '16:9'
                                    ? { pointerEvents: 'none' }
                                    : {}
                            }
                            onClick={() => {
                                this.setState({
                                    canvasRes: '16:9',
                                });
                                this.setCanvasRes(1280, 720);
                            }}
                            disabled={this.state.canvasRes === '16:9'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '16:9'
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <div>16:9</div>
                            </div>
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="default"
                            className={styles.toolButton}
                            style={
                                this.state.canvasRes === '9:16'
                                    ? { pointerEvents: 'none' }
                                    : {}
                            }
                            onClick={() => {
                                this.setState({
                                    canvasRes: '9:16',
                                });
                                this.setCanvasRes(720, 1280);
                            }}
                            disabled={this.state.canvasRes === '9:16'}
                        >
                            <div
                                className={styles.dimButton}
                                style={{
                                    color:
                                        this.state.canvasRes === '9:16'
                                            ? 'white'
                                            : 'black',
                                }}
                            >
                                <FontAwesomeIcon icon={faExpand} />
                                <div>9:16</div>
                            </div>
                        </Button>
                    </ButtonGroup>
                    <input
                        accept="image/*"
                        ref={this.imgForm}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={this.addPic}
                    />
                    <ButtonGroup
                        className={styles.toolButtonGroup}
                        variant="contained"
                        color="default"
                        aria-label="Draw Area tools"
                    >
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.imgForm.current.click();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faUpload}
                                aria-label="Upload Image"
                            />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} aria-label="Draw" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                        >
                            <FontAwesomeIcon icon={faEraser} aria-label="Erase" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.clearCanvas();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                aria-label="Clear Draw Area"
                            />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default CanvasArea;

/*
Resolutions:
4:3 - 1280x960
16:9 - 1280 x 720
1:1 - 1280x1280
*/
