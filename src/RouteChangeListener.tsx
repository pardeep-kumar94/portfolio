import { usePathname } from "next/navigation"
import { useEffect } from "react";

const RouterChangeListener = () => {
    const pathName = usePathname(); 

    useEffect(() => {
        console.log(`Route changed to: ${pathName}`);
    }, [pathName]);
}

export default RouterChangeListener;