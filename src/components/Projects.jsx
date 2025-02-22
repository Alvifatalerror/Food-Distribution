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
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (projectsData?.length || 1)
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (projectsData?.length || 1) - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!projectsData || !assets) {
    return <div className="text-white">Data not available.</div>;
  }

  return (
    <div className="overflow-x-hidden w-screen min-h-[500px] bg-gray-900 px-8 py-16 rounded-lg shadow-lg">
      <div className="text-center mb-16">
        <h2 className="text-5xl  mb-4 text-white">
          <span className="font-extrabold">TOGETHER</span>,
          <span className="italic underline">We Make a Difference</span>
        </h2>

        <p className="text-xl text-white">
          Highlighting The Unified NGO's...!!!{" "}
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`w-full sm:w-1/3 px-6 flex-shrink-0 ${
                index === projectsData.length - 1 ? "opacity-100" : "opacity-75"
              }`}
            >
              <div className="relative group w-64 h-64 mx-auto floating-card">
                {/* Base Layer (Shadow Layer) */}
                <div className="absolute inset-0 bg-white rounded-full shadow-lg shadow-[0_4px_14px_rgba(255,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300 z-10 group-hover:shadow-[0_8px_24px_rgba(255,0,0,0.7)]"></div>

                {/* Glass Layer */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/10 z-20"></div>

                {/* Content */}
                <div className="relative z-30 w-full h-full flex flex-col items-center justify-center p-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex justify-center items-center">
                      <span className="text-green-600 font-semibold">
                        {project.price}
                      </span>
                      <span className="text-red-600 font-semibold ml-2">
                        {project.location}
                      </span>
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
            className="p-2 bg-white rounded-full opacity-80 hover:opacity-100 shadow-md hover:shadow-red-200"
          >
            <img src={assets?.left_arrow} alt="Prev" className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="p-2 bg-white rounded-full opacity-80 hover:opacity-100 shadow-md hover:shadow-red-200"
          >
            <img src={assets?.right_arrow} alt="Next" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;