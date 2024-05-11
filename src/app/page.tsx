import Profile from '@/components/profile'
import './globals.css'
import AboutMe from './../components/aboutMe'
import WorkExperience from '../components/workExperience'

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row flex-1  h-screen'>
        <Profile />
        <div className='flex-1  pl-5 pr-5 lg:pl-32 lg:pr-32 scrollable'>
          <AboutMe />
          <WorkExperience/>
        </div>
    </div>
  );
}
