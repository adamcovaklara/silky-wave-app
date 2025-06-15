import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const translations = {
  EN: {
    home: "Home",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    configuration: "Configuration",
    quickLinks: "Quick Links",
    connect: "Connect with us",
    wraps: "Wraps in Stock",
    shawls: "Shawls in Stock",
    aboutText: "This is the About page.",
    contactText: "This is the Contact page.",
    cartText: "Your cart is currently empty.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    availableWraps: "Available Wraps",
    availableShawls: "Available Shawls"
  },
  CZ: {
    home: "Domů",
    about: "O nás",
    contact: "Kontakt",
    cart: "Košík",
    configuration: "Konfigurace",
    quickLinks: "Rychlé odkazy",
    connect: "Spojte se s námi",
    wraps: "Šátky skladem",
    shawls: "Šály skladem",
    aboutText: "Toto je stránka O nás.",
    contactText: "Toto je stránka Kontakt.",
    cartText: "Váš košík je momentálně prázdný.",
    privacy: "Zásady ochrany osobních údajů",
    terms: "Obchodní podmínky",
    availableWraps: "Dostupné šátky",
    availableShawls: "Dostupné šály"
  }
};

function PageWrapper({ children }) {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Home({ language }) {
  const t = translations[language];
  return (
    <motion.main
      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Link to="/wraps" className="block">
        <Card className="cursor-pointer hover:shadow-xl transform hover:scale-105 transition-transform duration-300 h-64 flex items-center justify-center text-2xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 font-semibold rounded-lg shadow-md">
          <CardContent className="flex items-center justify-center h-full">
            {t.wraps}
          </CardContent>
        </Card>
      </Link>

      <Link to="/shawls" className="block">
        <Card className="cursor-pointer hover:shadow-xl transform hover:scale-105 transition-transform duration-300 h-64 flex items-center justify-center text-2xl bg-gradient-to-br from-green-200 via-green-300 to-yellow-200 text-gray-900 font-semibold rounded-lg shadow-md">
          <CardContent className="flex items-center justify-center h-full">
            {t.shawls}
          </CardContent>
        </Card>
      </Link>
    </motion.main>
  );
}

function About({ language }) {
  return <PageWrapper>{translations[language].aboutText}</PageWrapper>;
}

function Contact({ language }) {
  return <PageWrapper>{translations[language].contactText}</PageWrapper>;
}

function Cart({ language }) {
  return <PageWrapper>{translations[language].cartText}</PageWrapper>;
}

function PrivacyPolicy({ language }) {
  return <PageWrapper>{translations[language].privacy}</PageWrapper>;
}

function TermsOfService({ language }) {
  return <PageWrapper>{translations[language].terms}</PageWrapper>;
}

function Wraps({ language }) {
  return <PageWrapper>{translations[language].availableWraps}</PageWrapper>;
}

function Shawls({ language }) {
  return <PageWrapper>{translations[language].availableShawls}</PageWrapper>;
}

function Configuration({ language }) {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("http://localhost:4000/api/process-image?colorize=true", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <PageWrapper>
      <h2 className="text-xl font-semibold mb-4">{translations[language].configurationText}</h2>
      <input
        type="file"
        accept="image/*"
        className="block mb-4"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-2 rounded"
      >
        Process Image
      </button>
      {response && (
        <p className="mt-4 text-green-600">{response.message}</p>
      )}
    </PageWrapper>
  );
}

function AnimatedRoutes({ language }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/cart" element={<Cart language={language} />} />
        <Route path="/contact" element={<Contact language={language} />} />
        <Route path="/configuration" element={<Configuration language={language} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy language={language} />} />
        <Route path="/terms-of-service" element={<TermsOfService language={language} />} />
        <Route path="/wraps" element={<Wraps language={language} />} />
        <Route path="/shawls" element={<Shawls language={language} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function SimpleWebPage() {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "EN");

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === "EN" ? "CZ" : "EN";
      localStorage.setItem("lang", newLang);
      return newLang;
    });
  };

  const t = translations[language];

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-pink-50">
        <header className="bg-gradient-to-r from-pink-300 via-purple-300 via-blue-300 via-green-300 to-yellow-300 text-gray-900 p-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-b-lg shadow-md">
          <Link to="/" className="text-xl font-bold hover:text-gray-700 transition-colors duration-300">
            My WebApp
          </Link>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.home}
              </Button>
            </Link>
            <Link to="/configuration">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.configuration}
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.about}
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.contact}
              </Button>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="flex items-center gap-1 transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4" />
              {language}
            </Button>
            <Link to="/cart">
              <Button
                variant="ghost"
                className="flex items-center gap-1 transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500"
              >
                <ShoppingCart className="w-4 h-4" />
                {t.cart}
              </Button>
            </Link>
          </div>
        </header>

        <AnimatedRoutes language={language} />

        <footer className="bg-gradient-to-r from-yellow-300 via-green-300 via-blue-300 via-purple-300 to-pink-300 text-gray-900 p-6 mt-auto rounded-t-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold mb-2">{t.quickLinks}</h2>
              <ul className="space-y-1">
                <li>
                  <Link to="/privacy-policy" className="hover:underline">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="hover:underline">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-2">{t.connect}</h2>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
