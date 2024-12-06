
import { useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import './index.css'

export default function Test() {
    
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.timeline({
            scrollTrigger: {
                trigger: ".grid-container",
                start: "top top",
                end: () => innerHeight * 4,
                scrub: true,
                pin: ".grid",
                anticipatePin: 1
            }
        })
            .set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
            .to(".gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
            .from(".gridLayer", {
                scale: 3.3333,
                ease: "none",
            });


        // Images to make it look better, not related to the effect
        const size = Math.max(innerWidth, innerHeight);
        gsap.set('.gridBlock', { backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})` });

        const bigImg = new Image;
        bigImg.addEventListener("load", function () {
            gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
        });

        bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;
    })

    return (
        <div className="w-full h-full">
            <h1 className="header-section">Scroll down to see a photo gallery being revealed</h1>

            <div className="grid-container">
                <div className="grid">
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer centerPiece">
                        <div className="gridBlock centerBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"><a href="https://greensock.com" target="_blank"></a></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                    <div className="gridLayer">
                        <div className="gridBlock"></div>
                    </div>
                </div>
            </div>

            <h1 className="header-section" style={{ marginTop: '0px' }}>Some additional content</h1>
        </div>
    )
}