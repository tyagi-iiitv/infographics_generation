import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';
import styles from './Canvas.module.scss';

export function Canvas() {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            className={styles.canvas}
        />
    );
}

// ref: https://github.com/satansdeer/drawing-react-canvas/blob/master/src/App.js
