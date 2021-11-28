import React from 'react';

interface Link {
  children?: React.ReactChild | React.ReactChild[];
  to: string;
}

const Link: React.FC<Link> = ({ children, to }) => <a href={to}>{children}</a>;

export default Link;
