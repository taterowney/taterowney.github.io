'use client';

export default function PaperStatus() {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '40px',
      minHeight: '100vh',
      fontFamily: 'futura-pt, sans-serif'
    }}>
      <div style={{
        width: '75%',
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <h1>Distractor-Based Jailbreaking Attacks in Language Models and Associated Changes in Chain-of-Thought Content</h1>
        
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
        Although not exactly my main area of expertise, I nevertheless had the pleasure of doing some research in AI safety, particularly in the area of jailbreaking attacks on large language models. This originally grew out of a project from the Carnegie AI Safety Initiative club. 
        </strong>
                
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
          The paper is currently submitted to and under review by AAAI (wish us luck!). Please check back here for updates once it's published. Our abstract is as follows:
        </strong>
        
        <i style={{ fontSize: '0.9em', display: 'block', marginBottom: '15px', textAlign: 'left' }}>
          We identify a jailbreaking vulnerability in multiple open-source LLMs: by augmenting dangerous requests using certain "distractors" to obfuscate their intent, we elicit specific, actionable responses on a wide variety of harmful topics. We find that such an attack noticeably alters the contents of these models' chains of thought, including changed frequencies of seemingly unrelated n-grams and heightened ethical scrutiny about harmful requests even when their response is ultimately jailbroken. 
        </i>

        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
            Also, big shoutout to my co-author Ningning, as well as Ida Mattson for advising us on this project!
        </strong>
      </div>
    </div>
  );
}