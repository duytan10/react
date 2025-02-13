import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: block;
    margin-bottom: 40px;
  }
  .heading {
    font-style: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${props => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageStyles>
      <div className="page-content">
        <img src="/404.png" alt="notfound" className="image" />
        <h1 className="heading">404 - Looks like you're lost.</h1>
        <p className="description">
          Maybe this page used to exist or you just spelled something wrong.
          Chances are your spelled something wrong, so can you double check the
          URL?
        </p>
        <button onClick={() => navigate(-1)} className="back">
          Go back
        </button>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
