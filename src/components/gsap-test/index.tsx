import gsap from "gsap";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import axios from "axios";
import { Photo } from '../../types'
import "./index.css"
// import girl1 from "../../static/imgs/girl1.png"
// import girl2 from "../../static/imgs/girl2.png"
// import girl3 from "../../static/imgs/girl3.png"

// const Box = ({ children, className, anim }) => {
//     return (
//       <div className={"box " + className} data-animate={anim}>
//         {children}
//       </div>
//     );
// };

export default function GsapTest() {
    // const container = useRef<HTMLDivElement>(null);
    const gsapContainer = useRef<HTMLDivElement>(null);
    const [ photos, setPhotos ] = useState<Photo[]>([])

    useEffect(() => {
        axios.get('/api/getImagesNames').then((res) => {
            // console.log(res.data)
            if (res.data) {
                let arr = []
                arr = res.data.map((item: string) => {
                    return { 
                        src: `/api/uploads/${item}`,
                        file: item,
                        height: '',
                        gridRow: ''
                    }
                })
                setPhotos(arr)
            }
        })
    }, [])

    useLayoutEffect(() => {
        const windowWidth = window.innerWidth;
        const bodyHeight = window.innerHeight * 0.8;
        // console.log('bodyHeight', bodyHeight)
        if (!windowWidth || !bodyHeight) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            // tl.fromTo(".girl1", { duration: 1.5, xPercent: -100, opacity: 0, ease: "power1.inOut" }, { duration: 0.5, xPercent: 0, opacity: 1, ease: "power1.inOut" });
            tl.to(".warp1", { duration: 1, yPercent: -100, ease: "power1.in" }, 0); // 动画从时间线开始时立即执行
            tl.to(".warp2", { duration: 1, yPercent: 100, ease: "power1.in" }, 0);
            tl.set(".warp1", { display: "none" });
            tl.set(".warp2", { display: "none" });
            tl.from(".girl1", { opacity: 0, duration: 1.5, scale: 1.1, ease: "power1.in" }, 0);
            tl.from(".girl2", { opacity: 0, duration: 0.5, scale: 1.1, ease: "elastic.inOut" }); // "+=" 表示在前一个动画结束后的时间上加上1.5秒，即延迟执行
            tl.from(".girl3", { opacity: 0, duration: 0.5, scale: 1.1, ease: "elastic.inOut" });
            tl.to(".girl3", { duration: 1, scale: 0.1, transformOrigin: "center center", x: -(windowWidth/2 - windowWidth*0.1/2), y: (bodyHeight/2 - bodyHeight*0.1/2), ease: "back.inOut" });
            tl.to(".girl2", { duration: 1, scale: 0.1, transformOrigin: "center center", x: -(windowWidth/2 - windowWidth*0.1/2), y: (bodyHeight/2 - bodyHeight*0.1/2 - bodyHeight*0.1 - 20), ease: "back.inOut" });
            tl.to(".girl1", { duration: 1, scale: 0.1, transformOrigin: "center center", x: -(windowWidth/2 - windowWidth*0.1/2), y: (bodyHeight/2 - bodyHeight*0.1/2 - bodyHeight*0.1*2 - 40), ease: "back.inOut" });
        }, gsapContainer);

        return () => ctx.revert();
    }, [])

    return (
        // <div className="gsap-container" ref={container}>
        //     <Box anim="rotate" className="w-[100px] h-[100px] bg-[rgb(33,122,73)]">Box</Box>
        //     <Box className="dont-animate w-[100px] h-[100px] bg-[rgb(122,33,59)]">Don't Animate</Box>
        //     <Box anim="move" className="w-[100px] h-[100px] bg-[rgb(157,160,223)]">Box</Box>
        // </div>
        <div className="gsap-container w-full h-full bg-cover absolute top-0 left-0" ref={gsapContainer} style={{ backgroundImage: `url(${photos.length ? photos[0].src : ''})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="warp1 w-full h-[50%] bg-cover absolute top-0 left-0 z-10" style={{ background: 'rgb(244, 242, 237)' }}></div>
            <div className="warp2 w-full h-[50%] bg-cover absolute bottom-0 left-0 z-10" style={{ background: 'rgb(244, 242, 237)' }}></div>
            <div className="girl1 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${photos.length ? photos[1].src : ''})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
            <div className="girl2 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${photos.length ? photos[2].src : ''})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
            <div className="girl3 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${photos.length ? photos[3].src : ''})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
        </div>
    )
}