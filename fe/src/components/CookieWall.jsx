import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CookieWall() {
  const [show, setShow] = useState(false);

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
          We use cookies to enhance your browsing experience, analyze traffic and personalize content. By clicking “Accept”, you agree to our{" "}
          <Link to="/privacy-policy" className="text-purple-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={acceptCookies}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
