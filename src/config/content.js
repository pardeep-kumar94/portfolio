export const Content = {
    name: 'Pardeep Kumar',
    profile: "Senior Software Engineer",
    profileSummary: "A passionate Mobile app developer and Web Developer with over 8 years of experience. Proficient in developing apps and web using ReactJS, React Native, Kotlin and Swift",
    navigationLinks: [{title: "About", key: "#about"}, {title:"Experience", key:"#experience"}, {title:"Projects", key:"#project"}, {title:"Skills", key:"/skills"}],
    socialLinks: [{
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
],

    aboutMe: '',
    workExperience: [{
        date:"2019 - 2023",
        company:"EkAnek Networks Pvt Ltd",
        title:"Lead Frontend Developer",
        location:"Abu Dhabi, UAE",
        description:"Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
        skills:["Android","Xcode","React Native","React JS","JavaScript","ES6","Java","Kotlin","Swift","Git",
        "Firebase","Code Review","CodePush","RestApis","SDK Integration","Web3","Polygon","MVVM", "Postgresql"],
    }],

    projects: [
        { 
            imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
            title:'Build a Spotify Connected App', 
            description: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.'
        }
    ],
    skills: [
        {title:'Programming languages', skills: [{name:'JavaScript', icon:'/images/js.svg'}, {name:'Java', icon:'/images/java.svg'}, {name:'Kotlin', icon:'/images/kotlin.svg'}, {name:'Swift', icon:'/images/swift.svg'}]},
       
    ]



}