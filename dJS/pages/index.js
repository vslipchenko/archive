import React from "react";
import Hat from "../components/hat";
import Styles from "../components/styles";

export default function Home() {
    const toggleClass = (target, articleId) => {
        document.querySelector('.nav-item.active')?.classList.remove('active');
        document.querySelector('article.show')?.classList.remove('show');
        target.classList.add('active');
        document.querySelector(`article#${articleId}`).classList.add('show');
    };

    return (
        <>
            <Hat title={'Homepage'}/>

            <main>
                <nav className={'navbar'}>
                    <a href="#" className={'navbar-brand text-light'}>dJS</a>
                    <ul className={'navbar-nav flex-row'}>
                        <li className={'nav-item'}>
                            <a href="/sign-in" className={'btn btn-outline-light'}>Sign In</a>
                        </li>
                        <li className={'nav-item'}>
                            <a href="/sign-up" className={'btn btn-outline-light'}>Sign Up</a>
                        </li>
                    </ul>
                </nav>

                <div className={'content'}>
                    <h2 className={'content-title'}>Play the way you want!</h2>
                    <div className={'info'}>
                        <ul className={'menu navbar-nav'}>
                            <li className={'menu__item nav-item green'} onClick={(e) => toggleClass(e.target, 'first')}>create</li>
                            <li className={'menu__item nav-item yellow'} onClick={(e) => toggleClass(e.target, 'second')}>listen</li>
                            <li className={'menu__item nav-item red'} onClick={(e) => toggleClass(e.target, 'third')}>discover</li>
                        </ul>
                        <div className={'description'}>
                            <article className={'description__item show intro'}>
                                dJS is a platform that allows users to create and listen to their own mixes<br/>
                            </article>
                            <article id={'first'} className={'description__item'}>Free up your creativity. Use your imagination to make some new hits</article>
                            <article id={'second'} className={'description__item'}>Listen to masterpieces you've already created</article>
                            <article id={'third'} className={'description__item'}>Share and explore world of music with your friends</article>
                        </div>
                    </div>
                </div>
            </main>

            <Styles/>

            <style jsx>{` 
                main {
                    background-image: url("image/homepage.jpg");
                    padding: 20px;
                }
                
                .content {
                    background-color: rgba(255, 255, 255, .15);  
                    backdrop-filter: blur(5px);
                    margin-top: 20px;
                    flex: 1;
                }
                
                .navbar-brand {
                    transform: scale(1.5);
                }
                
                .nav-item:not(:last-child) {
                    margin-right: 20px;
                }
                
                .content {
                    display: flex;
                    flex-direction: column;
                }
                
                .content-title {
                    padding: 20px;
                    border-bottom: 1px solid white;
                }
                
                .info {
                    flex: 1;
                    
                    display: flex;
                    flex-wrap: wrap;
                }
                
                .menu {
                    flex: 0.5;
                    padding: 20px 0;
                }
                
                .menu__item {
                    padding: 20px;
                    border-left: 5px solid white;
                    cursor: pointer;
                }
                
                .menu__item.active::first-letter,
                .menu__item:hover::first-letter {
                    text-transform: uppercase;     
                }
                
                .menu__item.green {
                    border-color: rgba(0, 255, 0, 0.5);
                }
                
                .menu__item.yellow {
                    border-color: rgba(255, 255, 0, 0.5);
                }
                
                .menu__item.red {
                    border-color: rgba(255, 0, 0, 0.5);
                }
                
                .menu__item:not(:last-child) {
                    margin-bottom: 20px;
                }
                
                .description {
                    position: relative;
                    flex: 1;
                    box-shadow: inset 3px 0px 5px 0px rgba(0, 0, 0, 0.2);
                }
                
                .description__item {
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 40px;
                    width: 100%;
                    height: 100%;
                    font-size: 20px;
                    overflow-y: auto;
                    
                    opacity: 0;
                    transition: opacity .5s;
                    pointer-events: none;
                }
            `}</style>
        </>
    )
}
