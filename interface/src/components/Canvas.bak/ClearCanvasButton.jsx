import React from 'react';
import { useCanvas } from './CanvasContext';

export const ClearCanvasButton = () => {
    const { clearCanvas } = useCanvas();

    return <a onClick={clearCanvas}>Clear</a>; //classname="clearbutton"
};
