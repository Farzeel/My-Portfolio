import { educationHistory } from "./educationObject.js"
import { portfolioProjects } from "./projectsObject.js"
import { skillsData } from "./skillsObject.js"

const techTag = [
"ALL" , "HTML & CSS", "JAVASCRIPT" ,"REACT & TYPESCRIPT" , "TAILWIND"  
]

const navBar = ["ABOUT" , "SKILLS" , "EDUCATION" , "PROJECTS"]
const mobileNav = ["ABOUT" , "SKILLS" , "EDUCATION" , "PROJECTS"]

let activeNav = navBar[0]
let mobileActiveNav = mobileNav[0]
let currImageIndex = 0

let filterProjects = []

let activeTag = "ALL"

const techBar = document.querySelector(".tech-bar")
const projectscards = document.querySelector(".projectscards")
const eduTimeline = document.querySelector(".eduTimeline")
const navbar = document.querySelector("nav")
const navbarLink = document.querySelectorAll("nav a")
const allSections = document.querySelectorAll(".rightSide div")
const mobileNavbar = document.querySelector("#mobile-navbar nav")
const topNavbar = document.querySelector("#navbar")
const skillGrid = document.querySelector(".skillGrid")

function renderNav(){
    navbar.innerHTML = " "

navBar.map(nav=>(
    navbar.innerHTML +=`
<a  class="${nav.toLocaleLowerCase()===activeNav.toLocaleLowerCase()?"active":''}" href="#${nav.toLocaleLowerCase()}" class="">${nav}</a>`
))

}

function renderTags(){
  
    techBar.innerHTML = " "
   for (let index = 0; index < techTag.length; index++) {
    const span = document.createElement("span")
    span.innerText = techTag[index]
    span.classList.add("tech-tag")
    if(techTag[index]===activeTag){
        
        span.classList.add("active")
    }

    techBar.append(span)
    
   }
   
}

function renderMobileNav(){
    mobileNavbar.innerHTML = " "

    mobileNav.map((nav,index)=>(
        mobileNavbar.innerHTML +=`
    <a  class="icon-link ${nav.toLocaleLowerCase()===mobileActiveNav.toLocaleLowerCase()?"active-icon":''}" href="#${nav.toLocaleLowerCase()}" class="">${index<=1?nav:index==2?nav.slice(0,3):nav.slice(0,4)}</a>`
    ))
}
renderMobileNav()

function renderSkills(){
    skillGrid.innerHTML = " "

    skillsData.map(skill=>(
        skillGrid.innerHTML +=`
        <div class="items">
        <img src="${skill.iconUrl}" alt="" />
        <p>${skill.name}</p>
      </div>
     
        `
     
             ))
}

function renderEducation(){
    eduTimeline.innerHTML = " "

   educationHistory.map(edu=>(
    eduTimeline.innerHTML +=`
    <div class="eduDetail">
              <p class="year">${edu.yearRange}</p>
              <h2 class="degree">${edu.degree}</h2>
              <p class="institute">${edu.institute}</p>
              <p class="location">${edu.location}</p>
              <p class="status">Status: ${edu.status}</p>
              <div class="focused-container">
              ${edu.focusedStudies.map(sub=>(
                `<p class="focused">
                 ${sub}
              </p>`
              )).join("")}
              </div>

              <div class="circle ${edu.status=="In Progress"? 'bgYellow':'bgGreen'}"></div>
            </div>
    `
    
            ))
            eduTimeline.innerHTML +=`<div class="liner"></div>`

}



function renderProjectCards(){
    let projectsToDisplay;
    projectscards.innerHTML = " "
    if (activeTag == "ALL") {
         projectsToDisplay = portfolioProjects;
    } else {
        projectsToDisplay = filterProjects;
    }
    projectsToDisplay.forEach((proj , i)=>{
    
    projectscards.innerHTML +=`
    <div class="project">
            
                <img class = "slide-image" src="${proj.thumbnailUrl[currImageIndex]}" alt="${proj.title}"  />
           
            
              <div class="card">
               
                <h3 class="landing">${proj.title}</h3>
            
             
                <p class="tagline">${proj.tagline}</p>
            
                <p class="description">
                ${proj.shortDescription}
                </p>
            
              
                <div class="tags">
                ${proj.technologies.map(tech=>(
                `<span>${tech}</span>`
                )).join("")}
                </div>
            
               
                <div class="links">
                 ${proj.liveDemo ? `<a href="${proj.liveDemoUrl}"  target="_blank">Live Demo</a>`:""}
                  <a href=${proj.githubRepoUrl} target="_blank">GitHub</a>
                </div>
              </div>
            </div>`
                })

}
function handleActiveTag(e){
    activeTag = e.target.innerText
    if(activeTag=="REACT & TYPESCRIPT"){
        filterProjects = portfolioProjects.filter(proj => 
            proj.technologies.includes("React") && 
            proj.technologies.includes("Typescript")
        );
    }
    else if(activeTag=="HTML & CSS"){
        filterProjects = portfolioProjects.filter(proj => 
            proj.technologies.includes("HTML") && 
            proj.technologies.includes("CSS")
        );
    }
    else if(activeTag=="JAVASCRIPT"){
        filterProjects = portfolioProjects.filter(proj => 
            proj.technologies.includes("JavaScript") 
        );
    }
    else if(activeTag=="TAILWIND"){
        filterProjects = portfolioProjects.filter(proj => 
            proj.technologies.includes("Tailwind") 
        );
    }
    renderTags()
    renderProjectCards()
    
}
// function handleActiveMobileTag(e){
//     activeTag = e.target.innerText
//     renderTags()
    
// }
function handleActiveNav(e){
    activeNav = e.target.innerText
   renderNav()
    
}


const observerCallBack=((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
         let currentId = entry.target.id
         console.log(currentId)
         const targetNav = document.querySelector(`nav a[href="#${currentId}"]`)
         console.log(targetNav)

         if(targetNav){
            activeNav = currentId
            mobileActiveNav = currentId
            renderNav()
            renderMobileNav()
         }
        }
    })
})


techBar.addEventListener("click",handleActiveTag)
navbar.addEventListener("click",handleActiveNav)


const observerOptions = {
    root: null, 
    rootMargin: '0px 0px -70% 0px', 
    threshold: 0.0 
};


const observer = new IntersectionObserver(observerCallBack, observerOptions);

allSections.forEach(sec=>{
    observer.observe(sec)
})

renderNav()
renderTags()
renderSkills()
renderEducation()
renderProjectCards()