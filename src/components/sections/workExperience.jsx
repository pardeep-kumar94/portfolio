import Pill from '@/components/shared/pill'
import SectionHeader from '../shared/sectionHeader';

const Experience = () => {
    const experiences = [{
        date:"2019 - 2023",
        company:"EkAnek Networks Pvt Ltd",
        title:"Lead Frontend Developer",
        location:"Abu Dhabi, UAE",
        description:"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        skills:["Android","Xcode","React Native","React JS","JavaScript","ES6","Java","Kotlin","Swift","Git",
        "Firebase","Code Review","CodePush","RestApis","SDK Integration","Web3","Polygon","MVVM", "Postgresql"],
    },
    {
        date:"2016 - 2019",
        company:"MediMetry",
        title:"Lead Android Developer",
        location:"Haryana, India",
        description:"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        skills:["Android","Java", "AWS", "XMPP", "webRTC", "mySQL", "WordPress", "Sqlite", "Angular JS", "PHP", "Laravel"],
    },
    {
        date:"2015 - 2016",
        company:"Freelancer",
        title:"Android Developer",
        location:"Haryana, India",
        description:"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        skills:["Android","Java", "AWS", "XMPP", "webRTC", "mySQL", "WordPress", "Sqlite", "Angular JS", "PHP", "Laravel"],
    }
];



    const experienceCard = experiences.map((element,index)=> {
        return <div key={index} className='mt-2 lg:mt-12 card pt-5 pb-5 pl-0 pl-0 lg:pl-3 lg:pr-3 '>
                    <div className="flex flex-col lg:flex-row">
                        <p className="flex-[0.3] font-extralight text-xs text-stone-300">{element.date}</p>
                        <div className="flex-1">
                            <p className="font-bold">{`${element.title}, ${element.company}`}</p>
                            <p className='font-extralight text-xs text-slate-300'>{element.location}</p>
                            <p className='mt-2 leading-6 font-thin text-slate-400'>{element.description}</p>
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