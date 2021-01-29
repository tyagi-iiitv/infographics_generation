import React from 'react';
import { useCanvas } from './CanvasContext';

export const SaveCanvasButton = () => {
    const { saveCanvas } = useCanvas();

    return (
        <a id="1" classname="savebutton" onClick={(e) => saveCanvas(e)}>
            Save
        </a>
    ); //classname="savebutton"
};

//  ref: https://www.sanwebe.com/snippet/downloading-canvas-as-image-dataurl-on-button-click
// https://stackoverflow.com/questions/51945711/unable-to-download-react-canvas-drawing
// https://jsfiddle.net/codepo8/V6ufG/2/
// https://jsfiddle.net/user2314737/28wqq1gu/
