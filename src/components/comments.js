import React, { useEffect } from 'react';

const COMMENTS_ID = 'comments-container';

const Comments = () => {

    useEffect(() => {
        let theme = localStorage.getItem('current-theme') === 'dark' ? 'github-dark' : 'github-light';
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'kryzin/kryzin-com');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', theme);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        const comments = document.getElementById(COMMENTS_ID);
        if (comments) comments.appendChild(script);

        return () => {
            const comments = document.getElementById(COMMENTS_ID);
            if (comments) comments.innerHTML = '';
        };
    }, []);

    return (
        <div id={COMMENTS_ID} />
    );
};

export default Comments;