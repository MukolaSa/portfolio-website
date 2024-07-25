const header = document.querySelector("header")

const firstSkill = document.querySelector('.skill:first-child')
const skCounters = document.querySelectorAll('.counter span') 
const progressBars = document.querySelectorAll('.skills svg circle')

const mlSection = document.querySelector('.milestones')
const mlCounters = document.querySelectorAll('.number span')

const prt_section = document.querySelector('.portfolio')
const zoom_icons = document.querySelectorAll('.zoom-icon')
const modal_overlay = document.querySelector('.modal-overlay')
const images = document.querySelectorAll('.images img')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn') 

const links = document.querySelectorAll(".nav-link")


// --------------------------------------- Open & Close Navbar Menu -------------------------------------
const hamburger = document.querySelector(".hamburger")

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open")
    document.body.classList.toggle("stopScrolling")
})

links.forEach(link => link.addEventListener("click", () => {
    document.body.classList.remove("open")
    document.body.classList.remove("stopScrolling")
}))


window.addEventListener('scroll', () => {
    activeLink()
    if(!skillsPlayed) skillsCounter()
    if (!mlPlayed) mlCounter()
})

function updateCount(num, maxNum) {
    let currentNum = +num.innerText

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(()=> {
            updateCount(num, maxNum)
        }, 12)
    }
}
// липкий Navbar

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0) 
    console.log(window.pageYOffset > 0);
}

stickyNavbar()
window.addEventListener("scroll", stickyNavbar)



// Animation
let scroll = ScrollReveal({
    duration: 2500,
    distance: "60px",
})

scroll.reveal(".showcase-info", {delay: 600})
scroll.reveal(".showcase-image", {origin: "top", delay: 600})

// --------------------------------------- Skills Progress Animation -------------------------------------
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top

    if (window.innerHeight >= topPosition + el.offsetHeight)
    return true;
    return false;
}


let skillsPlayed = false

function skillsCounter() {
    if(!hasReached(firstSkill)) return;
    skillsPlayed = true

    skCounters.forEach((counter, i)=>{
        let target = +counter.dataset.target
        let strokeValue = 427 - 427 * (target / 100)

        progressBars[i].style.setProperty("--target", strokeValue)

    setTimeout(()=> {
        updateCount(counter, target)
    }, 400) 
    })

    progressBars.forEach(
        (p) => (p.style.animation = 'progress 2s ease-in-out forwards')
    );
}
// ------------------------------------------------ Other ------------------------------------------------

let mlPlayed = false
 
function mlCounter() {
    if(!hasReached(mlSection))
    return
    mlPlayed = true
    mlCounters.forEach((ctr)=>{
        let target = +ctr.dataset.target

        setTimeout(()=>{
            updateCount(ctr, target)
        }, 400)
    })
}

// ----------------------------------------- Portfolio Animation -----------------------------------------

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
})
// -------------------------------------------------------------------------------------------------------
let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () => {
    prt_section.classList.add("open")
    document.body.classList.add("stopScrolling")
     currentIndex = i;
     changeImage(currentIndex)
}))

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open")
    document.body.classList.remove("stopScrolling")
})

prevBtn.addEventListener('click', () => {
    if (currentIndex === 0) {
        currentIndex = 5
    } else {
        currentIndex--;
    }
    changeImage(currentIndex)
})

nextBtn.addEventListener('click', () => {
    if (currentIndex === 5) {
        currentIndex = 0
    } else {
        currentIndex++;
    }
    changeImage(currentIndex)
})

function changeImage(index) {
    images.forEach((img) => img.classList.remove("showImage"))
    images[index].classList.add('showImage')
}

// ---------------------------------------- Modal Pop Up Animation ---------------------------------------
const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

// ------------------------------------- Change Active Link On Scroll ------------------------------------
function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return { 
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter((sct) => sct.y <= 0)
    let currSectionID = passedSections.at(-1).id

    links.forEach((l) => l.classList.remove("active"))
    links[currSectionID].classList.add("active")
}

activeLink()