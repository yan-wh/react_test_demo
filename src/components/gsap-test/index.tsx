import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import "./index.css"
import girl1 from "../../static/imgs/girl1.png"
import girl2 from "../../static/imgs/girl2.png"
import girl3 from "../../static/imgs/girl3.png"

const Box = ({ children, className, anim }) => {
    return (
      <div className={"box " + className} data-animate={anim}>
        {children}
      </div>
    );
};

export default function GsapTest() {
    const container = useRef<HTMLDivElement>(null);
    const gsapContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            // tl.fromTo(".girl1", { duration: 1.5, xPercent: -100, opacity: 0, ease: "power1.inOut" }, { duration: 0.5, xPercent: 0, opacity: 1, ease: "power1.inOut" });
            // 第一张图片的出现动画
            tl.from(".girl1", { opacity: 0, duration: 1, x: -100, // 根据需要调整起始位置
                ease: "power1.in"
            }, 0); // 动画从时间线开始时立即执行
            
            // 第二张图片的出现动画，延迟1.5秒开始，这样它会在第一张图片消失之前开始
            tl.from(".girl2", { opacity: 0, duration: 1,
                x: 100, // 根据需要调整起始位置
                ease: "power1.in"
            }, "+=0.6"); // "+=" 表示在前一个动画结束后的时间上加上1.5秒，即延迟执行
            
            // 第三张图片的出现动画，延迟3秒开始，这样它会在第二张图片消失之前开始
            tl.from(".girl3", { opacity: 0, duration: 1,
                x: -100, // 根据需要调整起始位置
                ease: "power1.in"
            }, "+=0.6"); // "+=" 表示在前一个动画结束后的时间上加上3秒
            
        }, gsapContainer);

        return () => ctx.revert();
    }, [])

    return (
        // <div className="gsap-container" ref={container}>
        //     <Box anim="rotate" className="w-[100px] h-[100px] bg-[rgb(33,122,73)]">Box</Box>
        //     <Box className="dont-animate w-[100px] h-[100px] bg-[rgb(122,33,59)]">Don't Animate</Box>
        //     <Box anim="move" className="w-[100px] h-[100px] bg-[rgb(157,160,223)]">Box</Box>
        // </div>
        <div className="gsap-container w-full h-full" ref={gsapContainer}>
            <div className="girl1 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl1})` }}></div>
            <div className="girl2 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl2})` }}></div>
            <div className="girl3 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl3})` }}></div>
        </div>
    )
}