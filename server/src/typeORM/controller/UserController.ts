import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Favorite } from '../entity/Favorite';

export class UserController {
  manager: EntityManager;

  constructor(entityMan: EntityManager) {
    this.manager = entityMan;
  }

  async insertUser(uname: string, pass: string) {
    console.log("trying to add user");
    const user: User = new User();
    user.password = pass;
    user.username = uname;
    const dbUser = await this.manager.save(user);
    console.log("inserted user", user);
    return dbUser.id;
  }

  async usernameExists(uname: string) {
    const users = await this.manager.find(User, { username: uname });
    console.log(users);

    return users.length > 0;
  }

  async getUserByNameOrNull(uname: string) {
    const user: User = await this.manager.findOneOrFail(User, { username: uname })
      .catch(e => {
        return null;
      })
    return user;
  }

  async getUserByIdOrNull(id: number) {
    const user = await this.manager.findOneOrFail(User, { id: id }).
      catch(e => { return null });
    return user;
  }

  async addFavoriteByUserId(id: number, favUrl: string) {
    console.log("entered addfav");
    //already there?
    await this.manager.findOneOrFail(Favorite, { userId: id, imgUrl: favUrl })
      .catch(e => { //if not in db . then add
        const fav = new Favorite();
        fav.imgUrl = favUrl;
        fav.userId = id;

        this.manager.save(fav);
        return true;
      });

    //alrady in db. can't add again
    return false;
  }

  async removeFavoriteByUserId(id: number, favUrl: string) {
    const fav: Favorite = await this.manager.findOneOrFail(Favorite, { imgUrl: favUrl, userId: id });

    this.manager.remove(fav);
  }

  async hasFavoriteByUserId(id: number, favUrl) {
    const user = await this.manager.findOneOrFail(User, { id: id });
    //loggin user here wont show favorites since its a promise
    const favorites = await user.favorites;
    //since we awaited. Now from here on we have access to favorites
    console.log("fav", favorites);

    let ret = false;
    favorites.forEach(element => {
      if (element.imgUrl === favUrl) {
        console.log("any true");
        ret = true;
      }

    });
    return ret;
  }

  async getFavImgUrls(id: number) {
    const user = await this.manager.findOneOrFail(User, { id: id });
    const favorites = await user.favorites;
    return favorites.map((f: Favorite) => {
      return f.imgUrl;
    });
  }
}