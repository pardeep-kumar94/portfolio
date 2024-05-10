import Image from "next/image";
import "../app/globals.css"

const linksRow =()=> {
    const socialLinks = [{
        "type": "github",
        "url": "https://github.com/pardeep-kumar94/",
        "icon": "/images/github.svg",
    }, 
    {
        "type": "linkedin",
        "url": "https://www.linkedin.com/in/pardeep-kumar480/",
        "icon": "/images/linkedin.svg",
    }, 
    {
        "type": "instagram",
        "url": "",
        "icon": "/images/instagram.svg",
    },
    {
        "type": "resume",
        "url": "",
        "icon": "/images/resume.svg",
    }
]

    const element = socialLinks.map((element,index) => {
        return <div key={index} className="flex-1">
            <Image
                className="dark:invert"
                src={element.icon}
                alt={element.type}
                width={'24'}
                height={'24'}
            />
        </div>
    })
    return element;
};

const SocialLinks = () => {
    return (
        <div className="flex flex-row mt-10">
            {linksRow()}
        </div>
    )
}


export default SocialLinks;