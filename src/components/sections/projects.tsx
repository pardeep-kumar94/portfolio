import Link from "next/link";
import Card from "@/components/shared/card";
import AnimatedLink from "@/components/shared/animatedLink";
import SectionHeader from "../shared/sectionHeader";
import { Content } from "@/config/content";


const Projects = () => {
const {projects} = Content;
    return (
        <div id="project">
            <SectionHeader name={'Projects'} />
            {projects.map((element, index)=> {
                return (
                    <Card imgSrc={element.imageUrl} name={element.title} description={element.description}  links={element.links} />
                )
            })}

            {/* <AnimatedLink linkName={'View Full Project'} linkMessage={'Archive'}  linkHref={"/projects"}/> */}
        </div>
    )
}



export default Projects;