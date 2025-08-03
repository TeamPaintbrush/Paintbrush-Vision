import { useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Logo from '../assets/images/svg/logo.svg';
import formSliderImg1 from '../assets/images/form-imgs/slider-img1.jpg';
import formSliderImg2 from '../assets/images/form-imgs/slider-img2.jpg';
import formSliderImg3 from '../assets/images/form-imgs/slider-img3.jpg';
import formSliderImg4 from '../assets/images/form-imgs/slider-img4.jpg';
import formSliderImg5 from '../assets/images/form-imgs/slider-img5.jpg';
import formSliderImg6 from '../assets/images/form-imgs/slider-img6.jpg';
import formSliderImg7 from '../assets/images/form-imgs/slider-img7.jpg';


const Form = () => {
    const [activeForm, setActiveForm] = useState('signin');

    const formSlider = {
        dots: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
    };


    return (
        <div className="form-body">
            {/* < !-- ====================================== Form Section ===================================== --> */}
            <div className="row">
                <h1 className="d-none">hidden</h1>
                <div className="col-xxl-8 col-xl-7 col-lg-7 col-md-6 slider-container">
                    <div className="background-img-slider-SecOne">
                        <div className="slider-section">
                            <Slider {...formSlider} className="form-slider">
                                <img className="service-main-bg" src={formSliderImg1} alt="slider-img1" />
                                <img className="service-main-bg" src={formSliderImg2} alt="slider-img2" />
                                <img className="service-main-bg" src={formSliderImg3} alt="slider-img3" />
                                <img className="service-main-bg" src={formSliderImg4} alt="slider-img4" />
                                <img className="service-main-bg" src={formSliderImg5} alt="slider-img5" />
                                <img className="service-main-bg" src={formSliderImg6} alt="slider-img6" />
                                <img className="service-main-bg" src={formSliderImg7} alt="slider-img7" />
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-6">
                    <div className="form-col">
                        <Link to="/" className="logo">
                            <img src={Logo} alt="logo" />
                            <p>Paintbrush Vision</p>
                        </Link>
                        <div className="form-container">
                            <div className="form-toggle">
                                <button
                                    className={`toggle-btn ${activeForm === 'signin' ? 'active' : ''}`}
                                    onClick={() => setActiveForm('signin')}
                                > Sign In
                                </button>
                                <button
                                    className={`toggle-btn ${activeForm === 'signup' ? 'active' : ''}`}
                                    onClick={() => setActiveForm('signup')}
                                > Sign Up
                                </button>
                            </div>
                            <div className="form-content">
                                <form id="signin-form"
                                    className={`form ${activeForm === 'signin' ? 'active' : ''}`}
                                >
                                    <h2>Welcome Back</h2>
                                    <div className="form-group">
                                        <input type="email" placeholder="Email" name="email" autoComplete="off" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" name="password" autoComplete="off"
                                            required />
                                    </div>
                                    <button type="submit" className="submit-btn">Sign In</button>
                                    <p className="form-footer">Don't have an account?
                                        <Link to="#" className="switch-form" onClick={(e) => {
                                            e.preventDefault();
                                            setActiveForm('signup');
                                        }}> Sign Up
                                        </Link>
                                    </p>
                                </form>
                                <form id="signup-form" className={`form ${activeForm === 'signup' ? 'active' : ''}`}>
                                    <h2>Create Account</h2>
                                    <div className="form-group">
                                        <input type="text" placeholder="Name" name="name" autoComplete="off" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Email" autoComplete="off" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" name="password" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Confirm Password" name="Cpassword" required />
                                    </div>
                                    <button type="submit" className="submit-btn">Sign Up</button>
                                    <p className="form-footer"> Already have an account?
                                        <Link to="#" className="switch-form" onClick={(e) => {
                                            e.preventDefault();
                                            setActiveForm('signin');
                                        }}> Sign In
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form