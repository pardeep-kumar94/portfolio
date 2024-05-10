import Profile from '@/components/profile'
import './globals.css'

export default function Home() {
  return (
    <div className='flex flex-col lg:flex-row flex-1  h-screen'>
        <Profile />
        {/* <div className='flex-1'>
        <h1>sedonc</h1>
        </div> */}
    </div>
  );
}
