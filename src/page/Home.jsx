import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Logo from '../assets/images/svg/logo.svg';
import Menu from '../assets/images/svg/menu.svg';
import dropdownSvg from '../assets/images/svg/dropdown.svg';
import ExpandImg from '../assets/images/home-page/expand-img.jpg';
import ExpandImg2 from '../assets/images/home-page/expand-img2.jpg';
import ExpandImg3 from '../assets/images/home-page/expand-img3.jpg';
import ExpandImg4 from '../assets/images/home-page/expand-img4.jpg';
import SliderImg1 from '../assets/images/slider-images/slider-img1.jpg';
import SliderImg2 from '../assets/images/slider-images/slider-img2.jpg';
import SliderImg3 from '../assets/images/slider-images/slider-img3.jpg';
import SliderImg4 from '../assets/images/slider-images/slider-img4.jpg';
import SliderImg5 from '../assets/images/slider-images/slider-img5.jpg';
import SliderImg6 from '../assets/images/slider-images/slider-img6.jpg';
import InSliderArrow from '../assets/images/svg/inSliderArrow.svg';
import SliderPopImg1 from '../assets/images/slider-images/slider-pop-img1.jpg';
import SliderPopImg2 from '../assets/images/slider-images/slider-pop-img2.jpg';
import SliderPopImg3 from '../assets/images/slider-images/slider-pop-img3.jpg';
import SliderPopImg4 from '../assets/images/slider-images/slider-pop-img4.jpg';
import SliderPopImg5 from '../assets/images/slider-images/slider-pop-img5.jpg';
import SliderPopImg6 from '../assets/images/slider-images/slider-pop-img6.jpg';
import SliderPop2Img1 from '../assets/images/slider-images/slider-pop2-img1.jpg';
import SliderPop2Img2 from '../assets/images/slider-images/slider-pop2-img2.jpg';
import SliderPop2Img3 from '../assets/images/slider-images/slider-pop2-img3.jpg';
import SliderPop2Img4 from '../assets/images/slider-images/slider-pop2-img4.jpg';
import SliderPop2Img5 from '../assets/images/slider-images/slider-pop2-img5.jpg';
import SliderPop2Img6 from '../assets/images/slider-images/slider-pop2-img6.jpg';
import SliderPop3Img1 from '../assets/images/slider-images/slider-pop3-img1.jpg';
import SliderPop3Img2 from '../assets/images/slider-images/slider-pop3-img2.jpg';
import SliderPop3Img3 from '../assets/images/slider-images/slider-pop3-img3.jpg';
import SliderPop3Img4 from '../assets/images/slider-images/slider-pop3-img4.jpg';
import SliderPop3Img5 from '../assets/images/slider-images/slider-pop3-img5.jpg';
import SliderPop3Img6 from '../assets/images/slider-images/slider-pop3-img6.jpg';
import SliderPop4Img1 from '../assets/images/slider-images/slider-pop4-img1.jpg';
import SliderPop4Img2 from '../assets/images/slider-images/slider-pop4-img2.jpg';
import SliderPop4Img3 from '../assets/images/slider-images/slider-pop4-img3.jpg';
import SliderPop4Img4 from '../assets/images/slider-images/slider-pop4-img4.jpg';
import SliderPop4Img5 from '../assets/images/slider-images/slider-pop4-img5.jpg';
import SliderPop4Img6 from '../assets/images/slider-images/slider-pop4-img6.jpg';
import SliderPop5Img1 from '../assets/images/slider-images/slider-pop5-img1.jpg';
import SliderPop5Img2 from '../assets/images/slider-images/slider-pop5-img2.jpg';
import SliderPop5Img3 from '../assets/images/slider-images/slider-pop5-img3.jpg';
import SliderPop5Img4 from '../assets/images/slider-images/slider-pop5-img4.jpg';
import SliderPop5Img5 from '../assets/images/slider-images/slider-pop5-img5.jpg';
import SliderPop5Img6 from '../assets/images/slider-images/slider-pop5-img6.jpg';
import SliderPop6Img1 from '../assets/images/slider-images/slider-pop6-img1.jpg';
import SliderPop6Img2 from '../assets/images/slider-images/slider-pop6-img2.jpg';
import SliderPop6Img3 from '../assets/images/slider-images/slider-pop6-img3.jpg';
import SliderPop6Img4 from '../assets/images/slider-images/slider-pop6-img4.jpg';
import SliderPop6Img5 from '../assets/images/slider-images/slider-pop6-img5.jpg';
import SliderPop6Img6 from '../assets/images/slider-images/slider-pop6-img6.jpg';
import Disc1 from '../assets/images/home-page/disc1.jpg';
import Disc2 from '../assets/images/home-page/disc2.jpg';
import Disc3 from '../assets/images/home-page/disc3.jpg';
import Disc4 from '../assets/images/home-page/disc4.jpg';
import VariousSvg from '../assets/images/svg/various.svg';
import ResolutionSvg from '../assets/images/svg/resolution.svg';
import WatermarkSvg from '../assets/images/svg/watermark.svg';
import ReuseSvg from '../assets/images/svg/reuse.svg';
import CreatSvg from '../assets/images/svg/creat.svg';
import InstantSvg from '../assets/images/svg/instant.svg';
import ArrowBarBoth from '../assets/images/svg/arrow-bar-both.svg'
import sunIconLight from '../assets/images/svg/sun-light.svg';
import sunIconDark from '../assets/images/svg/sun-dark.svg';
import { useDarkMode } from '../component/DarkModeContext';
import Footer from '../component/Footer';


const Home = () => {
    /*------------- Section wise Active Menu ---------------------*/
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // Get all sections that correspond to nav links
            const sections = document.querySelectorAll('.nav-links .a-link[href^="#"]');

            sections.forEach(link => {
                const sectionId = link.getAttribute('href');
                const section = document.querySelector(sectionId);

                if (section) {
                    const sectionOffset = section.offsetTop - 50; 
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionOffset &&
                        scrollPosition < sectionOffset + sectionHeight) {
                        setActiveLink(sectionId);
                    }
                }
            });
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /*------------------------------------- Whole Page Scrolling Animation -------------------------------------*/
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ isIntersecting, target }) => {
                target.classList.toggle('show', isIntersecting);
            });
        });

        const elements = document.querySelectorAll(
            '.fade_up, .fade_down, .zoom_in, .zoom_out, .fade_right, .fade_left, .flip_left, .flip_right, .flip_up, .flip_down'
        );

        elements.forEach((el) => observer.observe(el));

        // Cleanup
        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    /*------------------------------------- Sticky Header -------------------------------------*/
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const header = document.getElementById('top-header');
            const navbar = document.getElementById('top-navbar');

            if (scrollPosition >= 20) {
                header?.classList.add('fixed');
                navbar?.classList.add('fixed');
            } else {
                header?.classList.remove('fixed');
                navbar?.classList.remove('fixed');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /*------------------------------------- Toggle Menu -------------------------------------*/
    useEffect(() => {
        const toggleMenu = () => {
            const navLinks = document.querySelector('.nav-links-mn');
            const overlay = document.querySelector('.overlaytoggle');
            if (!navLinks || !overlay) return;

            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                navLinks.classList.add('closing');
                overlay.classList.remove('active');
                setTimeout(() => {
                    navLinks.classList.remove('active', 'closing');
                }, 300);
            } else {
                navLinks.classList.remove('closing');
                navLinks.classList.add('active');
                overlay.classList.add('active');
            }
        };

        const menuLinks = document.querySelectorAll('.a-link');
        menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

        const overlay = document.querySelector('.overlaytoggle');
        const menuIcon = document.querySelector('.menu-icon');
        const navLinks = document.querySelector('.nav-links-mn');

        const handleOutsideClick = (event) => {
            if (
                navLinks &&
                !navLinks.contains(event.target) &&
                !menuIcon?.contains(event.target) &&
                overlay?.classList.contains('active')
            ) {
                toggleMenu();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            menuLinks.forEach(link => link.removeEventListener('click', toggleMenu));
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleMenuClick = () => {
        const navLinks = document.querySelector('.nav-links-mn');
        const overlay = document.querySelector('.overlaytoggle');
        if (!navLinks || !overlay) return;

        const isActive = navLinks.classList.contains('active');
        if (isActive) {
            navLinks.classList.add('closing');
            overlay.classList.remove('active');
            setTimeout(() => {
                navLinks.classList.remove('active', 'closing');
            }, 300);
        } else {
            navLinks.classList.remove('closing');
            navLinks.classList.add('active');
            overlay.classList.add('active');
        }
    };

    /*------------------------------------- Typing Text input -------------------------------------*/
    const inputRef = useRef(null);
    useEffect(() => {
        const phrases = [
            "Describe what you want to see",
            "Example: A sunset over mountains",
            "Example: A cute puppy playing",
            "Example: Futuristic cityscape"
        ];
        let currentPhrase = 0;
        let currentLetter = 0;
        let isDeleting = false;
        const typingSpeed = 100;

        const typeWriter = () => {
            if (!inputRef.current) return;
            const currentText = phrases[currentPhrase];
            inputRef.current.placeholder = currentText.substring(0, currentLetter);

            if (!isDeleting && currentLetter < currentText.length) {
                currentLetter++;
                setTimeout(typeWriter, typingSpeed);
            } else if (isDeleting && currentLetter > 0) {
                currentLetter--;
                setTimeout(typeWriter, typingSpeed / 2);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) currentPhrase = (currentPhrase + 1) % phrases.length;
                setTimeout(typeWriter, typingSpeed);
            }
        };

        const startTyping = setTimeout(typeWriter, 1000);
        return () => clearTimeout(startTyping);
    }, []);

    /*------------------------------------- input Drop down -------------------------------------*/
    const [isActive, setIsActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState('No style');
    const dropdownRef = useRef(null);
    const options = [
        'Photo', '3D', 'Comic', 'IIIustration',
        'Cartoon Fun', 'Comic', 'Dark', 'Watercolor'
    ];

    const toggleDropdown = () => setIsActive(prev => !prev);
    const handleOptionClick = (value) => {
        setSelectedValue(value);
        setIsActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    /*------------------------------------- Expand img Slider -------------------------------------*/
    const imageSlider = {
        dots: false,
        speed: 500,
        cssEase: 'linear',
        autoplay: true,
        arrows: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        centerMode: true,
        centerPadding: '20%',
        slidesToShow: 1,
    };

    /*------------- Create your design Section ---------------------*/
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        speed: 500,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3 } },
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } }
        ]
    };

    /*------------- Custom Cursor ---------------------*/
    useEffect(() => {
        const cursor = document.createElement("div");
        cursor.classList.add("custom-cursor");

        const arrowImg = document.createElement("img");
        arrowImg.src = ArrowBarBoth;
        arrowImg.classList.add("cursor-arrow");

        cursor.appendChild(arrowImg);
        document.body.appendChild(cursor);

        const suggBoxes = document.querySelectorAll(".cursor");

        const showCursor = () => (cursor.style.display = "block");
        const hideCursor = () => (cursor.style.display = "none");
        const moveCursor = (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        suggBoxes.forEach((box) => {
            box.addEventListener("mouseenter", showCursor);
            box.addEventListener("mouseleave", hideCursor);
            box.addEventListener("mousemove", moveCursor);
        });

        return () => {
            suggBoxes.forEach((box) => {
                box.removeEventListener("mouseenter", showCursor);
                box.removeEventListener("mouseleave", hideCursor);
                box.removeEventListener("mousemove", moveCursor);
            });
            document.body.removeChild(cursor);
        };
    }, []);


    /*------------- Bottom To Top Button ---------------------*/
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.pageYOffset > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /*------------- Dark Light Mode ---------------------*/
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [imageUrl, setImageUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState('');

    const handlePreview = () => {
        setError('');
        setPreviewUrl('');
        if (!imageUrl) {
            setError('Please enter a URL.');
            return;
        }
        setPreviewUrl(imageUrl);
    };

    const handleImageError = () => {        setError('Invalid image URL.');
        setPreviewUrl('');
    };    // Shared state for all three upload widgets
    const [sharedImageFile, setSharedImageFile] = useState(null);
    const [sharedImagePreview, setSharedImagePreview] = useState(null);
    const [sharedAnalysis, setSharedAnalysis] = useState('');
    const [sharedIsAnalyzing, setSharedIsAnalyzing] = useState(false);
    const [sharedError, setSharedError] = useState('');
    const [sharedExtractedText, setSharedExtractedText] = useState('');
    
    // Drag and drop visual feedback state
    const [isDragOver, setIsDragOver] = useState(false);
    
    // Refs for file inputs
    const uploadFileInputRef = useRef();

    // Clear shared state
    const clearSharedState = () => {
        setSharedImageFile(null);
        setSharedImagePreview(null);
        setSharedAnalysis('');
        setSharedError('');
        setSharedExtractedText('');
    };

    // Shared analysis function for all widgets
    const analyzeSharedImage = async (file, isUrl = false) => {
        setSharedIsAnalyzing(true);
        setSharedAnalysis('🔍 Analyzing image...');
        setSharedError('');
        setSharedExtractedText('');
          // Debug logging
        console.log('🔍 Environment Variables Check:');
        console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        console.log('File:', file);
        console.log('isUrl:', isUrl);
        
        try {
            if (isUrl) {
                // Handle URL analysis
                const apiUrl = `${process.env.REACT_APP_API_URL}/api/ocr-extract`;
                console.log('📡 Making URL API call to:', apiUrl);
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: file, isFile: false }),
                });
                
                console.log('📊 URL Response status:', response.status);
                console.log('📊 URL Response headers:', response.headers.get('content-type'));
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('📊 URL Response data:', data);
                    // OCR endpoint returns { text: "extracted text", confidence: number, ... }
                    setSharedAnalysis(data.text || data.description || data.content || 'No text detected');
                    setSharedExtractedText(data.text || data.extractedText || '');
                } else {
                    const errorText = await response.text();
                    console.error('❌ URL API Error:', response.status, errorText);
                    setSharedError(`Failed to analyze image: ${response.status} - ${errorText.substring(0, 200)}`);
                }} else {
                // Handle file upload analysis - convert to base64 and use correct endpoint
                const reader = new FileReader();                reader.onload = async (e) => {
                    try {
                        const base64Data = e.target.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
                        const apiUrl = `${process.env.REACT_APP_API_URL}/api/ocr-extract`;
                        console.log('📡 Making file API call to:', apiUrl);
                        console.log('📊 Base64 data length:', base64Data.length);
                        
                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                image: base64Data,
                                isFile: true
                            }),
                        });
                        
                        console.log('📊 File Response status:', response.status);
                        console.log('📊 File Response headers:', response.headers.get('content-type'));
                        
                        if (response.ok) {
                            const data = await response.json();
                            console.log('📊 File Response data:', data);
                            // OCR endpoint returns { text: "extracted text", confidence: number, ... }
                            setSharedAnalysis(data.text || data.description || data.content || 'No text detected');
                            setSharedExtractedText(data.text || data.extractedText || '');
                        } else {
                            const errorText = await response.text();
                            console.error('❌ File API Error:', response.status, errorText);
                            setSharedError(`Failed to analyze image: ${response.status} - ${errorText.substring(0, 200)}`);
                        }
                    } catch (fetchError) {
                        console.error('📊 Fetch error:', fetchError);
                        setSharedError('Network error: ' + fetchError.message);
                    }
                };
                reader.onerror = () => {
                    setSharedError('Failed to read file');
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error('❌ Analysis Error:', error);
            setSharedError('Network error: ' + error.message);
        } finally {
            setSharedIsAnalyzing(false);
        }
    };

    // Widget 2: Upload Image Widget functions
    const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/jpg',
        'image/jfif', 'image/heic', 'application/pdf'
    ];

    const handleUploadFile = (file) => {
        if (!file) return;
        if (!allowedTypes.includes(file.type)) {
            setSharedError('Unsupported file type!');
            return;
        }
        setSharedImageFile(file);
        setSharedError('');
        if (file.type.startsWith('image/')) {
            setSharedImagePreview(URL.createObjectURL(file));
        } else if (file.type === 'application/pdf') {
            setSharedImagePreview(null);
        }
        analyzeSharedImage(file, false);
    };

    // Widget 3: URL Widget functions
    const [urlInput, setUrlInput] = useState('');
    const handleUrlAnalysis = (url) => {
        if (!url.trim()) {
            setSharedError('Please enter an image URL.');
            return;
        }
        setSharedImageFile(null);
        setSharedImagePreview(url);
        setSharedError('');
        analyzeSharedImage(url, true);
    };

    // Handle paste event for Upload Widget
    useEffect(() => {
        const onPaste = (e) => {
            const items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].kind === 'file') {
                    handleUploadFile(items[i].getAsFile());
                    break;
                }
            }
        };
        window.addEventListener('paste', onPaste);
        return () => window.removeEventListener('paste', onPaste);
    }, []);

    return (
        <>
            {/* <!-- ====================================== Header ===================================== --> */}
            <div className="overlaytoggle"></div>
            <header id="top-navbar" className="top-navbar">
                <div className="container">
                    <nav>
                        <Link to="/" className="logo">
                            <img src={Logo} alt="logo" />
                            <p>Paintbrush Vision</p>
                        </Link>
                        <div className="nav-links-mn">
                            <ul className="nav-links">
                                <li className="d-flex justify-content-center w-100">
                                    <Link to="/" className="logo side-menu-logo">
                                        <img src={Logo} alt="logo" />
                                        <p>Paintbrush Vision</p>
                                    </Link>
                                </li>
                                <li>
                                    <a className={`a-link ${activeLink === '#explore' ? 'active' : ''}`} href="#explore">
                                        Explore
                                    </a>
                                </li>
                                <li>
                                    <a className={`a-link ${activeLink === '#pricing' ? 'active' : ''}`} href="#pricing">
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                            <div className="header-buttons-main">
                                <Link to="/SliderForm" className="login-btn">Login</Link>
                                <Link to="/SliderForm" className="signUp-btn">Sign Up</Link>
                            </div>
                        </div>
                        {/* <!-- =================== Dark Light Mode Toggle ====================== --> */}
                        <div className="dso-flex">
                            <div className="icon-container" onClick={toggleDarkMode}>
                                <img src={sunIconLight} className={`icon ${isDarkMode ? 'hidden' : ''}`} alt="Light mode" />
                                <img src={sunIconDark} className={`icon ${!isDarkMode ? 'hidden' : ''}`} alt="Dark mode" />
                            </div>
                            <div className="menu-icon" onClick={handleMenuClick}>
                                <img src={Menu} alt="menu" />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            {/* <!-- ====================================== Background Lines ===================================== */}
            <div className="grid-lines">
                <div className="grid-line-1"></div>
                <div className="grid-line-2"></div>
                <div className="grid-line-3"></div>
                <div className="grid-line-4"></div>
                <div className="grid-line-5"></div>
            </div>
            {/* <!-- ====================================== Section One ===================================== --> */}
            <section className="section-one overflow-hidden" id="explore">
                <div className="container">
                    <h1 className="imgGenerator ai-img-get-text fade_down">Image to Text <span>Vision</span></h1>
                    <p className="bring fade_down">Bring your ideas to life with Generate image, the text to image generator in
                        Paintbrush Vision. You can generate images quickly and easily, now with higher quality, more detail and improved
                        lighting and colour.</p>                    <div className="row justify-content-center" style={{ marginTop: 32 }}>
                        {/* OCR Text Extraction Widget */}
                        <div className="col-md-16 col-lg-14 col-xl-12">
                            <div className="shadow-card dashed-box p-4 h-100 d-flex flex-column align-items-stretch">
                                <h3 className="mb-3 text-center">OCR Text Extraction</h3>
                                <div
                                    className={`widget-upload-area mb-3 ${isDragOver ? 'drag-over' : ''}`}
                                    style={{ 
                                        minHeight: 140,
                                        transition: 'all 0.3s ease',
                                        border: isDragOver ? '2px solid #7f53ff' : undefined,
                                        backgroundColor: isDragOver ? '#f0f8ff' : undefined,
                                        transform: isDragOver ? 'scale(1.02)' : 'scale(1)'
                                    }}
                                    onClick={() => uploadFileInputRef.current && uploadFileInputRef.current.click()}
                                    onDragOver={e => {
                                        e.preventDefault();
                                        setIsDragOver(true);
                                    }}
                                    onDragLeave={e => {
                                        e.preventDefault();
                                        // Only set dragOver to false if we're leaving the drop zone entirely
                                        if (!e.currentTarget.contains(e.relatedTarget)) {
                                            setIsDragOver(false);
                                        }
                                    }}
                                    onDrop={e => {
                                        e.preventDefault();
                                        setIsDragOver(false);
                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                            handleUploadFile(e.dataTransfer.files[0]);
                                        }
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.gif,.jfif,.heic,.pdf"
                                        style={{ display: 'none' }}
                                        ref={uploadFileInputRef}
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleUploadFile(e.target.files[0]);
                                            }
                                        }}
                                    />
                                    {sharedImagePreview && !sharedImageFile ? (
                                        <div className="widget-image-preview mb-2 position-relative">
                                            <img src={sharedImagePreview} alt="Preview" style={{ width: '100%', borderRadius: 10, border: '2px solid #eee', maxHeight: 'none', objectFit: 'contain' }} />
                                            <button type="button" className="widget-clear-btn" onClick={e => { e.stopPropagation(); clearSharedState(); setUrlInput(''); }} title="Remove image">&times;</button>
                                        </div>
                                    ) : sharedImagePreview && sharedImageFile && sharedImageFile.type && !sharedImageFile.type.startsWith('image/') ? (
                                        <div className="widget-upload-label text-center" style={{ color: '#42e695' }}>
                                            <i className="fa fa-file-pdf" style={{ fontSize: 32, marginBottom: 8 }}></i>
                                            <span>PDF uploaded: {sharedImageFile.name}</span>
                                        </div>
                                    ) : sharedImagePreview && sharedImageFile ? (
                                        <div className="widget-image-preview mb-2 position-relative">
                                            <img src={sharedImagePreview} alt="Preview" style={{ width: '100%', borderRadius: 10, border: '2px solid #eee', maxHeight: 'none', objectFit: 'contain' }} />
                                            <button type="button" className="widget-clear-btn" onClick={e => { e.stopPropagation(); clearSharedState(); }} title="Remove image">&times;</button>
                                        </div>
                                    ) : (
                                        <div className="widget-upload-label text-center" style={{ 
                                            color: isDragOver ? '#7f53ff' : '#42e695', 
                                            cursor: 'pointer',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            <i className="fa fa-cloud-upload-alt" style={{ 
                                                fontSize: isDragOver ? 36 : 32, 
                                                marginBottom: 8,
                                                transition: 'font-size 0.3s ease'
                                            }}></i>
                                            <span>{isDragOver ? 'Drop your image here!' : 'Click, drag, or paste an image or PDF here'} </span>
                                            <small style={{ color: isDragOver ? '#7f53ff' : '#888', transition: 'color 0.3s ease' }}>
                                                {isDragOver ? 'Release to upload' : 'JPG, PNG, GIF, JFIF, HEIC, PDF'}
                                            </small>
                                        </div>
                                    )}
                                </div>
                                
                                {/* URL Input Section */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Or paste image URL here..."
                                        value={urlInput}
                                        onChange={e => setUrlInput(e.target.value)}
                                        style={{ fontSize: 15 }}
                                    />
                                    <div className="d-flex gap-2">
                                        <button 
                                            className="widget-analyze-btn" 
                                            style={{ flex: 1 }} 
                                            onClick={() => handleUrlAnalysis(urlInput)} 
                                            disabled={!urlInput.trim() || sharedIsAnalyzing}
                                        >
                                            {sharedIsAnalyzing ? 'Analyzing...' : 'Extract Text from URL'}
                                        </button>
                                        <button 
                                            className="widget-clear-btn" 
                                            style={{ width: 36, height: 36, fontSize: 20 }} 
                                            onClick={() => { setUrlInput(''); clearSharedState(); }} 
                                            title="Clear"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    {/* AI Analysis Results section - shared by all three widgets */}
                    <div className="widget-analysis-result mt-4" style={{ 
                        minHeight: 120,
                        background: sharedIsAnalyzing ? '#f0f8ff' : '#f8f9fa', 
                        borderLeft: `4px solid ${sharedIsAnalyzing ? '#007bff' : '#7f53ff'}`, 
                        borderRadius: 8, 
                        color: '#333', 
                        fontSize: 20,
                        fontWeight: (sharedImagePreview || sharedError || sharedAnalysis) ? 'normal' : '600',
                        width: '100%', // Full width
                        margin: '0', // Remove auto margin
                        padding: '24px',
                        transition: 'all 0.3s ease'
                    }}>
                        {sharedError ? (
                            `❌ ${sharedError}`
                        ) : sharedAnalysis ? (
                            <>
                                <div>{sharedAnalysis}</div>
                                {sharedExtractedText && (
                                    <div style={{ marginTop: 24, fontSize: 16, color: '#222', background: '#fff', borderRadius: 6, padding: 16, border: '1px solid #eee', whiteSpace: 'pre-wrap' }}>
                                        <strong>Extracted Text:</strong>
                                        <div style={{ marginTop: 8 }}>{sharedExtractedText}</div>
                                    </div>
                                )}
                            </>
                        ) : (sharedImagePreview || sharedImageFile) ? (
                            'Click "Analyze" to get AI description of your image.'
                        ) : (
                            '🚀 Upload, drag, or paste an image to get started with powerful AI analysis!'
                        )}
                    </div>
                </div>
                <div className="expand-img-main image-slider">
                    <Slider {...imageSlider}>
                        <img className="expand-img" src={ExpandImg} alt="expand-img" />
                        <img className="expand-img" src={ExpandImg2} alt="expand-img2" />
                        <img className="expand-img" src={ExpandImg3} alt="expand-img3" />
                        <img className="expand-img" src={ExpandImg4} alt="expand-img4" />
                    </Slider>
                </div>            </section>
            
            {/* <!-- ====================================== Section Two ===================================== */}
            <section className="section-eight pt-0" id="pricing">
                <div className="container">
                    <h2 className="xplore fade_down">Image to Text <span>Converter</span></h2>
                    <h3 className="stunnii fade_down">Extracting text from an image is very easy using our tool.
Do not waste your time converting JPGs or PNGs to text manually. Our tool will not take more than a minute to convert an image to text.
                    </h3>
                    <div className="row pricing-rows">
                        <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-9 zoom_in">
                            <div className="price-box-main">
                                <p className="freeplan">Free Plan</p>
                                <h3 className="plan-price">$0<sub>/month</sub></h3>
                                <Link to="#" className="price-plan-btn">Generate a image</Link>
                                <ul className="plan-body">
                                    <li>Generate up to 20 images daily</li>
                                    <li>Try classNameic fast and flux fast modes</li>
                                    <li>No access to custom characters or styles</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-9 zoom_in">
                            <div className="price-box-main">
                                <p className="freeplan">Paid Plan</p>
                                <h3 className="plan-price">$9.99<sub>/month</sub></h3>
                                <Link to="#" className="price-plan-btn paind-plan">Get A Paid Plan</Link>
                                <ul className="plan-body">
                                    <li>Enjoy thousands of image generations</li>
                                    <li>Unlock all Flux and Mystic modes</li>
                                    <li>Create custom characters or styles</li>
                                    <li>Access advanced AI tools and features</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ====================================== Footer ===================================== --> */}
            <Footer />
        </>
    );
}

export default Home;