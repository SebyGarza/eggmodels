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
      <Fragment>
        <Helmet title="eggModels" />
        <section className="section">
          <div>
            {
              posts.map((post, idx) => (
                <div className="card" key={idx}>
                  <div className="card-content">
                    <div className="content">
                      <ReactMarkdown>{post}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </Fragment>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

export default WhatsNew;