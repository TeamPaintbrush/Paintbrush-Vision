import React from 'react'
import PossiblityImg1 from '../assets/images/home-page/possiblity-img1.jpg';
import PossiblityImg2 from '../assets/images/home-page/possiblity-img2.jpg';
import PossiblityImg3 from '../assets/images/home-page/possiblity-img3.jpg';
import PossiblityImg4 from '../assets/images/home-page/possiblity-img4.jpg';
import PossiblityImg5 from '../assets/images/home-page/possiblity-img5.jpg';
import PossiblityImg6 from '../assets/images/home-page/possiblity-img6.jpg';
import PossiblityImg7 from '../assets/images/home-page/possiblity-img7.jpg';
import PossiblityImg8 from '../assets/images/home-page/possiblity-img8.jpg';
import PossiblityImg9 from '../assets/images/home-page/possiblity-img9.jpg';

const Possibilities = () => {
    /*------------------------------------- Copy Text On Img -------------------------------------*/
    const copyText = (e) => {
        const textToCopy = e.target.previousElementSibling.innerText;
        const tempInput = document.createElement("textarea");
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand("copy");

        document.body.removeChild(tempInput);

        // Optional: Provide feedback that text was copied
        e.target.textContent = "Copied!";
        setTimeout(() => {
            e.target.textContent = "Copy Prompts";
        }, 2000);
    };

    return (
        <div>
            <section className="section-two">
                <div className="container">
                    <h2 className="xplore fade_down">Explore the <span>AI Generate Image</span> possibilities.</h2>
                    <h3 className="stunnii fade_down">Check out these stunning AI-generated images in Paintbrush Vision and the text prompts
                        that generated them.</h3>
                    <div className="masonry-grid">
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg1} alt="possiblity-img1" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img className="img-animation-style4 reveal" src={PossiblityImg2} alt="possiblity-img2" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img className="img-animation-style4 reveal" src={PossiblityImg3} alt="possiblity-img3" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg4} alt="possiblity-img4" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg5} alt="possiblity-img5" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg6} alt="possiblity-img6.jpg" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg7} alt="possiblity-img7.jpg" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg8} alt="possiblity-img8.jpg" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                        <div className="image-container grid-item zoom_in">
                            <img src={PossiblityImg9} alt="possiblity-img9.jpg" />
                            <div className="overlay">
                                <p className="image-text">Rhinoceros animal with futuristic robotic parts</p>
                                <button className="copy-btn" onClick={copyText}>Copy Prompts</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Possibilities