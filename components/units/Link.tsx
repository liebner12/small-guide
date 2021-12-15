import React from 'react';
import LinkNative from 'next/link';

interface LinkBasics {
  children?: React.ReactChild | React.ReactChild[];
  className?: string;
  onClick?: any;
}

interface LinkHref extends LinkBasics {
  href: string;
}
interface RouterLink extends LinkBasics {
  to: string;
}

type LinkType = RouterLink | LinkHref;

const Link = (props: LinkType) => {
  const { className, children, onClick, ...restProps } = props;

  if ('to' in props) {
    return (
      <LinkNative href={props.to} {...restProps}>
        <a className={className} onClick={onClick}>
          {children}
        </a>
      </LinkNative>
    );
  }

  return (
    <a
      href={props.href}
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...restProps}
    >
      {children}
    </a>
  );
};

export default Link;
