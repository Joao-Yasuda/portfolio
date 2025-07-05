import React from "react";
import Marquee from "react-fast-marquee";

function Frameworks() {
  const backendSkills = [
    { name: "Go", icon: "go" },
    { name: "CSharp", icon: "csharp" },
    { name: "DotNetCore", icon: "dotnetcore" },
    { name: "DotNet", icon: "dotnet" },
    { name: "Entity F.", icon: "efcore" },
  ];

  const frontendSkills = [
    { name: "Blazor", icon: "blazor" },
    { name: "Mudblazor", icon: "mudblazor" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Next.js", icon: "next-js" },
    { name: "React", icon: "react" },
    { name: "Tailwind", icon: "tailwind" },
  ];

  const databaseSkills = [
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
    { name: "Github", icon: "github" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "PostgreSQL", icon: "postgres" },
  ];

  return (
    <div className="flex w-full h-[14rem] gap-3 flex-col bg-transparent items-center justify-center  overflow-hidden">
      <div className="relative z-10 w-full ">
        <Marquee speed={40} direction="left" className="py-3">
          {backendSkills.map((skill, index) => (
            <TechBadge key={`backend-${index}`} skill={skill} />
          ))}
        </Marquee>
      </div>

      <div className="relative z-10 w-full">
        <Marquee speed={30} direction="right" className="py-3">
          {frontendSkills.map((skill, index) => (
            <TechBadge key={`frontend-${index}`} skill={skill} />
          ))}
        </Marquee>
      </div>
      <div className="relative z-10 w-full">
        <Marquee speed={35} direction="left" className="pt-3 pb-1">
          {databaseSkills.map((skill, index) => (
            <TechBadge key={`database-${index}`} skill={skill} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}

const Icon = ({ src }) => (
  <img
    src={src}
    className="w-4 h-4 transition-transform duration-200 hover:scale-110"
    alt="tech icon"
  />
);

const TechBadge = ({ skill }) => (
  <div className="mx-3 group cursor-pointer">
    <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-gray-900 transition-all duration-200 border border-gray-700/50 hover:scale-110 min-w-[100px] justify-center shadow-lg">
      <Icon src={`assets/logos/${skill.icon}.svg`} />
      <span className="text-gray-300 font-medium text-xs whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  </div>
);

export default Frameworks;
