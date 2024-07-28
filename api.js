import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class KannectionsApi {
  static async request(endpoint, data = {}, method = "get") {
    // passing authorization token in the header.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${KannectionsApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /* Individual API routes */

  /* Auth routes */

  // api call for login
  static async getToken(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  // api call for signup
  static async register(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /* Users routes */

  // api call for fetching specific user info
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // api call for increaseing user total_win by 1
  static async gainWin(username) {
    let res = await this.request(`users/${username}/gainwin`, {}, "patch");
    return res.totalWins;
  };

  // api call for increaseing user total_win by 1
  static async gainPerfectWin(username) {
    let res = await this.request(`users/${username}/gainperfectwin`, {}, "patch");
    return res.perfectWins;
  };

  // api call for unlocking an achievement for a user
  static async gainAchivement(username, code) {
    let res = await this.request(`users/${username}/achievements/${code}`, {}, "post");
    return res.unlocked;
  }

  /* Achievements routes */

  // api call for getting all achievements info
  static async getAllAchievements() {
    let res = await this.request("achievements");
    return res.achievements;
  }
}

export default KannectionsApi;