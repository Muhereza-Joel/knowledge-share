import React from "react";

const NoQuestionsSVG = ({tagName}) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      viewBox="0 0 300 200"
      width="800px"
      height="600px"
    >
      <style>
        {`
        .st0 { fill: #217537; fill-opacity: 0.2; }
        .st1 { fill: #217537; }
        .st2 { fill: #FFFFFF; stroke: #217537; stroke-width: 2; }
        .st3 { fill: #FFA500; }
        .st4 { fill: #217537; fill-opacity: 0.5; }
        `}
      </style>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {/* <!-- Dotted Background --> */}
        <circle cx="20" cy="20" r="3" class="st4" />
        <circle cx="40" cy="50" r="5" class="st4" />
        <circle cx="60" cy="30" r="2" class="st4" />
        <circle cx="80" cy="70" r="4" class="st4" />
        <circle cx="100" cy="20" r="3" class="st4" />
        <circle cx="120" cy="60" r="6" class="st4" />
        <circle cx="140" cy="40" r="2" class="st4" />
        <circle cx="160" cy="70" r="5" class="st4" />
        <circle cx="180" cy="20" r="3" class="st4" />
        <circle cx="200" cy="50" r="4" class="st4" />
        <circle cx="220" cy="30" r="2" class="st4" />
        <circle cx="240" cy="70" r="6" class="st4" />
        <circle cx="260" cy="20" r="3" class="st4" />
        <circle cx="280" cy="60" r="5" class="st4" />
        <circle cx="300" cy="40" r="2" class="st4" />
        <circle cx="20" cy="180" r="4" class="st4" />
        <circle cx="40" cy="160" r="2" class="st4" />
        <circle cx="60" cy="140" r="3" class="st4" />
        <circle cx="80" cy="120" r="5" class="st4" />
        <circle cx="100" cy="100" r="2" class="st4" />
        <circle cx="120" cy="140" r="4" class="st4" />
        <circle cx="140" cy="160" r="3" class="st4" />
        <circle cx="160" cy="120" r="5" class="st4" />
        <circle cx="180" cy="140" r="2" class="st4" />
        <circle cx="200" cy="160" r="6" class="st4" />
        <circle cx="220" cy="180" r="3" class="st4" />
        <circle cx="240" cy="160" r="4" class="st4" />
        <circle cx="260" cy="140" r="2" class="st4" />
        <circle cx="280" cy="180" r="5" class="st4" />
        <circle cx="300" cy="160" r="3" class="st4" />

        {/* <!-- Background Circle --> */}
        <circle cx="150" cy="100" r="90" class="st0" />

        {/* <!-- Person Icon --> */}
        <g>
          <circle cx="100" cy="70" r="10" class="st2" />
          <rect x="95" y="80" width="10" height="30" class="st2" />
          <rect x="85" y="90" width="30" height="10" class="st2" />
          <rect x="85" y="110" width="10" height="20" class="st2" />
          <rect x="115" y="110" width="10" height="20" class="st2" />
        </g>

        {/* <!-- Speech Bubble --> */}
        <g>
          <rect
            x="120"
            y="50"
            width="100"
            height="50"
            class="st3"
            rx="10"
            ry="10"
          />
          <polygon points="120,70 110,80 120,80" class="st3" />
          <text x="130" y="80" fill="white" font-family="Arial" font-size="12">
            How to grow better crops?
          </text>
        </g>

        {/* <!-- Tree Icon --> */}
        <g>
          <rect x="200" y="80" width="20" height="40" class="st2" />
          <circle cx="210" cy="70" r="15" class="st2" />
          <circle cx="195" cy="60" r="10" class="st2" />
          <circle cx="225" cy="60" r="10" class="st2" />
        </g>

        {/* <!-- Main Text --> */}
        <text
          x="150"
          y="160"
          alignment-baseline="middle"
          text-anchor="middle"
          font-size="24"
          font-family="Arial"
          class="st1"
        >
          Ooh Sorry,
        </text>
        <text
          x="150"
          y="180"
          alignment-baseline="middle"
          text-anchor="middle"
          font-size="12"
          font-family="Arial"
          className="st1"
        >
          We have no questions tagged: {tagName}
        </text>
      </g>
    </svg>
  );
};

export default NoQuestionsSVG;
