import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, 
    // useEffect, 
    useState 
} from "react";
import "./index.css"
import girl1 from "../../static/imgs/girl1.png"
import girl2 from "../../static/imgs/girl2.png"
import girl3 from "../../static/imgs/girl3.png"
import city from "../../static/imgs/city.png"

// const Box = ({ children, className, anim }) => {
//     return (
//       <div className={"box " + className} data-animate={anim}>
//         {children}
//       </div>
//     );
// };

export default function GsapTest({photos, photoElements, photoClass }) {
    // const container = useRef<HTMLDivElement>(null);
    const gsapContainer = useRef<HTMLDivElement>(null);
    const [reversed, setReversed] = useState(false);
    const [hoverEvents, setHoverEvents] = useState(false);
    const [photoContainers, setPhotoContainers] = useState<any>([]);

    const ctx = useRef<any>(null);
    const tl = useRef<any>(null);

    useLayoutEffect(() => {

        let mm = gsap.matchMedia(),
        breakPoint = 500;

        mm.add(
            {
                // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
                isDesktop: `(min-width: ${breakPoint}px)`,
                isMobile: `(max-width: ${breakPoint - 1}px)`,
                reduceMotion: "(prefers-reduced-motion: reduce)",
            },
            (context) => {
                // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
                let { isDesktop, isMobile, reduceMotion } = context.conditions;
                const contentWidth = gsapContainer.current?.clientWidth;
                const contentHeight = gsapContainer.current?.clientHeight;
                // console.log('contentHeight', contentHeight)
                if (!contentWidth || !contentHeight) return;
                const scaleX = isDesktop ? 0.1 : 0.25
                const scaleY = isDesktop ? 0.1 : 0.2

                tl.current && tl.current.progress(0).kill();
                tl.current = gsap.timeline();
                // tl.current.timeScale(0.9); // 设置时间缩放因子
                // tl.fromTo(".photo1", { duration: 1.5, xPercent: -100, opacity: 0, ease: "power1.inOut" }, { duration: 0.5, xPercent: 0, opacity: 1, ease: "power1.inOut" });
                tl.current.to(".warp1", { duration: 1, yPercent: -100, ease: "power1.in" }, 0); // 动画从时间线开始时立即执行
                tl.current.to(".warp2", { duration: 1, yPercent: 100, ease: "power1.in" }, 0);
                tl.current.set(".warp1", { display: "none" });
                tl.current.set(".warp2", { display: "none" });
                tl.current.fromTo(".photo0", { opacity: 0, duration: 1.5, scale: 1.1, ease: "power1.in" }, { opacity: 1, scale: 1 })
                tl.current.fromTo(".photo1", { opacity: 0, duration: 1.5, scale: 1.1, ease: "power1.in" }, { opacity: 1, scale: 1 })
                tl.current.fromTo(".photo2", { opacity: 0, duration: 1.5, scale: 1.1, ease: "power1.in" }, { opacity: 1, scale: 1 })

                // 不知道什么原因，使用from不能实现该动画，只能改用fromTo
                // tl.current.from(".photo0", { opacity: 0, duration: 1.5, scale: 1.1, ease: "power1.in" }, 0);
                // tl.current.from(".photo1", { opacity: 0, duration: 0.5, scale: 1.1, ease: "elastic.inOut" }); // "+=" 表示在前一个动画结束后的时间上加上1.5秒，即延迟执行
                // tl.current.from(".photo2", { opacity: 0, duration: 0.5, scale: 1.1, ease: "elastic.inOut" });
                tl.current.to(".photo2", { duration: 1, opacity: 1, scaleX: scaleX, scaleY: scaleY, transformOrigin: "center center", x: -(contentWidth/2 - contentWidth*(scaleX)/2 - 20), y: (contentHeight/2 - contentHeight*scaleY), ease: "expo.inOut" });
                tl.current.to(".photo1", { duration: 1, opacity: 1, scaleX: scaleX, scaleY: scaleY, transformOrigin: "center center", x: -(contentWidth/2 - contentWidth*(scaleX)/2 - contentWidth*(scaleX) -40), y: (contentHeight/2 - contentHeight*scaleY), ease: "expo.inOut" });
                tl.current.to(".photo0", { duration: 1, opacity: 1, scaleX: scaleX, scaleY: scaleY, transformOrigin: "center center", x: -(contentWidth/2 - contentWidth*(scaleX)/2 - contentWidth*(scaleX) * 2 -60), y: (contentHeight/2 - contentHeight*scaleY), ease: "expo.inOut" }).then(() => {
                    // console.log("动画结束");
                    // 结束之后添加hover监听
                    const photoContainers = gsap.utils.toArray(".gsap-container");
                    setPhotoContainers(photoContainers);
                    photoContainers.forEach(container => {
                        if (container.children.length === 0) return;
                        const child = container.children;
                        for (let i = 0; i < child.length; i++) {
                            if (i != 0 && i != 1) {
                                let photo = child[i];
                                // console.log('photo', photo)
                                // 创建一个GSAP hoverTimeline，以便我们可以轻松地控制动画
                                const hoverTimeline = gsap.timeline({ paused: true });
                                // 定义鼠标悬浮时的动画
                                hoverTimeline.to(photo, {
                                    scale: 0.11, // 放大元素
                                    duration: 0.5, // 动画持续时间
                                    ease: "power1.inOut" // 缓动效果
                                });
                                // 定义鼠标移出时的动画
                                hoverTimeline.reverse();

                                const mouseEnterHandler = () => hoverTimeline.play(); // 鼠标悬浮事件监听器
                                const mouseLeaveHandler = () => hoverTimeline.reverse(); // 鼠标移出事件监听器

                                photo.addEventListener("mouseenter", mouseEnterHandler);
                                photo.addEventListener("mouseleave", mouseLeaveHandler);

                                // 保存监听器以便之后移除
                                photo.mouseEnterHandler = mouseEnterHandler;
                                photo.mouseLeaveHandler = mouseLeaveHandler;
                            }
                        }
                    });
                })

                return () => {
                    // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
                    // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
                    // setHoverEvents(true);
                    context.revert()
                };
            }
        );
    }, [])

    useEffect(() => {
        return () => {
            // 移除事件监听器
            photoContainers.forEach(container => {
                if (container.children.length === 0) return;
                const children = Array.from(container.children);
        
                children.forEach(child => {
                  if (child.mouseEnterHandler && child.mouseLeaveHandler) {
                    child.removeEventListener("mouseenter", child.mouseEnterHandler);
                    child.removeEventListener("mouseleave", child.mouseLeaveHandler);
                    // 清除保存的监听器引用
                    delete child.mouseEnterHandler;
                    delete child.mouseLeaveHandler;
                  }
                });
            });
        };
    }, [])

    // useEffect(() => {
    //     // toggle the direction of our timeline
    //     // console.log("toggling reverse to", reversed)
    //     // 反向动画
    //     tl.current && tl.current.reversed(reversed)
    // }, [reversed])

    return (
        // <div className="gsap-container" ref={container}>
        //     <Box anim="rotate" className="w-[100px] h-[100px] bg-[rgb(33,122,73)]">Box</Box>
        //     <Box className="dont-animate w-[100px] h-[100px] bg-[rgb(122,33,59)]">Don't Animate</Box>
        //     <Box anim="move" className="w-[100px] h-[100px] bg-[rgb(157,160,223)]">Box</Box>
        // </div>
        <div className="gsap-container w-full h-full bg-cover relative" ref={gsapContainer} style={{ backgroundImage: `url(${city})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="warp1 w-full h-[50%] bg-cover absolute top-0 left-0 z-10" style={{ background: 'rgb(244, 242, 237)' }}></div>
            <div className="warp2 w-full h-[50%] bg-cover absolute bottom-0 left-0 z-10" style={{ background: 'rgb(244, 242, 237)' }}></div>
            {/* {photoElements} */}
            <div className="photo photo0 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl1})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
            <div className="photo photo1 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl2})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
            <div className="photo photo2 w-full h-full bg-cover absolute top-0 left-0" style={{ backgroundImage: `url(${girl3})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>
            {/* <button className="absolute top-0 left-0 z-10" onClick={() => setReversed(!reversed)}>Toggle</button> */}
        </div>
    )
}