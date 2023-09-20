import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import ReactMarkdown from 'react-markdown';


const importAll = (r) => r.keys().map(r);
const markdownFiles = importAll(require.context('../markdown', false, /\.md$/))
  .sort()
  .reverse();

class WhatsNew extends Component {
  state = {
    posts: [],
  }

  async componentDidMount() {
    const posts = await Promise.all(markdownFiles.map((file) => fetch(file).then((res) => res.text())))
      .catch((err) => console.error(err));

    this.setState((state) => ({ ...state, posts }));
  }

  render() {
    /* eslint-disable react/no-array-index-key */
    const { posts } = this.state;

    return (
      <div className='blog'>
        <div className='intros'>
          <h1>eggModels</h1>
          <h3><a href="https://twitter.com/eugenio_garzag" target="_blank" rel="noopener noreferrer">@eugenio_garzag</a> <a href="https://twitter.com/sebygarza" target="_blank" rel="noopener noreferrer">@sebygarza</a></h3>

        </div>

        <div className='posts-container'>
          <div className='post-box'>
            <Fragment>
              <Helmet title="eggModels" />
                <section>
                  <div>
                    {
                      posts.map((post, idx) => (
                        <div key={idx}>
                          <div>
                            <div>
                              <ReactMarkdown>{post}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </section>
            </Fragment>
          </div>
        </div>
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

export default WhatsNew;