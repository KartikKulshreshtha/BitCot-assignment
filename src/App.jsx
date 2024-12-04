import React, { useState, useEffect } from "react";
import "./ScrollingEffect.css";

const ScrollEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isRedTextActive, setIsRedTextActive] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getOpacityAndTransform = (offset) => {
    const windowHeight = window.innerHeight;
    const centerOffset = windowHeight / 2;
  
    const distance = scrollPosition - offset + centerOffset;
    let translateY = -distance / 3;
  
    const opacityRange = windowHeight;
    let opacity;
  
    if (distance < -centerOffset) {
      opacity = 0;
    } else if (distance >= -centerOffset && distance <= centerOffset) {
      opacity = 1 - Math.abs(distance) / opacityRange;
    } else {
      opacity = 0;
    }
  
    opacity = Math.max(0, Math.min(1, opacity));
  
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
    };
  };
  

  const sections = [
    { id: 1, text: "Hey, I've noticed you've been sitting down for a while. How about we take a break and stretch for a few minutes?", offset: 200 },
    { id: 2, text: "Yes. That sounds good, where can I start today?", offset: 600 },
    { id: 3, text: "Let's get you moving with a few quick stretches to loosen up. We'll focus on your neck, shoulders, back, and legs. How does that sound?", offset: 1000 },
    { id: 4, text: "My left shoulder is a bit stiff today. Can we do something else?", offset: 1400 },
    { id: 5, text: "Absolutely! We can focus on some gentle stretches and movements to help relieve that stiffness in your left shoulder without causing any discomfort. Here's a sequence designed to ease into it...", offset: 1800 },
  ].reverse();

  useEffect(() => {
    const redTextVisible = sections.some((section, index) => {
      const { opacity } = getOpacityAndTransform(section.offset);
      const isRedText = index === 0 || index === 2 || index === sections.length - 1;
      return isRedText && opacity > 0.5;
    });

    setIsRedTextActive(redTextVisible);
  }, [scrollPosition]);

  return (
    <div className="scroll-container">
      <div className={`image-container ${isRedTextActive ? "active-border" : ""}`}>
        <div className="watch-image"></div>
      </div>
      <div className="text-container">
        {sections.map((section, index) => {
          const { opacity, transform } = getOpacityAndTransform(section.offset);
          const isRedText = index === 0 || index === 2 || index === sections.length - 1;

          return (
            <div
              key={section.id}
              className={`section ${isRedText ? "red-text" : ""}`}
              style={{
                opacity,
                transform,
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <p className="text">{section.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollEffect;
