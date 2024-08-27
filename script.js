const nav = document.querySelector('nav')
const navLinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('section')

const navSelector = document.querySelector('.nav-selector')
let activeLink = document.querySelector('nav a.active')



function moveSelectorTo(link, eventType, prevHoveredLink) {
    const linkRect =link.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    navSelector.style.width = `${linkRect.width}px`;
    if((eventType === 'mouseover' || eventType === 'mouseout') 
        && !prevHoveredLink?.classList.contains('active'))  {
        navSelector.style.tranform = 'translateY(50%) scaleX(0.5)'
        setTimeout(() =>{
            navSelector.style.transform = 'translateY(50%) scaleX(1)'
        },400)
    }else if(eventType === "click" && link?.classList.contains('active')){
        navSelector.style.tranform = 'translateY(50%) scaleX(0.8)'
        setTimeout(() =>{
            navSelector.style.tranform = 'translateY(50%) scaleX(1)'
        },200)
    }else{
        navSelector.style.tranform = 'translateY(50%) scaleX(1)'
    }

    navSelector.style.left = `${linkRect.left - navRect.left}px`
    navSelector.style.height = `${linkRect.height}px`
}

navLinks.forEach(link => {
    link.addEventListener('mouseover', (mouseOverEvent) =>{
        moveSelectorTo(link, mouseOverEvent.type), link

        link.addEventListener('mouseout', () =>{
            moveSelectorTo(activeLink, this.event.type, link)
        })

    })

    link.addEventListener('click', (event) =>{
        activeLink.classList.remove('active')
        activeLink = event.target
        activeLink.classList.add('active')
        moveSelectorTo(activeLink, this.event.type)
    })

})

/*window.addEventListener('DOMContentLoaded', () => {
    moveSelectorTo(activeLink)
})*/
function setActiveLinkBasedOnUrlHash() {
    const currentHash = window.location.hash

    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'))
    }

    function setActiveLink(hash) {
        const targetLink = document.querySelector(`nav a[href="${hash}"]`)
        if(targetLink) {
            targetLink.classList.add('active')
            activeLink = targetLink

            moveSelectorTo(targetLink, 'scroll')
        }
    }

    if(currentHash) {
        removeActiveClass()
        setActiveLink(currentHash)
    } else {
        navLinks[0].classList.add('active')
        activeLink = navLinks[0]

        moveSelectorTo(navLinks[0], "scroll")
    }
}

window.addEventListener('hashchange', () => setActiveLinkBasedOnUrlHash())


window.addEventListener('DOMContentLoaded', () => {
    let scrollEffectTimeout
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                history.replaceState(null, null, `#${entry.target.id}`)
                clearTimeout(scrollEffectTimeout)
                scrollEffectTimeout =  setTimeout(() => {
                    setActiveLinkBasedOnUrlHash()
                }, 200)
            }
        })
    }, options)

    sections.forEach(section => observer.observe(section))
})

window.addEventListener('resize', () => setActiveLinkBasedOnUrlHash())
