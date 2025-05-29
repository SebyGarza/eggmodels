import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';

// Exclude markdown files by name
const EXCLUDED_FILES = ['home.md'];

const importAll = (r) =>
  r
    .keys()
    .filter((filename) => !EXCLUDED_FILES.some(ex => filename.includes(ex))) // ⛔️ exclude specified files
    .map(r);

const markdownFiles = importAll(require.context('../markdown', false, /\.md$/))
  .sort()
  .reverse();

class WhatsNew extends Component {
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
            <a href="https://twitter.com/eugenio_garzag" target="_blank" rel="noopener noreferrer">@eugenio_garzag</a>{' '}
            <a href="https://twitter.com/sebygarza" target="_blank" rel="noopener noreferrer">@sebygarza</a>
          </h3>
        </div>

        <div className='posts-container'>
          <div className='post-box'>
            <Fragment>
              <Helmet title="eggModels" />
              <section>
                {
                  posts.map((post, idx) => (
                    <div key={idx}>
                      <ReactMarkdown>{post}</ReactMarkdown>
                    </div>
                  ))
                }
              </section>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }
}

export default WhatsNew;
