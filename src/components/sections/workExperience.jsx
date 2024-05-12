import Pill from '@/components/shared/pill'
import SectionHeader from '../shared/sectionHeader';
import { Content } from '@/config/content';

const Experience = () => {

    const {workExperience} = Content;


    const experienceCard = workExperience.map((element,index)=> {
        return <div key={index} className='mt-2 lg:mt-12 card pt-5 pb-5 pl-0 pl-0 lg:pl-3 lg:pr-3 '>
                    <div className="flex flex-col lg:flex-row">
                        <p className="flex-[0.3] font-extralight text-xs text-stone-300">{element.date}</p>
                        <div className="flex-1">
                            <p className="font-bold">{`${element.title}, ${element.company}`}</p>
                            <p className='font-extralight text-xs text-slate-300'>{element.location}</p>
                            <p className='mt-2 leading-6 font-thin text-slate-400'>{element.description}</p>
                            
                            <div className='mt-4'> 
                                <p className='text-sm underline'>Career Highlights</p>
                                <ul className='list-disc mt-4'>
                                {element.highlights?.map((highlight,index) => <li className='ml-5'>
                                    <p className='text-xs font-thin'>{highlight}</p>
                                </li>) }
                                        
                                </ul>
                            </div>
                            <div className="flex flex-row flex-wrap mt-3">
                                {element.skills.map((skill,index) => <Pill name={skill} />) }
                            </div>
                        </div>
                       
                    </div>
                </div>
    })

    return experienceCard;
}

const WorkExperience = () => {
   
    return (
     <div id='experience'>
        <div className='mt-10 lg:mt-0'>
         <SectionHeader name={'Work Experience'} />
        </div>
        {Experience()}
     
    </div>
    )
}



export default WorkExperience;