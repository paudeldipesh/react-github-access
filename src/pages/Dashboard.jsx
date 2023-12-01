import { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import { GithubContext } from "../context/context";
import loadingImage from "../assets/preloader.gif";

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img className="loading-img" src={loadingImage} alt="spinner icon" />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
