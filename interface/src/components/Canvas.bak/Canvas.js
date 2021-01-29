import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';
import styles from './Canvas.module.scss';

class DrawArea extends React.Component {
    constructor(props) {
        super(props);
        this.prepareCanvas = this.prepareCanvas.bind(this);
        this.startDrawing = this.startDrawing.bind(this);
        this.finishDrawing = this.finishDrawing.bind(this);
        this.draw = this.draw.bind(this);

        this.canavsRef = React.createRef();
    }

    prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 800;
        canvas.border = 'black';
        canvas.style.border = `5px solid`;
        canvas.style.width = `400px`; //window.innerWidth
        canvas.style.height = `400px`; //`${window.innerHeight}px`

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 19;
        context.fillStyle = 'ghostwhite';
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextRef.current = context;
    };

    // const {
    //     canvasRef,
    //     prepareCanvas,
    //     startDrawing,
    //     finishDrawing,
    //     draw,
    // } = useCanvas();

    // useEffect(() => {
    //     prepareCanvas();
    // }, []);

    // return (
    //     <canvas
    //         onMouseDown={startDrawing}
    //         onMouseUp={finishDrawing}
    //         onMouseMove={draw}
    //         ref={canvasRef}
    //         className={styles.canvas}
    //     />
    // );
}
export default DrawArea;

// ref: https://github.com/satansdeer/drawing-react-canvas/blob/master/src/App.js
