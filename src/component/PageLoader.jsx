import { useEffect, useState } from "react";

const PageLoader = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        loading && (
            <div className="page-loader">
                <div className="banter-loader">
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                    <div className="banter-loader-box"></div>
                </div>
            </div>
        )
    );
};

export default PageLoader;
