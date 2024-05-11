import Link from "next/link"

const LeftSizeNavOptions = () => {

    return (
        <div className="lg:flex flex-[0.7] flex-col mt-20 hidden">
            <Link href={"#about"} scroll={true}><p>About</p></Link>
            <Link href={"#experience"} scroll={true}> <p>Experience</p> </Link>
            <p>Projects</p>
            <p>Blogs</p>
        </div>
    )
}

export default LeftSizeNavOptions