import { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth >= 1024 ? projectsData?.length || 1 : 1); // Use optional chaining and default
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    // Simulate loading data (replace with your actual data fetching)
    const fetchData = async () => {
      try {
        // Check if projectsData exists, if not then load it
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
      (prevIndex) => (prevIndex + 1) % (projectsData?.length || 0)
    ); // Optional chaining
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (projectsData?.length || 0) - 1 : prevIndex - 1
    ); // Optional chaining
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>; // Centered loading message
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
      </div>
    ); // Error message
  }

  if (!projectsData || !assets) {
    return <div>Data not available.</div>; // More informative message
  }

  return (
    <div className="overflow-x-hidden container mx-auto px-8 py-16 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold mb-4">
          <span className="font-pacifico bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TOGETHER
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            , We Make a Difference
          </span>
        </h2>
        <p className="text-xl bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Showcasing our impactful projects.
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Card Section */}
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="w-full sm:w-1/3 px-6 flex-shrink-0">
              <div className="bg-white rounded-full shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:shadow-blue-200 hover:border-blue-200 w-64 h-64 mx-auto flex flex-col items-center justify-center p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-32 h-32 object-cover rounded-full"
                />
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-semibold">
                      {project.price}
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {project.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between">
          <button
            onClick={prevProject}
            className="p-3 bg-white rounded-full opacity-80 hover:opacity-100 shadow-md hover:shadow-blue-200"
          >
            <img src={assets?.left_arrow} alt="Prev" className="w-8 h-8" />
          </button>
          <button
            onClick={nextProject}
            className="p-3 bg-white rounded-full opacity-80 hover:opacity-100 shadow-md hover:shadow-blue-200"
          >
            <img src={assets?.right_arrow} alt="Next" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
