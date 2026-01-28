import React from "react";
import "./loader.css";

export function Loader() {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/10 backdrop-blur-2xl">
            <div className="relative p-12 rounded-3xl bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10">
                <div className="loader">
                    <div className="box box0"><div></div></div>
                    <div className="box box1"><div></div></div>
                    <div className="box box2"><div></div></div>
                    <div className="box box3"><div></div></div>
                    <div className="box box4"><div></div></div>
                    <div className="box box5"><div></div></div>
                    <div className="box box6"><div></div></div>
                    <div className="box box7"><div></div></div>
                    <div className="ground"><div></div></div>
                </div>
            </div>
        </div>
    );
}
