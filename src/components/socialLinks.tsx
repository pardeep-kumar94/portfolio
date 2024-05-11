import Image from "next/image";
import "../app/globals.css"
import Link from "next/link";

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
        "type": "email",
        "url": "mailTo:pkpardeep480@gmail.com",
        "icon": "/images/email.svg",
    },
    {
        "type": "phone",
        "url": "tel:+971524964239",
        "icon": "/images/phone.svg",
    },
    {
        "type": "whatsapp",
        "url": "https://wa.me/+971524964239",
        "icon": "/images/whatsapp.svg",
    },
    {
        "type": "resume",
        "url": "",
        "icon": "/images/resume.svg",
    }
]

    const element = socialLinks.map((element,index) => {
        return <div key={index} className="flex-1">
            <Link href={element.url}>
                <Image
                    className="dark:invert"
                    src={element.icon}
                    alt={element.type}
                    width={'24'}
                    height={'24'}
                />
            </Link>
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