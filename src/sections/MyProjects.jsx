import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Image,
} from "lucide-react";
import ProjectModal from "../components/ProjectModal";
import Frameworks from "../components/FrameWorks";

const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "CRM Interno Ouro Safra",
      description:
        "Sistema interno de CRM desenvolvido com .NET e PostgreSQL, focado em captação de leads, gestão de clientes e otimização de processos pós-venda.",
      detailedDescription:
        "Projeto completo de CRM desenvolvido para substituir uma solução de terceiros, com foco em eficiência e personalização. O sistema permite o gerenciamento de leads, acompanhamento do funil de vendas e atividades de pós-venda. Possui autenticação segura com JWT, painel administrativo com filtros dinâmicos e dashboards interativos. Desenvolvido com foco em segurança, performance e usabilidade, obteve 80% de satisfação entre os usuários internos e reduziu o tempo de processamento em 65% com o uso de Entity Framework e PostgreSQL.",
      tech: [".NET", "Entity Framework", "PostgreSQL", "JWT", "Blazor"],
      images: [
        "../assets/img/Crm3.png",
        "../assets/img/Crm.png",
        "../assets/img/Crm2.png",
      ],
      github: "",
      demo: "https://portal.ourosafra.com.br/",
      category: "Full Stack",
      iconType: "Database",
      duration: "3 meses",
      team: "2 desenvolvedores",
      status: "Em produção",
      features: [
        "Autenticação e autorização com JWT",
        "Captação e qualificação de leads",
        "Painel administrativo com filtros e buscas dinâmicas",
        "Acompanhamento do funil de vendas",
        "Dashboard com indicadores e métricas de performance",
        "Design responsivo adaptado para uso interno",
        "Gerenciamento de atividades de pós-venda",
        "Segurança de dados e controle de acessos por perfil",
      ],
      challenges: [
        "Substituir uma ferramenta consolidada sem impactar a operação",
        "Alinhar funcionalidades técnicas com as regras de negócio do time comercial",
        "Reduzir o tempo de resposta em relatórios e consultas pesadas",
        "Manter a escalabilidade para integração futura com outros sistemas internos",
      ],
    },
    {
      id: 2,
      title: "Portfólio Pessoal",
      description:
        "Portfólio profissional construído com Next.js e Tailwind CSS para apresentar projetos, habilidades e trajetória como desenvolvedor full stack.",
      detailedDescription:
        "Este portfólio foi desenvolvido com foco em performance, acessibilidade e identidade visual. Apresenta uma estrutura limpa e responsiva, com seções dedicadas à experiência profissional, projetos detalhados, competências técnicas e contato. Implementado com ReactJs, integração com animações suaves via Framer Motion e design responsivo com Tailwind CSS. Reflete minha trajetória como desenvolvedor e funciona como vitrine dinâmica do meu trabalho.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Spline"],
      images: ["../assets/img/portfolio.png"],
      github: "https://github.com/Joao-Yasuda/portfolio",
      demo: "",
      category: "Frontend",
      iconType: "Globe",
      duration: "2 semanas",
      team: "Desenvolvimento solo",
      status: "Publicado",
      features: [
        "Design moderno e responsivo",
        "Animações com Framer Motion",
        "Seções de projetos, habilidades e experiência",
        "Organização limpa e fácil navegação",
        "UI&UX otimizado para acessibilidade",
        "Deploy com CI/CD em ambiente de produção",
      ],
      challenges: [
        "Traduzir identidade profissional em interface clara e atrativa",
        "Garantir responsividade e performance em diferentes dispositivos",
        "Manter o equilíbrio entre design visual e conteúdo técnico",
      ],
    },
    {
      id: 3,
      title: "DevPulse — Plataforma de Observabilidade",
      description:
        "Uma plataforma open-source de observabilidade desenvolvida com arquitetura de microserviços, focada em monitoramento em tempo real, métricas customizadas, ingestão de logs e alertas inteligentes. Projetada para desenvolvedores exigentes e times modernos.",
      detailedDescription:
        "O DevPulse é uma solução full-stack de observabilidade criada para dar controle total aos desenvolvedores sobre suas aplicações. Construída com microserviços desacoplados, comunicação assíncrona baseada em eventos e foco em escalabilidade, a plataforma oferece visualizações em tempo real, regras customizadas de alerta, ingestão estruturada de logs e autenticação multiusuário com RBAC. Com uma interface moderna e arquitetura extensível, o DevPulse representa uma alternativa poderosa às soluções proprietárias open-source, leve e pronta para crescer com o seu time.",
      tech: [
        "React.js",
        "Tailwind",
        "WebSocket",
        "Kafka",
        "Chart.js",
        "Go (Gin)",
        "GORM",
        "PostgreSQL",
        "Redis",
        "Docker",
        "JWT",
        "RBAC",
      ],
      images: ["../assets/img/DevPulse.png", "../assets/img/DevPulse2.png"],
      github: "https://github.com/Joao-Yasuda/DevPulse",
      demo: "",
      category: "Full Stack",
      iconType: "Code",
      duration: "Em desenvolvimento",
      team: "Desenvolvimento solo",
      status: "Planejamento e prototipagem",
      features: [
        "Dashboard em tempo real com WebSocket",
        "Módulo de logs estruturados com filtro por aplicação e nível",
        "Coleta e visualização de métricas customizadas (CPU, memória, etc)",
        "Regras de alertas configuráveis (ex: uso de CPU > 80%)",
        "Envio de alertas via Slack, email ou webhook",
        "Arquitetura baseada em microserviços e eventos (Event-Driven)",
        "Sistema de autenticação com JWT e controle de acesso por RBAC",
        "Multiusuário com gerenciamento de múltiplos projetos",
        "Extensível via plugins e integração futura com Prometheus/OpenTelemetry",
      ],
      challenges: [
        "Manter performance com ingestão contínua de dados em tempo real",
        "Modelar banco de dados eficiente para séries temporais",
        "Garantir isolamento e segurança entre múltiplos usuários e projetos",
        "Orquestrar múltiplos serviços assíncronos com Redis/NATS",
        "Criar uma experiência de usuário fluida mesmo com dados dinâmicos",
      ],
    },
  ];

  const getIcon = (iconType) => {
    const iconProps = { className: "w-5 h-5" };
    switch (iconType) {
      case "Globe":
        return <Globe {...iconProps} />;
      case "Code":
        return <Code {...iconProps} />;
      case "Smartphone":
        return <Smartphone {...iconProps} />;
      case "Database":
        return <Database {...iconProps} />;
      default:
        return <Code {...iconProps} />;
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleProjectHover = (projectId) => {
    setActiveProject(projectId);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white py-24 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-600/10 to-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gray-600/5 to-gray-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
            <div className="mb-8">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 gradient-text bg-clip-text text-transparent leading-tight">
                Meus
                <br />
                Projetos
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-gray-600 to-gray-500 mb-8 rounded-full"></div>
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Onde ideias se transformam em soluções inteligentes com foco na
                melhor experiência para o usuário.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 h-full flex flex-col justify-between hover:bg-gray-800/50 transition-all duration-500 hover:border-gray-600/50 hover:scale-105">
              <div>
                <div className="flex items-center gap-3 text-gray-400 mb-6">
                  <Cpu size={20} />
                  <span className="text-lg font-medium">TechStack</span>
                </div>
                <div className="mt-auto">
                  <Frameworks />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700/30">
                <p className="text-sm text-gray-400">
                  Tecnologias que uso para criar experiências incríveis
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              data-index={index}
              className={`group relative transform transition-all duration-700 ${
                visibleProjects.has(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={handleProjectLeave}
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden h-full transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/50 hover:border-gray-600/50 cursor-pointer group">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-gray-600/10 to-gray-500/10 opacity-0 transition-opacity duration-500 ${
                    activeProject === project.id ? "opacity-100" : ""
                  }`}
                ></div>
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-gray-700/50">
                    {getIcon(project.iconType)}
                    <span className="font-medium">{project.category}</span>
                  </div>
                  {project.images.length > 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs border border-gray-700/50">
                      <Image className="w-3 h-3" />
                      <span>{project.images.length} fotos</span>
                    </div>
                  )}
                </div>
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 text-xs bg-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-full text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1.5 text-xs bg-gray-600/40 backdrop-blur-sm border border-gray-500/30 rounded-full text-gray-300 font-medium">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-gray-700/20 to-gray-600/10 opacity-0 transition-opacity duration-500 pointer-events-none ${
                    activeProject === project.id ? "opacity-100" : ""
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        selectedProject={selectedProject}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #e5e7eb 25%,
            #d1d5db 50%,
            #9ca3af 75%,
            #6b7280 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.4;
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
