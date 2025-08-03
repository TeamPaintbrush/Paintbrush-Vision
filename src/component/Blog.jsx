import React from 'react'
import { Link } from 'react-router-dom';
import BlogImg1 from '../assets/images/blog-images/blog-img1.jpg';
import BlogImg2 from '../assets/images/blog-images/blog-img2.jpg';
import BlogImg3 from '../assets/images/blog-images/blog-img3.jpg';
import BlogSinglImg from '../assets/images/blog-images/blog-singl-img.jpg';
import BlogSinglImg2 from '../assets/images/blog-images/blog-singl-img2.jpg';
import BlogSinglImg3 from '../assets/images/blog-images/blog-singl-img3.jpg';
import BlogSinglImg4 from '../assets/images/blog-images/blog-singl-img4.jpg';
import FbSvg from '../assets/images/svg/facebook.svg';
import InstaSvg from '../assets/images/svg/insta.svg';
import TwitterSvg from '../assets/images/svg/twitter.svg';
import LinkedinSvg from '../assets/images/svg/linkedin.svg';
import outSlider1 from '../assets/images/svg/outSlider1.svg';
import outSlider2 from '../assets/images/svg/outSlider2.svg';

const Blog = () => {
    return (
        <div>
            <section className="section-blog pt-0" id="blogs">
                <div className="container">
                    <h2 className="xplore fade_down">More From <span>Paintbrush Vision News</span></h2>
                    <h3 className="stunnii fade_down">Nulla ultrices pharetra sagittis tellus diam elementum sem pharetra. Dignissim
                        etiam nunc donec morbi id tortor tristique. Sed fermentum amet nisi mattis nisi proin cras ut libero porttitor.
                    </h3>
                    <div className="row blog-row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6" data-bs-toggle="modal" data-bs-target="#blogPopUp">
                            <div className="blog-box-main fade_down">
                                <div className="blog-img-box">
                                    <img className="blog-img" src={BlogImg1} alt="blog-img1" />
                                    <p className="date-blog">25 MAY 2025</p>
                                </div>
                                <h2 className="eque">10 Best AI Video Generators Online (Generative AI) for Beginners in 2025</h2>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6" data-bs-toggle="modal" data-bs-target="#blogPopUp">
                            <div className="blog-box-main fade_down">
                                <div className="blog-img-box">
                                    <img className="blog-img" src={BlogImg2} alt="blog-img2" />
                                    <p className="date-blog">20 MAY 2025</p>
                                </div>
                                <h2 className="eque">Top 10 Midjourney Alternatives You Can Try in 2025</h2>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6" data-bs-toggle="modal" data-bs-target="#blogPopUp">
                            <div className="blog-box-main fade_down">
                                <div className="blog-img-box">
                                    <img className="blog-img" src={BlogImg3} alt="blog-img3" />
                                    <p className="date-blog">15 MAY 2025</p>
                                </div>
                                <h2 className="eque">What Is AI Art: Meaning, Purpose, Example & Recommendation</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- =========== Blog Modal =============== --> */}
            <div className="modal fade" id="blogPopUp" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="btn-close form-close-btn" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            <h2 className="liqua">10 Best AI Video Generators Online (Generative AI) for Beginners in 2025</h2>
                            <p className="blog-main-date">25 MAY 2025 | 04:27 PM</p>
                            <img className="blog-singl-img" src={BlogSinglImg} alt="blog-singl-img" />
                            <div className="row signgle-blog-row">
                                <div className="col-xxl-12">
                                    <p className="sodales">Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget
                                        viverra egestas nisi in consequat. Fusce sodales augue a accumsan. Cras sollicitudin, ipsum eget blandit pulvinar. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                    <p className="sodales p-0">Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
                                        accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore
                                        veritatis et quasi architecto beatae vitae dicta sunt, explicabo.</p>
                                    <div className="cott-main">
                                        <svg width="60" height="46" viewBox="0 0 60 46" fill="none">
                                            <path
                                                d="M47.1132 46C51.0855 46 54.2263 44.6566 56.5358 41.9698C58.8453 39.283 60 36.1329 60 32.5196C60 30.0181 59.7691 27.7482 59.3072 25.71C58.8453 23.5791 58.1524 21.1239 57.2286 18.3444L50.9931 0H35.1963L42.4018 21.1239C39.6305 22.0504 37.5982 23.718 36.3048 26.1269C34.9192 28.5358 34.2263 30.9446 34.2263 33.3535C34.2263 36.8741 35.5196 39.8852 38.1062 42.3867C40.6005 44.7956 43.6028 46 47.1132 46ZM12.8868 46C16.8591 46 20 44.6566 22.3095 41.9698C24.6189 39.283 25.7737 36.1329 25.7737 32.5196C25.7737 30.0181 25.5427 27.7482 25.0808 25.71C24.6189 23.5791 23.9261 21.1239 23.0023 18.3444L16.7667 0H0.969978L8.17551 21.1239C5.40415 22.0504 3.37182 23.718 2.07852 26.1269C0.692837 28.5358 0 30.9446 0 33.3535C0 36.8741 1.2933 39.8852 3.87991 42.3867C6.37413 44.7956 9.37644 46 12.8868 46Z"
                                                fill="#5C33FF"></path>
                                        </svg>
                                        <p>Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim
                                            condimentum, luctus justo non, molestie nisl.</p>
                                    </div>
                                    <p className="sodales">Vitae ipsum accumsan iaculis elementum. Lorem sed et fusce risus
                                        malesuada eu cras. Semper molestie elementum magna ullamcorper dui eget dolor nibh
                                        bibendum. Eu hac amet elit netus feugiat consectetur at. Felis habitant posuere neque
                                        libero. Placerat quam eget sollicitudin faucibus id ut a id est. Elit quam nullam luctus
                                        sed aliquam sed viverra.
                                    </p>
                                    <p className="sodales p-0">Lacus risus malesuada scelerisque quis vitae libero etiam
                                        consectetur. Blandit volutpat iaculis nunc imperdiet non cursus in mi viverra. Sapien ut
                                        metus quis adipiscing vel enim. Lectus a pulvinar.</p>
                                    <div className="wildlife-img-group">
                                        <div className="wildlife-img-group-sub">
                                            <img src={BlogSinglImg2} alt="blog-singl-img2" />
                                            <img src={BlogSinglImg3} alt="blog-singl-img3" />
                                        </div>
                                        <img className="blog-singl-img4" src={BlogSinglImg4} alt="blog-singl-img4" />
                                    </div>
                                    <p className="sodales pb-0">Sapien ullamcorper et enim imperdiet adipiscing varius. Donec
                                        blandit nulla vulputate laoreet. Semper scelerisque at vitae nec adipiscing arcu lacus
                                        volutpat accumsan. Amet magna nullam lacus aliquam auctor pulvinar in erat.</p>
                                    <h3 className="approach">Individual approach to every project</h3>
                                    <p className="sodales">Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus
                                        et netus et malesuada fames ac turpis egestas. Fusce gravida, ligula non molestie
                                        tristique, justo elit blandit risus, blandit maximus augue magna accumsan ante. Duis id
                                        mi tristique, pulvinar neque at, lobortis tortor.</p>
                                    <p className="sodales pb-0">Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies
                                        risus, vel rutrum erat commodo ut. Praesent finibus congue euismod. Nullam scelerisque
                                        massa vel augue placerat, a tempor sem egestas. Curabitur placerat finibus lacus.</p>
                                    <div className="footer-media Singleblog-media">
                                        <a href="https://www.facebook.com">
                                            <img src={FbSvg} alt="facebook" />Facebook
                                        </a>
                                        <a href="https://www.instagram.com">
                                            <img src={InstaSvg} alt="insta" />Instagram
                                        </a>
                                        <a href="https://x.com">
                                            <img src={TwitterSvg} alt="twitter" />Twitter
                                        </a>
                                        <a href="https://www.linkedin.com">
                                            <img src={LinkedinSvg} alt="linkedin" />LinkedIn
                                        </a>
                                    </div>
                                    <div className="diamond-nextbtn-head">
                                        <div className="diamond-next-btn">
                                            <Link to="#" className="diamond-btn next">
                                                <img src={outSlider1} alt="left-next-arrow" />
                                            </Link>
                                            <h3>PREVIOUS</h3>
                                        </div>
                                        <button className="dimond-close-btn" data-bs-dismiss="modal">Close</button>
                                        <div className="diamond-next-btn">
                                            <h3>NEXT</h3>
                                            <Link to="#" className="diamond-btn next">
                                                <img src={outSlider2} alt="right-prv-arrow" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog