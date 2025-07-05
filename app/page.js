'use client';
import React from 'react';
import { Bookmark, Heading, TitleHeading, Topbar, Logo, NavItem, Spacer, Subheading, FadeContainer, ProjectCarousel, SocialLink, ExpandingBox, EmailIcon, IntroAnimation } from './components.js';

// TODOs:
// - Current navbar item highlighted
// - 

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
                    <br />
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

                <Bookmark id='about' />
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
                            <p>In my free time, I love long-distance running, <a href='https://rocketcommand.org/'>amateur rocketry</a>, and reading.</p>
                        </div>
                    </ExpandingBox>
                    {/* <Subheading>
                        More about me...
                    </Subheading> */}
                </FadeContainer>

                <Bookmark id='projects' />
                <Spacer height='6rem'/>
                <FadeContainer>
                    <Heading>My Projects</Heading>
                    <Subheading>
                        I love creating things! Here are some projects I've worked on:
                    </Subheading>
                    <ProjectCarousel>
                        <div>
                            <h3>Project 1</h3>
                            <p>Description of project 1.</p>
                        </div>
                        <div>
                            <h3>Project 2</h3>
                            <p>Description of project 2.</p>
                        </div>
                        <div>
                            <h3>Project 3</h3>
                            <p>Description of project 3.</p>
                        </div>
                    </ProjectCarousel>
                </FadeContainer>

                <Bookmark id='contact' />
                <Spacer height='6rem'/>
                <FadeContainer>
                    <Heading>Contact Me</Heading>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '1rem',
                                width: 'fit-content',
                                margin: '0px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '80%'
                            }}
                        >
                            <EmailIcon icon_path={'/gmail.png'}>
                                <p>taterowney at gmail.com</p>
                            </EmailIcon>
                            <SocialLink href="https://github.com/taterowney" icon_path={'/github.png'} />
                            <SocialLink href="https://www.linkedin.com/in/taterowney/" icon_path={'/linkedin.png'} />
                        </div>
                    </div>
                </FadeContainer>

                <Spacer height='20rem'/>
            </IntroAnimation>
        </div>
}