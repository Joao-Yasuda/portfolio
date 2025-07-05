import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Instagram,
} from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  const EMAILJS_CONFIG = {
    SERVICE_ID: "service_1looyj1",
    TEMPLATE_ID: "template_vbde7j4",
    PUBLIC_KEY: "ZrnSnsMtFFH1MK-th",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus("error");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitStatus("error");
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (!window.emailjs) {
        throw new Error("EmailJS not loaded");
      }
      const result = await window.emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "joaoyasuda@gmail.com",
      href: "mailto:joaoyasuda@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(15) 99795-5458",
      href: "tel:+551599795-5458",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "São Paulo, Brazil",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Joao-Yasuda", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/joao-yasuda/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/joao_yasuda/",
      label: "Instagram",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-600/10 to-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Vamos Conversar!
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Pronto para tirar suas ideias do papel? Adoraria saber mais sobre
              seu projeto e explorar como podemos trabalhar juntos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div
              className={`space-y-8 transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="group flex items-center space-x-4 p-4 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-gray-700/40 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-gray-600/50 transition-colors duration-300">
                      <method.icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{method.label}</p>
                      <p className="text-white font-medium">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="pt-8">
                <h3 className="text-white font-semibold mb-4">Me Siga</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="p-3 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg hover:bg-gray-700/40 hover:border-gray-600/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="space-y-6">
                {submitStatus && (
                  <div
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      submitStatus === "success"
                        ? "bg-green-800/40 border border-green-700/50 text-green-200"
                        : "bg-red-800/40 border border-red-700/50 text-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm">
                      {submitStatus === "success"
                        ? "Mensagem enviada com sucesso! Eu responderei o mais breve possível."
                        : "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde."}
                    </span>
                  </div>
                )}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-4 bg-gray-800/40 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      focusedField === "name"
                        ? "border-gray-400 ring-2 ring-gray-400/30 bg-gray-700/50"
                        : "border-gray-700/50 hover:border-gray-600/50"
                    }`}
                    placeholder="Seu Nome"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-4 bg-gray-800/40 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-gray-400 ring-2 ring-gray-400/30 bg-gray-700/50"
                        : "border-gray-700/50 hover:border-gray-600/50"
                    }`}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full px-4 py-4 bg-gray-800/40 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                      focusedField === "message"
                        ? "border-gray-400 ring-2 ring-gray-400/30 bg-gray-700/50"
                        : "border-gray-700/50 hover:border-gray-600/50"
                    }`}
                    placeholder="Mensagem"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative w-full py-4 px-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white font-medium hover:bg-gray-700/40 hover:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
