import Link from "next/link"

const LeftSizeNavOptions = () => {

    const options = ["About", "Experience", "Projects", "Blogs"]

    return (
        <ul className="lg:flex flex-[0.7] flex-col mt-20 hidden">
            {options.map((element, index)=> <li key={index}>
                <Link className="group flex items-center py-3" href="#experience">
                    <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{element}</span></Link>
            </li>)}
            
        
        </ul>
    )
}

export default LeftSizeNavOptions