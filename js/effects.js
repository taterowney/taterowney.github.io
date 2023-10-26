// when elements are just peeking out from the bottom of the screen, their opacity is reduced
// This helps to direct the viewer's attention to one thing at a time without doing annoying things with scrolling
function update_opacity() {
    let elems = document.getElementById("content").getElementsByTagName("*");
    const fade_in_dist = 0.2
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].style.display != "fixed") {
            if ((window.innerHeight - elems[i].getBoundingClientRect().bottom) > 0) {
                if ((window.innerHeight - elems[i].getBoundingClientRect().bottom) < window.innerHeight*fade_in_dist) {
                    elems[i].style.opacity = ((window.innerHeight - elems[i].getBoundingClientRect().bottom)/(window.innerHeight*fade_in_dist))*0.7 + 0.3;
                }
                else {
                    elems[i].style.opacity = 1;
                }
            }
            else {
                elems[i].style.opacity = 0.3;
            }
        }
    }
}


// add functionality to the buttons on the topbar
// each button should have an id, and there should be another element somewhere in the content with id "*button id*-target" for each one
window.addEventListener('load', () => {
    const buttons = document.getElementsByClassName("nav-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            document.getElementById(buttons[i].id + "-target").scrollIntoView({behavior:"smooth", block:"center", inline:"center"});
        })
    }
})

if (window.innerHeight > 700) {
    window.addEventListener('load', update_opacity);
    window.addEventListener('scroll', update_opacity);
}

// update the coloring of the nav buttons when the appropriate section is in view
window.addEventListener('scroll', () => {
    const buttons = document.getElementsByClassName("nav-button");
    for (let i = buttons.length-1; i > -1; i--) {
        if (document.getElementById(buttons[i].id + "-target").getBoundingClientRect().top < (window.innerHeight/2)) {
            if (!(buttons[i].classList.contains("topbar-active"))) {
                document.getElementsByClassName("topbar-active")[0].classList.remove("topbar-active");
                buttons[i].classList.add("topbar-active");
            }
            return;
        }
    }
})


// helper for the navigation for project images
function animation_orientation(objs, direction) {
    let old_dir;
    if (direction == "right") {
        old_dir = "left";
    }
    else {
        old_dir = "right";
    }
    for (let i=0; i < objs.length; i++) {
        objs[i].classList.remove("flip-in-ver-"+old_dir);
        objs[i].classList.add("flip-in-ver-"+direction)
    }
}

// Could this have been done with React? maybe
// Did I have the patience to wait to do this until I had internet? no
function flip_next(objs) {
    for (let i=0; i < objs.length; i++) {
        if (objs[i].classList.contains("current")) {
            let next;
            if (i==objs.length-1) {
                next = 0;
            }
            else {
                next = i+1
            }
        objs[i].classList.remove("flip-in-ver-right");
        objs[i].classList.remove("flip-in-ver-left");
        objs[i].classList.remove("flip-out-ver-right");
        objs[i].classList.add("flip-out-ver-left");
        window.setTimeout(() => {
            objs[i].classList.remove("current");
            objs[next].classList.add("current");
            objs[next].classList.remove("flip-out-ver-right");
            objs[next].classList.remove("flip-out-ver-left");
            objs[next].classList.remove("flip-in-ver-right");
            objs[next].classList.add("flip-in-ver-left");
        }, 450);
        }
    }
}

function flip_prev(objs) {
    for (let i=0; i < objs.length; i++) {
        if (objs[i].classList.contains("current")) {
            let next;
            if (i==0) {
                next = objs.length-1;
            }
            else {
                next = i-1
            }
        objs[i].classList.remove("flip-in-ver-right");
        objs[i].classList.remove("flip-in-ver-left");
        objs[i].classList.remove("flip-out-ver-left");
        objs[i].classList.add("flip-out-ver-right");
        window.setTimeout(() => {
            objs[i].classList.remove("current");
            objs[next].classList.add("current");
            objs[next].classList.remove("flip-out-ver-right");
            objs[next].classList.remove("flip-out-ver-left");
            objs[next].classList.remove("flip-in-ver-left");
            objs[next].classList.add("flip-in-ver-right");
        }, 450);
        }
    }
}


function auto_flip_next() {
    if (!window.navButtonsClicked) {
        flip_next(document.getElementsByClassName("project-img"));
        flip_next(document.getElementsByClassName("project-caption"));
        window.setTimeout(() => {auto_flip_next()}, 5000);
    }
}


// add functionality to the project image navigation buttons
window.addEventListener('load', () => {
//    window.setTimeout(() => {document.getElementById("popup-slide-in").classList.add("popup-slide-in")}, 100);

    const buttons = document.getElementsByClassName("project-image-nav-button");
    window.navButtonsClicked = false;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            window.navButtonsClicked = true;
            if (buttons[i].id.includes("next")) {
                flip_next(document.getElementsByClassName("project-img"));
                flip_next(document.getElementsByClassName("project-caption"));
            }
            else {
                flip_prev(document.getElementsByClassName("project-img"));
                flip_prev(document.getElementsByClassName("project-caption"));
            }
        })
    }
    window.setTimeout(() => {auto_flip_next()}, 5000);
});

function toggle_expand(obj) {
    const to_expand = document.getElementById(obj.id + "-expand");
    console.log(to_expand);
    if (to_expand.classList.contains("expanded")) {
        to_expand.classList.remove("expanded");
        obj.innerHTML = "More about me...";
    }
    else {
        to_expand.classList.add("expanded");
        obj.innerHTML = "Collapse";
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight") {
        flip_next(document.getElementsByClassName("project-img"));
        flip_next(document.getElementsByClassName("project-caption"));
        window.navButtonsClicked = true;
    }
    else if (event.key == "ArrowLeft") {
        flip_prev(document.getElementsByClassName("project-img"));
        flip_prev(document.getElementsByClassName("project-caption"));
        window.navButtonsClicked = true;
    }
});
