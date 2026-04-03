import Closure from "./Closure";
import Hero from "./Hero";
import Philosophy from "./Philosophy";
import Process from "./Process";
import Projects from "./Projects";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Philosophy />
      <Projects />
      <Services />
      <Process />
      <Testimonials />
      <Closure />
    </div>
  );
};

export default Landing;
