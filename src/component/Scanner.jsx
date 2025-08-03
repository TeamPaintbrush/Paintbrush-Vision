import React from 'react'
import playStore from '../assets/images/home-page/playStore.png';
import appStore from '../assets/images/home-page/appStore.png';
import ScannerImg from '../assets/images/home-page/scanner.png';

const Scanner = () => {
    return (
        <div>
            <section className="section-nine pt-0">
                <div className="container">
                    <div className="scanner-main fade_down">
                        <div>
                            <h2 className="enerat-text">Paintbrush Vision Image Generator App on the Go</h2>
                            <p className="amles">Dive into a seamless AI image-generating experience. Download the Paintbrush Vision photo
                                generator app to create images anywhere, anytime.</p>
                            <div className="play-app-store-main">
                                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                                    <img src={playStore} alt="playStore" />
                                </a>
                                <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer">
                                    <img src={appStore} alt="appStore" />
                                </a>
                            </div>
                        </div>
                        <div className="scanner-img-main">
                            <img className="scanner" src={ScannerImg} alt="scanner" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Scanner