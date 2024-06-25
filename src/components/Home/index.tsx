import { homePageCarouselProducts } from "../../data/utils";
import { useGetWinesQuery } from "../../services/API";
import Carousel from "../Carousel";
import HomeCampaign from "../HomeCampaign";
import HomeCampaignMini from "../HomeCampaignMini";
import HomeHero from "../HomeHero/home-hero";
import styles from "./Home.module.css";

function Home() {
  const { data } = useGetWinesQuery();

  if (data) {
    return (
      <>
        <HomeHero />
        <h2 className={styles.topOffers}>Top offers of the week</h2>
        <Carousel arr={homePageCarouselProducts(data)} />
        <HomeCampaign
          link="ten-percent-off"
          hdr="10% OFF"
          text="Huge range of selected wines"
          finePrint="(Ends Sunday, 5pm)"
        />
        <HomeCampaignMini />
        <HomeCampaign
          link="price-drop"
          hdr="WEEKLY SPECIALS"
          text="100's of discounted wines"
          finePrint="(Ends Sunday, 5pm)"
        />
      </>
    );
  }
  return null;
}

export default Home;
