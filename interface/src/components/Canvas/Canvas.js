import React, { useEffect } from 'react';
import { useCanvas } from './CanvasContext';

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
        />
    );
}

// ref: https://github.com/satansdeer/drawing-react-canvas/blob/master/src/App.js
