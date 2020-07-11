import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBooruLinks } from '../../app/Booru/BooruSlice';
import { Link } from 'react-router-dom';
import { log } from 'util';
import { FaHeart } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';

//props has a imgUrl field
export function ImageCard(props: any) {
  const favLinks = props.favRefresher.li;
  let links: string[] = useSelector(selectBooruLinks);

  const imgUrl: string = props.imgUrl;
  const user: string | null = localStorage.getItem("authToken");
  const loggedIn = user === null ? false : true;

  const [load, setLoad] = useState(!loggedIn);
  const [favText, setFavText] = useState("");

  let change: boolean = props.favRefresher.change;
  const setChange = props.favRefresher.setChange;

  console.log("favLinks", favLinks);
  if (setChange != null) links = favLinks;
  console.log("actual links in ic", links);

  const maxHeight = props.maxHeight;
  const fetchFav = async (endpoint: string) => {
    return await fetch(`http://localhost:3001/fav/${endpoint}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authToken': user!
      },
      body: JSON.stringify({
        imgUrl: imgUrl
      })
    })
  }

  const favOrNot = async () => {
    //fetch call with imgUrl and user
    console.log(imgUrl);

    const res: Response = await fetchFav("isFav");
    const body = await res.json();

    //return favorite or unfavorite text
    console.log("is this img a fav", body.data);

    if (body.data === true)
      return "Unfavorite"
    else
      return "Favorite"
  }

  const initFavHelper = async () => {
    if (loggedIn) {
      setFavText(await favOrNot())
    }
  }

  async function initFavText() {
    console.log("comp did moutn");
    await initFavHelper();
    setLoad(true);
  }

  const handleFavRefresh = () => {
    if (change != null) {
      change = change === true ? false : true
      setChange(change); //for favorite component
    }
  }

  useEffect(() => {
    console.log("use effect in imagecard");
    initFavText();
  });

  const favoriteThis = async () => {
    await fetchFav("favorite");
    await initFavText();
    handleFavRefresh();

  }

  const unFavoriteThis = async () => {
    await fetchFav("unfavorite");
    await initFavText();
    handleFavRefresh();
  }

  const handleFav = async () => {
    if (favText.localeCompare("Favorite") === 0)
      await favoriteThis();
    else
      await unFavoriteThis();
  }

  if (load)
    return (
      <div className="card border-0" style={{
        margin: "3vh 1.5vh 3vh 1.5vh", minHeight: "30vh",
        backgroundColor: "transparent"
      }}>
        {/**
         * presence of maxWidth menas this card comes from scrollview
         */}
        {maxHeight == null &&
          <Link to={{ pathname: `/scrollView/${links.indexOf(imgUrl)}/${encodeURIComponent(JSON.stringify(links))}`, state: links }}>
            <LazyLoad once={true} placeholder={<div style={{ minHeight: "100vh", height: "100vh" }}>loading...</div>} height={"100vh"} offset={-100}>
              <div className="post-img">
                <img referrerPolicy="no-referrer" className="card-img-top" src={decodeURIComponent(imgUrl)} />
              </div>
            </LazyLoad>
          </Link>
        }

        {
          maxHeight != null &&
          <img referrerPolicy="no-referrer" className="card-img-top" src={decodeURIComponent(imgUrl)} style={{ maxHeight: maxHeight, objectFit: "scale-down", width: "auto" }} />

        }
        {loggedIn &&

          <button onClick={handleFav}>{favText}</button>
        }
      </div>
    )
  else
    return (
      <div>loading...</div>
    )
}