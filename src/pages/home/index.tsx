import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function Home() {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
            typeSpeed: 50,
        });
    
        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    })

    return (
        <div>
            <span ref={el} />
        </div>
    )
}