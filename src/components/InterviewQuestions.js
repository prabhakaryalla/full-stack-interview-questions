import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React, { useState, useEffect } from 'react';
import remarkSlug from 'remark-slug';
import remarkExternalLinks from 'remark-external-links';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';

const InterviewQuestions = () => {
  let { rootpath, filename } = useParams();
  const [post, setPost] = useState('');

  useEffect(() => {
    const filepath = (rootpath ? rootpath : "csharp") + "/" + (filename ? filename : "csharp-basics") + ".md";
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
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                PreTag="div"
                language={match[1]}
                children={String(children).replace(/\n$/, "")}
                {...props}
              />
            ) : (
              <code className={className ? className : ""} {...props}>
                {children}
              </code>
            );
          }
        }}
        children={post} />
      {/* <ReactMarkdown
              remarkPlugins={[remarkSlug, remarkExternalLinks, remarkGfm]}
              component={CustomRenders} 
               /> */}
    </div>
  );
}




export default InterviewQuestions;