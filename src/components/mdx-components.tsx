import React from 'react';

// Headings, lists and links are styled by .am-prose. MDX images can't declare their size up front.
export const mdxComponents = {
  img: ({ alt = '', ...props }: React.ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" {...props} />
  ),
};
