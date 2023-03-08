import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect } from 'react';
import remarkSlug from 'remark-slug';
import remarkExternalLinks from 'remark-external-links';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import CustomRenders from './CustomRenders';

const InterviewQuestions = () => {
    let {rootpath, filename } = useParams();
    const [post, setPost] = useState('');

    useEffect(() => {
        const filepath = (rootpath ? rootpath : "csharp" ) + "/" + (filename ? filename : "csharp-basics") + ".md";
        import(`../../docs/${filepath}`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setPost(res))
                    .catch(err => {
                        console.log(err)
                        setPost('');
                    });
            })
            .catch(err => {
                setPost('');
                console.log(err)
            });
    });
  
  return (
    <div>
          <ReactMarkdown
              remarkPlugins={[remarkSlug, remarkExternalLinks, remarkGfm]}
              component={CustomRenders}
              children={post} />
    </div>
  );
}

export default InterviewQuestions;