import React, { useState, useEffect } from 'react';
import { BrowseImages } from '../Browse/BrowseImages';

export function Favorites() {
  const [load, setLoad] = useState(false);
  const [links, setLinks] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    getFavorites();
    console.log("links", links);
  }, [change])

  const getFavorites = async () => {
    const userId = localStorage.getItem("authToken");
    if (userId === null) return [];

    const favs = await fetch(`http://localhost:3001/fav/getFavs`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authToken': userId!
      }
    });

    const body = await favs.json();
    console.log("fav data", body.data);
    setLinks(body.data);
    console.log("inside fav comp, liks", body.data);

    setLoad(true);
  }

  if (load)
    return (
      <BrowseImages links={links} favRefresher={{ change, setChange, links }} />
    )
  else
    return (
      <div>loading...</div>
    )
}
