'use client';
// import React from 'react';
import { Bookmark, Heading, TitleHeading, Topbar, Logo, NavItem, Spacer, Subheading, FadeContainer, ProjectCarousel, SocialLink, ExpandingBox, EmailIcon, IntroAnimation, Project, ContactList } from './components.js';

export default function Page() {
    return <div

                style={{
                    backgroundImage: 'url(/background_light.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}>
            <IntroAnimation>
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
                            I'm a student researcher interested in math, data science, and AI.
                        </Subheading>
                        <ExpandingBox
                            text="More about me..."
                        >
                            <div style={{
                                marginLeft: '25%',
                                marginRight: '25%',
                            }}>
                                <p>
                                    I'm a second-year undergraduate at Carnegie Mellon University studying Mathematics and Artificial Intelligence. 
                                    My research is primarily focused on the use of machine learning in <a href="https://leanprover-community.github.io/#what-is-a-proof-assistant" target='_blank'>formal mathematics</a>, 
                                    where I work with CMU's <a href='https://cmu-l3.github.io/' target='_blank'>L3 Lab</a> and the <a href='https://www.cmu.edu/hoskinson/about/index.html' target='_blank'>Hoskinson Center</a> to invent and develop helpful AI tools for research mathematicians. 
                                    However, I enjoy science in all its forms, and have worked on projects ranging from AI safety to embedded systems engineering. A few of my projects are shown below. 
                                </p>
                                <p>
                                    I'm also in the CMU math department's Honors Program; I'm still working through prerequisite classes, but am currently getting a decent overview of analysis, measure theory, algebra, basic probability, and discrete math. 
                                    Additionally, I've had the chance to study some machine learning, theoretical computer science, basic systems/algorithm design, and functional programming. 
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
                            <Project image_src = '/OCR.gif' alt="Image Credit: ME">
                                <h3>Recognizing Handwritten Math Expressions</h3>
                                <p>
                                    Computer interpretation of handwritten math is a challenging problem due to the variablity in size and placement of many characters. I created and explored the viability of a novel computer-vision algorithm to solve this problem.
                                </p>
                                <a href="https://doi.org/10.55630/sjc.2023.17.107-116" target="blank">Read the paper</a>
                            </Project>
                            <Project image_src = '/ImProver.png' alt='Image Credit: Ahuja et al., "ImProver: Agent-Based Proof Optimization", https://arxiv.org/pdf/2410.04753'>
                                <h3>ImProving Formal Proofs</h3>
                                <p>
                                    Generative AI is flexible but unreliable, while code-based theorem provers are always correct but hard to use. By combining the strengths of each, my research group and I are creating a system to automatically optimize and clarify formal proofs, along with other tools and infrastructure to assist mathematicians. 
                                </p>
                                <a href="https://github.com/riyazahuja/ImProver" target="blank">Check out the ImProver repository</a>
                            </Project>
                            <Project image_src='/rocket.jpg' alt='Image Credit: Kaylie I think (Im not actually 100% sure who took this photo)'>
                                <h3>Shooting for the Stars</h3>
                                <p>
                                    What started as messing around out of curiosity one afternoon has turned into a year and counting working with the Carnegie Mellon Rocket Command, my school's competitive rocketry team. I've developed and implemented data collection, filtering, and control algorithms on embedded systems to keep our rocket on target as we demonstrate its capabilities to NASA. 
                                </p>
                                <a href="https://github.com/carnegie-mellon-rocket-command/Avionics-2025" target="blank">A bit of what we do</a>
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
                                    Myself and a co-author identified a new form of jailbreaking attack in large language models, and analyzed its effects on models' reasoning. Our paper has been accepted for publication at AAAI 2026. 
                                </p>
                                <a href="https://taterowney.com/jailbreak" target="blank">The latest on our paper</a>
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
                                <p>taterowney at gmail.com</p>
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