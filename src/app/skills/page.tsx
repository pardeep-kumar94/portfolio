import Link from "next/link";
import "../globals.css"
import Pill from "@/components/pill";
import SkillCard from "@/components/shared/skillsCard";

const Header = () => {
    return (
        <>
        <Link className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" aria-hidden="true">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"></path>
                </svg>
                Pardeep Kumar
            </Link>
            <h1 className="font-sans font-bold text-5xl">My Skills</h1>
        </>
    )
}

const Projects = () => {
    const skills = [
       {title:'Programming languages', skills: [{name:'JavaScript', icon:'/images/js.svg'}, {name:'Java', icon:'/images/java.svg'}, {name:'Kotlin', icon:'/images/kotlin.svg'}, {name:'Swift', icon:'/images/swift.svg'}]},
       {title:'Mobile App Development', skills: [{name:'React Native', icon:'/images/react.svg'}, {name:'Android Native-Kotlin', icon:'/images/android.svg'}, {name:'iOS Native-Swift', icon:'/images/apple.svg'}]},
       {title:'Web Frontend', skills: [{name:'HTML', icon:'/images/html5.svg'}, {name:'CSS', icon:'/images/css3.svg'}, {name:'Tailwind CSS', icon:'/images/tailwind.svg'}, {name:'ReactJS', icon:'/images/react.svg'}, {name:'NextJS', icon:'/images/nextjs.svg'}]},
       {title:'Backend', skills: [{name:'NodeJs', icon:'/images/nodejs.svg'}, {name:'Express', icon:'/images/nodejs.svg'}]},
       {title:'Databases', skills: [{name:'Postgresql', icon:'/images/postgresql.svg'}]},
       {title:'Others', skills: [
            {name:'Git', icon:'/images/git.svg'},
            {name:'Firebase', icon:'/images/firebase.svg'},
            {name:'Redux', icon:'/images/redux.svg'},
        ]},
    ]

    return (
        <div className='flex flex-col h-screen pl-8 pt-8 pr-8 lg:pl-32 lg:pr-32 lg:pt-28'>
           <Header />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-0 lg:mt-10">
                   {skills.map((element, index)=> {
                    return (
                        <SkillCard key={index} title={element.title} skills={element.skills} />
                    )
                   })} 
            </div>
        </div>
    )
}



export default Projects;