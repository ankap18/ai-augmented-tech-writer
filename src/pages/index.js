import React from 'react';
import {Redirect} from '@docusaurus/router';

export default function Home() {
  // Temporarily hide the custom homepage by redirecting to the docs.
  return <Redirect to="/ai-augmented-tech-writer/docs/category/welcome-to-my-repository" />;
}
