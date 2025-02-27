import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, db, collection, addDoc, onSnapshot, doc, deleteDoc, signOut } from "../firebaseConfig";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
  const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
  const [activeView, setActiveView] = useState("overview");
  const [donators, setDonators] = useState([]); // For donations
  const [requesters, setRequesters] = useState([]); // For requests
  const [wasteData, setWasteData] = useState([]); // For waste data
  const [formData, setFormData] = useState({ name: '', email: '', location: '', timePeriod: '', description: '', category: '' });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState("");
  const [fromAuth2, setFromAuth2] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromAuth2) {
      setFromAuth2(true);
      console.log("User is from Auth2");
    } else {
      console.log("User is NOT from Auth2");
    }
  }, [location]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeUserDoc = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserName(doc.data().userName);
            console.log("User document fetched:", doc.data());
          } else {
            console.log("User document not found!");
          }
        });
        return () => unsubscribeUserDoc();
      } else {
        setUserEmail(null);
        setUserName("");
        navigate("/auth");
      }
      return () => unsubscribe();
    }, [auth, navigate]);
  }, []);

  // Fetch donations and requests if the user is not from Auth2
  useEffect(() => {
    if (!fromAuth2) {
      console.log("Fetching donations and requests...");

      const unsubscribeDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
        const donationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Donations data fetched:", donationsData);
        setDonators(donationsData);
      }, (error) => { console.error("Error fetching donations:", error); });

      const unsubscribeRequests = onSnapshot(collection(db, 'requests'), (snapshot) => {
        const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Requests data fetched:", requestsData);
        setRequesters(requestsData);
      }, (error) => { console.error("Error fetching requests:", error); });

      return () => {
        console.log("Unsubscribing from donations and requests listeners");
        unsubscribeDonations();
        unsubscribeRequests();
      };
    }
  }, [fromAuth2]);

  // Fetch waste data if the user is from Auth2
  useEffect(() => {
    if (fromAuth2) {
      console.log("Fetching waste data...");
      const unsubscribeWaste = onSnapshot(collection(db, 'waste'), (snapshot) => {
        const wasteData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Waste data fetched:", wasteData);
        setWasteData(wasteData);
      }, (error) => { console.error("Error fetching waste data:", error); });

      return () => {
        console.log("Unsubscribing from waste listener");
        unsubscribeWaste();
      };
    }
  }, [fromAuth2]);

  const handleViewChange = (view) => { setActiveView(view); setIsSidebarVisible(false); };
  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { ...formData };
    try {
      let collectionRef;
      if (fromAuth2) {
        collectionRef = collection(db, 'waste');
      } else {
        collectionRef = activeView === 'addDonation' ? collection(db, 'donations') : collection(db, 'requests');
      }
      await addDoc(collectionRef, newEntry);
      setFormData({ name: '', email: '', location: '', timePeriod: '', description: '', category: '' });
      setActiveView(fromAuth2 ? 'viewWaste' : activeView === 'addDonation' ? 'donators' : 'requesters');
    } catch (error) { console.error('Error saving data:', error); }
  };

  const onAccept = async (member, type) => {
    try {
      const response = await fetch(`https://api.brevo.com/v3/smtp/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': API_KEY },
        body: JSON.stringify({
          sender: { name: 'FoodHeaven', email: 'csecastra@gmail.com' },
          to: [{ email: userEmail, name: member.name }],
          subject: `${type} Accepted`,
          htmlContent: `<p>Hello ${member.name},</p><p>Your ${type} has been accepted. Here are the details:</p><ul><li><strong>Name:</strong> ${member.name}</li><li><strong>Email:</strong> ${member.email}</li><li><strong>Location:</strong> ${member.location}</li><li><strong>Time Period:</strong> ${member.timePeriod}</li><li><strong>Description:</strong> ${member.description}</li></ul><p>Thank you!</p>`
        })
      });

      if (response.ok) {
        console.log('Email sent successfully:', await response.json());
        let docRef;
        if (fromAuth2) {
          docRef = doc(db, 'waste', member.id);
          setWasteData(prev => prev.filter(item => item.id !== member.id));
        } else {
          docRef = type === 'donation' ? doc(db, 'donations', member.id) : doc(db, 'requests', member.id);
          if (type === 'donation') {
            setDonators(prev => prev.filter(item => item.id !== member.id));
          } else {
            setRequesters(prev => prev.filter(item => item.id !== member.id));
          }
        }
        await deleteDoc(docRef);
      } else {
        const errorData = await response.json();
        console.error('Failed to send email:', errorData);
      }
    } catch (error) { console.error('Error:', error); }
  };

  const toggleSidebar = () => { setIsSidebarVisible(!isSidebarVisible); };
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userName={userName} onLogOut={logOut} onViewChange={handleViewChange} isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} fromAuth2={fromAuth2} />
      <MainContent
        activeView={activeView}
        donators={donators}
        requesters={requesters}
        wasteData={wasteData}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        onAccept={onAccept}
        userName={userName}
        toggleSidebar={toggleSidebar}
        fromAuth2={fromAuth2}
      />
    </div>
  );
};

export default Dashboard;