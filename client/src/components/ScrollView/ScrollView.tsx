import React from 'react';
import { selectBooruLinks } from '../../app/Booru/BooruSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchBar } from '../Searchbar/SearchBar';
import { ImageCard } from '../Browse/ImageCard';

export function ScrollView(props: any) {
  //id=index of img in links arr
  console.log("props", props);
  const id: number = parseInt(props.match.params.id);
  const links: string[] = JSON.parse(decodeURIComponent(props.match.params.favUrls));

  console.log(props);
  if (links.length <= 0 || id < 0 || id > links.length - 1) {
    return (
      <div>
        <SearchBar />
        <div>invalid</div>
      </div>

    )
  }


  return (
    <div className="container">
      {id - 1 >= 0 && <Link to={{ pathname: `/scrollView/${id - 1}/${props.match.params.favUrls}`, state: links }}>Left</Link>}
      {id + 1 <= links.length - 1 && <Link to={{ pathname: `/scrollView/${id + 1}/${props.match.params.favUrls}`, state: links }}>Right</Link>}
      <div className="row">
        <div className="col-md-12">
          <ImageCard imgUrl={encodeURI(links[id])} favRefresher={{ change: null, setChange: null, li: null }} maxHeight="83vh" />

        </div>
      </div>


    </div>


  )
}