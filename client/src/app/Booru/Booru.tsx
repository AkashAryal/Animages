import { search } from 'kaori';
import { Image } from 'kaori/typings/Image';
import { URL, SearchRequest } from "./types";

export const BOORUS = [
  "danbooru",
  "yandere"
]

export type btl = {
  [key: string]: number,
}

export const booruTagLimit: btl = {
  danbooru: 2,
  yandere: 6
};

export class Booru {
  private site: string;

  public constructor(site: string) {
    this.site = site;
  }

  public async search(sr: SearchRequest): Promise<Image[]> {
    const images = await search(this.site, sr);

    return images;
  }

  public async searchUrls(sr: SearchRequest): Promise<URL[]> {
    const images = await this.search(sr);
    let ret = images.map(img => {
      return img.fileURL;
    });
    return ret;
  }
}