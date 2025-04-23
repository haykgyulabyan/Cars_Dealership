import userService from '../services/user.service.js';

class UserController {
  async createUser(req, res) {
    const { name, email } = req.body;
    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  };

  async getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  };

  async getUserById(req, res) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  };

  async updateUser(req, res) {
    const { name, email } = req.body;
    const user = await userService.updateUser(req.params.id, { name, email });
    res.json(user);
  };

  async deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  };
}

export default new UserController();
