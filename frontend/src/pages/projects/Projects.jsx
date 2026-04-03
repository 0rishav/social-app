import { useMemo, useState } from "react";
import ArchiveHero from "./ArchiveHero";
import FilterBar from "./FilterBar";
import LegacyMasonry from "./LegacyMasonry";
import { allProjects } from "../data/projectsData";
import HeritageSpotlight from "./HeritageSpotlight";
import MagneticCTA from "./MagneticCTA";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projectCounts = useMemo(
    () => ({
      all: allProjects.length,
      completed: allProjects.filter((p) => p.status === "completed").length,
      ongoing: allProjects.filter((p) => p.status === "ongoing").length,
      heritage: allProjects.filter((p) => p.status === "heritage").length,
    }),
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter((p) => p.status === activeFilter);
  }, [activeFilter]);
  return (
    <div>
      <ArchiveHero />
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        projectCounts={projectCounts}
      />

      <LegacyMasonry projects={filteredProjects} />
      {/* The "Heritage Spotlight" Horizontal Slider */}
      <HeritageSpotlight/>
      {/* The "Magnetic Invitation" (CTA) */}
      <MagneticCTA/>
    </div>
  );
};

export default Projects;
