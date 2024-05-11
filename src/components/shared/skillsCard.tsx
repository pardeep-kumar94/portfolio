import Image from 'next/image';
import '../../app/globals.css'

const SkillCard  = ({title, skills=[]}) => {
    return (
        <div className="rounded overflow-hidden shadow-lg mt-4 bg-blue-950 w-full m-0 lg:m-2">
            <div className="px-6 py-4 w-full">
                <div className="font-sans text-lg mb-2">{title}</div>
                <ul>
                    {skills.map((element,index)=> { 
                        return (
                            <li key={index} className='flex flex-row mt-3 mb-3'>
                                <div className='flex flex-[0.1] justify-center items-center border-l-indigo-400'>
                                    <Image src={element?.icon} height={20} width={20} className='dark:invert' />
                                </div>
                                <div className='flex-1 font-thin text-slate-400 text-sm ml-2'>{element?.name}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}


export default SkillCard;