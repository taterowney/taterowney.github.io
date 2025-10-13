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
        <h1>ImProver: An Agentic Formal Proof Optimizer</h1>
        
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
          We're very excited to present ImProver², a self-improving ML-based framework for improving the quality of proofs in formal mathematics. This is a big step up from my lab's original "ImProver" paper (which was sadly before my time); we've made some pretty drastic methodological changes to make ImProver more accurate, helpful, and accessible to mathematicians.
        </strong>
        
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
          We're still in the final stages of paper writing; it'll likely be on ArXiv soon, and submitted to ICML later this year.
        </strong>
        
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: '20px' }}>
          A draft of our abstract, for those interested:
        </strong>
        
        <i style={{ fontSize: '0.9em', display: 'block', marginBottom: '15px', textAlign: 'left' }}>
          The body of formalized mathematics has grown rapidly in recent years due to greater public interest and advances in usability, automation, and neurosymbolic methods. However, not all formal proofs are equally practical; significant effort is spent modifying proofs to fit various criteria, including brevity to help performance, modularity to increase maintainability, or readability to let others understand them. We aim to provide automation to assist with this process. Given the severe shortage of formal training data, one might also want to rewrite existing proofs for training purposes, not only to provide more data, but also to optimize that data with respect to the kinds of proofs we want models to generate.
        </i>
        
        <i style={{ fontSize: '0.9em', display: 'block', marginBottom: '15px', textAlign: 'left' }}>
          Previous work on rewriting proofs suffers from shortcomings. First, it relies on a commercial foundation model, so the training is slow, expensive, and opaque. Second, task-time performance was also slow and expensive, limiting its utility. Finally, the metrics used to evaluate the model are simplistic and not clearly aligned to user goals.
        </i>
        
        <i style={{ fontSize: '0.9em', display: 'block', textAlign: 'left' }}>
          To overcome these shortfalls, we introduce ImProver: a neurosymbolically augmented, bootstrapped RL pipeline that iteratively trains small language models (SLMs) to optimize research-grade Lean4 proofs against arbitrary user-defined metrics. Our system extracts formal signals (context, goals, dependencies) and leverages auto-informalized structure and related lemmas to guide proof search. We iterate this neurosymbolic search with a stable, high-throughput learning loop that mixes a weighted SFT variant with IRPO, outperforming standard SFT and DPO training loops. Integrated into an expert-iteration framework, ImProver self-improves from a cold start without external data or expert models; when available, distillation further boosts SLMs, enabling them to surpass much larger models on optimization tasks. We evaluate ImProver on real-world research-level proofs, and across both formal and informal optimization objectives -- length minimization, modularity maximization, dependency minimization, and readability maximization -— demonstrating robust and practical optimizations that assist in proof structure and overall library quality, additionally empirically showing that training simple neural theorem provers on such structure-optimized proofs yields significant downstream improvements, underscoring proof optimization as a key lever for scalable formal mathematics.
        </i>

        <strong style={{ fontSize: '1.1em', display: 'block', marginTop: '20px' }}>
          Many thanks to Riyaz for getting me involved in this amazing project; and to our advisors Dr. Sean Welleck, Dr. Jeremy Avigad, and Dr. Prasad Tetali.
        </strong>
      </div>
    </div>
  );
}