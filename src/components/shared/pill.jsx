const Pill =({name})=> {
    return (
        <div className="rounded-xl bg-teal-600/50 pl-5 pr-5 pt-1 pb-1 mr-2 mt-2">
            <p className="text-green-500 font-sans text-xs">{name}</p>
        </div>
    )
}

export default Pill;