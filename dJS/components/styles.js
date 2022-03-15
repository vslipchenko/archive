import React from "react";

export default function Styles() {
    return (
        <style jsx="true">{`
            body {
                color: white;
                font-family: Montserrat;
            }
            
            h2 {
                margin-bottom: 0;
            }
            
            input {
                background: none;
                border: none;
                border-bottom: 1.5px solid white;
                width: 100%;
                text-align: center;
                outline: none;
                caret-color: white;
                color: inherit;
                padding: 10px;
            }
            
            button {
                background: none;
                border: none;
                color: inherit;
            }
            
            button:focus {
                outline: none;
            }
            
            button.loading {
                pointer-events: none;
                animation: loading 1s infinite alternate;
            }
            
            @keyframes loading {
              50% {
                border-color: lime;
              }
              100% {
                border-color: darkorange;
              }
            }
            
            main {
                height: 100vh;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                overflow-y: auto;
                
                display: flex;
                flex-direction: column;
            }
            
            .show {
                opacity: 1 !important;
                pointer-events: initial !important;
            }
            
            ::placeholder {
                color: inherit;
            }
        `}</style>
    );
}
