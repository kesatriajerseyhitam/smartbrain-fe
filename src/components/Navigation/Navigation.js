import React from "react";
import Tilt from "react-tilt";
import logo from "./logo.png";

const Navigation = ({onRouteChange, isSignedIn}) => {
    const credential = isSignedIn ? (
        <p className="moon-gray f6 f4-l link dim pointer"
            onClick={ () => onRouteChange(`signin`) }>Sign Out</p>
    ) : (
        <div>
            <span className="moon-gray f6 f4-l link dim pointer"
                onClick={ () => onRouteChange(`signin`) }>Sign In</span>
            <span className="moon-gray ml4 f6 f4-l link dim pointer"
                onClick={ () => onRouteChange(`signup`) }>Sign Up</span>
        </div>
    )


    return (
        <nav className="flex flex-nowrap justify-between items-center ph4 ph5-l pv3">
            <div className="flex flex-nowrap items-center">
                <Tilt className="Tilt" options={{ max: 25 }}
                    style={{ height: 50, width: 50}}>
                    <div className="Tilt-inner">
                        <img src={logo} alt="mgfglc-logo"/>
                    </div>
                </Tilt>
                <span className="ml3 ml4-l moon-gray f6 f4-l fw6">mgfglc's Face Detector</span>
            </div>
            { credential }
        </nav>
    )
}

export default Navigation