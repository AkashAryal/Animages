import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tags from "@yaireo/tagify/dist/react.tagify";
import './SearchBar.css';
import { getLinks } from '../../app/Booru/BooruSlice';
import { FaSearch } from 'react-icons/fa'
import { BOORUS } from '../../app/Booru/Booru';
const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 5,
  //backspace: "edit",
  placeholder: "type something",
  dropdown: {
    enabled: 0 // a;ways show suggestions dropdown
  }
}

const addCallBack = (e: any) => {
  baseTagifySettings.placeholder = "";
}

const tagifyCallbacks = {
  add: addCallBack
  // remove: callback,
  // input: callback,
  // edit: callback,
  // invalid: callback,
  // click: callback,
  // keydown: callback,
  // focus: callback,
  // blur: callback,
  // "edit:input": callback,
  // "edit:updated": callback,
  // "edit:start": callback,
  // "edit:keydown": callback,
  // "dropdown:show": callback,
  // "dropdown:hide": callback,
  // "dropdown:select": callback
}




export function SearchBar() {
  const [showNSFW, setShowNSFW] = useState(false);
  const [booru, setBooru] = useState("danbooru");
  const [error, setError] = useState("");
  const [numRes, setNumRes] = useState(10);
  const max = 100; const min = 1;

  const tagifyRef: any = useRef()
  const settings = {
    ...baseTagifySettings,
    callbacks: tagifyCallbacks
  }
  const dispatch = useDispatch();

  const onSubmit = (e: any) => {
    let arr = tagifyRef.current.value.map((tag: any) => {
      return tag.value;
    })
    console.log("nsfw?", showNSFW);
    if (BOORUS.indexOf(booru) == -1) {
      setError("invalid booru");
      return;
    }

    if (numRes > max || numRes < min) {
      setError("Num Res out of bounds");
      return;
    }
    console.log("got ot dispatch");

    dispatch(getLinks(arr, showNSFW, booru, numRes));
  }


  const handleNumResChange = (e: any) => {
    const val = parseInt(e.target.value);
    setNumRes(val);
    console.log("chnaged", numRes);

  }

  const onTagChange = (e: any) => {
    e.persist();
    console.log(e.target.value);

    /*let a = e.target.value.map((obj: any) => {
      return obj.value;
    })
    setTags(a);
    console.log(tags);*/
  }
  return (
    <div>
      <div className="container-fluid padding-left-0 padding-right-0 sticky">
        <div className="card border-0 padding-top">
          <div className="row d-flex justify-content-center padding-top">
            <div className="offset-2"></div>
            <div className="col-md-8 padding-right-0">
              <Tags
                tagifyRef={tagifyRef}
                settings={settings}
                onChange={onTagChange}
              />
            </div>
            <div className="col-md-2 padding-left-0">
              <button className="btn btn-link" onClick={onSubmit}><FaSearch /></button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="offset-2"></div>
            <div className="col-md-1">
              <div className="form-check">
                <input type="checkbox" id="showNSFW" className="form-check-input"
                  onChange={(e) => { if (e.target.checked) setShowNSFW(true); else setShowNSFW(false) }} />
                <label className="form-check-label" htmlFor="showNSFW">NSFW</label>
              </div>
            </div>
            <div className="col-md-2">
              <select id="booru" className="custom-select custom-select-sm"
                onChange={(e) => { setBooru(e.target.value) }}>
                <option selected>Select Booru to use</option>
                {
                  BOORUS.map((booru: string) => {
                    return <option value={booru}>{booru + (booru.localeCompare("yandere") == 0 ? " (much slower)" : "")}</option>
                  })
                }
              </select>
            </div>
            <div className="col-md-2">
              <div className="row">
                <div className="col-md-6 padding-right-0">
                  <label htmlFor="quantity" className="col-form-label">Num results:</label>
                </div>
                <div className="col-md-6 padding-left-0">
                  <input type="number" id="quantity" className="form-control override-form-control" min={min} max={max} maxLength={3}
                    onChange={
                      handleNumResChange
                    } defaultValue={10} />
                </div>
              </div>
            </div>
            <div className="col-md-5">
              L
            </div>
            {
              error.length != 0 &&
              (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )
            }

          </div>
        </div>


      </div>

    </div >

  );
}