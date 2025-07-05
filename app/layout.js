export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kll8mmd.css" />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: 'rgba(255,255,255,0.8)',
          fontFamily: 'futura-pt, sans-serif',
          fontWeight: 300,
          fontSize: '16px',
        }}
      >
        {children}
      </body>
    </html>
  );
}
