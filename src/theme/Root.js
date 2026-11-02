import React from 'react';
import ConsentBanner from '@site/src/components/ConsentBanner';

// Root wraps every page, so the consent banner shows wherever a visitor lands.
export default function Root({children}) {
  return (
    <>
      {children}
      <ConsentBanner />
    </>
  );
}
