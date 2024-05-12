import Image from "next/image";

const LinkPill = ({name, link}) => {
    return (
        <div className="rounded-xl  bg-slate-700 pl-5 pr-5 pt-1 pb-1 mr-2 mt-2 flex flex-row">
         <p className="text-green-500 font-sans text-xs">{name}</p>
         <Image height={16} width={16} src={"/images/link.svg"}  className=" ml-1 invert"/>
        </div>
    )
}


export default LinkPill;