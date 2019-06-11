import React from "react";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className="flex flex-wrap justify-center">
            <p className="moon-gray f4 w-100 tc ph3">
                {`Insert some image url below to detect a face: `}
            </p>
            <input className="pa2 f5 w-70 center" type="text"
                placeholder="Put your image here mate"
                onChange={onInputChange}/>
            <button className="bg-green white mt4 pv2 b--none br3 shadow-3 f4 w-40 grow pointer"
                onClick={onSubmit}>Detect</button>
        </div>
    )
}

export default ImageLinkForm