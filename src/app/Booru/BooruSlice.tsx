import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { BooruState, URL } from './types'
import { Booru } from './Booru';

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

export const getLinks = (tags: string[], showNSFW: boolean, selectedBooru: string, numRes: number): AppThunk => async dispatch => {
  const booru = new Booru(selectedBooru);
  const tagsP = !showNSFW ? tags.concat("rating:s") : tags;
  const imgsUrls = await booru.searchUrls({
    tags: tagsP,
    limit: numRes,
  });
  dispatch(populate(imgsUrls));
};

export const selectBooruLinks = (state: RootState) => state.booru.links;
export default booruSlice.reducer;