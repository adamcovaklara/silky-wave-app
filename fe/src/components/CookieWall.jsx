import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const messages = {
  EN: {
    message:
      "We use cookies to enhance your browsing experience, analyze traffic and make our services better. By clicking “Accept”, you agree to our",
    accept: "Accept",
    privacy: "Privacy Policy",
  },
  CZ: {
    message:
      "Používáme cookies pro snadnější prohlížení stránek, analýzu návštěvnosti a vylepšení našich služeb. Udělením souhlasu přijímáte naše",
    accept: "Souhlasím",
    privacy: "Zásady ochrany osobních údajů",
  },
};

export default function CookieWall({ language }) {
  const [show, setShow] = useState(false);
  const t = messages[language] || messages["en"];

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setShow(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] md:max-w-3xl bg-white border shadow-lg rounded-lg p-4 z-50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-700">
          {t.message}{" "}
          <Link to="/privacy-policy" className="text-purple-600 underline">
            {t.privacy}
          </Link>
          .
        </p>
        <button
          onClick={acceptCookies}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
