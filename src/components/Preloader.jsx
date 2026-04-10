import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Progress Timer (Fake)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // 2. SAFETY FAILSAFE (Force preloader to close after 3.5s no matter what)
    const failsafe = setTimeout(() => {
      onLoaded();
    }, 3500);

    // 3. Initial Animation
    gsap.fromTo(".loader-content",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );

    return () => {
        clearInterval(interval);
        clearTimeout(failsafe);
    };
  }, []);

  // 4. Trigger Wipe-out when progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({ onComplete: onLoaded });
      tl.to(".loader-content", { opacity: 0, y: -20, duration: 0.4 })
        .to(".preloader-top", { y: "-100%", duration: 0.8, ease: "power4.inOut" }, "split")
        .to(".preloader-bottom", { y: "100%", duration: 0.8, ease: "power4.inOut" }, "split");
    }
  }, [progress, onLoaded]);

  return (
    <div className="fixed inset-0 z-[100] bg-transparent pointer-events-none flex flex-col justify-center items-center">
      {/* Splits */}
      <div className="preloader-top absolute top-0 left-0 w-full h-1/2 bg-[#050505] pointer-events-auto"></div>
      <div className="preloader-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] pointer-events-auto"></div>

      {/* Content */}
      <div className="loader-content absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-10">
        <div className="relative mb-12">
          <div className="w-auto h-32 md:h-48 flex items-center justify-center">
            <img src={`${import.meta.env.BASE_URL}videos/Preloader-infinite.gif`} alt="VRE Logo Pulse" className="h-full w-auto object-contain" />
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 max-w-[80vw] h-[2px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-primary absolute top-0 left-0"
            style={{ width: `${progress}%`, transition: 'width 25ms linear' }}
          ></div>
        </div>

        <div className="mt-4 font-orbitron text-[10px] tracking-[0.3em] font-bold text-white/50 uppercase">
          Initializing Engine <span className="text-white ml-2">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
