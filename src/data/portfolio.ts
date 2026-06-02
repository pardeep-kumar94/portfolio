export const achievements = [
  { number: "99.4%", title: "Crash-free rate", desc: "23.1% absolute gain" },
  { number: "12MB", title: "App size reduction", desc: "71% smaller" },
  { number: "55 FPS", title: "Frame rate boost", desc: "4.6× improvement" },
  { number: "1M+", title: "Users served", desc: "across Foxy platform" },
  { number: "$120K/yr", title: "Cost saved", desc: "Polygon NFT migration" },
  { number: "40%", title: "Defects reduced", desc: "Maestro E2E testing" },
];

export interface Product {
  tag: string;
  title: string;
  desc: string;
  stats: { num: string; label: string }[];
  stack: string[];
  mockupName: string;
  dark?: boolean;
}

export interface Role {
  index: string;
  badge: string;
  dates: string;
  location: string;
  company: string;
  position: string;
  products: Product[];
}

export const roles: Role[] = [
  {
    index: "01",
    badge: "Current",
    dates: "May 2024 — Present",
    location: "Dubai, UAE",
    company: "KPTAC\nTechnologies",
    position: "Senior Mobile Application Developer",
    products: [
      {
        tag: "Product 01",
        title: "2050-Anonymous Network",
        desc: "Cross-platform anonymous social app built from scratch with React Native. Features real-time camera filters, video editing, WebRTC video calling, and E2E encrypted chat.",
        stats: [
          { num: "99.3%", label: "crash-free rate" },
          { num: "2K–3K", label: "DAUs pre-launch" },
        ],
        stack: ["React Native", "TypeScript", "Redux Toolkit", "WebRTC"],
        mockupName: "2050 Network",
      },
      {
        tag: "Product 02",
        title: "EDC Payment Platform",
        desc: "Kotlin-based Android application on EDC devices enabling seamless POS integration for real-time payment processing. Currently evaluated by one of the largest payment companies in the MEA region.",
        stats: [
          { num: "70%", label: "release effort cut" },
          { num: "40%", label: "fewer defects" },
        ],
        stack: ["Kotlin", "Fastlane", "Maestro"],
        mockupName: "EDC Payment",
        dark: true,
      },
    ],
  },
  {
    index: "02",
    badge: "5 Years",
    dates: "May 2019 — May 2024",
    location: "Abu Dhabi, UAE",
    company: "EkAnek\nNetworks",
    position: "Senior Software Engineer · Foxy",
    products: [
      {
        tag: "Product 01",
        title: "Foxy Beauty Platform",
        desc: "Production-grade beauty-tech platform serving 1M+ users. Led performance engineering — crash-free rate from 76.3% to 99.4%, app size from 42MB to 12MB, frame rate from 12 to 55 FPS.",
        stats: [
          { num: "99.4%", label: "crash-free rate" },
          { num: "1M+", label: "users served" },
        ],
        stack: ["React Native", "TypeScript", "Redux"],
        mockupName: "Foxy",
      },
      {
        tag: "Product 02",
        title: "Foxy Live",
        desc: "Real-time video calling platform with facial recognition for influencer onboarding. Enabled 45–65 daily influencer sessions with seamless video quality.",
        stats: [
          { num: "65", label: "daily onboardings" },
          { num: "34%", label: "conversion boost" },
        ],
        stack: ["WebRTC", "Facial Recognition"],
        mockupName: "Foxy Live",
        dark: true,
      },
      {
        tag: "Product 03",
        title: "NFT Marketplace",
        desc: "Engineered an in-house NFT marketplace on the Polygon blockchain, replacing a third-party solution and saving $10K/month in platform fees.",
        stats: [{ num: "$120K", label: "annual savings" }],
        stack: ["Polygon", "Blockchain", "React Native"],
        mockupName: "NFT Market",
      },
      {
        tag: "Product 04",
        title: "Retail Store Tech",
        desc: "Built the full technology stack for Foxy's physical retail store launch, enabling digital ordering, inventory management, and seamless checkout from day one.",
        stats: [{ num: "~90", label: "daily orders from launch" }],
        stack: ["React Native", "TypeScript"],
        mockupName: "Retail Tech",
        dark: true,
      },
    ],
  },
  {
    index: "03",
    badge: "3 Years",
    dates: "Apr 2016 — Mar 2019",
    location: "Haryana, India",
    company: "MediMetry",
    position: "Lead Android Developer",
    products: [
      {
        tag: "Product 01",
        title: "Telemedicine App",
        desc: "Led UI/UX development for a telemedicine platform with in-house WebRTC + XMPP video calling, handling 50+ daily consultations between patients and doctors.",
        stats: [
          { num: "22.6%", label: "bounce rate reduced" },
          { num: "50+", label: "daily consultations" },
        ],
        stack: ["Android", "WebRTC", "XMPP"],
        mockupName: "MediMetry",
      },
      {
        tag: "Product 02",
        title: "Multi-Clinic EMR System",
        desc: "Designed the UI layer and REST API integration for an electronic medical records system spanning multiple clinics with patient management and appointment scheduling.",
        stats: [{ num: "Multi", label: "clinic coverage" }],
        stack: ["Android", "REST API"],
        mockupName: "EMR System",
        dark: true,
      },
    ],
  },
];

export const skills = [
  { icon: "‹/›", title: "Languages", tags: ["TypeScript", "JavaScript", "Kotlin", "Swift", "HTML5", "CSS3"], primary: ["TypeScript", "JavaScript"] },
  { icon: "■", title: "Mobile", tags: ["React Native", "KMP", "Jetpack Compose", "SwiftUI"], primary: ["React Native"] },
  { icon: "○", title: "Web", tags: ["React.js", "Next.js", "Redux Toolkit", "Zustand", "Tailwind CSS"], primary: ["React.js", "Next.js"] },
  { icon: "△", title: "Architecture", tags: ["MVVM", "Clean Architecture", "Modular Architecture", "System Design", "Design Patterns"], primary: [] },
  { icon: "✓", title: "Testing", tags: ["Maestro", "Jest", "React Testing Library", "Detox"], primary: ["Maestro"] },
  { icon: "⚙", title: "DevOps", tags: ["Fastlane", "GitHub Actions", "Firebase", "CodePush", "Git"], primary: ["Fastlane"] },
  { icon: "◆", title: "Databases", tags: ["SQLite", "Room", "Realm", "MMKV"], primary: [] },
  { icon: "⚡", title: "Specialisms", tags: ["WebRTC", "XMPP", "Blockchain / Polygon", "Facial Recognition", "NFT Platforms"], primary: ["WebRTC"] },
];

export const competencies = [
  "React Native / TypeScript",
  "Performance Optimization",
  "Engineering Leadership",
  "WebRTC & Real-time Systems",
  "System & Modular Architecture",
  "Blockchain / Web3",
];

export const productCaseStudies = [
  {
    title: "2050-Anonymous Network",
    company: "KPTAC Technologies · 2024–Present",
    challenge: "Build a cross-platform anonymous social app from scratch that prioritizes user privacy with E2E encryption while delivering a rich media experience — camera filters, video editing, and real-time video calling.",
    role: "Architected the entire application from ground up using React Native, Redux Toolkit and TypeScript. Designed the modular architecture for rapid feature iteration across iOS and Android. Led a team of 6–7 engineers.",
    decisions: "Engineered custom native modules for real-time camera filters and video editing to avoid third-party SDK bloat. Implemented WebRTC for video calling with E2E encryption baked into the protocol layer.",
    stats: [
      { num: "99.3%", label: "Crash-free rate at pre-launch" },
      { num: "2K–3K", label: "Daily active users in pre-launch" },
      { num: "40%", label: "Fewer defects with Maestro E2E" },
    ],
    tags: ["React Native", "TypeScript", "Redux Toolkit", "WebRTC", "Maestro"],
    additionalPages: [
      {
        leftTitle: "Architecture",
        leftContent: "Designed a modular monorepo structure with feature-based modules that could be developed and tested independently. Each feature module (Chat, Camera, Video Call, Feed) had its own state slice, navigation stack, and API layer. Shared utilities lived in a core package with strict dependency rules enforced via ESLint boundaries.",
        rightTitle: "Technical Deep Dive",
        rightContent: "The camera module required bridging native iOS AVFoundation and Android CameraX APIs through custom native modules. Built a real-time filter pipeline processing 30fps video frames with GPU shaders. The E2E encryption layer used Signal Protocol adapted for group messaging, with key rotation handled transparently during session handoffs.",
      },
      {
        leftTitle: "DevOps & Quality",
        leftContent: "Set up a complete CI/CD pipeline with GitHub Actions: lint, type-check, unit tests, and Maestro E2E tests running on every PR. Fastlane handled automated builds and distribution to TestFlight and Firebase App Distribution. Code coverage gates prevented merging below 70% threshold on new code.",
        rightTitle: "Lessons Learned",
        rightContent: "Building native modules from scratch gave us full control but came with a maintenance cost — every OS update required compatibility checks. The investment in Maestro E2E testing paid off massively: catching 40% more defects before production meant fewer hotfixes and happier beta testers. Starting with modular architecture from day one was the single best technical decision.",
      },
    ],
  },
  {
    title: "Foxy Beauty Platform",
    company: "EkAnek Networks · 2019–2024",
    challenge: "Inherit a beauty-tech app with a 76.3% crash-free rate, bloated 42MB size, and 12 FPS UI rendering — serving over 1M users who were churning fast.",
    role: "Senior Software Engineer leading performance engineering. Systematically profiled, diagnosed, and fixed every layer: crash analytics, memory leaks, asset pipeline, re-render bottlenecks, and bundle optimization.",
    decisions: "Implemented code splitting and ProGuard optimization to slash app size. Rewrote render-heavy components with memoization and virtualized lists. Built a structured crash triage system.",
    stats: [
      { num: "99.4%", label: "Crash-free rate (from 76.3%)" },
      { num: "12MB", label: "App size (from 42MB — 71% cut)" },
      { num: "55 FPS", label: "Frame rate (4.6× improvement)" },
    ],
    tags: ["React Native", "TypeScript", "ProGuard", "Redux"],
    additionalPages: [
      {
        leftTitle: "Diagnosis Process",
        leftContent: "Started with a systematic audit: Firebase Crashlytics for crash patterns, Flipper for memory profiling, React DevTools for re-render detection, and Systrace for frame drops. Categorized issues into three tiers — critical (crashes), high (performance), medium (UX jank). Created a war room dashboard tracking all metrics in real-time.",
        rightTitle: "The Fix — Layer by Layer",
        rightContent: "Crash-free rate: Fixed top 20 crash signatures — mostly null pointer exceptions from unguarded API responses and race conditions in async state updates. App size: Removed unused assets (8MB), enabled ProGuard with custom rules (12MB savings), implemented on-demand image loading. Frame rate: Rewrote FlatList implementations with getItemLayout, removed inline styles causing re-renders, and memoized expensive computations.",
      },
      {
        leftTitle: "Scaling the Fix",
        leftContent: "The real challenge wasn't fixing the issues — it was preventing regression. Built performance budgets into the CI pipeline: any PR that increased bundle size by >50KB or decreased Lighthouse score triggered a review. Created a shared performance checklist that became part of the team's PR template.",
        rightTitle: "Impact & Aftermath",
        rightContent: "Within 3 months, crash-free rate went from 76.3% to 99.4%. App store rating climbed from 3.2 to 4.4 stars. User retention improved by 18% as the app stopped being frustrating to use. The performance engineering playbook I created became the standard for all new features — every engineer learned to profile before optimizing.",
      },
    ],
  },
  {
    title: "Foxy Live",
    company: "EkAnek Networks · 2019–2024",
    challenge: "Build a real-time video calling feature with facial recognition for influencer onboarding — low latency, high reliability, and seamless UX for non-technical beauty influencers.",
    role: "End-to-end ownership: WebRTC integration, facial recognition pipeline, UI/UX for the calling experience, and optimization of acquisition funnels.",
    decisions: "Custom WebRTC implementation over third-party SDKs for full control over quality and latency. Integrated on-device facial recognition to run without server round-trips during live sessions.",
    stats: [
      { num: "45–65", label: "Daily influencer onboardings" },
      { num: "34%", label: "Conversion improvement" },
    ],
    tags: ["WebRTC", "Facial Recognition", "React Native"],
  },
  {
    title: "NFT Marketplace",
    company: "EkAnek Networks · 2019–2024",
    challenge: "The existing NFT platform relied on a third-party service costing $10K/month. Build an in-house solution on a cost-efficient blockchain without disrupting the live user base.",
    role: "Engineered the complete NFT marketplace from smart contract integration to the mobile UI. Chose Polygon for low gas fees and fast transactions.",
    decisions: "Polygon blockchain for cost efficiency. Built a seamless minting and trading experience directly within the existing app, so users never left the Foxy ecosystem.",
    stats: [
      { num: "$120K", label: "Annual cost savings" },
      { num: "$0", label: "Third-party platform fees" },
    ],
    tags: ["Polygon", "Blockchain", "React Native", "Smart Contracts"],
  },
  {
    title: "Telemedicine Platform",
    company: "MediMetry · 2016–2019",
    challenge: "Build a telemedicine platform with reliable video calling for doctor-patient consultations and a multi-clinic EMR system — in a market where connectivity was unreliable.",
    role: "Lead Android Developer. Built in-house WebRTC + XMPP video calling, designed the UI layer, integrated REST APIs, and managed the multi-clinic EMR system.",
    decisions: "In-house WebRTC over third-party for full quality control. XMPP for lightweight signaling. A/B tested UI flows to systematically reduce bounce rate.",
    stats: [
      { num: "22.6%", label: "Bounce rate reduction" },
      { num: "50+", label: "Daily video consultations" },
    ],
    tags: ["Android", "WebRTC", "XMPP", "REST API"],
    additionalPages: [
      {
        leftTitle: "Infrastructure Challenges",
        leftContent: "Indian telecom networks in 2016–2019 were notoriously unreliable — 3G connections dropping mid-consultation was common. Built an adaptive bitrate system that dynamically adjusted video quality based on available bandwidth. Implemented automatic reconnection with session state preservation so consultations could resume without losing context.",
        rightTitle: "EMR System Design",
        rightContent: "The multi-clinic EMR system needed to handle patient records across 50+ clinics with different workflows. Designed a flexible schema that supported custom fields per clinic while maintaining a unified patient record. Offline-first architecture ensured doctors could access patient history even without internet — data synced automatically when connectivity returned.",
      },
    ],
  },
];

export const managementCaseStudies = [
  {
    title: "Scaling a Team from 2 to 7",
    company: "KPTAC Technologies · 2024–Present",
    challenge: "Rapidly scale an engineering team from 2 developers to 7 while maintaining code quality, shipping velocity, and team morale — all during an aggressive product launch timeline.",
    role: "Engineering Lead responsible for hiring, onboarding, mentoring, and establishing team processes. Conducted technical interviews, designed onboarding programs, and set up code review culture.",
    decisions: "Implemented structured onboarding with pair programming for the first 2 weeks. Established PR review guidelines, coding standards, and a mentorship buddy system. Created a knowledge base to reduce bus factor.",
    stats: [
      { num: "7", label: "Engineers onboarded" },
      { num: "2 wk", label: "Time to first PR" },
      { num: "0", label: "Attrition in first year" },
    ],
    tags: ["Hiring", "Onboarding", "Mentorship", "Team Building"],
    additionalPages: [
      {
        leftTitle: "Hiring Philosophy",
        leftContent: "Designed a 3-stage interview process: take-home coding challenge (real-world problem, not algorithms), live system design discussion, and a culture-fit conversation. Prioritized problem-solving ability and communication over years of experience. Rejected candidates who could code but couldn't explain their thinking — collaboration was non-negotiable.",
        rightTitle: "Building the Culture",
        rightContent: "Established weekly tech talks where each engineer presented something they learned. Created a blameless post-mortem culture for production incidents. Introduced 20% time for tooling improvements — this led to the team building their own CLI for common tasks, saving ~2 hours per developer per week. The team went from strangers to a cohesive unit that shipped with confidence.",
      },
    ],
  },
  {
    title: "Cross-Functional Delivery",
    company: "EkAnek Networks · 2019–2024",
    challenge: "Coordinate across mobile, backend, design, and QA teams to deliver a major product revamp with tight deadlines — while each team had competing priorities and different sprint cycles.",
    role: "Led cross-functional coordination as the mobile team lead. Owned the delivery timeline, ran standups across teams, and resolved blockers. Acted as the bridge between product, design, and engineering.",
    decisions: "Introduced shared milestone planning across teams with weekly sync-ups. Created a dependency tracker to surface blockers early. Negotiated scope trade-offs with product to protect launch dates.",
    stats: [
      { num: "4", label: "Teams coordinated" },
      { num: "100%", label: "On-time delivery" },
      { num: "3", label: "Major releases shipped" },
    ],
    tags: ["Cross-Functional", "Agile", "Delivery Management", "Stakeholder Mgmt"],
  },
  {
    title: "E2E Testing Culture",
    company: "KPTAC Technologies · 2024–Present",
    challenge: "The team had zero automated testing — every release was manually QA'd taking 3+ days, causing delayed releases and regression bugs slipping into production.",
    role: "Championed the adoption of Maestro E2E testing. Trained the team, wrote the initial test suite, integrated tests into CI/CD, and established a testing-first culture.",
    decisions: "Chose Maestro over Detox for simpler setup and cross-platform support. Made E2E tests a PR merge gate. Paired with each developer to write their first test, making adoption feel natural rather than forced.",
    stats: [
      { num: "40%", label: "Fewer production defects" },
      { num: "3 hrs", label: "Release cycle (from 3 days)" },
      { num: "85%", label: "Critical path coverage" },
    ],
    tags: ["Maestro", "CI/CD", "Quality Culture", "Team Training"],
  },
  {
    title: "Performance Engineering Program",
    company: "EkAnek Networks · 2019–2024",
    challenge: "App performance was tanking — 76% crash-free rate, 12 FPS, 42MB size. But no one owned performance. Fixes were ad-hoc and individual engineers lacked profiling skills.",
    role: "Initiated and led a performance engineering program. Created dashboards, set KPI targets, trained the team on profiling tools, and ran weekly performance review sessions.",
    decisions: "Made performance metrics visible to the entire team with real-time dashboards. Established performance budgets for every PR. Ran knowledge-sharing sessions on Flipper, Systrace, and memory profiling.",
    stats: [
      { num: "99.4%", label: "Crash-free (from 76.3%)" },
      { num: "5", label: "Engineers upskilled" },
      { num: "4.6×", label: "Frame rate improvement" },
    ],
    tags: ["Performance Culture", "KPIs", "Team Training", "Dashboards"],
  },
];
