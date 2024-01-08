import styled from "styled-components";
import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/layout/Heading";

const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Featured posts</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
