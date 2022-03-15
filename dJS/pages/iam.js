import {env} from "../environment";
import React from "react";
import Hat from "../components/hat";
import Styles from "../components/styles";

export default class Iam extends React.PureComponent {
    state = {
        IhaveAccess: false,
        username: ''
    };

    componentDidMount() {
        this.checkAccess = async () => {
            const username = window.location.search.slice(2);
            const token = localStorage.getItem('token');

            if (!token || !username) return window.location.replace('/');

            const res = await fetch(`${env.usersApi}?username=${username}&token=${token}&action=profile-get-access`);
            const I = await res.json();

            if (!I.haveAccess) return window.location.replace('/');

            this.setState({username, IhaveAccess: I.haveAccess});
        };

        this.asyncCall = this.checkAccess();
    }

    // prevent mem leak
    componentWillUnmount() {
        if (this.asyncCall) this.asyncCall.cancel();
    }

    logout() {
        localStorage.clear();
        window.location.replace('/');
    }

    dismiss() {
        document.querySelector('.create.half').classList.remove('v-stretch');
        document.querySelector('#file').classList.remove('show');
        document.querySelector('#create-panel').classList.add('show');
    }

    copyLink() {
        const link = document.querySelector('#link-preview__input');

        link.select();
        link.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        document.querySelector('#create-panel').classList.add('show');
        document.querySelector('#link-preview').classList.remove('show');
    }

    restart() {
        this.file.points = {};
        document.querySelector('.pad.active')?.classList.remove('active');

        clearInterval(this.timerIn);
        const timer = document.querySelector('#timer');
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.play();

        this.timerIn = setInterval(() => {
            const currentTimer = parseInt(this.audio.duration - this.audio.currentTime);

            timer.textContent = `${currentTimer}s`;

            if (currentTimer === 0) {
                padsEl.classList.remove('show');
                document.querySelector('#file').classList.add('show');
                window.onkeydown = null;
                clearInterval(this.timerIn);
            }
        }, 1000);
    }

    stopSave() {
        window.onkeydown = null;
        document.querySelector('#pads').classList.remove('show');
        document.querySelector('#file').classList.remove('show');
        document.querySelector('.create.half').classList.remove('v-stretch');

        clearInterval(this.timerIn);
        this.audio.pause();
        this.audio = null;

        this.saveFile = async () => {
            const username = this.state.username;
            const token = localStorage.getItem('token');
            const file = JSON.stringify(this.file);

            const res = await fetch(`${env.audioApi}?username=${username}&token=${token}&file=${file}&action=save-audio`);
            const data = await res.json();

            if (data.audioId) {
                document.querySelector('#link-preview').classList.add('show');
                document.querySelector('#link-preview__input').value = `${window.location.origin}${env.audioApi}?id=${data.audioId}&action=get-audio`;
            }
        };

        this.asyncCall = this.saveFile();
    }

    produceSound(key) {
        document.querySelector('.pad.active')?.classList.remove('active');
        document.querySelector(`#pad-${key}`).classList.add('active');

        this.file.points[this.audio.currentTime.toString()] = key;
        const sample = new Audio(`/audio/${key}.wav`);
        sample.play();
    }

    bindKeydown() {
        window.onkeydown = (e) => {
            const k = e.keyCode;

            if (k === 81) { // q
                this.produceSound(0);
            } else if (k === 65) { // a
                this.produceSound(1);
            } else if (k === 87) { // w
                this.produceSound(2);
            } else if (k === 68) { // d
                this.produceSound(3);
            } else if (k === 82) { // r
                this.produceSound(4);
            } else if (k === 74) { // j
                this.produceSound(5);
            } else if (k === 73) { // i
                this.produceSound(6);
            } else if (k === 76) { // l
                this.produceSound(7);
            } else if (k === 80) { // p
                this.produceSound(8);
            } else if (k === 71) { // g
                this.produceSound(9);
            } else if (k === 32) { // whitespace
                this.restart();
            } else if (k === 13) { // enter
                this.stopSave();
            }
        }
    }

    proceed() {
        const searchEl = document.querySelector('#search-input');
        const url = searchEl.value;
        searchEl.value = '';

        if (url) {
            this.stopAudio();
            const timer = document.querySelector('#timer');
            this.file = {url, points: {}};
            this.audio = new Audio(url);
            this.audio.onloadedmetadata = () => {
                timer.textContent = `${parseInt(this.audio.duration)}s`;
            };

            const essentials = document.querySelector('.create .essentials');
            document.querySelector('#create-panel').classList.remove('show');

            const halfEl = document.querySelector('.create.half');
            halfEl.classList.add('v-stretch');
            const countdownEl = document.createElement('div');
            countdownEl.className = 'countdown';
            countdownEl.textContent = '3';
            countdownEl.style = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
                font-size: 60px;
                position: absolute;
                top: 0;
                left: 0;
            `;

            essentials.insertAdjacentElement('afterbegin', countdownEl);

            const countdownIn = setInterval(() => {
                let counter = parseInt(countdownEl.textContent);

                if (!--counter) {
                    countdownEl.remove();
                    const padsEl = document.querySelector('#pads');
                    padsEl.classList.add('show');
                    this.bindKeydown();

                    setTimeout(() => {
                        this.audio.play();
                        this.timerIn = setInterval(() => {

                            const currentTimer = parseInt(this.audio.duration - this.audio.currentTime);

                            timer.textContent = `${currentTimer}s`;

                            if (currentTimer === 0) {
                                padsEl.classList.remove('show');
                                document.querySelector('#file').classList.add('show');
                                window.onkeydown = null;
                                clearInterval(this.timerIn);
                            }
                        }, 1000);
                    }, 500);
                    return clearInterval(countdownIn);
                }

                countdownEl.textContent = counter.toString();
            }, 1000);
        }
    }

    listenAudio() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
            clearInterval(this.timerIn);
            document.querySelector('.create.half').classList.remove('v-stretch');
            document.querySelector('#pads').classList.remove('show');
            document.querySelector('#create-panel').classList.add('show');
        }

        const inputEl = document.querySelector('#listen-input');
        const url = inputEl.value;

        if (url) {
            this.getAudio = async () => {
                const res = await fetch(url);
                const data = await res.json();

                if (data.file) {
                    document.querySelector('#listen-panel').classList.remove('show');
                    document.querySelector('#listen-controls').classList.add('show');
                    inputEl.value = '';

                    this.file = JSON.parse(data.file);
                    this.audio = new Audio(this.file.url);
                    this.audio.onended = () => this.stopAudio();
                }
            }

            this.asyncCall = this.getAudio();
        }
    }

    playAudio() {
        this.points = this.points?.length ? this.points : Object.keys(this.file.points);
        this.pointsMs = this.pointsMs?.length ? this.pointsMs : this.points.map(point => parseInt(point * 1000));

        let counter = 0;

        this.audio.play();
        this.mixIn = setInterval(() => {
            if (!this.audio.paused) {
                if (!this.pointsMs.length) clearInterval(this.mixIn);

                if (this.pointsMs[0] < (counter + 25)) {
                    const index = this.points[0];
                    const key = this.file.points[index];

                    (new Audio(`/audio/${key}.wav`)).play();

                    this.points.shift();
                    this.pointsMs.shift();
                }

                counter += 25;
            }
        }, 25);
    }

    pauseAudio() {
        this.audio.pause();
    }

    stopAudio() {
        clearInterval(this.mixIn);
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        this.points = null;
        this.pointsMs = null;

        document.querySelector('#listen-panel').classList.add('show');
        document.querySelector('#listen-controls').classList.remove('show');
    }

    render() {
        if (this.state.IhaveAccess) {
            return (
                <>
                    <Hat title={'Me'}/>

                    <main>
                        <nav className={'navbar'}>
                            <div className={''}>
                                <a href="/" className={'navbar-brand text-light'}>dJ</a>
                                <span>{this.state.username}</span>
                            </div>
                            <ul className={'navbar-nav flex-row'}>
                                <li className={'nav-item'}>
                                    <a href="#" className={'btn btn-outline-light'} onClick={() => this.logout()}>Log
                                        Out</a>
                                </li>
                            </ul>
                        </nav>
                        <div className={'content'}>
                            <div className={'content__item create half'}>
                                <h2 className={'half__item content-title'}>create</h2>
                                <div className={'half__item essentials'}>
                                    <div id={'create-panel'} className={'panel show'}>
                                        <input id={'search-input'} type="text" placeholder={'paste audio link here'}/>
                                        <button type={'button'} className={'proceed-button'}
                                                onClick={() => this.proceed()}>start
                                        </button>
                                    </div>
                                    <div id={'pads'} className={'pads'}>
                                        <div id={'timer'} className={'timer'}></div>
                                        <div className={'pads-actions'}>
                                            <button type={'button'} className={'pads-actions__item'}
                                                    onClick={() => this.restart()}>restart
                                            </button>
                                        </div>
                                        <div className={'pads-list'}>
                                            <div id={'pad-0'} className={'pad'} onClick={() => this.produceSound(0)}>q
                                            </div>
                                            <div id={'pad-1'} className={'pad'} onClick={() => this.produceSound(1)}>a
                                            </div>
                                            <div id={'pad-2'} className={'pad'} onClick={() => this.produceSound(2)}>w
                                            </div>
                                            <div id={'pad-3'} className={'pad'} onClick={() => this.produceSound(3)}>d
                                            </div>
                                            <div id={'pad-4'} className={'pad'} onClick={() => this.produceSound(4)}>r
                                            </div>
                                            <div id={'pad-5'} className={'pad'} onClick={() => this.produceSound(5)}>j
                                            </div>
                                            <div id={'pad-6'} className={'pad'} onClick={() => this.produceSound(6)}>i
                                            </div>
                                            <div id={'pad-7'} className={'pad'} onClick={() => this.produceSound(7)}>l
                                            </div>
                                            <div id={'pad-8'} className={'pad'} onClick={() => this.produceSound(8)}>p
                                            </div>
                                            <div id={'pad-9'} className={'pad'} onClick={() => this.produceSound(9)}>g
                                            </div>
                                        </div>
                                        <div className={'pads-actions'}>
                                            <button type={'button'} className={'pads-actions__item'}
                                                    onClick={() => this.stopSave()}>stop & save
                                            </button>
                                        </div>
                                    </div>
                                    <div id={'file'} className={'file'}>
                                        <button type={'button'} className={'file-button'}
                                                onClick={() => this.stopSave()}>save
                                        </button>
                                        <button type={'button'} className={'file-button'}
                                                onClick={() => this.dismiss()}>dismiss
                                        </button>
                                    </div>
                                    <div id={'link-preview'} className={'link-preview'}>
                                        <input id={'link-preview__input'} type="text" readOnly={true}/>
                                        <button type={'button'} className={'copy-button'}
                                                onClick={() => this.copyLink()}>copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={'content__item listen half'}>
                                <h2 className={'half__item content-title'}>listen</h2>
                                <div className={'half__item essentials'}>
                                    <div className={'essentials-wrapper'}>
                                        <div id={'listen-panel'} className={'listen-panel show'}>
                                            <input id={'listen-input'} type="text"
                                                   placeholder={'paste audio link here'}/>
                                            <button type={'button'} className={'listen-button'}
                                                    onClick={() => this.listenAudio()}>start
                                            </button>
                                        </div>
                                        <div id={'listen-controls'} className={'listen-controls'}>
                                            <button className={'listen-control play-control'} type={'button'}
                                                    onClick={() => this.playAudio()}>play
                                            </button>
                                            <button className={'listen-control pause-control'} type={'button'}
                                                    onClick={() => this.pauseAudio()}>pause
                                            </button>
                                            <button className={'listen-control stop-control'} type={'button'}
                                                    onClick={() => this.stopAudio()}>stop
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <Styles/>

                    <style jsx>{`
                        main {
                            background-image: url("image/iam.jpg");
                            padding: 20px;
                        }
                        
                        .navbar-brand {
                            transform: scale(1.5);
                        }
                        
                        .content {
                            height: 100%;
                            margin-top: 15px;
                            
                            display: flex;
                            flex-wrap: wrap;
                        }
                        
                        .create .content-title {
                            border-left: 5px solid cyan;
                        }
                        
                        .listen .content-title {
                            border-left: 5px solid gold;
                        }
                        
                        .content-title {
                            padding: 20px;
                            margin-bottom: 3px;
                        }
                        
                        .content__item {
                            flex: 1;
                            min-width: 200px;
                            margin: 15px;
                        }
                        
                        .half {
                            display: flex;
                            flex-direction: column;
                            
                            min-height: 0;
                            transition: all 0.5s;
                        }
                        
                        .listen.half {
                            height: max-content;
                        }
                        
                        .half__item {
                            background-color: rgba(255, 255, 255, .15);  
                            backdrop-filter: blur(5px);
                        }
                        
                        .essentials {
                            flex: 1;
                            position: relative;
                            overflow-y: auto;
                            
                            padding: 25px;
                        }
                        
                        .panel {
                            display: flex;
                            
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity .3s;
                        }
                        
                        .proceed-button {
                            border-bottom: 1.5px solid chartreuse;
                        }
                        
                        .pads {
                            width: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: space-evenly;
                            height: 100%;
                            min-height: 350px;
                            
                            opacity: 0;
                            transition: opacity 0.5s;
                            pointer-events: none;
                        }
                        
                        .timer,                 
                        .pads-actions {            
                            min-width: 100%;
                            display: flex;
                            justify-content: space-evenly;
                        }
                        
                        .pads-actions {
                            background-color: rgba(255, 255, 255, .15);  
                            backdrop-filter: blur(5px);
                        }
                        
                        .pads-actions__item {
                            flex: 1;
                        }
                        
                        .pads-list {
                            width: 100%;
                            
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center
                        }
                        
                        .pad {
                            background-color: rgba(47,79,79, 0.8);
                            min-width: calc(33% - 7px);
                            min-height: 50px;
                            margin: 3px;
                            border-radius: 5px;
                            cursor: pointer;
                            
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                             
                        .pad.active {
                            border: 2px solid white;
                        }
                        
                        .file {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity 0.5s;
                            
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                        
                        .file-button {
                            padding: 20px;
                            width: 100%;
                            background-color: rgba(255, 255, 255, .15);  
                            backdrop-filter: blur(5px);
                        }
                        
                        .file-button:not(:last-child) {
                            margin-bottom: 20px;
                        }
                        
                        @media (max-width: 500px) {
                            .half.v-stretch {
                                min-height: calc(100% - 25px);
                            }
                        }
                        
                        .link-preview {
                            margin-top: -45.5px;
                            pointer-events: none;
                            opacity: 0;
                            transition: opacity 0.5s;
                            
                            display: flex;
                            width: 100%;
                        }
                        
                        .copy-button {
                            border-bottom: 1.5px solid hotpink;
                        }
                        
                        .listen-panel {
                            display: flex;
                            
                            pointer-events: none;
                            transition: opacity 0.5s;
                            opacity: 0;
                        }
                        
                        .listen-button {
                            border-bottom: 1.5px solid deeppink;
                        }
                        
                        .listen-controls {
                            display: flex;
                            align-item: center;
                            justify-content: space-around;
                            
                            position: absolute;
                            top: 0;
                            height: 100%;
                            width: 100%;
                            
                            pointer-events: none;
                            transition: opacity 0.5s;
                            opacity: 0;
                        }
                        
                        .essentials-wrapper {
                            position: relative;
                        }
                        
                        .listen-control {
                            border-bottom: 1.5px solid transparent;
                        }
                        
                        .play-control {
                            border-color: chartreuse;
                        }
                        
                        .pause-control {
                             border-color: white;
                        }
                        
                        .stop-control {
                             border-color: orangered;
                        }
                    `}</style>
                </>
            );
        } else {
            return null;
        }
    }
};
