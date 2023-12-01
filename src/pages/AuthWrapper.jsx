import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loadingGif from "../assets/preloader.gif";

function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="spinner icon" />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }

  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  img {
    width: 150px;
  }
`;

export default AuthWrapper;
