export default {
  getSkillsOrCountry: async key => {
    const response = await fetch("http://localhost:4005/" + key);
    const json = await response.json();
    return json;
  },
  saveUser: async (url, body) => {
    const response = await fetch("http://localhost:4005/" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  },
  getUserDetails: async (url, body) => {
    const response = await fetch("http://localhost:4005/" + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  }
};
