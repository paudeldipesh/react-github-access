import { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  // Mock Data Of Dipesh Paudel
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // Requests And Loading State
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Error State
  const [error, setError] = useState({ show: false, message: "" });

  function toggleError(show = false, message = "") {
    setError({ show, message });
  }

  // Search GitHub User
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);

    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((error) => console.log(error.message));

    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios.get(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const state = "fulfilled";
          if (repos.status === state) {
            setRepos(repos.value.data);
          }
          if (followers.status === state) {
            setFollowers(followers.value.data);
          }
        })
        .catch((error) => console.log(error.message));
    } else {
      toggleError(true, "there is no user with that username.");
    }

    checkRequests();
    setIsLoading(false);
  };

  // Check Rate
  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "Sorry, you have exceeded your hourly rate limit.");
        }
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
