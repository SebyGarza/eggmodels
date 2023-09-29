import React from 'react';
import Posts from './Blog.js'
import ScheduleNFL from './ScheduleNFL'
import Parlay from './Parlay';
import Rankings from './Rankings.js';

const Content = ({ activeTab }) => {
  if (activeTab === 'Blog') {
    return (
      <Posts />
    );
  }

  if (activeTab === 'NFL') {
    return (
      <ScheduleNFL />
    );
  }

  if (activeTab === 'Parlay') {
    return (
      <Parlay />
    );
  }

  if (activeTab === 'Rankings') {
    return (
      <Rankings />
    );
  }

  return null;
};

export default Content;
