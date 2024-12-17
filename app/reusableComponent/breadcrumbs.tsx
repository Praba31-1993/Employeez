"use client"
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadcrumbsComponent() {
  return (
    <div role="presentation para2" className='my-1' onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" className='para2' color="inherit" href="/">
          MUI
        </Link>
        <Link
        className='para2'
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
        className='para2'
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
    </div>
  );
}
