import User from '../models/user.js';

class UserService {
  async createUser(data) {
    return User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    return await user.update(data);
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    return await user.destroy();
  }
}

export default new UserService();
