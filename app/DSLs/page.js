'use client';

import { useEffect } from 'react';

const target = 'https://github.com/taterowney/ExternalComputationsInLean/';

export default function Redirect() {
  useEffect(() => {
    // Redirect to GitHub repository
    window.location.href = target;
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'futura-pt, sans-serif'
    }}>
      <h1>You're being redirected (bye!)</h1>
      <p>If you are not redirected automatically, please <a href={target}>click here</a>.</p>
    </div>
  );
}