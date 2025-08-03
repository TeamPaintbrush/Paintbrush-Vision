import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './assets/css/swap.css';
import './assets/css/bootstrap.min.css';
import './assets/css/slick.css';
import './assets/css/style.css';
import './assets/css/media-query.css';
import './assets/css/accessibility.css';
import Home from './page/Home';
import PageLoader from './component/PageLoader'
import SliderForm from './page/SliderForm'
import FeaturesPage from './page/FeaturesPage'
import ErrorBoundary from './component/ErrorBoundary';
import { DarkModeProvider } from './component/DarkModeContext';
import { ToastProvider } from './context/ToastContext';
import { SkipLink } from './component/AccessibleUI';

function App() {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <ToastProvider>
          <SkipLink />
          <PageLoader />
          <BrowserRouter>
            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SliderForm" element={<SliderForm />} />
                <Route path="/features" element={<FeaturesPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </ToastProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  );
}

export default App;
