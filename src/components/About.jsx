import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { assets } from '../assets/assets';
import { useNavigate } from "react-router-dom";

// Memoized components to prevent unnecessary re-renders
const StatItem = memo(({ stat, index, inView }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="w-40 sm:w-56 aspect-square relative"
  >
    <div className={`absolute inset-0 rounded-full ${stat.color} opacity-20`}></div>
    
    <div className="absolute inset-1 rounded-full bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center border border-indigo-100 shadow-md">
      <p className={`text-4xl sm:text-5xl font-bold ${stat.color} bg-clip-text text-transparent`}>
        {stat.value}
      </p>
      <p className="text-xs sm:text-sm text-indigo-900 mt-2">{stat.label}</p>
    </div>
  </motion.div>
));

const WorkCard = memo(({ item, index, inView }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50, rotateY: 30 }}
    animate={inView ? { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring", 
        stiffness: 100 
      }
    } : {
      opacity: 0, 
      y: 50,
      rotateY: 30
    }}
    whileHover={{ 
      scale: 1.05, 
      rotateY: 5,
      transition: { duration: 0.3 }
    }}
    className="group"
  >
    <div className="relative transform transition-all duration-500 h-full">
      <div className={`absolute inset-0 ${item.color} opacity-10 rounded-xl`}></div>
      
      <div className="relative bg-white/90 rounded-xl p-8 h-full border border-indigo-100 shadow-lg group-hover:shadow-xl transform transition-all">
        <div className="text-5xl mb-6">{item.icon}</div>
        <h3 className={`text-2xl font-bold mb-4 ${item.color} bg-clip-text text-transparent`}>{item.title}</h3>
        
        <div className="h-40  rounded-lg mb-6 overflow-hidden group-hover:scale-105 transition-transform border border-indigo-100">
          <div className="h-full w-full flex items-center justify-center text-indigo-400 ">
          <img src={assets[item.image]} alt="" className="w-full h-auto" />


          </div>
        </div>
        
        <p className="text-slate-800 text-xl leading-relaxed font-medium">{item.description}</p>
      </div>
    </div>
  </motion.div>
));

// Main About component
const About = () => {
  
  // Use refs to track visibility
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const howWeWorkRef = useRef(null);
  const sustainabilityRef = useRef(null);
  
  // Use state for inView to control animations
  const [sectionsInView, setSectionsInView] = useState({
    stats: false,
    mission: false,
    howWeWork: false,
    sustainability: false
  });
  const navigate = useNavigate();
  
  // Monitor sections for visibility with reset on exit
  useEffect(() => {
    
    const observerOptions = { 
      threshold: 0.3,
      rootMargin: "0px" 
    };
    
    const handleIntersection = (entries, sectionName) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSectionsInView(prev => ({ ...prev, [sectionName]: true }));
        } else {
          // Reset animation state when section leaves viewport
          setSectionsInView(prev => ({ ...prev, [sectionName]: false }));
        }
      });
    };
    
    const statsObserver = new IntersectionObserver(
      entries => handleIntersection(entries, 'stats'), 
      observerOptions
    );
    
    const missionObserver = new IntersectionObserver(
      entries => handleIntersection(entries, 'mission'), 
      observerOptions
    );
    
    const howWeWorkObserver = new IntersectionObserver(
      entries => handleIntersection(entries, 'howWeWork'), 
      observerOptions
    );
    
    const sustainabilityObserver = new IntersectionObserver(
      entries => handleIntersection(entries, 'sustainability'),
      observerOptions
    );
    
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (missionRef.current) missionObserver.observe(missionRef.current);
    if (howWeWorkRef.current) howWeWorkObserver.observe(howWeWorkRef.current);
    if (sustainabilityRef.current) sustainabilityObserver.observe(sustainabilityRef.current);
    
    return () => {
      if (statsRef.current) statsObserver.disconnect();
      if (missionRef.current) missionObserver.disconnect();
      if (howWeWorkRef.current) howWeWorkObserver.disconnect();
      if (sustainabilityRef.current) sustainabilityObserver.disconnect();
    };
  }, []);
  
  // Optimized scroll animations with reduced complexity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Reduce transform complexity with fewer interpolation points
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  // Define static data outside the render to prevent recreating on every render
  const statsData = [
    { value: '5M+', label: 'Meals Distributed', color: 'bg-gradient-to-br from-green-500 to-emerald-700' },
    { value: '1000+', label: 'Communities Served', color: 'bg-gradient-to-br from-amber-500 to-orange-700' },
    { value: '500+', label: 'NGO Partnerships', color: 'bg-gradient-to-br from-blue-500 to-indigo-700' },
    { value: '300+', label: 'Active Volunteers', color: 'bg-gradient-to-br from-red-500 to-rose-700' },
  ];
  
  const workData = [
    { 
      title: "Food Donors", 
      description: "Whether you're an individual or a business, you can easily list any surplus food you have, helping to ensure that it doesn't go to waste.",
      color: "bg-gradient-to-br from-green-500 to-emerald-700",
      icon: "🍽️",
      image: "donation"
    },
    { 
      title: "People in Need", 
      description: "If you're in need of food assistance, our platform allows you to request help. We're here to make sure you receive the support you deserve.",
      color: "bg-gradient-to-br from-blue-500 to-indigo-700",
      icon: "🤲",
      image: "receiving"
    },
    { 
      title: "NGOs", 
      description: "Non-governmental organizations can coordinate the collection and distribution of food efficiently, ensuring that every meal goes to someone who needs it.",
      color: "bg-gradient-to-br from-amber-500 to-orange-700",
      icon: "🏛️",
      image: "ngo"
    }
  ];
  
  // Reduced number of floating elements for better performance
  const floatingElements = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 20 + 10,
    animateX: [`${Math.random() * 30}%`, `${Math.random() * 30 + 70}%`],
    animateY: [`${Math.random() * 30}%`, `${Math.random() * 30 + 70}%`],
  }));
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ 
        backgroundImage: `url(${assets.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
      id="About"
    >
      {/* Simplified background with will-change optimization */}
      <motion.div 
        className="absolute inset-0 bg-white bg-opacity-60 will-change-opacity"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Reduced number of floating elements with will-change for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute w-8 h-8 rounded-full bg-indigo-500/20 backdrop-blur-md will-change-transform"
            animate={{
              x: el.animateX,
              y: el.animateY,
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            style={{
              left: el.left,
              top: el.top,
            }}
          />
        ))}
      </div>
      
      {/* Hero section */}
      <div className="relative pt-32 pb-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-indigo-800 to-slate-700">
                  About Our Cause
                </span>
              </span>
            </h1>
            
            {/* Simplified decorative elements */}
            <div className="flex justify-center items-center gap-4 mt-4 mb-8">
              <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="text-indigo-600 text-2xl">◆</div>
              <div className="h-0.5 w-16 bg-gradient-to-l from-indigo-400 to-indigo-600"></div>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-700 leading-relaxed font-light italic"
          >
            "Our Mission: Reducing Food Waste, Fighting Hunger, and Promoting Sustainability."
          </motion.p>
        </motion.div>
        
        {/* Simplified divider */}
        <div className="flex justify-center my-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="h-0.5 w-48 bg-gradient-to-r from-slate-400 via-indigo-500 to-slate-400"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-indigo-400 flex items-center justify-center bg-white">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Mission statement - UPDATED: increased text size and improved readability */}
        <motion.div 
          ref={missionRef}
          style={{ y: parallaxY1 }}
          className="relative mx-auto max-w-3xl text-center bg-white/90 backdrop-blur-md rounded-xl p-8 border border-indigo-200 shadow-lg will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={sectionsInView.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-indigo-900 text-xl leading-relaxed font-medium"
          >
            At Noshheaven, we believe that no one should go hungry, and no food should go to 
            waste. Our platform connects food donors, people in need, and NGOs to ensure that 
            surplus food reaches those who need it the most. Through a seamless process, 
            individuals, businesses, and organizations can work together to make a tangible 
            impact on hunger and sustainability.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Stats section - using memoized components */}
      <div ref={statsRef} className="relative py-20 px-6 sm:px-12">
        <div className="flex flex-wrap justify-center max-w-6xl mx-auto gap-6">
          {statsData.map((stat, index) => (
            <StatItem 
              key={index}
              stat={stat} 
              index={index} 
              inView={sectionsInView.stats} 
            />
          ))}
        </div>
      </div>
      
      {/* How we work section - UPDATED: improved card description text size and readability */}
      <div ref={howWeWorkRef} className="relative py-24 px-6 sm:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={sectionsInView.howWeWork ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center h-16 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-indigo-800 mb-16"
        >
          Bridging  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-slate-800">Hunger and Hope</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 max-w-6xl mx-auto">
          {workData.map((item, index) => (
            <WorkCard 
              key={index}
              item={item} 
              index={index} 
              inView={sectionsInView.howWeWork}
            />
          ))}
        </div>
      </div>
      
{/* Sustainability Section - Fully Fixed Hover Animations */}
<div ref={sustainabilityRef} className="relative py-20 px-6 sm:px-12 overflow-hidden">
  {/* Background animation (kept subtle) */}
  <motion.div 
    className="absolute inset-0 bg-gradient-to-b from-transparent via-green-100 to-transparent will-change-opacity"
    animate={{ opacity: [0.1, 0.2] }}
    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
  />
  
  <div className="max-w-6xl mx-auto">
    {/* Title */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-3xl md:text-5xl font-bold text-center text-transparent h-20 bg-clip-text bg-gradient-to-r from-teal-700 via-green-600 to-emerald-700 mb-12"
    >
      Sowing Sustainability Together
    </motion.h2>
    
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {/* Image Card with Hover Fix */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:w-1/2"
      >
        <motion.div 
          className="relative aspect-video overflow-hidden rounded-xl border border-green-300 shadow-lg cursor-pointer"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 8px 16px rgba(0, 128, 0, 0.15)"
          }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          <div className="absolute inset-0 bg-green-50 flex items-center justify-center text-green-600">
            <img src={assets.restaurant_waste} alt="" className="w-1/2 h-full object-cover " />
            <img src={assets.waste2_img} alt="Food Waste" className="w-1/2 h-full object-cover" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Text & Hover Fixes */}
      <motion.div 
      style={{pointerEvents: "auto" }}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:w-1/2"
      >
        <p className="text-slate-900 text-xl text-center leading-relaxed mb-6">
          In addition to tackling food insecurity, we also strive to reduce food waste's environmental impact. Our platform enables restaurants to efficiently share surplus food, allowing local farmers to repurpose it for composting or animal feed. By bridging this connection, we help restaurants minimize waste while supporting sustainable farming, creating a circular economy that benefits both people and the planet.
        </p>
        
        {/* Tags with Hover Fix */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['Composting', 'Zero Waste', 'Carbon Reduction', 'Circular Economy'].map((tag, i) => (
            <motion.span 
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#b9f6ca", 
                color: "#1b5e20",
                boxShadow: "0 6px 12px rgba(0, 128, 0, 0.2)"
              }}
              className="bg-green-100 text-green-800 border border-green-300 px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-150 ease-out"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Button with Hover Fix */}
        
       
      </motion.div>
    </div>
  </div>
</div>


      {/* Join mission call to action - UPDATED to match the whiteish theme */}
      <div className="relative py-32 px-6 sm:px-12 overflow-hidden  bg-white">
        {/* Changed background to white with subtle indigo overlay */}
        <motion.div 
          className="absolute inset-0 bg-indigo-50/30 will-change-opacity"
          animate={{ opacity: [0.3, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Added subtle floating elements that match the white theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.slice(0, 4).map((el) => (
            <motion.div
              key={`mission-${el.id}`}
              className="absolute w-8 h-8 rounded-full bg-indigo-100/40 backdrop-blur-sm border border-indigo-200/30 will-change-transform"
              animate={{
                x: el.animateX,
                y: el.animateY,
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                left: el.left,
                top: el.top,
              }}
            />
          ))}
        </div>
        
        <motion.div
          style={{ y: parallaxY2 }}
          className="max-w-4xl mx-auto text-center relative z-10 will-change-transform"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-indigo-700 to-slate-700 mb-6"
          >
            Join Our Mission
          </motion.h2>
          
          <motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="text-xl italic mb-8"
>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-600">
    "No More Wasted Meals. No More Hungry Hearts
  </span>
  <span className="text-red-500"> ❤️</span>
  <span className="ttext-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-indigo-600">
    "
  </span>
</motion.p>

          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-black-700 mb-12 max-w-2xl mx-auto text-lg"
          >
            Together, we can reduce food waste and fight hunger—one meal at a time. Whether
            you're a donor, someone in need, or an NGO, your involvement matters. Join us in
            our mission to make food accessible for all while supporting sustainability efforts that
            help our planet.
          </motion.p>
        </motion.div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 to-slate-700 mb-4"
          >
            "Thank you for being part of the solution"
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

export default About;