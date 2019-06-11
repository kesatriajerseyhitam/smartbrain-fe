import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return imageUrl ? (
        (
            <div className="flex flex-wrap justify-center mv3">
                <div className="absolute mv2 tc">
                    <img id="inputImage" className="shadow-3" src={ imageUrl }
                        alt="Detection Result" width="380px" height="auto" />
                    <div className="bounding-box"
                        style={{
                            top: box.topRow, right: box.rightCol,
                            bottom: box.bottomRow, left: box.leftCol
                        }}></div>
                </div>
            </div>
        )
    ) : ( <div></div> )
}

export default FaceRecognition