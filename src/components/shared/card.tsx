import Image from "next/image";

const Card = () => {
    return (
       <div className="flex flex-row min-h-32 mt-4">
            <div className="flex-[0.3] pl-2 pr-5 pt-2"> 
                <Image src={'/images/banner.jpeg'} width={180} height={150} className="rounded" alt={""}/>
            </div>
            <div className="flex-1 pt-1 pb-1">
            
                <p className="font-bold">Build a Spotify Connected App</p>
                <p className='font-extralight leading-5 text-xs text-slate-300 mt-2'>Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.</p>
            </div>
       </div>
    )
}


export default Card;