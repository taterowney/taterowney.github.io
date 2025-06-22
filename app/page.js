'use client';
import React from 'react';
import { Bookmark, Heading, TitleHeading, Topbar, Logo, NavItem, Spacer, Subheading, FadeContainer, ProjectCarousel, SocialLink } from './components.js';

export default function Page() {
    return <div>
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

            <Spacer height='12rem'/>
            <TitleHeading>
                Hi there!
            </TitleHeading>
            <TitleHeading>
                I'm Tate.
            </TitleHeading>

            <Bookmark id='about' />
            <Spacer height='8rem'/>
            <FadeContainer>
                <Subheading>
                    I'm a student researcher interested in math, data science, and AI.
                </Subheading>
                <Subheading>
                    More about me...
                </Subheading>
            </FadeContainer>

            <Bookmark id='projects' />
            <Spacer height='8rem'/>
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
            <Spacer height='8rem'/>
            <FadeContainer>
                <Heading>Contact Me</Heading>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', width:'40rem', alignContent: 'center', justifyContent: 'center', marginLeft: '20rem', marginRight: '40rem' }}>
                    <SocialLink href="https://github.com/taterowney" icon_path={'/github.png'} />
                    <SocialLink href="https://github.com/taterowney" icon_path={'/github.png'} />
                    <SocialLink href="https://github.com/taterowney" icon_path={'/github.png'} />
                </div>
            </FadeContainer>

            <Spacer height='20rem'/>
        </div>
}