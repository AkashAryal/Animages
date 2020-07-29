import React from 'react';
import { SearchBar } from '../Searchbar/SearchBar'
import { selectBooruLinks } from '../../app/Booru/BooruSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ImageCard } from './ImageCard'

const perRow = 4;
export const BrowseImages = (props: any) => {
  console.log("bi prosp", props);

  let change: boolean | null = null;
  let setChange: any = null;
  let li: any = null;
  if (props.favRefresher != null) {
    change = props.favRefresher.change;
    setChange = props.favRefresher.setChange;
    li = props.favRefresher.links;
  }

  const links: string[] = props.links;
  //get [ [row1 has perRow cards] [row2] []]
  const getRows = (): JSX.Element[][] => {
    const ret = [];
    for (let i = 0; i < links.length; i) {
      let j = i;
      let oneRow = []
      for (j; j < i + perRow && j < links.length; j++) {
        oneRow.push(<ImageCard imgUrl={links[j]} favRefresher={{ change, setChange, li }} />);
      }
      ret.push(oneRow)
      i = j;
    }
    return ret;
  }


  return (
    <div>
      {props.favRefresher == null &&
        <SearchBar />
      }

      {
        getRows().map((row: JSX.Element[]) => {
          return (<div className="container">
            <div className="row">
              {
                row.map((card: JSX.Element) => {
                  const md_lg = 12 / perRow;
                  return (<div className={"col-sm-12 col-md-" + md_lg + " col-lg-" + md_lg}>
                    {card}
                  </div>)
                })
              }
            </div>
          </div>)
        })

      }
    </div>
  )
}