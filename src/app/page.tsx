"use client"
import Profile from '@/components/profile'
import './globals.css'
import AboutMe from './../components/aboutMe'
import WorkExperience from '../components/workExperience'
import Projects from '@/components/projects';
import {usePathname} from 'next/navigation';
import RouterChangeListener from '@/RouteChangeListener'
 

export default function Home() {
  const pathName = usePathname()
    console.log("-----path name", pathName)
  return (
    <>
      <div className='flex flex-col lg:flex-row flex-1  h-screen'>
        <Profile />
        <div className='flex-1  pl-5 pr-5 lg:pl-32 lg:pr-32 overflow-y-visible lg:overflow-y-auto'>
          <AboutMe />
          <WorkExperience/>
          <Projects/>
        </div>
      </div>
    </>
  );
}
