import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Image as ImageNextUI, Card, CardBody, CardHeader } from '@nextui-org/react'
import Typed from 'typed.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import Test from '../test'
import Phone from '../test/phone'

import './index.css'


export default function Home() {
    // const el = useRef(null);
    const [box1Width, setBox1Width] = useState(0);
    const box1 = useRef(null);

    window.addEventListener('scroll', function() {
        const scrollDistance = window.scrollY || document.documentElement.scrollTop;
        console.log('滚动距离 ' + scrollDistance + ' pixels');
    }, false);

    // useEffect(() => {
    //     // const typed = new Typed(el.current, {
    //     //     strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
    //     //     typeSpeed: 50,
    //     // });
    
    //     // return () => {
    //     //     // Destroy Typed instance during cleanup to stop animation
    //     //     typed.destroy();
    //     // };

    //     // console.log('1')
    //     // const box1 = document.querySelector('.box1');
    //     // if (box1) {
    //     //     setBox1Width(box1?.clientWidth);
    //     // }

    // })


    useLayoutEffect(() => {
        // console.log('2')
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();

        const imgCards = gsap.utils.toArray('.img-card');

        const webTitle = document.querySelector('.web-title');
        const topImg = document.querySelector('.top-img');
        const box1 = document.querySelector('.box1');


        // gsap.set('.box1', { xPercent: 0 });

        // start: "top top" 表示动画触发的起始位置是当前触发元素（trigger element）的顶部与视口（viewport）顶部重合的位置。
        // 换句话说，当触发元素的顶部边缘正好滚动到视口的顶部边缘时，动画开始执行。
        
        // 如果您想要从距离页面顶部500像素的位置开始动画，您可以这样设置 start 属性：
        // start: "500px"
        // 或者，如果您想要更明确地指定这个值是相对于视口顶部的，也可以写成：
        // start: "500px top"
        // 这两种写法都会在页面滚动到距离顶部500像素的位置时触发动画。

        if (!webTitle?.clientHeight || !topImg?.clientHeight || !box1?.clientHeight) return;
        const h = webTitle.clientHeight + topImg.clientHeight + 5
        console.log('高度', h)
        // setBox1Width(box1.clientWidth);
        // ScrollTrigger.create({
        //     trigger: '.body-container',
        //     // start: `${h}px`, // 开始位置
        //     start: `left top`, // 开始位置
        //     end: '+=3000px', // 结束位置
        //     markers: true, // 显示标记
        //     scrub: true, // 平滑动画跟随滚动条（来回滚动实现动画展开和还原）
        //     pin: true, // 固定触发元素
        //     // pinSpacing: true, // 固定时不要添加额外空间，为true用于适应内容大小，例如此处是用于完整的完成动画，而不会因为end设置的值而提前结束
        //     animation: tl.to('.box1', { x: -box1?.clientWidth + 'px' }), // 应用动画
        //     onEnter: () => {
        //         console.log('进入', h)
        //     }
        // });
        
        let scrollTween = gsap.to('.box1', {
            xPercent: -100,
            ease: "none", // <-- IMPORTANT!
            scrollTrigger: {
              trigger: ".box1",
              pin: true,
              scrub: true,
              //snap: directionalSnap(1 / (sections.length - 1)),
              end: "bottom top",
              pinSpacing: true
            }
        });
        gsap.to('.imgcard0', {
            y: '10px',
            ease: 'none', // <-- IMPORTANT!
            scrollTrigger: {
                trigger: '.imgcard0',
                start: `top top`,
                // start: `${h}px`, // 开始位置
                containerAnimation: scrollTween,
                id: '1'
            }
        });
        // gsap.to('.imgcard0', {
        //     x: 20,
        //     scrollTrigger: {
        //         trigger: '.imgcard0',
        //         start: 'top top',
        //         // pin: true,
        //         scrub: true,
        //         containerAnimation: scrollTween // <-- NEW!!
        //     }
        // });


        //---------------------------------------------------------------------------------------------------------------------------


        // 清理函数，组件卸载时移除ScrollTrigger
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

        
    }, [])

    // const cardItems = [girl1, girl2, girl3].map((item, index) => {
    //     return (
    //         <Card className={"img-card py-4 h-full w-[33.3%]" + ` imgcard${index}`} key={index}>
    //             <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
    //                 <p className={"text-tiny uppercase font-bold" + ` imgdate${index}`}>Daily Mix</p>
    //                 <small className="text-default-500">12 Tracks</small>
    //                 <h4 className="font-bold text-large">Frontend Radio</h4>
    //             </CardHeader>
    //             <CardBody className="overflow-visible py-2">
    //                 {/* <div style={{ backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='image w-full h-[200px]'></div> */}
    //                 <img src={item} className='image w-full'/>
    //                 {/* <ImageNextUI
    //                     alt="Card background"
    //                     className="object-cover rounded-xl image"
    //                     isZoomed
    //                     src={item}
    //                     // height={'100%'}
    //                     width={'100%'}
    //                 /> */}
    //             </CardBody>
    //         </Card>
    //     )
    // })


    let startY = 0; // 触摸开始时的Y坐标
    let initialTransformY = 0; // 元素初始的transformY值

    const handleTouchStart = (e: any) => {
        // 确保元素已经被挂载
        // if (box1.current) {
        //     // 获取元素的位置信息
        //     const rect = box1.current.getBoundingClientRect();
        //     // 计算元素距离视窗顶部的距离
        //     const distanceFromTop = rect.top;
        //     console.log(`元素距离视窗顶部的距离: ${distanceFromTop}px`);
            
        //     // 如果需要获取触摸点的位置，可以进一步处理
        //     const touch = e.touches[0];
        //     const touchY = touch.clientY;
        //     console.log(`触摸点距离视窗顶部的距离: ${touchY}px`);
        // }

        startY = e.touches[0].clientY;
        // 获取元素当前的transformY值
        const transformMatrix = window.getComputedStyle(box1.current).transform;
        initialTransformY = new WebKitCSSMatrix(transformMatrix).m42 || 0; // m42是transform矩阵中的translateY值
        console.log('initialTransformY', initialTransformY)
    }
    const handleTouchMove = (e: any) => {
        // event.preventDefault(); // 阻止默认滚动行为

        const moveY = e.touches[0].clientY - startY;
        // 使用transform来移动元素
        box1.current.style.transform = `translateY(${initialTransformY + Math.abs(moveY)}px)`;
        console.log('initialTransformY + moveY', initialTransformY + Math.abs(moveY))
    }

    return (
        // <Test />

        <Phone />

        // <div className='body-container w-full h-full' 
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // >
        //     {/* <span ref={el} /> */}
        //     <div className='web-title w-full h-auto'>
        //         <div className='w-full h-auto text-[90px]'>
        //             <div className='w-full flex'>
        //                 <div className='w-auto ml-[10%]'>
        //                     <span>武</span>
        //                     <span className='pl-[20px]'>功</span>
        //                     <span className='pl-[20px]'>山</span>
        //                 </div>
        //             </div>
        //             <div className='w-full flex justify-end'>
        //                 <div className='w-auto mr-[10%]'>
        //                     <span>五</span>
        //                     <span className='pl-[20px]'>人</span>
        //                     <span className='pl-[20px]'>行</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='top-img w-full h-auto'>
        //         <ImageNextUI
        //             isZoomed
        //             width={'100%'}
        //             height={'100%'}
        //             alt="NextUI Fruit Image with Zoom"
        //             src={girl2}
        //         />
        //     </div>
        //     <div ref={box1} className='box1 w-[500%] h-auto text-center flex items-center flex-nowrap overflow-visible'>
        //         {/* <div className='title text-3xl w-[100px] h-[100px] bg-gray-500'>你好呀1</div> */}
        //         <div className={"h-auto w-[75%] flex items-center"}>{cardItems}</div>
        //         <div className={"h-auto w-[25%]"}>
        //             <ImageNextUI
        //                 width={'100%'}
        //                 height={'100%'}
        //                 alt="NextUI Fruit Image with Zoom"
        //                 src={city}
        //             />
        //         </div>
        //     </div>
        // </div>
    )
}



// let sections = gsap.utils.toArray(".panel");
        // let scrollTween = gsap.to(sections, {
        //     xPercent: -100 * (sections.length - 1),
        //     ease: "none", // <-- IMPORTANT!
        //     scrollTrigger: {
        //       trigger: ".container",
        //       pin: true,
        //       scrub: 0.1,
        //       //snap: directionalSnap(1 / (sections.length - 1)),
        //       end: "+=3000"
        //     }
        //   });
        
        // gsap.set(".box-1, .box-2", {y: 100});
        // ScrollTrigger.defaults({markers: {startColor: "white", endColor: "white"}});
        
        // // red section
        // gsap.to(".box-1", {
        //   y: -130,
        //   duration: 2,
        //   ease: "elastic",
        //   scrollTrigger: {
        //     trigger: ".box-1",
        //     containerAnimation: scrollTween,
        //     start: "left center",
        //     toggleActions: "play none none reset",
        //     id: "1",
        //   }
        // });
        
        
        // // gray section
        // gsap.to(".box-2", {
        //   y: -120,
        //   backgroundColor: "#1e90ff",
        //   ease: "none",
        //   scrollTrigger: {
        //     trigger: ".box-2",
        //     containerAnimation: scrollTween,
        //     start: "center 80%",
        //     end: "center 20%",
        //     scrub: true,
        //     id: "2"
        //   }
        // });
        
        // // purple section
        // ScrollTrigger.create({
        //   trigger: ".box-3",
        //   containerAnimation: scrollTween,
        //   toggleClass: "active",
        //   start: "center 60%",
        //   id: "3"
        // });
        
        // // green section
        // ScrollTrigger.create({
        //   trigger: ".green",
        //   containerAnimation: scrollTween,
        //   start: "center 65%",
        //   end: "center 51%",
        //   onEnter: () => console.log("enter"),
        //   onLeave: () => console.log("leave"),
        //   onEnterBack: () => console.log("enterBack"),
        //   onLeaveBack: () => console.log("leaveBack"),
        //   onToggle: self => console.log("active", self.isActive),
        //   id: "4"
        // });
        
        // // only show the relevant section's markers at any given time
        // gsap.set(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end", {autoAlpha: 0});
        // ["red","gray","purple","green"].forEach((triggerClass, i) => {
        //   ScrollTrigger.create({
        //     trigger: "." + triggerClass,
        //     containerAnimation: scrollTween,
        //     start: "left 30%",
        //     end: i === 3 ? "right right" : "right 30%",
        //     markers: false,
        //     onToggle: self => gsap.to(".marker-" + (i+1), {duration: 0.25, autoAlpha: self.isActive ? 1 : 0})
        //   });
        // });
        
        // helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
        // function directionalSnap(increment) {
        //   let snapFunc = gsap.utils.snap(increment);
        //   return (raw, self) => {
        //     let n = snapFunc(raw);
        //     return Math.abs(n - raw) < 1e-4 || (n < raw) === self.direction < 0 ? n : self.direction < 0 ? n - increment : n + increment;
        //   };
        // }
        
        // making the code pretty/formatted.
        // PR.prettyPrint();