
import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-scroll';


const CustomRenders = ({ heading: { level, children } }) => {
    const slug = useRef(null);

    useLayoutEffect(() => {
        if (window.location.hash === `#${slug.current.id}`) {
            const yOffset = -80;
            const element = document.getElementById(slug.current.id);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, []);

    return React.createElement(
        `h${level}`,
        { ref: slug },
        <Link to={slug.current?.id ?? ''}>{children}</Link>
    );
}

export default CustomRenders;
