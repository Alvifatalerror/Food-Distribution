import { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth >= 1024 ? projectsData?.length || 1 : 1);
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!projectsData) {
          setProjectsData([
            {
              image: "https://via.placeholder.com/400x300",
              title: "Project 1",
              price: "100",
              location: "Location 1",
            },
            {
              image: "https://via.placeholder.com/400x300",
              title: "Project 2",
              price: "200",
              location: "Location 2",
            },
          ]);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-800">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!projectsData || !assets) {
    return <div className="text-gray-800">Data not available.</div>;
  }

  return (
    <div
      id="Community"
      className="overflow-x-hidden w-full min-h-screen bg-white px-8 py-16 shadow-lg"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl mb-4 text-gray-800">
          <span className="font-extrabold">TOGETHER</span>,
          <span className="italic underline">We Make a Difference</span>
        </h2>

        <p className="text-xl text-gray-600">
          Highlighting The Unified NGO's...!!!{" "}
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-white to-red-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="w-full sm:w-1/3 px-6 flex-shrink-0">
              <div className="relative group w-64 h-64 mx-auto perspective-3d cursor-pointer">
                {/* Shadow effects below the card - reduced shadow movement */}
                <div className="absolute inset-0 bg-gray-400 rounded-full opacity-20 transform translate-y-8 blur-xl z-0 group-hover:translate-y-9 group-hover:blur-xl transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gray-200 rounded-full opacity-30 transform translate-y-6 blur-lg z-0 group-hover:translate-y-7 group-hover:blur-lg transition-all duration-500"></div>
                
                {/* Main container with reduced rotation and scale effect */}
                <div 
                  className="floating-card absolute inset-0 rounded-full transform transition-all duration-700 z-10 
                    group-hover:scale-105 group-hover:rotate-2"
                  style={{
                    transformStyle: "preserve-3d",
                  }}>
                  
                  {/* Main circular background with shadow and gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-full shadow-xl"
                    style={{
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(59, 130, 246, 0.2)",
                      transform: "translateZ(0px)",
                      backfaceVisibility: "hidden",
                    }}>
                  </div>
                  
                  {/* Content container - reduced 3D effect */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4"
                    style={{ transform: "translateZ(1px)" }}>

                    {/* Image container with subtler hover effect */}
                    <div className="relative overflow-hidden rounded-full border-4 border-white shadow-lg 
                        transition-all duration-500 group-hover:scale-105 animate-pulse-subtle"
                      style={{ 
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(59, 130, 246, 0.2)",
                        transform: "translateZ(10px)",
                      }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-32 h-32 object-cover rounded-full transition-all duration-700 
                          group-hover:scale-105"
                      />
                      {/* Overlay gradients with reduced opacity */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/5 rounded-full 
                        opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent rounded-full 
                        transition-all duration-500 animate-pulse-very-subtle"></div>
                    </div>

                    {/* Text container - subtle scale effect */}
                    <div className="text-center mt-6 transition-all duration-500 group-hover:scale-102"
                      style={{ transform: "translateZ(5px)" }}>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                        {project.title}
                      </h3>
                      <div className="flex justify-center items-center">
                        <span className="text-blue-600 font-semibold transition-all duration-500 
                          group-hover:text-blue-700">
                          {project.price}
                        </span>
                        <span className="text-red-600 font-semibold ml-2 transition-all duration-500 
                          group-hover:text-red-700">
                          {project.location}
                        </span>
                      </div>
                    </div>

                    {/* Hover glow effect with reduced opacity */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 
                      transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at center, rgba(191, 219, 254, 0.6) 0%, rgba(191, 219, 254, 0) 70%)",
                        transform: "translateZ(2px)",
                      }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between">
          <button
            onClick={prevProject}
            className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-full opacity-90 hover:opacity-100 
              shadow-md hover:shadow-blue-200 border border-blue-100 transform hover:scale-110 
              hover:rotate-2 transition-all duration-300 animate-pulse-very-subtle"
            style={{
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)",
            }}
          >
            <img src={assets?.left_arrow} alt="Prev" className="w-6 h-6 drop-shadow-sm" />
          </button>
          <button
            onClick={nextProject}
            className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-full opacity-90 hover:opacity-100 
              shadow-md hover:shadow-blue-200 border border-blue-100 transform hover:scale-110 
              hover:rotate-2 transition-all duration-300 animate-pulse-very-subtle"
            style={{
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)",
            }}
          >
            <img src={assets?.right_arrow} alt="Next" className="w-6 h-6 drop-shadow-sm" />
          </button>
        </div>
      </div>
      <div className="text-wrap text-center py-5 mt-10 md:mt-28 text-grey-800 text-2xl italic font-light md:text-xl">
        <p className="md:px-72">
          "Every partnership brings us one step closer to a hunger-free world.
          Here, we celebrate the NGOs joining our mission, working together to
          rescue surplus food and deliver it to those in need. Together, we
          truly make a difference."
        </p>
      </div>

      {/* Updated CSS animations to be more subtle */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(0.5deg);
          }
          50% {
            transform: translateY(-7px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(-0.5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes pulse-subtle {
          0% {
            transform: translateZ(10px) scale(1);
          }
          50% {
            transform: translateZ(12px) scale(1.03);
          }
          100% {
            transform: translateZ(10px) scale(1);
          }
        }
        
        @keyframes pulse-very-subtle {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.7;
          }
        }
        
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
        
        .floating-card {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 6s ease-in-out infinite;
        }
        
        .animate-pulse-very-subtle {
          animation: pulse-very-subtle 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .perspective-3d {
          perspective: 1000px;
        }
        
        .border-4 {
          border-width: 4px;
        }
        
        .group-hover\:scale-105:hover {
          transform: translateZ(10px) scale(1.05);
        }
        
        .group-hover\:scale-102:hover {
          transform: translateZ(5px) scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Projects;