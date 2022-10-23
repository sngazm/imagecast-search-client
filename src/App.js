import "instantsearch.css/themes/algolia-min.css";
import React from "react";
import {
  InstantSearch,
  InfiniteHits,
  SearchBox,
  Stats,
  Highlight,
  Snippet
} from "react-instantsearch-dom";
import "./App.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

// import logo from './logo.svg';
// import './App.css';

const searchClient = instantMeiliSearch(
  "https://meilisearch.image.club",
  "ae60869b1cf94632d5d77a25a64089ec527745038e9107b9d1dc4560a87529d7",
  {
    attributesToSnippet: ['allText:40']
  }
);


console.log(searchClient)

function App() {
  // console.log(searchClient.search('Image'))
  return (
    <div className="ais-InstantSearch">
      <h1>Image Cast 文字起こし検索</h1>
      <p>あの話してたのってImage Castのどの回だっけ？ そんなあなたのための、Image Castの過去回から検索できるページです。
        <br />
        AIによる自動文字起こしから全文検索します。もうちょっといろいろちゃんとする予定です…
      </p>
      <InstantSearch indexName="casts" searchClient={searchClient} >
        <Stats />
        <SearchBox />
        <InfiniteHits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
}


function Hit({hit}) {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="title" hit={hit} />
      </div>
      <p className="hit-categories"><Highlight attribute="categories" hit={hit} /></p>
      {/* <div className="hit-image">
        <img src={hit.picture} alt={hit.name} width="200px" />
        <p className="image-credit">Picture by <a href={hit.picture_author_profile_link}>{hit.picture_author}</a> on <a href="https://unsplash.com/?utm_source=restaurants_demo&utm_medium=referral">Unsplash</a></p>
      </div> */}
      <div className="hit-description">
        <Snippet attribute="allText" hit={hit} />
      </div>
    </div>
  )
}

export default App;
