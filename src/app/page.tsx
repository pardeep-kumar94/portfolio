"use client"
import Profile from '@/components/sections/profile'
import '@/app/globals.css'
import AboutMe from '../components/sections/aboutMe'
import WorkExperience from '../components/sections/workExperience'
import Projects from '@/components/sections/projects';
import {usePathname} from 'next/navigation';
import RouterChangeListener from '@/RouteChangeListener'
import LeftSizeNavOptions from '@/components/sections/leftSizeNavOptions'
import SocialLinks from '@/components/shared/socialLinks'
 

export default function Home() {
  return (
      <div className='flex flex-col lg:flex-row flex-1  h-screen'>
        <div id='leftContainer' className='flex flex-col flex-[0.4] lg:flex-[0.7] pl-5 pr-5 pt-10 lg:pl-36'>
          <Profile />
          <LeftSizeNavOptions />
          <SocialLinks />
        </div>
        <div id='rightContainer' className='flex-1  pl-5 pr-5 lg:pl-32 lg:pr-32 overflow-y-visible lg:overflow-y-auto'>
          <AboutMe />
          <WorkExperience/>
          <Projects/>
          <div className='h-20' />
        </div>

       
      </div>
  );
}
