import { instance } from 'api/api.interceptor';
import { IFullUser, TypeUserData } from 'types/user.interface';

const USERS = 'users';

const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      url: `${USERS}/profile`,
      method: 'GET'
    });
  },

  async updateProfile(data: TypeUserData) {
    return instance<IFullUser>({
      url: `${USERS}/profile`,
      method: 'PUT',
      data
    });
  },

  async toggleFavorite(productId: number) {
    return instance<IFullUser>({
      url: `${USERS}/profile/favorites/${productId}`,
      method: 'PATCH'
    });
  }
};

export default UserService;
