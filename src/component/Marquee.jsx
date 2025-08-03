import { useRef, useEffect } from 'react'
import MarqLogo1 from '../assets/images/svg/logo1.svg';
import MarqLogo2 from '../assets/images/svg/logo2.svg';
import MarqLogo3 from '../assets/images/svg/logo3.svg';
import MarqLogo4 from '../assets/images/svg/logo4.svg';
import MarqLogo5 from '../assets/images/svg/logo5.svg';
import MarqLogo6 from '../assets/images/svg/logo6.svg';
import MarqLogo7 from '../assets/images/svg/logo7.svg';
import MarqLogo8 from '../assets/images/svg/logo8.svg';
import MarqLogo9 from '../assets/images/svg/logo9.svg';

const Marquee = () => {
    /*------------------------------------- Infinite Marquee -------------------------------------*/
    const logosRef = useRef(null);

    useEffect(() => {
        if (logosRef.current) {
            const logosContainer = logosRef.current;
            const logosSlide = logosContainer.querySelector('.logos-slide');

            if (logosSlide) {
                const copy = logosSlide.cloneNode(true);
                logosContainer.appendChild(copy);
            }
        }
    }, []);
    return (
        <div>
            <section className="section-seven pt-0">
                <div className="container">
                    <div className="container">
                        <h2 className="xplore fade_down">Loved by <span>Professionals</span> across the world</h2>
                        <h3 className="stunnii fade_down">Elementum porttitor leo orci libero enim adipiscing justo lacus. Vitae in
                            amet odio semper rutrum quam in.. Amet pellentesque natoque sit in integer sed tincidunt tellus quis.
                        </h3>
                    </div>
                </div>
                <div className="logos" ref={logosRef}>
                    <div className="logos-slide">
                        <div className="marquee-content pt-0">
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo1} alt="logo1" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo2} alt="logo2" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo3} alt="logo3" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo4} alt="logo4" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo5} alt="logo5" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo6} alt="logo6" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo7} alt="logo7" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo8} alt="logo8" />
                            </div>
                            <div className="marquee-img-main">
                                <img className="brand-logos" src={MarqLogo9} alt="logo9" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Marquee