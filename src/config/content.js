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
    aboutMe: `Hello! I'm Pardeep. Over the past 8 years, I've delved deep into the tech world, constantly learning and experimenting. My journey began in 2015 as a freelance Android Developer. Throughout my career, I've collaborated with startups, fostering rapid learning and resilience in high-pressure environments. My passion lies in crafting mobile apps that strike a balance between aesthetics and robust engineering. If I were to pinpoint what I enjoy most, it would be conducting Code Reviews and addressing performance issues.`,
    workExperience: [{
        date:"2019 - 2023",
        company:"EkAnek Networks Pvt. Ltd.",
        title:"Lead Frontend Developer",
        location:"Abu Dhabi, UAE",
        description:"Build and maintain critical components used to construct Foxy’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in mobile accessibility.",
        highlights: [
            "Developer USP feature for facial recognization.",
            "Built a video calling platform named Foxy Live from ground.",
            "Established a physical store in India by providing essential tech infrastructure to the team.",
            "Developed an in-house NFT platform by integrating POLYGON blockchain.",
            "Transformed the entire app into an independent SDK.",
            "Led a 45% increase in app engagement within 2 months by optimizing app performance and resolving critical bugs",
            "Raised the app's crash-free rate from 76.3% to an impressive 99.2%.",
            "Enhanced UI performance, boosting it from 12 FPS to a smooth 55 FPS by debugging and fixing re-rendering issues.",
            "Decreased application size from 42 MB to 12 MB.",
            "Mentored and guided 4 interns, equipping them with essential skills and knowledge for successful transition into full-time roles, contributing to company growth and talent retention.",
            "Developed release plans for roll-out of key features by conducting code reviews, fostering a collaborative and agile development culture.",
            "Automated workflow to create new apps on both iOS and Android, reducing initial app creation time from 3 days to 5 hours."

        ],
        skills:["Android","Xcode","React Native","React JS","JavaScript","ES6","Java","Kotlin","Swift","Git",
        "Firebase","Code Review","CodePush","RestApis","SDK Integration","Web3","Polygon","MVVM", "Postgresql", "Dynamic Feature Delivery"],
    },
    {
        date:"2016 - 2019",
        company:"MediMetry",
        title:"Lead Android Developer",
        location:"Haryana, India",
        description: "I worked closely with the CEO and marketing team to gather requirements and distribute tasks within the team accordingly. I designed and developed various in-house tools, including main applications, backend APIs, CMS, and EMR, from scratch. Created and optimised user funnels.",
        highlights: [
            "Created in-house video calling infrastructure using WebRTC and XMPP.",
            "Engaged in UI/UX designing and development for mobile application.",
            "Mentored junior team members with support from PM/Architect.",
            "Distributed modules to team members and monitored them for timely delivery of applications.",
            "Tested and reviewed code with peers."
        ],
        skills:["Android","Java", "AWS", "XMPP", "webRTC", "mySQL", "WordPress", "Sqlite", "Angular JS", "PHP", "Laravel", "Google Analytics"],
    },
    {
        date:"2015 - 2016",
        company:"Freelancer",
        title:"Android Developer",
        location:"Haryana, India",
        description:"",
        highlights: [
            "Collaborated with diverse clients to customize Android applications according to their needs and objectives.",
            "Delivered 8+ projects on time, surpassing client expectations.",
            "Communicated with clients, providing regular updates and seeking feedback for improvement."
        ],
        skills:["Android","Java", "PHP", "HTML", "CSS"],
    }],

    projects: [
        
        { 
            imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
            title:'Foxy - Beauty and Makeup', 
            description: 'An AI based personalised beauty ecommerce application, where user can take selfie and whole app gets personalised accordingly.',
            links: [{name:"Android", link: ""}, {name:"iOS", link: ""}, {name:"Web", link: ""}]
        },
        { 
            imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
            title:'Boho NFT', 
            description: 'Polygon blockchain based NFT platform developed in Reactjs. Helping users to create/get selfie after shopping from mainstream website.',
            links: [{name:"Web", link: ""}]
        },
        { 
            imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
            title: 'Foxy Live', 
            description: 'A video calling native android application built with Sockets and Agora which helping beauty influencers to connect with users over video call.',
            links: [{name:"Android", link: ""}]
        },
        { 
            imageUrl: 'https://brittanychiang.com/_next/image?url=%2Fimages%2Fprojects%2Fcourse-card.png&w=640&q=75',
            title:'Open Source Portfolio WebSite', 
            description: 'An open source NextJs based website for creating personal portfolios.',
            links: [{name:"Web", link: ""}]
        },
    ],
    skills: [
        {title:'Programming languages', skills: [{name:'JavaScript', icon:'/images/js.svg'}, {name:'Java', icon:'/images/java.svg'}, {name:'Kotlin', icon:'/images/kotlin.svg'}, {name:'Swift', icon:'/images/swift.svg'}]},
       
    ]



}