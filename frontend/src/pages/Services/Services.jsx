import ComparisonMatrix from "./ComparisonMatrix";
import FinalCTA from "./FinalCTA";
import Hero from "./Hero";
import Methodology from "./Methodology";
import ServiceCategories from "./ServiceCategory";
import StudioStats from "./StudioStats";
import ValuesSection from "./ValueSection";

const Services = () => {
  return (
    <div>
      <Hero />
      <Methodology />
      <ValuesSection/>
      <ComparisonMatrix/>
      <ServiceCategories/>
      <StudioStats/>
      <FinalCTA/>
    </div>
  );
};

export default Services;
