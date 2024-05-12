import Image from "next/image";
import LinkPill from "./LinkPill";

const Card = ({imgSrc, name, description, links=[]}) => {
    return (
       <div className="flex flex-row min-h-32 mt-4 card">
            <div className="flex-[0.3] pl-2 pr-5 pt-2"> 
                <Image src={'/images/banner.jpeg'} width={180} height={150} className="rounded" alt={""}/>
            </div>
            <div className="flex-1 pt-1 pb-1">
                <p className="font-bold">{name}</p>
                <p className='font-extralight leading-5 text-xs text-slate-300 mt-2'>{description}</p>
                <div className="flex-row flex">
                    {links.map((l,index)=> <LinkPill name={l.name} link={l.link} />)}
                </div>
            </div>
       </div>
    )
}


export default Card;