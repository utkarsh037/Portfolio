import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Body.css";

const TypingEffect = ({ textArray, typingSpeed = 100, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (isTyping && currentText.length < textArray[textIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + textArray[textIndex][currentText.length]);
      }, typingSpeed);
    } else if (isTyping && currentText.length === textArray[textIndex].length) {
      timeout = setTimeout(() => setIsTyping(false), pauseTime);
    } else if (!isTyping && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, typingSpeed);
    } else if (!isTyping && currentText.length === 0) {
      setIsTyping(true);
      setTextIndex((prev) => (prev + 1) % textArray.length);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, textArray, textIndex, typingSpeed, pauseTime]);

  return <span className="typing-effect">{currentText}</span>;
};

function Body() {
  const navigate = useNavigate();
  const [showTerminal, setShowTerminal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="body">
      <section className="hero-section">
        <div className="text">
          <h1>Hello !!!</h1>
          <h2>
            {`I’m `}
            {"UTKARSH".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </h2>
          <p className="fun-intro">
            A civil engineer who took a wrong turn and ended up coding full-stack apps. Oops... but no regrets! 😎
          </p>

          <p>
            <TypingEffect
              textArray={[
                "A Full Stack Web Developer",
                "A Blockchain Enthusiast",
                "An AI Researcher",
              ]}
              typingSpeed={150}
              pauseTime={2000}
            />
          </p>
          <button className="cta-button" onClick={handleProjectsClick}>
            View My Projects
          </button>
          <h2>Available For Amazing Projects</h2>
          <p>Let's Talk</p>
          <button className="cta-button" onClick={handleContactClick}>
            Contact Me
          </button>
        </div>

        <div className="image-container">
          <img 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2p3dnNjbWx5ZXN4eHJ1NnhoM3A5ejcwNG54cThqMTJkODl6bXN2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mf8UbIDew7e8g/giphy.gif"
            alt="Blockchain Cube Spinning"
            style={{ width: '400px', height: '400px', objectFit: 'cover' }}
          />
        </div>
      </section>
    </main>
  );
}

export default Body;

