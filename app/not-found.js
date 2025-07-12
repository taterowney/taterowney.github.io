'use client';
import { useState } from 'react';

export default function FourOhFour() {
    const [clicked, setClicked] = useState(false);

    return (
      <main style={{
        marginLeft: '5%',
    }} className="grid place-items-center h-screen ml-16">
        <h1>404 Page/resource not found :(</h1>
        <p>Here's a goose to cheer your up <span style={{cursor: 'pointer'}} onClick={() => setClicked(true)}>🪿</span></p>
        {clicked && <span style={{fontSize: '10em'}}>honk</span>}
      </main>
    );
  }