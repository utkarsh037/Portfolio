import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import TerminalMode from "./TerminalMode"; // Import TerminalMode
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
  const [showTerminal, setShowTerminal] = useState(false); // Terminal toggle state

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <main className="body">
      <section className="hero-section">
        <div className="text">
          <h1>Hello !!!</h1>
          <h2>
            I’m <span>U</span><span>T</span><span>K</span><span>A</span><span>R</span><span>S</span><span>H</span>
          </h2>
          <p className="fun-intro">A civil engineer who took a wrong turn and ended up coding full-stack apps. Oops... but no regrets! 😎</p>

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
          <img src="img1.gif" alt="Space" />
        </div>
      </section>
    </main>
  );
}

export default Body;
