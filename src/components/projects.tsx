import Card from "./shared/card";


const Projects = () => {
    const project = [{
        imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
        title:'Build a Spotify Connected App', 
        description: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.',
    }, {
        imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
        title:'Build a Spotify Connected App', 
        description: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.',
    }]
    return (
        <div>
            {project.map((element, index)=> {
                return (
                    <Card />
                )
            })}
        </div>
    )
}



export default Projects;