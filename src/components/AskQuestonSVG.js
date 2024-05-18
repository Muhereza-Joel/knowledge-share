import React, { useRef } from 'react';

const AskQuestionSVG = () => {
  const scrollRef = useRef(0);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <svg
        version="1.1"
        id="Layer_1"
        viewBox="0 0 600 400"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <style>
          {`
            .background { fill: #f6f9ff; }
            .main-text { fill: #217537; font-family: Arial, sans-serif; text-anchor: start; }
            .sub-text { fill: #666666; font-family: Arial, sans-serif; text-anchor: start; }
            .highlight { fill: #217537; font-family: Arial, sans-serif; text-anchor: start; }
            .bubble { fill: #217537; }
            .circle { fill: #217537; }
            .small-circle { fill: #217537; opacity: 0.5; }
          `}
        </style>
        <rect width="100%" height="100%" className="background" />
        <g id="dots">
          {Array.from({ length: 150 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 600}
              cy={Math.random() * 400}
              r={Math.random() * 5 + 1}
              className="small-circle"
            />
          ))}
        </g>
        <g>
          <circle cx="100" cy="250" r="50" className="bubble" />
          <text x="20" y="50"  font-size="24" className="main-text">
            Knowledge Share
          </text>
          <text x="20" y="80"  font-size="20" className="sub-text">
            A platform for sharing Knowledge and Experience
          </text>
          <text x="20" y="110"  font-size="14" className="sub-text">
            Feel free to ask any question concerning agriculture
          </text>
          <text x="20" y="130"  font-size="10" className="highlight">
            The big community of farmers and experts is waiting to assist you!
          </text>
          <text x="20" y="140"  font-size="10" className="highlight">
            We are are a trusted source of knowledge concerning agriculture, Ask your question today!
          </text>
          <text x="20" y="160"  font-size="15" className="highlight">
            Lets Share, Develop and Proper!!!
          </text>
        </g>
      </svg>
      <div ref={scrollRef} />
      <button onClick={scrollToBottom} style={{ position: 'absolute', top: '33%', left: '20%', backgroundColor : "#217537", color: "#fff", border: 'none', borderRadius : '10px', padding: "10px" }}>
        Compose your question now
      </button>
    </div>
  );
};

export default AskQuestionSVG;
