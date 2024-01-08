import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
      </Layout>
    </div>
  );
};

export default HomePage;
