import { useContext } from "react";
import styled from "styled-components";
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./charts";
import { GithubContext } from "../context/context";

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const chartData = repos.reduce((acc, cur) => {
    const { language, stargazers_count } = cur;

    if (!language) return acc;

    if (!acc[language]) {
      acc[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      acc[language] = {
        ...acc[language],
        value: acc[language].value + 1,
        stars: acc[language].stars + stargazers_count,
      };
    }

    return acc;
  }, {});

  // Most Used Language
  const mostUsedLanguage = Object.values(chartData)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Most Popular Language
  const mostPopularLanguage = Object.values(chartData)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Stars And Forks
  let { stars, forks } = repos.reduce(
    (acc, cur) => {
      const { stargazers_count, name, forks } = cur;
      acc.stars[stargazers_count] = { label: name, value: stargazers_count };
      acc.forks[forks] = { label: name, value: forks };
      return acc;
    },
    {
      stars: {},
      forks: {},
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguage} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopularLanguage} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }

  .fusioncharts-container {
    width: 100% !important;
  }

  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
