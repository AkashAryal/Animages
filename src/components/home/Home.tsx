import React from 'react';
import { navLink } from './types';
import { NavLink } from 'react-router-dom';

//assumes navLink should render

export function Home() {
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            YO home
          </div>
        </div>
      </div>
    </div>
  )
}