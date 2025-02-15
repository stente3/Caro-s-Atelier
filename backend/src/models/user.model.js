import axios from 'axios';
import bcrypt from 'bcryptjs';
import { config } from '../config/env.js';

class UserModel {
  constructor() {
    this.binId = config.jsonBinUsersBinId;
    this.apiKey = config.masterKey;
    this.baseURL = config.jsonBinUrl;
  }

  async findOne(query) {
    try {
      const response = await axios.get(`${this.binId}`, {
        headers: {
          'X-Master-Key': this.apiKey
        }
      });

      const users = response.data.record;
      return users.find(user => 
        Object.keys(query).every(key => user[key] === query[key])
      );
    } catch (error) {
      throw new Error('Error accessing users database');
    }
  }

  async save(userData) {
    try {
      const response = await axios.get(`${this.binId}`, {
        headers: {
          'X-Master-Key': this.apiKey
        }
      });
      
      const users = response.data.record;
      userData._id = Date.now().toString();
      users.push(userData);
      
      await axios.put(`${this.binId}`, users, {
        headers: {
          'X-Master-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      return userData;
    } catch (error) {
      throw new Error('Error saving user');
    }
  }
}

export default new UserModel(); 