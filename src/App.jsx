import React, { useState, useEffect } from "react";
import "./ScrollingEffect.css";

const ScrollEffect = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
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
  
  const getOpacityAndTransform = (offset, index, totalSections) => {
    const windowHeight = window.innerHeight;
    const centerOffset = windowHeight / 2;
    
    const distance = scrollPosition - offset + centerOffset;
    let translateY = -distance;
    
    const opacityRange = windowHeight;
    let opacity;
    
    if (distance < 0) {
      opacity = Math.max(0.2, 1 + distance / opacityRange);
    } else if (distance < opacityRange) {
      opacity = 1 - Math.abs(distance - centerOffset) / centerOffset;
    } else {
      opacity = Math.max(0.2, 1 - (distance - opacityRange) / opacityRange);
    }
    
    opacity = Math.max(0, Math.min(1, opacity));
    
    return { 
      opacity, 
      transform: `translateY(${translateY}px)` 
    };
  };
  
  const sections = [
    { id: 1, text: "Hey, I've noticed you've been sitting down for a while. How about we take a break and stretch for a few minutes?", offset: 200 },
    { id: 2, text: "Yes. That sounds good, where can I start today?", offset: 600 },
    { id: 3, text: "Let's get you moving with a few quick stretches to loosen up. We'll focus on your neck, shoulders, back, and legs. How does that sound?", offset: 1000 },
    { id: 4, text: "My left shoulder is a bit stiff today. Can we do something else?", offset: 1400 },
    { id: 5, text: "Absolutely! We can focus on some gentle stretches and movements to help relieve that stiffness in your left shoulder without causing any discomfort. Here's a sequence designed to ease into it...", offset: 1800 },
  ].reverse();
  
  return (
    <div className="scroll-container">
      <div className="image-container">
        <div className="watch-image">
          {/* Watch image placeholder */}
        </div>
      </div>
      <div className="text-container">
        {sections.map((section, index) => {
          const { opacity, transform } = getOpacityAndTransform(section.offset, index, sections.length);
          const isRedText = [0, 2, 4].includes(index); // 1st, 3rd, 5th text in red
          
          return (
            <div
              key={section.id}
              className={`section ${isRedText ? 'red-text' : ''}`}
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