import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { BooruPost, BooruState, URL } from '../Booru/types'
const Booru = require('booru');

const initialState: BooruState = {
  links: []
}

export const booruSlice = createSlice({
  name: 'booru',
  initialState,
  reducers: {
    populate: (state, action: PayloadAction<URL[]>) => {
      state.links = action.payload;
    }
  }
});

export const { populate } = booruSlice.actions;

export const getLinks = (): AppThunk => dispatch => {
  Booru.search('safebooru', ['glaceon'], { limit: 3, random: true })
    .then((posts: BooruPost[]) => {
      let arr = posts.map((p: BooruPost) => {
        return p.fileUrl;
      });
      dispatch(populate(arr));
    }).catch((err: any) => {

      console.error("whomp whomp  " + err)

    });
};

export const selectBooruLinks = (state: RootState) => state.booru.links;
export default booruSlice.reducer;