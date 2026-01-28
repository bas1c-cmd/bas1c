import React from "react";
import { Terminal, Cpu, Database, Code2 } from "lucide-react";
import "./mythic-card.css";

export function MythicCard() {
    return (
        <div className="uiverse-mythic-card">
            <div className="deck">
                <div className="card mythic">
                    <span className="rarity">FULL STACK</span>

                    <div className="art">
                        <span className="cost">AI</span>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8B0000] shadow-[0_0_20px_rgba(139,0,0,0.5)] z-10 bg-black">
                            <img src="/logo.png" alt="bas1c" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="content">
                        <div className="title">bas1c</div>
                        <div className="type">AI Engineer • Automation Architect</div>

                        <div className="stats">
                            <span className="flex items-center gap-1">❤️ 100%</span>
                            <span className="flex items-center gap-1">⚔️ XP</span>
                            <span className="flex items-center gap-1">🛡️ LNX</span>
                        </div>

                        <div className="status">
                            <span title="Python"><Code2 className="w-4 h-4 text-blue-400" /></span>
                            <span title="System"><Terminal className="w-4 h-4 text-green-400" /></span>
                            <span title="Automation"><Cpu className="w-4 h-4 text-red-400" /></span>
                            <span title="Backend"><Database className="w-4 h-4 text-yellow-400" /></span>
                        </div>

                        <div className="ability">
                            <div className="ability-title">Systems Architect</div>
                            <div className="ability-text">
                                Deploys <b>Scalable Solutions</b>. 100% chance to <b>Optimize</b> critical workflows.
                            </div>
                        </div>

                        <div className="flavor">“Worlds end when it compiles.”</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
