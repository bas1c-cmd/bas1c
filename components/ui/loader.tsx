import React from "react";
import "./loader.css";

export function Loader() {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
            <div className="video-loader"></div>
        </div>
    );
}
