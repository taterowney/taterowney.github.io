import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback, HTMLAttributes, useReducer } from 'react';


export const Bookmark = forwardRef(({ id, children, style }, ref) => {
    const innerRef = useRef(null);

    useImperativeHandle(ref, () => innerRef.current);

    return (
        <div
        id={id}
        ref={innerRef}
        style={{
            scrollMarginTop: '1rem',
            ...style,
        }}
        >
        {children}
        </div>
    );
});

export function scrollToBookmark(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`No bookmark with id="${id}"`);
        return;
    }
    el.scrollIntoView({ behavior: 'smooth' });
}


function useScrollFade(startFade = 100, minOpacity = 0.35) {
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const endFade = window.innerHeight;
    const clamped = Math.min(Math.max(rect.top, startFade), endFade);
    // normalized goes 1 → 0 as you scroll from startFade → endFade
    const normalized = 1 - (clamped - startFade) / (endFade - startFade);

    const next = Math.max(
      minOpacity,
      Math.min(1, normalized * (1 - minOpacity) + minOpacity)
    );
    setOpacity(next);
  }, [startFade, minOpacity]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ref, opacity };
}

export function FadeContainer({ children }) {
  const { ref, opacity } = useScrollFade();

  return (
    <div
      ref={ref}
      style={{
        opacity,
        transition: 'opacity 0.25s',
      }}
    >
      {children}
    </div>
  );
}


export function Topbar({ children }) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 800);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const barHeight = narrow ? '15vh' : '10vh';
  const spacerHeight = narrow ? '20vh' : '15vh';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: barHeight,
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          padding: '0 10%',
          boxShadow: '0px 2px 2px 1px rgba(0,0,0,0.2)',
          transition: 'opacity 0.25s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: narrow ? '1rem' : '5rem',
          paddingRight: narrow ? '1rem' : '9rem',
          }}
      >
        {children}
      </div>
      {/* spacer */}
      <div style={{ height: spacerHeight }} />
    </>
  );
}


export function Logo() {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 800);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const [superNarrow, setSuperNarrow] = useState(false);
  useEffect(() => {
    const update = () => setSuperNarrow(window.innerWidth < 550);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return <p>
    <span style={{
      fontSize: narrow ? (superNarrow ? '1.25rem' : '1.5rem') : '2rem',
      backgroundColor: '#00007c',
      fontFamily: 'Courier New',
      borderRadius: '5px',
      color: 'white',
      paddingRight: '0.1rem',
      paddingLeft: '0.1rem',
      marginRight: '0.1rem',
      fontWeight: '600',
      float: 'left',
    }}>Tate</span>
    <span style={{
      fontSize: narrow ? (superNarrow ? '1.25rem' : '1.5rem') : '2rem',
      fontFamily: 'Courier New',
      paddingRight: '0rem',
      paddingLeft: '0rem',
      margin: '0px',
      color: 'black',
      fontWeight: '600',
      float: 'left',
    }}
    > Rowney_</span>
  </p>
}


export function useYLevelScroll(targetId, y = 300) {
  const [crossed, setCrossed] = useState(false);
  const prev = useRef(false);          // last value we sent to React
  const frame = useRef();              // rAF handle

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const check = () => {
      const { top, bottom } = el.getBoundingClientRect();
      const now = top <= y && bottom >= y;
      if (now !== prev.current) {
        prev.current = now;
        setCrossed(now);
      }
    };

    /** Throttle scroll events down to one per animation frame. */
    const onScroll = () => {
      if (frame.current == null) {
        frame.current = requestAnimationFrame(() => {
          frame.current = null;
          check();
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll); // element moves on resize too
    check();                                    // run once on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [targetId, y]);

  return crossed;
}

export function NavItem({ children, target_id, style, ...props }) {
  const [superNarrow, setSuperNarrow] = useState(false);
  useEffect(() => {
    const update = () => setSuperNarrow(window.innerWidth < 550);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const [hover, setHover] = useState(false);
  const active = useYLevelScroll(target_id, 100);
  const backgroundColor = hover ? (active ? 'rgba(0,0,0,0.1)' : '#00007c') : 'transparent';
  const color = active ? ('#00007c') : (hover ? 'white' : 'black');
  const fontWeight = active ? '500' : '200';

  return (
    <a
      href={`#${target_id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToBookmark(target_id);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: 'none',
        color,
        cursor: 'pointer',
        padding: superNarrow ? '0 0.5rem' : '0 1rem',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        backgroundColor,
        transition:
          'color 0.5s ease, background-color 0.5s ease, transform 0.3s ease',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        userSelect: 'none',
        fontSize: superNarrow ? '1.25rem' : '1.5rem',
        fontWeight: fontWeight,
        ...style,
      }}
      {...props}
    >
      {children}
    </a>
  );
}

export function TitleHeading({ children, style, ...props }) {
  return (
    <h1
      {...props}
      style={{
        fontSize: '6em',
        marginTop: '2rem',
        width: '100%',
        padding: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        textAlign: 'center',
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

export function Heading({ children, style, ...props }) {
  return (
    <h2
      {...props}
      style={{
        fontSize: '4.5em',
        marginTop: '5%',
        width: '100%',
        textAlign: 'center',
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Subheading({ children, style, ...props }) {
  return (
    <h3
      {...props}
      style={{
        fontSize: '2em',
        width: 'fit-content',
        padding: '1%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        textAlign: 'center',
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function Spacer({ height = '4rem' }) {
  return <div style={{ height }} />;
}


// TODO: narrow screen cuts off images

const DEFAULT_BOX_WIDTH = 900; // px: approximate width for each project
const NARROW_BOX_WIDTH = 400;

function getBoxWidth() {
  if (typeof window === 'undefined') return DEFAULT_BOX_WIDTH;
  // return window.innerWidth < 700 ? NARROW_BOX_WIDTH : DEFAULT_BOX_WIDTH;
  return Math.min(DEFAULT_BOX_WIDTH, window.innerWidth * 0.8);
  
}

function getBoxHeight() {
  if (typeof window === 'undefined') return '20em'; // default height
  if (window.innerWidth < 700) {
    return '30em';
  }
  else {
    return '20em';
  } 
}

export function ProjectCarousel({ children }) {
  const ref = useRef(null);
  const [boxWidth, setBoxWidth] = useState(DEFAULT_BOX_WIDTH);
  const [boxHeight, setBoxHeight] = useState('20em');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const count = React.Children.count(children);

  useEffect(() => {
    const update = () => setBoxWidth(getBoxWidth());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const update2 = () => setBoxHeight(getBoxHeight());
    update2();
    window.addEventListener('resize', update2);
    return () => window.removeEventListener('resize', update2);
  }
  , []);

  // --- drag-to-scroll logic (marks interaction) ---
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    const handleMouseDown = (e) => {
      if (!hasInteracted) setHasInteracted(true);
      isDragging = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const handleMouseUpOrLeave = () => {
      isDragging = false;
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; // Tweak drag speed
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseup', handleMouseUpOrLeave);
    el.addEventListener('mouseleave', handleMouseUpOrLeave);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseup', handleMouseUpOrLeave);
      el.removeEventListener('mouseleave', handleMouseUpOrLeave);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hasInteracted]);

  // --- keep track of which slide is in view ---
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / boxWidth) % count;
      setCurrentIndex(idx);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [count, boxWidth]);

  // --- auto-cycle until first interaction ---
  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      // go to next, wrapping
      const next = (currentIndex + 1) % count;
      scrollToIndex(next);
    }, 5000);
    return () => clearInterval(id);
  }, [hasInteracted, currentIndex, count, boxWidth]);

  // --- scroll helpers ---
  const scrollToIndex = (idx) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: idx * boxWidth, behavior: 'smooth' });
  };

  const handleNext = () => {
    setHasInteracted(true);
    scrollToIndex((currentIndex + 1) % count);
  };
  const handlePrev = () => {
    setHasInteracted(true);
    scrollToIndex((currentIndex - 1 + count) % count);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${boxWidth}px`,
        // height: '20em',
        maxWidth: '80vw',
        margin: '3rem auto',
        padding: '1rem',
      }}
    >
      {/* ← Wrap-around Prev */}
      <button
        onClick={handlePrev}
        onMouseEnter={() => setPrevHover(true)}
        onMouseLeave={() => setPrevHover(false)}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translate(-20%, -50%)',
          zIndex: 1,
          fontSize: '1.25rem',
          backgroundColor: prevHover ? 'rgb(60,67,119)' : 'rgb(148,148,148)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          lineHeight: '0.9em',
          textAlign: 'center',
          padding: '20px',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
          boxShadow: prevHover ? '1px 1px 5px rgba(0,0,0,0.75)' : 'none',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: 'translate(-40%, -60%)',
          }}
        >
          ‹
        </span>
      </button>

      {/* scrollable carousel */}
      <div
        ref={ref}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          gap: '1rem',
          padding: '1rem',
          cursor: 'grab',
          width: '100%',
          borderRadius: '1.25rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          scrollbarWidth: 'none',
        }}
        className="hide-scrollbar"
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            style={{
              minWidth: `${boxWidth - 110}px`,
              maxWidth: `${boxWidth - 110}px`,
              flex: '0 0 auto',
              scrollSnapAlign: 'center',
              borderRadius: '0.75rem',
              boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.4)',
              background: 'rgba(205, 208, 214, 0.75)',
              height: boxHeight,
              maxHeight: '40em',
              // height: 'fit-content',
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'left',
              transition: 'box-shadow 0.3s',
              padding: '3rem',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* → Wrap-around Next */}
      <button
        onClick={handleNext}
        onMouseEnter={() => setNextHover(true)}
        onMouseLeave={() => setNextHover(false)}
        style={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translate(110%, -50%)',
          zIndex: 1,
          fontSize: '1.25rem',
          backgroundColor: nextHover ? 'rgb(60,67,119)' : 'rgb(148,148,148)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          lineHeight: '0.9em',
          textAlign: 'center',
          padding: '20px',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
          boxShadow: nextHover ? '1px 1px 5px rgba(0,0,0,0.75)' : 'none',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: 'translate(-40%, -60%)',
          }}
        >
          ›
        </span>
      </button>
    </div>
  );
}

export function SocialLink({ href, icon_path }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform duration-200 transform hover:scale-110 hover:shadow-lg"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${icon_path})`,
        height: '5rem',
        width: '5rem',
        display: 'inline-block',
        margin: '1em',
        borderRadius: '5px',
      }}
    />
  );
}




export function EmailIcon({ children, icon_path }) {
  const [hovered, setHovered] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState(null);

  // Tooltip offset in px
  const offset = { x: 24, y: 8 };
  const showTooltip = hovered || tooltipHovered;

  // Lock the tooltip position when showing
  const handleMouseEnter = (e) => {
    setHovered(true);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  // Do not update tooltipPos if tooltip is already visible
  const handleMouseMove = (e) => {
    if (!showTooltip) {
      setMouse({ x: e.clientX, y: e.clientY });
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTooltipPos(null);
  };

  return (
    <>
      <div
      className="transition-transform duration-200 transform hover:scale-110 hover:shadow-lg"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${icon_path})`,
        height: '5rem',
        width: '5rem',
        display: 'inline-block',
        margin: '1em',
        borderRadius: '5px',
          position: 'relative',
      }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
      {showTooltip && tooltipPos && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x + offset.x,
            top: tooltipPos.y + offset.y,
            zIndex: 10000,
            background: 'white',
            color: '#222',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            borderRadius: '8px',
            padding: '0.85em 1.25em',
            fontSize: '1em',
            pointerEvents: 'auto',
            maxWidth: 360,
            minWidth: 120,
            transition: 'opacity 0.2s',
            opacity: 0.98,
          }}
          onMouseEnter={() => setTooltipHovered(true)}
          onMouseLeave={() => setTooltipHovered(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}

export function ExpandingBox({ text, children, style, ...props }) {
  const [expanded, setExpanded] = useState(false);
  const boxRef = useRef(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    // Set initial height based on content
    if (expanded) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = '0px';
    }
  }, [expanded]);

  return (
    <div
      {...props}
      style={{
        margin: '1em auto',
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}
    >
      <h3
        onClick={toggleExpand}
        style={{
          fontSize: '2em',
          width: 'fit-content',
          padding: '1%',
          margin: 0,
          textAlign: 'center',
          fontWeight: 400,
          color : expanded ? 'rgba(0, 0, 128, 0.5)' : '#000',
          borderRadius: '0.5em',
          transition: 'color 0.3s',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {expanded ? "Collapse" : text}
      </h3>
      <div
        ref={boxRef}
        style={{
          overflow: 'hidden',
          transition: 'height 0.4s cubic-bezier(0.4,0.0,0.2,1)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {expanded && (
          <div style={{ padding: '1em', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function IntroAnimation({ children }) {
  const logoBlueText = 'Tate';
  const logoBlackText = 'Rowney';
  const waitTime = 12; // ticks before typing begins

  const [tick, setTick] = useState(0);
  const [slideOut, setSlideOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  // advance the animation frame
  useEffect(() => {
    if (hidden) return;

    const total = waitTime + logoBlueText.length + logoBlackText.length;

    if (tick <= total) {
      const id = setTimeout(() => {setTick(tick + 1)}, 100);
      return () => clearTimeout(id);
    }

    if (!slideOut) {
      setSlideOut(true);
      const id = setTimeout(() => {setHidden(true)}, 300);
      // return () => clearTimeout(id);
      return () => {}
    }
  }, [tick, hidden, slideOut]);

  let blue = '';
  let black = '';

  if (tick < waitTime) {
    black = Math.floor(tick / 4) % 2 === 0 ? '_' : '';
  } else if (tick < waitTime + logoBlueText.length) {
    black = '_';
    blue = logoBlueText.substring(0, tick - waitTime + 1);
  } else if (tick < waitTime + logoBlueText.length + logoBlackText.length) {
    blue = logoBlueText;
    black =
      logoBlackText.substring(0, tick - waitTime - logoBlueText.length + 1) +
      '_';
  } else {
    blue = logoBlueText;
    black = logoBlackText + "_";
  }

  return (
    <>
      {!hidden && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            transform: slideOut ? 'translateY(-100%)' : 'translateY(0)',
            opacity: slideOut ? 0 : 1,
            transition: 'transform 0.5s, opacity 0.5s',
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0 }}>
            <span
              style={{
                fontFamily: 'Courier New',
                fontSize: '10vw',
                backgroundColor: '#00007c',
                color: 'white',
                borderRadius: '5px',
                padding: '0 0.1em',
                display: blue ? 'inline' : 'none',
              }}
            >
              {blue}
            </span>
            <span
              style={{
                fontFamily: 'Courier New',
                fontSize: '10vw',
                color: 'black',
                marginLeft: blue ? '0.2rem' : 0,
              }}
            >
              {black}
            </span>
          </p>
        </div>
      )}
      <div
        style={{
          opacity: hidden ? 1 : 0,
          transition: 'opacity 1s',
        }}
      >
        {children}
      </div>
    </>
  );
}

import Image from 'next/image';

export function Project({ children, image_src, alt="" }) {
  const [isNarrow, setIsNarrow] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isNarrow ? 'column' : 'row',
        // alignItems: isNarrow ? 'center' : 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative',
        gap: '1rem',
        paddingTop: '1rem',
        paddingTop: '1rem',
      }}
    >
      <div style={{ width: '100%' }}>{children}</div>
      {image_src && (
        <img
          src={image_src}
          alt={alt}
          style={{
            width: isNarrow ? '100%' : '50%',
            height: 'auto',
            maxHeight: isNarrow ? '50%' : '100%',
            objectFit: 'contain',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: 'white'
          }}
        />
      )}
    </div>
  );
}

export function ContactList({ children }) {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const update = () => setNarrow(window.innerWidth < 700);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return <div
  style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  }}>
  <div
      style={{
          display: 'flex',
          flexDirection: 'row',
          gap: narrow ? '0.5rem' : '3rem',
          width: 'fit-content',
          margin: '0px',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%'
      }}
  >
    {children}
    </div>
  </div>
}