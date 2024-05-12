
import "../app/globals.css"
import SocialLinks from "./socialLinks";
import LeftSizeNavOptions from "./leftSizeNavOptions";
import { Content } from "@/config/content"
const Profile = () => {
  const {name, profile, profileSummary } = Content; 
    return (
       <div id="profile" className="flex flex-col flex-[0.4] lg:flex-[0.7] pl-5 pr-5 pt-10 lg:pl-36">
         <h3 className="font-bold font-sans text-4xl lg:mt-12 lg:text-6xl">{name}</h3>
         <h4 className="font-sans text-xl mt-2">{profile}</h4>
         <p className="font-sans mt-8 font-extralight">{profileSummary}</p>
         <LeftSizeNavOptions />
         <SocialLinks />
       </div>
    )
}


export default Profile;