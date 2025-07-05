import React from "react";
import Hero from "./sections/Hero";
import AboutMe from "./sections/AboutMe";
import MyExperience from "./sections/MyExperience";
import ProjectsSection from "./sections/MyProjects";
import ContactSection from "./sections/ContactMe";
import NavBar2 from "./sections/NavBar2";

const App = () => {
  return (
    <div className="w-full bg-black">
      <div className="container mx-auto max-w-7xl relative z-20">
        <NavBar2 />
      </div>
      <section id="hero">
        <Hero />
      </section>
      <section id="aboutme">
        <AboutMe />
      </section>
      <section id="projectssection">
        <ProjectsSection />
      </section>
      <section id="myexperience">
        <MyExperience />
      </section>
      <section id="contactsection">
        <ContactSection />
      </section>
    </div>
  );
};

export default App;
