import React, { Fragment, Component } from 'react';
import ReactMarkdown from 'react-markdown';
import '../css/Blog.css';

// Exclude markdown files by name
const EXCLUDED_FILES = ['home.md'];

const importAll = (r) =>
  r
    .keys()
    .filter((filename) => !EXCLUDED_FILES.some(ex => filename.includes(ex)))
    .map(r);

const markdownFiles = importAll(require.context('../markdown', false, /\.md$/))
  .sort()
  .reverse();

class Blog extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const posts = await Promise.all(
        markdownFiles.map((file) => fetch(file).then((res) => res.text()))
      );

      this.setState({ posts });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className='blog'>
        <div className='intros'>
          <h1>EggModels</h1>
          <h3>
            <h4>jacques.morris@eggmodels.com | durie@eggmodels.com | egg@eggmodels.com | sebastian.garzagarcia@eggmodels.com</h4>
          </h3>
        </div>

        <div className='posts-container'>
          {posts.map((post, idx) => (
            <div key={idx} className="post-box">
              <Fragment>
                <ReactMarkdown>{post}</ReactMarkdown>
              </Fragment>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Blog;