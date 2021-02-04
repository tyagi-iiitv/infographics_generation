import React, { useContext, useRef, useState } from 'react';

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = () => {
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
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextRef.current = context;
    };

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const saveCanvas = (e) => {
        // console.log("hiiiiiii")
        const canvas = canvasRef.current;
        console.log(canvas);

        // let img = canvas.toDataURL("image/png");
        // e.href = img
        // console.log(e);

        let link = document.getElementById('1');
        link.href = canvas.toDataURL('image/png');
        link.download = 'dataflow.png';

        console.log(link);
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw,
                saveCanvas,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);
