import { useEffect, useRef } from 'react'
import Slider from 'react-slick';
import PersonImg1 from '../assets/images/home-page/person-img1.jpg';
import PersonImg2 from '../assets/images/home-page/person-img2.jpg';
import PersonImg3 from '../assets/images/home-page/person-img3.jpg';
import PersonImg4 from '../assets/images/home-page/person-img4.jpg';
import PersonImg5 from '../assets/images/home-page/person-img5.jpg';
import PersonImg6 from '../assets/images/home-page/person-img6.jpg';
import PersonImg7 from '../assets/images/home-page/person-img7.jpg';

const Millions = () => {
    /*------------- Millions Slider Sction ---------------------*/
    const sliderRef = useRef(null);
    const settings2 = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        speed: 500,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                }
            }
        ]
    };
    // Function to set equal height for all slider boxes
    const setEqualHeight = () => {
        const sliderBoxes = document.querySelectorAll('.milions-slider-box');
        if (sliderBoxes.length === 0) return;

        let maxHeight = 0;
        sliderBoxes.forEach(box => {
            box.style.height = 'auto';
            const boxHeight = box.offsetHeight;
            if (boxHeight > maxHeight) {
                maxHeight = boxHeight;
            }
        });

        sliderBoxes.forEach(box => {
            box.style.height = `${maxHeight}px`;
        });
    };

    useEffect(() => {
        // Initial height set
        setEqualHeight();

        const slider = sliderRef.current;
        if (slider) {
            slider.slickPlay && slider.slickPlay();
            window.addEventListener('resize', setEqualHeight);

            const resizeInterval = setInterval(setEqualHeight, 1000);

            return () => {
                window.removeEventListener('resize', setEqualHeight);
                clearInterval(resizeInterval);
            };
        }
    }, []);
    return (
        <div>
            <section className="section-six pt-0" id="testimonials">
                <div className="container">
                    <h2 className="xplore fade_down">Loved by <span>Millions!</span></h2>
                    <h3 className="stunnii fade_down">Est libero volutpat morbi massa. Lorem sodales adipiscing eu maecenas lectus
                        faucibus pharetra. Vivamus sed sit elementum eu. Venenatis euismod egestas metus enim et sed mauris lectus.</h3>
                    <div className="mill-main">
                        <div>
                            <h3 className="imgGenerator million counter">
                                <span className="count" data-count="15"> 15 Million</span>
                            </h3>
                            <p className="ueseyss">USERS</p>
                        </div>
                        <div>
                            <h3 className="imgGenerator million counter">
                                <span className="count" data-count="126"> 126 Million</span>
                            </h3>
                            <p className="ueseyss">IMAGES</p>
                        </div>
                    </div>
                </div>
                <Slider className="millionsSlider" ref={sliderRef} {...settings2}>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg1} alt="person-img1" />
                            </div>
                            <p className="person-name">Matthew Ritchie</p>
                        </div>
                        <p className="imple">My brain is breaking 🤯 This looks so simple! I use the Adobe suite, but know a lot
                            of people at startups/independent companies who are short on cash who could use this. Great idea!
                        </p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg2} alt="person-img2" />
                            </div>
                            <p className="person-name">Arttu Helke</p>
                        </div>
                        <p className="imple">This is ridiculously good. The detail is incredible and couldn’t be easier to use.
                            Fantastic job!
                        </p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg3} alt="person-img3" />
                            </div>
                            <p className="person-name">Max Rovensky</p>
                        </div>
                        <p className="imple">This is easily the best tool of this kind and i’ve tried about a dozen of them in
                            every photo editing app there is 😊
                        </p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg4} alt="person-img4" />
                            </div>
                            <p className="person-name">John Patrick Hinek</p>
                        </div>
                        <p className="imple">Wow, this is such an epic tool! Such an easy-to-use alternative to traditional photoshop.</p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg5} alt="person-img5" />
                            </div>
                            <p className="person-name">Ryan Hoover</p>
                        </div>
                        <p className="imple">Wow! It removes things so smoothly, I can’t eve imagine pictures in my mind better
                            than it looks after using the magic eraser. Interface & interaction is intuitive.
                        </p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg6} alt="person-img6" />
                            </div>
                            <p className="person-name">Logan Riley</p>
                        </div>
                        <p className="imple">This is ridiculously good. The detail is incredible and couldn’t be easier to use. Fantastic job!</p>
                    </div>
                    <div className="milions-slider-box">
                        <div className="img-person-text-main">
                            <div className="person-imh-main">
                                <img src={PersonImg7} alt="person-img7" />
                            </div>
                            <p className="person-name">Ankush Hver</p>
                        </div>
                        <p className="imple">Wow, this is such an epic tool! Such an easy-to-use alternative to traditional photoshop.</p>
                    </div>
                </Slider>
            </section>
        </div>
    )
}

export default Millions