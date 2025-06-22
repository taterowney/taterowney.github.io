import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback, HTMLAttributes } from 'react';


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
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '15vh',
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          padding: '0 10%',
          boxShadow: '0px 2px 2px 1px rgba(0,0,0,0.2)',
          transition: 'opacity 0.25s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          }}
      >
        {children}
      </div>
      {/* spacer */}
      <div style={{ height: '15vh' }} />
    </>
  );
}


export function Logo() {
  return <p>
    <span style={{
      fontSize: '2rem',
      backgroundColor: '#00007c',
      fontFamily: 'Courier New',
      borderRadius: '5px',
      color: 'white',
      paddingRight: '0.1rem',
      paddingLeft: '0.1rem',
      marginRight: '0.4rem',
      fontWeight: 'bold',
      float: 'left',
    }}>Tate</span>
    <span style={{
      fontSize: '2rem',
      fontFamily: 'Courier New',
      paddingRight: '0rem',
      paddingLeft: '0rem',
      margin: '0px',
      color: 'black',
      fontWeight: 'bold',
      float: 'left',
    }}
    > Rowney_</span>
  </p>
}

export function NavItem({ children, target_id, style, ...props }) {
  const [hover, setHover] = useState(false);

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
        color: hover ? 'white' : '#00007c',
        cursor: 'pointer',
        padding: '0 1rem',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
        fontSize: hover ? '1.2em' : '1em',
        backgroundColor: hover ? '#00007c' : 'transparent',
        transition:
          'color 0.5s ease, background-color 0.5s ease, font-size 0.5s ease, transform 0.3s ease',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        userSelect: 'none',
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
        marginLeft: '5%',
        marginTop: '5%',
        width: '100%',
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
        marginLeft: '5%',
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



const BOX_WIDTH = 600; // px: approximate width for each project

export function ProjectCarousel({ children }) {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [prevHover, setPrevHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const count = React.Children.count(children);

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
      const idx = Math.round(el.scrollLeft / BOX_WIDTH) % count;
      setCurrentIndex(idx);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [count]);

  // --- auto-cycle until first interaction ---
  useEffect(() => {
    if (hasInteracted) return;
    const id = setInterval(() => {
      // go to next, wrapping
      const next = (currentIndex + 1) % count;
      scrollToIndex(next);
    }, 5000);
    return () => clearInterval(id);
  }, [hasInteracted, currentIndex, count]);

  // --- scroll helpers ---
  const scrollToIndex = (idx) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: idx * BOX_WIDTH, behavior: 'smooth' });
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
        width: `${BOX_WIDTH}px`,
        maxWidth: '80vw',
        margin: '3rem auto',
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
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          fontSize: '1.25rem',
          backgroundColor: prevHover ? 'rgb(60,67,119)' : 'rgb(148,148,148)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '0.9em',
          height: '0.9em',
          lineHeight: '0.9em',
          textAlign: 'center',
          padding: '0.9em',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
          boxShadow: prevHover ? '1px 1px 5px rgba(0,0,0,0.75)' : 'none',
          cursor: 'pointer',
        }}
      >
        ‹
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
          background: 'white',
          scrollbarWidth: 'none',
        }}
        className="hide-scrollbar"
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            style={{
              minWidth: `${BOX_WIDTH}px`,
              maxWidth: `${BOX_WIDTH}px`,
              flex: '0 0 auto',
              scrollSnapAlign: 'center',
              borderRadius: '0.75rem',
              boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.4)',
              background: 'rgba(247,249,252,1)',
              maxHeight: '15em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 0.3s',
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
          transform: 'translate(50%, -50%)',
          zIndex: 1,
          fontSize: '1.25rem',
          backgroundColor: nextHover ? 'rgb(60,67,119)' : 'rgb(148,148,148)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '0.9em',
          height: '0.9em',
          lineHeight: '0.9em',
          textAlign: 'center',
          padding: '0.9em',
          transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
          boxShadow: nextHover ? '1px 1px 5px rgba(0,0,0,0.75)' : 'none',
          cursor: 'pointer',
        }}
      >
        ›
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