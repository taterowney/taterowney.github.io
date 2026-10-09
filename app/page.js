'use client';
import { useState } from 'react';
// import React from 'react';
import { Bookmark, Heading, TitleHeading, Topbar, Logo, NavItem, Spacer, Subheading, FadeContainer, ProjectCarousel, SocialLink, ExpandingBox, EmailIcon, IntroAnimation, Project, ContactList } from './components.js';
import { LorenzBackground } from './lorenz.js';

export default function Page() {
    const [introFinished, setIntroFinished] = useState(false);
    return <div>
            <LorenzBackground active={introFinished} />
            <IntroAnimation onFinished={() => setIntroFinished(true)}>
                <Topbar>
                    <Logo />
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                    <NavItem target_id={'about'}>
                        About Me
                    </NavItem>
                    <NavItem target_id={'projects'}>
                        Projects
                    </NavItem>
                    <NavItem target_id={'contact'}>
                        Contact
                    </NavItem>
                </Topbar>

                <Spacer height='3rem'/>
                <TitleHeading>
                    Hi there!
                </TitleHeading>
                <TitleHeading>
                    I'm Tate.
                </TitleHeading>

                <Bookmark id='about'>
                    <Spacer height='5rem'/>
                    <FadeContainer>
                        <Subheading>
                            I'm a student researcher interested in math, data science, and ML.
                        </Subheading>
                        <ExpandingBox
                            text="More about me..."
                        >
                            <div style={{
                                marginLeft: '25%',
                                marginRight: '25%',
                            }}>
                                <p>
                                    I'm a rising third-year undergraduate at Carnegie Mellon University studying Mathematics and Machine Learning. I am fortunate to be advised by <a href="https://www.andrew.cmu.edu/user/avigad/" target="_blank">Dr. Jeremy Avigad</a> and <a href="https://wellecks.com/" target="_blank">Dr. Sean Welleck</a>. 
                                    My research is primarily focused on the use of ML in <a href="https://leanprover-community.github.io/#what-is-a-proof-assistant" target='_blank'>formal mathematics</a>, 
                                    where I work with CMU's <a href='https://cmu-l3.github.io/' target='_blank'>L3 Lab</a> and <a href='https://icarm.io/' target='_blank'>The Institute for Computer-Aided Reasoning in Mathematics</a> to invent and develop helpful AI tools for research mathematicians. 
                                    However, I enjoy science in all its forms, and have worked on projects ranging from AI safety to embedded systems engineering. A few of my projects are shown below. 
                                </p>
                                <p>
                                    I'm also in the CMU math department's Honors Program; I've had the chance to go pretty deep into analysis and abstract algebra through the Math Studies sequence, as well as taking graduate courses in optimization and logic/automated reasoning.
                                    Additionally, I've also studied some applied machine learning, probability, theoretical computer science, basic systems/algorithm design, and functional programming. 
                                </p>
                                <p>In my free time, I love long-distance running, <a href='https://rocketcommand.org/' target="blank">amateur rocketry</a>, and reading.</p>
                            </div>
                        </ExpandingBox>
                        {/* <Subheading>
                            More about me...
                        </Subheading> */}
                    </FadeContainer>
                </Bookmark>

                <Spacer height='5rem'/>
                <Bookmark id='projects'>
                <Spacer height='1rem'/>

                    <FadeContainer>
                        <Heading>My Projects</Heading>
                        <Subheading>
                            I love creating things! Here are some projects I've worked on:
                        </Subheading>
                        <ProjectCarousel>
                            <Project image_src = '/ImProver.png' alt='Image Credit: Ahuja et al., "ImProver: Agent-Based Proof Optimization", https://arxiv.org/pdf/2410.04753'>
                                <h3>ImProving Formal Proofs</h3>
                                <p>
                                    Generative AI is flexible but unreliable, while code-based theorem provers are always correct but hard to use. By combining the strengths of each, my research group and I are creating a system to automatically optimize and clarify formal proofs, along with other tools and infrastructure to assist mathematicians. 
                                </p>
                                <a href="https://arxiv.org/abs/2605.22885" target="blank">Check out the preprint</a>
                            </Project>
                            <Project image_src = '/DSLean.png' alt='Image Credit: yours truly. I switched my VSCode to light mode for this one so I hope ur happy'>
                                <h3>Translating Into a Formal Language</h3>
                                <p>
                                    Interactive theorem provers such as Lean 4 check the correctness of mathematical proofs, but having it communicate with outside programs (solvers, computer algebra systems, unverified coding languages, you name it) is a challenging engineering problem. I created a tool to automatically translate between Lean and arbitrary external DSLs to allow outside programs to be used for proof automation in Lean.
                                </p>
                                <a href="https://doi.org/10.34727/2026/isbn.978-3-85448-093-8_16" target="blank">Take a look at the paper</a>
                            </Project>
                            <Project image_src='/SUDS.png' alt='Image Credit: MacOS screenshot tool (jk I literally made this)'>
                                <h3>Data Science for Social Good</h3>
                                <p>
                                    I've found that the most interesting applications of science are those with real-world impact. My team and I worked with the maintainers of Pittsburgh's public riverfront trails to analyze and predict traffic patterns to help maintainence and future expansion. 
                                </p>
                                <a href="https://suds-cmu.org/" target="blank">About our organization</a>
                            </Project>
                            <Project image_src="/jailbreak_figure.png" alt='Image Credit: Tate Rowney, Xuning Ying. "Distractor-Based Jailbreaking Attacks in Language Models and Associated Changes in Chain-of-Thought Content". AAAI 2026.'>
                                <h3>Jailbreaking Prevention for AI Safety</h3>
                                <p>
                                    Myself and a co-author identified a new form of jailbreaking attack in large language models, and analyzed its effects on models' reasoning. We presented out paper at AAAI 2026 in Singapore. 
                                </p>
                                <a href="https://doi.org/10.1609/aaai.v40i48.42273" target="blank">Read the details</a>
                            </Project>

                        </ProjectCarousel>
                    </FadeContainer>
                </Bookmark>

                <Bookmark id='contact'>
                    <Spacer height='6rem'/>
                    <FadeContainer>
                        <Heading>Contact Me</Heading>
                        <ContactList>
                            <EmailIcon icon_path={'/gmail.png'}>
                                <p><span>work</span> <span>at</span> <span>taterowney.com</span></p>
                            </EmailIcon>
                            <SocialLink href="https://github.com/taterowney" icon_path={'/github.png'} />
                            <SocialLink href="https://www.linkedin.com/in/taterowney/" icon_path={'/linkedin.png'} />
                        </ContactList>
                    </FadeContainer>
                </Bookmark>

                <Spacer height='30rem'/>
            </IntroAnimation>
        </div>
}