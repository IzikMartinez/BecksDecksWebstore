import {useEffect, useState} from "react";

const useMobileDetect = () => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const userAgent = typeof window.navigator === "undefined"
            ? ""
            : navigator.userAgent
        const mobile = Boolean(
            /android|blackberry|iphone|ipad|ipod|opera mini|iemobile|webdesktop/i.test(
                userAgent
            ))
        setIsMobile(mobile)
    }, []);
    return { isMobile }
}

export default useMobileDetect