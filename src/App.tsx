import React, { Component } from 'react';
import { getRandomColor } from './utils';
import axios from 'axios';
import { css } from '@emotion/core';
import { FaTwitter, FaTumblr } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

import './App.css';

const override: any = css`
  display: block;
  margin: 0 auto;
`;

interface AppProps {}
interface AppState {
  color: string;
  quote: null | string;
  author: null | string;
  loading: boolean;
}
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      color: getRandomColor(),
      quote: null,
      author: null,
      loading: false
    };
  }
  componentDidMount() {
    this.fetchQuote();
  }
  fetchQuote = () => {
    this.setState({ loading: true });
    axios
      .get('https://thesimpsonsquoteapi.glitch.me/quotes?count=1')
      .then(({ data }) => {
        const { quote, character } = data[0];
        this.setState({
          quote,
          author: character,
          loading: false,
          color: getRandomColor()
        });
      });
  };

  render() {
    const { author, color, quote, loading } = this.state;
    const text = `${quote} - ${author}`;
    return (
      <div
        style={{
          backgroundColor: color
        }}
        className='App d-flex justify-content-center align-items-center'>
        <div
          style={{
            color
          }}
          id='quote-box'>
          <div className='p-5 d-flex flex-column'>
            {!!loading ? (
              <ClipLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={color}
                loading={loading}
              />
            ) : (
              <React.Fragment>
                <div id='text'>{`"${quote}"`}</div>
                <div className='text-right mt-3' id='author'>
                  {`- ${author}`}
                </div>
              </React.Fragment>
            )}
            <div className='mt-3 d-flex justify-content-between'>
              <div className='media-buttons'>
                <a
                  id='tweet-quote'
                  target='_blank'
                  href={`https://twitter.com/intent/tweet?hashtags=quotes&related=gpbaculio&text=${text}`}
                  style={{
                    backgroundColor: color,
                    color: '#f5f5f5'
                  }}
                  className={`btn btn-sm ${!!loading && 'disabled'}`}>
                  <FaTwitter />
                </a>
                <a
                  id='tumblr-quote'
                  target='_blank'
                  href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,gpbaculio&caption=${author}&content=${quote}&&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'`}
                  style={{
                    backgroundColor: color,
                    color: '#f5f5f5'
                  }}
                  className={`ml-2 btn btn-sm ${!!loading && 'disabled'}`}>
                  <FaTumblr />
                </a>
              </div>
              <button
                id='new-quote'
                type='button'
                style={{ backgroundColor: color, color: '#f5f5f5' }}
                className='btn btn-sm'
                disabled={loading}
                onClick={() => this.fetchQuote()}>
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
