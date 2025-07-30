import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Globe, Facebook, Instagram, Mail, Phone, Inbox } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/TermsAndConditions";
import CookieWall from "./components/CookieWall";

const translations = {
  EN: {
    home: "Home",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    cart: "Cart",
    customs: "Customs",
    gallery: "Gallery",
    quickLinks: "Quick Links",
    connect: "Connect with us",
    wraps: "Wraps in Stock",
    shawls: "Shawls in Stock",
    aboutText: "This is the About page.",
    blogText: "This is the newsletter archive.",
    contactText: "This is the Contact page.",
    cartText: "Your cart is currently empty.",
    galleryText: "On the loom right now.",
    privacy: "Privacy Policy",
    terms: "Terms and Conditions",
    availableWraps: "Available Wraps",
    availableShawls: "Available Shawls"
  },
  CZ: {
    home: "Domů",
    about: "O nás",
    contact: "Kontakt",
    blog: "Blog",
    cart: "Košík",
    customs: "Zakázky",
    gallery: "Galerie",
    quickLinks: "Rychlé odkazy",
    connect: "Spojte se s námi",
    wraps: "Šátky skladem",
    shawls: "Šály skladem",
    aboutText: "Toto je stránka O nás.",
    blogText: "Toto je archiv newsletteru.",
    contactText: "Toto je stránka Kontakt.",
    cartText: "Váš košík je momentálně prázdný.",
    galleryText: "Právě na stavu.",
    privacy: "Zásady ochrany osobních údajů",
    terms: "Obchodní podmínky",
    availableWraps: "Dostupné šátky",
    availableShawls: "Dostupné šály"
  }
};

export const PageWrapper = ({ children }) => (
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
        <div
          className="relative cursor-pointer hover:shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-xl shadow-lg overflow-hidden mb-6 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/wrap_background.png')",
            minHeight: "300px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-3xl text-white font-bold">{t.wraps}</h2>
          </div>
        </div>
      </Link>
      <Link to="/shawls" className="block">
        <div
          className="relative cursor-pointer hover:shadow-xl transform hover:scale-105 transition-transform duration-300 rounded-xl shadow-lg overflow-hidden mb-6 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/shawl_background.png')",
            minHeight: "300px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-3xl text-white font-bold">{t.shawls}</h2>
          </div>
        </div>
      </Link>
    </motion.main>
  );
}

function About({ language }) {
  return <PageWrapper>{translations[language].aboutText}</PageWrapper>;
}

function Cart({ language }) {
  return <PageWrapper>{translations[language].cartText}</PageWrapper>;
}

function Gallery({ language }) {
  return <PageWrapper>{translations[language].galleryText}</PageWrapper>;
}

function Blog({ language }) {
  return <PageWrapper>{translations[language].blogText}</PageWrapper>;
}

function Wraps({ language }) {
  return <PageWrapper>{translations[language].availableWraps}</PageWrapper>;
}

function Shawls({ language }) {
  return <PageWrapper>{translations[language].availableShawls}</PageWrapper>;
}

function Customs({ language }) {
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
      <h2 className="text-xl font-semibold mb-4">{translations[language].customsText}</h2>
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

export function Contact({ language }) {
  const t = {
    EN: {
      title: "Contact Us",
      name: "Your Name",
      email: "Your Email",
      message: "Message",
      button: "Send Message",
    },
    CZ: {
      title: "Kontaktujte nás",
      name: "Vaše jméno",
      email: "Váš e-mail",
      message: "Zpráva",
      button: "Odeslat zprávu",
    },
  };

  const labels = t[language] || t.EN;

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold mb-8">{labels.title}</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target;

          const response = await fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name.value,
              email: form.email.value,
              message: form.message.value,
            }),
          });

          if (response.ok) {
            alert("Message sent!");
            form.reset();
          } else {
            alert("Failed to send message.");
          }
        }}
        className="space-y-4 text-left"
      >
          <label className="flex flex-col">
            <span className="mb-1 font-medium">{labels.name}</span>
            <input
              type="text"
              name="name"
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">{labels.email}</span>
            <input
              type="email"
              name="email"
              required
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">{labels.message}</span>
            <textarea
              name="message"
              rows="5"
              required
              className="border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            ></textarea>
          </label>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded transition"
            >
              {labels.button}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}

function AnimatedRoutes({ language }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <CookieWall language={language} />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/blog" element={<Blog language={language} />} />
        <Route path="/cart" element={<Cart language={language} />} />
        <Route path="/contact" element={<Contact language={language} />} />
        <Route path="/customs" element={<Customs language={language} />} />
        <Route path="/gallery" element={<Gallery language={language} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy language={language} />} />
        <Route path="/terms-and-conditions" element={<Terms language={language} />} />
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
         <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo-bg.png"
              alt="Logo"
              className="h-10 w-auto mr-2 rounded bg-white mix-blend-multiply"
            />
            <span className="text-2xl font-bold text-white">SilkyWave</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.home}
              </Button>
            </Link>
            <Link to="/customs">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.customs}
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.gallery}
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost" className="transition-transform hover:scale-105 duration-300 text-purple-600 hover:text-purple-500">
                {t.blog}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="font-semibold mb-2">{t.quickLinks}</h2>
              <ul className="space-y-1">
                <li>
                  <Link to="/privacy-policy" className="hover:underline">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className="hover:underline">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mb-2">{t.connect}</h2>
              <div className="flex space-x-4 items-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500"
                >
                  <Instagram size={24}/>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  <Facebook size={24} />
                </a>
              <a href="/newsletter" className="flex items-center space-x-2 hover:text-gray-600">
                <Inbox size={24} />
                <span>Newsletter</span>
              </a>
              </div>
            </div>
            <div>
              <h2 className="font-semibold mb-2">{t.contact}</h2>
              <div>
              <a href="mailto:silkywave.goldfish@gmail.com" className="flex items-center space-x-2 hover:text-gray-600">
                <Mail size={20} />
                <span>silkywave.goldfish@gmail.com</span>
              </a>
              <ul className="flex items-center space-x-2">
                <Phone size={20} />
                <span>+420 604 381 709</span>
              </ul>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-6">
            © {new Date().getFullYear()} SilkyWave
          </div>
        </footer>
      </div>
    </Router>
  );
}
