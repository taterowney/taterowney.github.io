export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: 'rgba(255,255,255,0.8)',
          fontFamily: 'Futura PT, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
        }}
      >
        {children}
      </body>
    </html>
  );
}
