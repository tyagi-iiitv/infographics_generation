import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import axios from 'axios';
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
Drawing functions implemented from:
http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
*/

/*
CanvasArea Class
Area where user would drag element and draw the flow
*/
class CanvasArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRes: '4:3', // The present resolution of the canvas
            imgIdx: -1, // The image which is currently being dragged
            selectedTool: 'upload', // Tool selected by the user
            isDrawing: false, // Whether the user is drawing/erasing inside the canvas
        };

        this.undraw = this.undraw.bind(this);
        this.clearCanvasArea = this.clearCanvasArea.bind(this);
        this.setCanvasRes = this.setCanvasRes.bind(this);
        this.redrawPics = this.redrawPics.bind(this);
        this.addPic = this.addPic.bind(this);
        this.addClick = this.addClick.bind(this);
        this.redrawLines = this.redrawLines.bind(this);
        this.getBase64Image = this.getBase64Image.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.draw_canvas = React.createRef(); // Reference for the canvas area
        this.imgForm = React.createRef(); // Reference for the upload image input

        this.imgs = []; // List of images uploaded by the user
        this.clickX = []; // X-coordinates of the drawing/erasing
        this.clickY = []; // Y-coordinates of the drawing/erasing
        this.clickDrag = []; // True if user is clicking
        this.clickColor = []; // Black for pen and white for eraser
        this.canvasDims = { width: 1280, height: 960 }; // Dimensions of the canvas
    }

    /*
    Initializing canavs with default resolution
    */
    componentDidMount() {
        this.setCanvasRes(this.canvasDims.width, this.canvasDims.height);
    }

    /*
    Clears the drawing area from all drawings and uploaded images.
    Does not clears the data saved in memory, so can be redrawn.
    */
    undraw = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /*
    Clears the drawing area as well as the memory, so cannot be redrawn.
    */
    clearCanvasArea = () => {
        // First undraws everything
        this.undraw();
        // Then clears memory
        this.imgs = [];
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clickColor = [];
        this.setState({
            imgIdx: -1,
        });
    };

    /*
    Sets the canvas resolution in pixels
    Resolutions:
    4:3  - 1280 px   x   960 px
    3:4  - 960 px    x   1280 px
    1:1  - 1280 px   x   1280 px
    16:9 - 1280 px   x   720 px
    9:16 - 720 px    x   1280 px
    */
    setCanvasRes(width, height) {
        this.clearCanvasArea();
        const canvas = this.draw_canvas.current;
        canvas.width = width;
        canvas.height = height;
    }

    /*
    Re-adds the uploaded draggable pictures to the canvas
    */
    redrawPics = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        // Positions all the images to their past position
        for (const img of this.imgs) {
            ctx.drawImage(img.image, img.x, img.y, img.width, img.height);
        }
    };

    /*
    Adds the uploaded image to the drawing area
    */
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
            // Currently, setting all uploaded images to fixed width of 200px
            ctx.drawImage(img, 50, 50, 200, (img.height * 200) / img.width);

            // Add this image to the list of uploaded images
            const newImg = {
                image: img,
                x: 50,
                y: 50,
                width: 200,
                height: (img.height * 200) / img.width,
                isDragged: false,
            };
            this.imgs.push(newImg);
        };
    }

    /*
    Saves the pointer location, dragging condition and draw colour to the
    list
    */
    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        var curColor;
        // Black if pen, white if eraser
        if (this.state.selectedTool === 'draw') {
            curColor = '#000000';
        } else if (this.state.selectedTool === 'erase') {
            curColor = '#ffffff';
        }
        this.clickColor.push(curColor);
    }

    /*
    Redraws all the lines of the pen and eraser tool
    */
    redrawLines = () => {
        const canvas = this.draw_canvas.current;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 20; // Change for line thickness

        for (var i = 0; i < this.clickX.length; i++) {
            ctx.beginPath();
            if (this.clickDrag[i] && i) {
                // If first point, connect to bottom-left point
                ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                // Else, conenct to last point
                ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            ctx.lineTo(this.clickX[i], this.clickY[i]);
            ctx.closePath();
            ctx.strokeStyle = this.clickColor[i];
            ctx.stroke();
        }
    };

    /*
    Returns Base 64 string of an image
    */
    getBase64Image(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
    }

    /*
    Send flow image and dragged locations to server
    */
    async sendInfo() {
        const canvas = this.draw_canvas.current;
        this.undraw();
        this.redrawLines();
        const flowImg = canvas.toDataURL('image/png');
        this.redrawPics();
        var draggedImages = [];
        this.imgs.forEach((img) => {
            const draggedImage = {
                img: this.getBase64Image(img.image),
                x: img.x,
                y: img.y,
                width: img.width,
                height: img.height,
            };
            draggedImages.push(draggedImage);
        });
        const response = await axios.post('/layout/', {
            canvasDims: { ...this.canvasDims },
            flowImg: flowImg,
            draggedImages: draggedImages,
        });
        console.log(response);
    }

    /*
    On releasing mouse button,

    If the upload tool is selected: Sets isDragged property of currently
    dragged image ton false, so that no image can be dragged on mouse movement.

    If draw/erase tool is selected: Sets isDrawing condition to false so
    that no lines can be drawn/erased
    */
    onMouseUp(e) {
        e.preventDefault();
        if (this.state.selectedTool === 'upload') {
            var i = this.state.imgIdx;
            if (i !== -1 && this.imgs[i].isDragged) {
                this.imgs[this.state.imgIdx].isDragged = false;
                this.setState({
                    imgIdx: -1,
                });
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.setState({
                isDrawing: false,
            });
        }
    }

    /*
    On taking mouse pointer out of the canvas,

    If draw/erase tool is selected: Sets isDrawing condition to false so
    that no lines can be drawn/erased
    */
    onMouseLeave(e) {
        e.preventDefault();
        if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            this.setState({
                isDrawing: false,
            });
        }
    }

    /*
    On moving the mouse pointer,

    If the upload tool is selected: If an image is draggable,
    change its position and redraw the canvas.

    If draw/erase tool is selected: Registeres the current mouse
    position to the memory and redraws the canvas.
    */
    onMouseMove(e) {
        e.preventDefault();
        const canvas = this.draw_canvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
            const i = this.state.imgIdx;
            if (i !== -1 && this.imgs[i].isDragged) {
                // Position fo image w.r.t the canvas
                const canX =
                    ((e.pageX - scaledCanvas.x - window.scrollX) /
                        scaledCanvas.width) *
                    canvas.width;
                const canY =
                    ((e.pageY - scaledCanvas.y - window.scrollY) /
                        scaledCanvas.height) *
                    canvas.height;
                const img = this.imgs[i];
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            if (this.state.isDrawing === true) {
                const canX =
                    ((e.pageX - scaledCanvas.x - window.scrollX) /
                        scaledCanvas.width) *
                    canvas.width;
                const canY =
                    ((e.pageY - scaledCanvas.y - window.scrollY) /
                        scaledCanvas.height) *
                    canvas.height;
                this.addClick(canX, canY, true);
            }
        }
        this.undraw();
        this.redrawLines();
        this.redrawPics();
    }

    /*
    On clicking the mouse button,

    If the upload tool is selected: Finds the image which is under the
    mosue pointer and sets it's isDragged property to true so that it
    can eb dragged around.

    If draw/erase tool is selected: Sets the isDrawing condition to true so
    that tit can start drawing.
    */
    onMouseDown(e) {
        const canvas = this.draw_canvas.current;
        const scaledCanvas = canvas.getBoundingClientRect();
        if (this.state.selectedTool === 'upload') {
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
                if (canX < x + width && canX > x && canY > y && canY < y + height) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                this.setState({
                    imgIdx: Number(i),
                });
                const img = this.imgs[i];
                const width = img.width;
                const height = img.height;
                img.x = canX - width / 2;
                img.y = canY - height / 2;
                this.imgs[i].isDragged = true;
                this.undraw();
                this.redrawLines();
                this.redrawPics();
            }
        } else if (
            this.state.selectedTool === 'draw' ||
            this.state.selectedTool === 'erase'
        ) {
            const canX =
                ((e.pageX - scaledCanvas.x - window.scrollX) / scaledCanvas.width) *
                canvas.width;
            const canY =
                ((e.pageY - scaledCanvas.y - window.scrollY) / scaledCanvas.height) *
                canvas.height;
            this.setState({
                isDrawing: true,
            });
            this.addClick(canX, canY);
            this.undraw();
            this.redrawLines();
            this.redrawPics();
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
                        backgroundColor: 'white',
                    }}
                    className={styles.canvasArea}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 960;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
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
                                this.canvasDims.width = 960;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
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
                                this.canvasDims.width = 1280;
                                this.canvasDims.height = 720;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
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
                                this.canvasDims.width = 720;
                                this.canvasDims.height = 1280;
                                this.setCanvasRes(
                                    this.canvasDims.width,
                                    this.canvasDims.height
                                );
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
                        aria-label="Download Tools"
                    >
                        <Button
                            size="medium"
                            variant="contained"
                            color="secondary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.sendInfo();
                            }}
                        >
                            Update Flow
                        </Button>
                    </ButtonGroup>
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
                                this.setState({
                                    selectedTool: 'upload',
                                });
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
                            onClick={() => {
                                if (this.state.selectedTool === 'draw') {
                                    this.setState({
                                        selectedTool: 'upload',
                                    });
                                } else {
                                    this.setState({
                                        selectedTool: 'draw',
                                    });
                                }
                            }}
                            style={
                                this.state.selectedTool === 'draw'
                                    ? { backgroundColor: '#101536' }
                                    : {}
                            }
                            disableElevation={this.state.selectedTool === 'draw'}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} aria-label="Draw" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                if (this.state.selectedTool === 'erase') {
                                    this.setState({
                                        selectedTool: 'upload',
                                    });
                                } else {
                                    this.setState({
                                        selectedTool: 'erase',
                                    });
                                }
                            }}
                            style={
                                this.state.selectedTool === 'erase'
                                    ? { backgroundColor: '#101536' }
                                    : {}
                            }
                            disableElevation={this.state.selectedTool === 'erase'}
                        >
                            <FontAwesomeIcon icon={faEraser} aria-label="Erase" />
                        </Button>
                        <Button
                            size="medium"
                            variant="contained"
                            color="primary"
                            className={styles.toolButton}
                            onClick={() => {
                                this.setState({
                                    selectedTool: 'upload',
                                });
                                this.clearCanvasArea();
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
