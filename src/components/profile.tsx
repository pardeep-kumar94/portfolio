import Image from "next/image";
import "../app/globals.css"
import SocialLinks from "./socialLinks";
import LeftSizeNavOptions from "./leftSizeNavOptions";
const Profile = () => {

    return (
       <div id="profile" className="flex flex-col flex-[0.4] lg:flex-[0.7] pl-5 pr-5 pt-10 lg:pl-36">
         <h3 className="font-bold font-sans text-4xl lg:mt-12 lg:text-6xl">Pardeep Kumar</h3>
         <h4 className="font-sans text-xl mt-2">Senior Software Engineer</h4>
         <p className="font-sans mt-8 font-extralight">Experienced Software engineer with 8 years of experience in Mobile Application Development. Proficient in creating mobile applications using React Native, Kotlin and Swift</p>
         <LeftSizeNavOptions />
         <SocialLinks />
       </div>
    )
}


export default Profile;