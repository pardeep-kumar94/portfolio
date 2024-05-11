import Link from "next/link";
import "../globals.css"
import Pill from "@/components/pill";

const Header = () => {
    return (
        <>
        <Link className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" aria-hidden="true">
                    <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"></path>
                </svg>
                Pardeep Kumar
            </Link>
            <h1 className="font-sans font-bold text-5xl">All Projects</h1>
        </>
    )
}

const Projects = () => {

    const projectsTable = [
        {
            year: "2024", 
            project: "Foxy App",
            links:"",
        },
        {
        year: "2024", 
        project: "Foxy App",
        links:"",
    }, {
        year: "2024", 
        project: "Foxy Web",
        links:"",
    },{
        year: "2023", 
        project: "Foxy SDK",
        links:"",
    },{
        year: "2012", 
        project: "Blow to Lock",
        links:"",
    }, {
        year: "2012", 
        project: "Blow to Lock",
        links:"",
    },{
        year: "2012", 
        project: "Blow to Lock",
        links:"",
    }]


    return (
        <div className='flex flex-col h-screen pl-8 pt-8 pr-8 lg:pl-32 lg:pr-32 lg:pt-28 '>
           <Header />
            <table className="mt-10 mt-12 w-full border-collapse text-left">
                <tr className="border-b border-slate-300/10 last:border-none">
                    <th className="py-4 pr-4 align-top text-sm">
                        Year
                    </th>
                    <th className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                        Project Name
                    </th>
                    <th className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                        Link
                    </th>
                </tr>


                {projectsTable.map((element,index)=> {
                    return (
                        <tr className="border-b border-slate-300/10 last:border-none" key={index}>
                            <td className="py-4 pr-4 align-top text-sm">{element.year}</td>
                            <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">{element.project}</td>
                            <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                                <Link href={element.links} className="text-xs font-extralight from-neutral-900">
                                       Visit
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}



export default Projects;