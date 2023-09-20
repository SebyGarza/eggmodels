import Posts from './Posts.js'
import ScheduleNFL from './ScheduleNFL'

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

  return null;
};

export default Content;
