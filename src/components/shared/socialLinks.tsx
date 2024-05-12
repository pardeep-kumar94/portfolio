import Image from "next/image";
import "@/app/globals.css"
import Link from "next/link";
import { Content } from "@/config/content";

const linksRow =()=> {
    const {socialLinks} = Content;
    
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