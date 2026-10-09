'use client';
import React, { useRef, useEffect } from 'react';

// Lorenz system parameters and integration
const SIGMA = 10, RHO = 35, BETA = 8 / 3;
const DT = 0.002;            // RK4 step (system time)
const SIM_RATE = 0.35;       // system time traced per second of real time
// The orbit leaves START, beside the right-hand fixed point, as a spiral too tight to see, so
// SKIP_STEPS of it are run before drawing begins. Every cycle retraces the same drawing: out of
// the right lobe, across to fill the left, then back and forth between the two.
// The orbit is chaotic: changing START, SKIP_STEPS or DT changes the whole drawing.
const START = [-9.430404571390467, -9.521904571390467, 34];
const SKIP_STEPS = 7000;
const TOTAL_STEPS = 42000;   // steps traced per cycle (84 units of system time, 4 minutes)

const HOLD_MS = 20000;       // pause on the finished drawing
const FADE_MS = 4000;        // fade out before the next trace

// Camera, fitted to public/lorenz_attractor_red.png: an affine projection of Lorenz
// coordinates (about z = 34) with perspective, in fractions of a square box.
const CAM_X = [-0.0172, 0.00642, 0.01139];
const CAM_Y = [0.01025, 0.00544, 0.00047];
const CAM_DEPTH = [-0.01013, 0.00015, 0.00182];
const CAM_CENTER = [0.5, 0.589];

const BOX_FRACTION = 1.0;    // box side relative to the smaller viewport dimension
const LINE_WIDTH = 0.0009;   // base line width, as a fraction of the box
const GLOW_SCALE = 0.5;      // glow canvas resolution relative to CSS pixels
const GLOW_LAYERS = [[0.07, 0.05], [0.04, 0.07], [0.018, 0.09]]; // [width as a box fraction, alpha]
const GLOW_OPACITY = 0.1;    // the glow canvas saturates where loops pile up; this caps how strong that gets
const GLOW_STRETCH = 0.02;   // path length (box fraction) stroked into the glow at a time
const MAX_DPR = 2;
// the vertical grey gradient of the old background image, sampled from background_light.png
const BACKGROUND = 'linear-gradient(to bottom, rgb(248,248,248), rgb(243,243,243) 13%, rgb(235,234,234) 26%, '
  + 'rgb(222,222,222) 39%, rgb(208,207,207) 52%, rgb(191,191,191) 65%, rgb(173,171,172) 78%, '
  + 'rgb(151,150,150) 91%, rgb(137,136,136))';

// Drawn dark and shown through a mostly transparent canvas, so the lines read as a light grey on
// the pale top of the background and stay a shade darker than it further down.
const LINE_COLOR = 'rgb(70, 70, 70)';
const LINE_OPACITY = 0.25;

function derivative(x, y, z, out) {
  out[0] = SIGMA * (y - x);
  out[1] = x * (RHO - z) - y;
  out[2] = x * y - BETA * z;
}

// Draws nothing until `active` is true, so the trace can wait for the intro animation.
export function LorenzBackground({ active = true }) {
  const wrapRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const wrap = wrapRef.current;
    const lineCanvas = lineRef.current, glowCanvas = glowRef.current;
    const line = lineCanvas.getContext('2d'), glow = glowCanvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // projected trace for the current cycle, kept so a resize can redraw it
    const px = new Float32Array(TOTAL_STEPS + 1), py = new Float32Array(TOTAL_STEPS + 1);
    const widths = new Float32Array(TOTAL_STEPS + 1);
    let count = 0;
    const state = [0, 0, 0];
    const k1 = [0, 0, 0], k2 = [0, 0, 0], k3 = [0, 0, 0], k4 = [0, 0, 0];

    const record = () => {
      const [x, y, z] = state;
      const zc = z - 34;
      const w = 1 / (1 + CAM_DEPTH[0] * x + CAM_DEPTH[1] * y + CAM_DEPTH[2] * zc);
      px[count] = CAM_CENTER[0] + w * (CAM_X[0] * x + CAM_X[1] * y + CAM_X[2] * zc);
      py[count] = CAM_CENTER[1] - w * (CAM_Y[0] * x + CAM_Y[1] * y + CAM_Y[2] * zc);
      // nearer loops are drawn thicker
      widths[count] = Math.min(1.7, Math.max(0.55, w * w));
      count++;
    };

    const advance = () => {
      const [x, y, z] = state;
      derivative(x, y, z, k1);
      derivative(x + DT / 2 * k1[0], y + DT / 2 * k1[1], z + DT / 2 * k1[2], k2);
      derivative(x + DT / 2 * k2[0], y + DT / 2 * k2[1], z + DT / 2 * k2[2], k3);
      derivative(x + DT * k3[0], y + DT * k3[1], z + DT * k3[2], k4);
      for (let i = 0; i < 3; i++) state[i] += DT / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    };

    const step = () => {
      advance();
      record();
    };

    // back to the start of the drawing
    const reset = () => {
      for (let i = 0; i < 3; i++) state[i] = START[i];
      for (let i = 0; i < SKIP_STEPS; i++) advance();
      count = 0;
      glowFrom = 0;
      glowLength = 0;
      record();
    };

    // layout: a square box centered in the viewport
    let box = 0, left = 0, top = 0, dpr = 1, lastW = 0, lastH = 0;

    const drawSegment = (i) => {
      line.lineWidth = Math.max(0.3, box * LINE_WIDTH * widths[i]);
      line.beginPath();
      line.moveTo(left + box * px[i - 1], top + box * py[i - 1]);
      line.lineTo(left + box * px[i], top + box * py[i]);
      line.stroke();
    };

    // The glow is stroked a stretch at a time: single steps are shorter than a glow-canvas
    // pixel, and at these alphas they would round away to nothing.
    let glowFrom = 0, glowLength = 0;
    const drawGlow = (i, flush) => {
      glowLength += Math.hypot(px[i] - px[i - 1], py[i] - py[i - 1]);
      if (glowLength < GLOW_STRETCH && !flush) return;
      glow.beginPath();
      glow.moveTo(left + box * px[glowFrom], top + box * py[glowFrom]);
      for (let j = glowFrom + 1; j <= i; j++) glow.lineTo(left + box * px[j], top + box * py[j]);
      for (const [width, alpha] of GLOW_LAYERS) {
        glow.globalAlpha = alpha;
        glow.lineWidth = box * width;
        glow.stroke();
      }
      glowFrom = i;
      glowLength = 0;
    };

    const drawTo = (i) => {
      drawSegment(i);
      drawGlow(i, i === TOTAL_STEPS);
    };

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      // ignore the small height changes from mobile browser chrome showing and hiding
      if (w === lastW && Math.abs(h - lastH) < 120) return;
      lastW = w; lastH = h;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      box = Math.min(w, h) * BOX_FRACTION;
      left = (w - box) / 2;
      top = (h - box) / 2;
      lineCanvas.width = Math.round(w * dpr);
      lineCanvas.height = Math.round(h * dpr);
      glowCanvas.width = Math.round(w * GLOW_SCALE);
      glowCanvas.height = Math.round(h * GLOW_SCALE);
      // sized in pixels so the ignored height changes don't stretch the drawing
      for (const canvas of [lineCanvas, glowCanvas]) {
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      line.setTransform(dpr, 0, 0, dpr, 0, 0);
      glow.setTransform(GLOW_SCALE, 0, 0, GLOW_SCALE, 0, 0);
      line.lineCap = 'round';
      glow.lineCap = 'butt';
      glow.lineJoin = 'round';
      line.strokeStyle = LINE_COLOR;
      glow.strokeStyle = LINE_COLOR;
      glowFrom = 0;
      glowLength = 0;
      for (let i = 1; i < count; i++) drawTo(i);
    };

    let frame = 0, timer = 0, lastTime = 0, pending = 0;

    const tick = (now) => {
      // clamp so a backgrounded tab doesn't catch up in one burst
      pending += Math.min(now - lastTime, 100) / 1000 * SIM_RATE;
      lastTime = now;
      while (pending >= DT && count <= TOTAL_STEPS) {
        step();
        drawTo(count - 1);
        pending -= DT;
      }
      if (count <= TOTAL_STEPS) {
        frame = requestAnimationFrame(tick);
      } else {
        // finished: stop drawing entirely, then fade out and trace it again
        timer = setTimeout(() => {
          wrap.style.opacity = 0;
          timer = setTimeout(restart, FADE_MS);
        }, HOLD_MS);
      }
    };

    const start = () => {
      reset();
      pending = 0;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const restart = () => {
      line.clearRect(0, 0, lastW, lastH);
      glow.clearRect(0, 0, lastW, lastH);
      wrap.style.opacity = 1;
      // leave time for the fade back in to settle before drawing on an empty canvas
      timer = setTimeout(start, 50);
    };

    resize();
    if (reducedMotion) {
      reset();
      while (count <= TOTAL_STEPS) {
        step();
        drawTo(count - 1);
      }
    } else {
      start();
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  const canvasStyle = { position: 'absolute', top: 0, left: 0 };

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: BACKGROUND,
      }}
    >
      <div ref={wrapRef} style={{ ...canvasStyle, width: '100%', height: '100%', overflow: 'hidden', transition: `opacity ${FADE_MS}ms ease` }}>
        <canvas ref={glowRef} style={{ ...canvasStyle, opacity: GLOW_OPACITY }} />
        <canvas ref={lineRef} style={{ ...canvasStyle, opacity: LINE_OPACITY }} />
      </div>
    </div>
  );
}
