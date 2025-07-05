import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const MyExperience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [activeItem, setActiveItem] = useState(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  const experiences = [
    {
      id: 1,
      title: "Desenvolvedor Web",
      company: "Ouro Safra",
      period: "Fev de 2025 - o momento",
      city: "Pilar do Sul, SP",
      logo: "../assets/logos/ouroSafra.png",
      description:
        "Atuei no planejamento e desenvolvimento de soluções internas, como um CRM que substituiu uma ferramenta terceirizada, gerando economia significativa. Foco constante em resolver problemas reais dos usuários, com excelente comunicação e autonomia técnica.",
      technologies: [
        ".NET",
        "C#",
        "Blazor",
        "React",
        "Next.js",
        "Entity Framework",
        "PostgreSQL",
        "Docker",
        "Azure",
      ],
      highlights: [
        "Liderança no desenvolvimento de sistema interno de gerenciamento de pessoas",
        "Entrega de CRM com 80% de aprovação dos usuários",
        "Redução de 65% no tempo de processamento com Entity Framework e PostgreSQL",
        "Implementação de autenticação segura com JWT",
        "Análise de requisitos junto a stakeholders",
      ],
    },
    {
      id: 2,
      title: "Desenvolvedor Web Full-Stack em Formação",
      company: "CICCC - Cornerstone International Community College of Canada",
      period: "Ago/2023 – Dez/2025",
      city: "Vancouver, BC",
      logo: "../assets/logos/ciccc.svg",
      description:
        "Formação intensiva em Desenvolvimento de Software com ênfase em tecnologias web modernas, combinando teoria avançada e prática hands-on. O programa cobre desde fundamentos de ciência da computação até o desenvolvimento de aplicações web completas, incluindo front-end, back-end e integração com bancos de dados. Destaque para a criação de soluções web robustas e escaláveis, com foco em resolver problemas reais dos usuários e otimizar processos.",
      technologies: [
        "JavaScript",
        "React.js",
        "Node.js",
        "TailwindCss",
        "SQL",
        "NoSql",
        "APIs RESTful",
        "Git/GitHub",
        "Metodologias Ágeis (Scrum)",
        "UI/UX Design Principles",
      ],
      highlights: [
        "Domínio de Front-end e Back-end: Construindo aplicações web robustas e escaláveis com foco em performance e experiência do usuário.",
        "Projetos de Ponta a Ponta: Desenvolvi múltiplas aplicações web desde a concepção até a entrega, utilizando as tecnologias mais recentes do mercado.",
        "Pensamento Lógico e Orientado a Objetos: Fundamentos sólidos em Ciência da Computação e Programação Orientada a Objetos para resolver problemas complexos de forma eficiente.",
        "Colaboração e Inovação: Atuei em um ambiente de aprendizado dinâmico e multicultural, aprimorando minhas habilidades de trabalho em equipe e adaptação.",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleItemClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black text-white py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-gray-600/10 to-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent leading-tight">
            Minhas Experiências
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-400 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <div className="hidden sm:block absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gray-500 via-gray-400 to-gray-600 opacity-30"></div>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute left-4 sm:left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-6 sm:top-8 md:-translate-y-1/2">
                <div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-500 ${
                    visibleItems.has(index)
                      ? "bg-gradient-to-r from-gray-500 to-gray-400 border-white shadow-lg shadow-gray-500/50"
                      : "bg-gray-700 border-gray-600"
                  }`}
                ></div>
              </div>

              <div
                className={`
                  pl-12 sm:pl-16 pr-0
                  md:w-1/2 
                  ${
                    index % 2 === 0
                      ? "md:pr-8 lg:pr-16 md:pl-0 md:ml-0"
                      : "md:pl-8 lg:pl-16 md:pr-0 md:ml-auto"
                  }
                `}
              >
                <div
                  className={`bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-gray-800/60 transition-all duration-500 cursor-pointer group hover:border-gray-600/70 hover:shadow-xl hover:shadow-gray-500/10 ${
                    activeItem === exp.id
                      ? "ring-2 ring-gray-500/50 bg-gray-800/60"
                      : ""
                  }`}
                  onClick={() => handleItemClick(exp.id)}
                >
                  <div className="mb-4 sm:mb-6">
                    <div
                      className={`flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 ${
                        index % 2 === 0
                          ? "md:flex-row-reverse md:text-right"
                          : "md:flex-row md:text-left"
                      }`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden bg-transparent ">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-full h-full hidden items-center justify-center text-gray-400 text-xs font-bold">
                          {exp.company.charAt(0)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-gray-400 font-semibold text-sm sm:text-base md:text-lg truncate">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`space-y-1 ml-13 sm:ml-16 md:ml-0 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {exp.period}
                      </p>
                      <div
                        className={`flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm ${
                          index % 2 === 0
                            ? "md:justify-end"
                            : "md:justify-start"
                        }`}
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{exp.city}</span>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {exp.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <div
                      className={`flex flex-wrap gap-2 sm:gap-2.5 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-800/60 text-gray-300 rounded-lg text-xs sm:text-sm border border-gray-700/50 hover:border-gray-600/70 hover:bg-gray-700/60 transition-all duration-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeItem === exp.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-700/50 pt-4 sm:pt-6">
                      <h4
                        className={`text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base ${
                          index % 2 === 0 ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        Destaques
                      </h4>
                      <div className="space-y-2.5 sm:space-y-3">
                        {exp.highlights.map((highlight, hlIndex) => (
                          <div
                            key={hlIndex}
                            className={`flex items-start gap-3 text-gray-300 text-xs sm:text-sm leading-relaxed ${
                              index % 2 === 0
                                ? "md:flex-row-reverse md:text-right"
                                : "md:flex-row md:text-left"
                            }`}
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="flex-1">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 sm:mt-6 pt-2">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-500 rounded-full flex items-center justify-center transition-all duration-300 hover:border-gray-400 hover:bg-gray-800/30 ${
                        activeItem === exp.id ? "rotate-180" : ""
                      }`}
                    >
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border-r-2 border-b-2 border-gray-500 transform rotate-45 -mt-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[
          ...Array(
            typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 20
          ),
        ].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-10 sm:opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
};

export default MyExperience;
