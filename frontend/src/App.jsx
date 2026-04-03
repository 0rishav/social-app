import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Home/Landing";
import Services from "./pages/Services/Services";
import ServiceDetailsPage from "./pages/Services/ServiceDetailsPage";
import Projects from "./pages/projects/Projects";
import Contact from "./pages/contact/Contact";
import Footer from "./components/Footer";
import Studio from "./pages/studio/Studio";
const App = () => {
  return (
    <Router>
      <div className="bg-ivory min-h-screen selection:bg-gold selection:text-charcoal">
        {/* Header sabhi pages par dikhega */}
        <Header />

        <main>
          <Routes basename="/social-app">
            {/* Landing Page Route */}
            <Route path="/" element={<Landing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetailsPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studio" element={<Studio />} />

            {/* 404 Page (Optional) */}
            <Route
              path="*"
              element={
                <div className="h-screen flex items-center justify-center bg-charcoal text-ivory">
                  <h1 className="text-4xl font-serif italic">
                    404 | Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
