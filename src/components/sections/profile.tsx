
import "@/app/globals.css"
import SocialLinks from "@/components/shared/socialLinks";
import LeftSizeNavOptions from "./leftSizeNavOptions";
import { Content } from "@/config/content"
const Profile = () => {
  const {name, profile, profileSummary } = Content; 
    return (
       <div>
         <h3 className="font-bold font-sans text-4xl lg:mt-12 lg:text-6xl">{name}</h3>
         <h4 className="font-sans text-xl mt-2">{profile}</h4>
         <p className="font-sans mt-8 font-extralight">{profileSummary}</p>
       </div>
    )
}


export default Profile;