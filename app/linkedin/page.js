'use client';

import { useEffect } from 'react';

export default function Redirect() {
  useEffect(() => {
    // Redirect to LinkedIn profile
    window.location.href = 'https://www.linkedin.com/in/taterowney/';
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
      <p>If you are not redirected automatically, please <a href="https://www.linkedin.com/in/taterowney/">click here</a>.</p>
    </div>
  );
}