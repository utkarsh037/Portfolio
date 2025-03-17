import React, { useState, useEffect, useRef } from "react";
import "./TerminalMode.css";

const funFacts = [
  "🌌 Space smells like burnt steak!",
  "🚀 A day on Venus is longer than its year.",
  "🛰️ ISS travels at 28,000 km/h!",
  "🌠 Neutron stars spin at 600 revolutions/sec!",
  "💎 There’s a planet made of diamonds (55 Cancri e)!",
];

const skillsList = [
  "💻 JavaScript | TypeScript",
  "⚛️ React | Redux",
  "🌐 Node.js | Express",
  "📂 MongoDB | SQL",
  "🚀 Blockchain | Motoko",
  "🔧 Git | Docker",
];

const quotes = [
  "“Code is like humor. When you have to explain it, it’s bad.”",
  "“Talk is cheap. Show me the code.” – Linus Torvalds",
  "“Programs must be written for people to read.”",
  "“First, solve the problem. Then, write the code.”",
];

const asciiArts = [
  `
   (\\(\\
  (-.-)
 o_(\"\")
 ~ Bunny Hopping ~
  `,
  `
  ╔═══╗ ♪
  ║███║ ♫
  ║(●) ♫
  ╚═══╝♪♪
  ~ Music Mode ~
  `,
  `
   _______
  < Hello! >
   -------
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||
  `,
];

const blogs = [
  "📚 Understanding Blockchain Basics",
  "⚙️ How to Optimize React Apps",
  "🚀 Implementing Real-Time Systems",
  "💡 Tips for Clean JavaScript Code",
];

const socialLinks = [
  "🔗 GitHub: github.com/utkarshbharti",
  "🔗 LinkedIn: linkedin.com/in/utkarshbharti",
  "🔗 Twitter: twitter.com/utkarsh_codes",
];

const commandsList = [
  "help",
  "projects",
  "contact",
  "funfact",
  "skills",
  "quote",
  "theme dark",
  "theme light",
  "fun",
  "whoami",
  "resume",
  "clear",
  "about",
  "social",
  "date",
  "blog",
];

const TerminalMode: React.FC = () => {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to UtkarshOS! Type 'help' to begin.",
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isTerminalActive, setIsTerminalActive] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const addToHistory = (line: string) => {
    setHistory((prev) => [...prev, line]);
  };

  const glitchTheme = () => {
    document.body.classList.add("glitch");
    setTimeout(() => document.body.classList.remove("glitch"), 500);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
  
    const cmd = command.toLowerCase().trim();
    console.log("Command received:", cmd); // Log the received command
  
    setHistory((prev) => [...prev, `$ ${command}`]);
    setCmdHistory([...cmdHistory, command]);
    setCmdIndex(-1);
    setCommand("");
  
    let response = "";
    switch (cmd) {
      case "help":
        response =
          "Available commands: help, projects, contact, funfact, skills, quote, theme dark/light, fun, whoami, resume, clear, about, social, date, blog";
        break;
      // //case "exit":
      //   console.log("Exit command triggered"); // Log when exit is triggered
      //   response = "Goodbye! Exiting terminal mode...";
      //   setHistory((prev) => [...prev, response]);
      //   return;  // Exit without hiding the terminal
      case "projects":
        response =
          "🚀 Projects: Food Delivery Optimization, AI Chatbot, Blockchain Voting System, Earthquake Detection";
        break;
      case "contact":
        response = "📧 Email: bhartiutkarsh180.com | 📞 Phone: +91 7979788219";
        break;
      case "funfact":
        response = funFacts[Math.floor(Math.random() * funFacts.length)];
        break;
      case "skills":
        response = skillsList.join(" | ");
        break;
      case "quote":
        response = quotes[Math.floor(Math.random() * quotes.length)];
        break;
      case "fun":
        response = asciiArts[Math.floor(Math.random() * asciiArts.length)];
        break;
      case "whoami":
        response = "👽 You are Utkarsh, The Full Stack Dev & Blockchain Wizard!";
        break;
      case "resume":
        response = "📄 Downloading resume...";
        const link = document.createElement("a");
        link.href = "/Utkarsh_Resume.pdf";
        link.download = "Utkarsh_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case "theme dark":
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        glitchTheme();
        response = "🌙 Switched to Dark Theme!";
        break;
      case "theme light":
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        glitchTheme();
        response = "☀️ Switched to Light Theme!";
        break;
      case "clear":
        setHistory(["Welcome to UtkarshOS! Type 'help' to begin."]);
        return;
      case "about":
        response =
          "UtkarshOS is a portfolio terminal interface crafted by Utkarsh. Navigate using commands and explore!";
        break;
      case "social":
        response = socialLinks.join(" | ");
        break;
      case "date":
        response = `📅 Current Date & Time: ${new Date().toLocaleString()}`;
        break;
      case "blog":
        response = blogs.join(" | ");
        break;
      default:
        response = `❌ Command not found: ${cmd}`;
    }
    setHistory((prev) => [...prev, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (cmdHistory.length > 0) {
        const newIndex = cmdIndex + 1;
        if (newIndex < cmdHistory.length) {
          setCmdIndex(newIndex);
          setCommand(cmdHistory[cmdHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      if (cmdIndex > 0) {
        const newIndex = cmdIndex - 1;
        setCmdIndex(newIndex);
        setCommand(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setCmdIndex(-1);
        setCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = commandsList.filter((c) =>
        c.startsWith(command.toLowerCase())
      );
      if (matches.length === 1) {
        setCommand(matches[0]);
      } else if (matches.length > 1) {
        addToHistory(matches.join("  "));
      }
    }
  };

  return (
    <div
      className="terminal-container"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, index) => (
        <div key={index} className="terminal-line">
          {line}
        </div>
      ))}

      {!isTyping && (
        <form onSubmit={handleCommand}>
          <span className="terminal-prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
};

export default TerminalMode;
