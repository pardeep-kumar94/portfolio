import SectionHeader from "../shared/sectionHeader";
import { Content } from "@/config/content";

const AboutMe = () => {
    const {aboutMe} = Content;
    return (
        <div className="mt-10 lg:mt-24" id="about">
           <SectionHeader name={'About'} />
            <p className="leading-8 font-thin text-slate-400 "> {aboutMe}
            </p>
        </div>
    )
}


export default AboutMe;