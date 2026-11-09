import React from 'react';
import Header from '@theme-original/BlogPostItem/Header';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import CopyForLLM from '@site/src/components/CopyForLLM';

// Adds the "Copy for LLM" button above the title on a single post's page,
// but not on the blog list, where one page shows several posts.
export default function HeaderWrapper(props) {
  const {isBlogPostPage} = useBlogPost();
  return (
    <>
      {isBlogPostPage && (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem'}}>
          <CopyForLLM />
        </div>
      )}
      <Header {...props} />
    </>
  );
}
