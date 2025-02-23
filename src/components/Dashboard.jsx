import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, db, collection, addDoc, onSnapshot, doc, deleteDoc, signOut } from "../firebaseConfig";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = () => {
    const API_KEY = import.meta.env.VITE_BREVO_API_KEY;
    const [activeView, setActiveView] = useState("overview");
    const [donators, setDonators] = useState([]); // Initialize as empty array
    const [requesters, setRequesters] = useState([]); // Initialize as empty array
    const [formData, setFormData] = useState({ name: '', email: '', location: '', timePeriod: '', description: '', category: '' });
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [userEmail, setUserEmail] = useState(null); // No need for currentUser if you only use email
    const [userName, setUserName] = useState("");

    const auth = getAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email); // Set user email
                const userDocRef = doc(db, "users", user.uid);
                const unsubscribeUserDoc = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserName(doc.data().userName);
                    } else {
                        console.log("User document not found!");
                    }
                });
                return () => unsubscribeUserDoc();
            } else {
                setUserEmail(null);
                setUserName("");
                navigate("/auth"); // Redirect to /auth if no user (important!)
            }
            return () => unsubscribe();
        }, [auth, navigate]); // Add navigate to dependency array
    }, []);

    useEffect(() => {
        const unsubscribeDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
            const donationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDonators(donationsData);
        }, (error) => { console.error("Error fetching donations:", error); }); // Error handling

        const unsubscribeRequests = onSnapshot(collection(db, 'requests'), (snapshot) => {
            const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequesters(requestsData);
        }, (error) => { console.error("Error fetching requests:", error); }); // Error handling

        return () => { unsubscribeDonations(); unsubscribeRequests(); };
    }, []);

    const handleViewChange = (view) => { setActiveView(view); setIsSidebarVisible(false); };
    const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = { ...formData }; // Simplified
        try {
            const collectionRef = activeView === 'addDonation' ? collection(db, 'donations') : collection(db, 'requests');
            await addDoc(collectionRef, newEntry);
            setFormData({ name: '', email: '', location: '', timePeriod: '', description: '', category: '' });
            setActiveView(activeView === 'addDonation' ? 'donators' : 'requesters');
        } catch (error) { console.error('Error saving data:', error); }
    };

    const onAccept = async (member, type) => {
        try {
            const response = await fetch(`https://api.brevo.com/v3/smtp/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'api-key': API_KEY },
                body: JSON.stringify({
                    sender: { name: 'FoodHeaven', email: 'csecastra@gmail.com' }, // Replace with your email
                    to: [{ email: userEmail, name: member.name }],
                    subject: `${type} Accepted`,
                    htmlContent: `<p>Hello ${member.name},</p><p>Your ${type} has been accepted. Here are the details:</p><ul><li><strong>Name:</strong> ${member.name}</li><li><strong>Email:</strong> ${member.email}</li><li><strong>Location:</strong> ${member.location}</li><li><strong>Time Period:</strong> ${member.timePeriod}</li><li><strong>Description:</strong> ${member.description}</li></ul><p>Thank you!</p>`
                })
            });

            if (response.ok) {
                console.log('Email sent successfully:', await response.json());
                const docRef = type === 'donation' ? doc(db, 'donations', member.id) : doc(db, 'requests', member.id);
                await deleteDoc(docRef);
                if (type === 'donation') {
                    setDonators(prev => prev.filter(item => item.id !== member.id));
                } else {
                    setRequesters(prev => prev.filter(item => item.id !== member.id));
                }
            } else {
                const errorData = await response.json(); // Get error details from Brevo
                console.error('Failed to send email:', errorData); // Log detailed error
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
            <Sidebar userName={userName} onLogOut={logOut} onViewChange={handleViewChange} isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <MainContent activeView={activeView} donators={donators} requesters={requesters} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} onAccept={onAccept} userName={userName} toggleSidebar={toggleSidebar} />
        </div>
    );
};

export default Dashboard;