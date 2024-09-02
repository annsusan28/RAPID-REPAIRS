import About from '../../component/about/about';
import Banner from '../../component/banner/banner';
import FAQ from '../../component/faq/faq';
import FeedbackComp from '../../component/feedback/feedback';

const SPHomePage = () => {
  return (
    <div>
      <Banner />
      <About />
      <FeedbackComp />
      <FAQ />
    </div>
  );
};

export default SPHomePage;
