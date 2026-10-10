import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

// Ref: https://giscus.app/vi

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus    
      repo="hcmute-dsc/hcmute-dsc.github.io"
      repoId="R_kgDOJ59bgA"
      category="General"
      categoryId="DIC_kwDOJ59bgM4CXzEm"
      mapping="title"
      term="Discussion"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="vi"
      loading="lazy"
      id='giscus'
    />
  );
}