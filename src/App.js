import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="btn btn-primary mt-2">{children}</button>
);

const Input = ({ type, placeholder, value, onChange }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange} className="form-control mb-3"/>
);

const Card = ({ children }) => (
  <div className="card shadow-lg p-4 text-center w-80">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Home = () => {
  const [mobile, setMobile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if(window.gtag){
    window.gtag("config", "G-XXXXXXXXXX");
  }}, []);

  const handleLogin = async () => {
    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    if (response.ok) {
      setIsLoggedIn(true);
      fetchRooms();
    }
  };

  const fetchRooms = async () => {
    const response = await fetch("http://localhost:5000/rooms");
    const data = await response.json();
    setRooms(data);
  };

  const handleBooking = () => {
    setBookingSuccess(true);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      {!isLoggedIn ? (
        <div className="card p-4 shadow-lg text-center w-50">
          <h1 className="text-primary mb-3">Patil's Inn</h1>
          <Input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      ) : bookingSuccess ? (
        <div className="card p-4 shadow-lg text-center w-50 bg-success text-white">
          <h2 className="mb-3">Room Booked Successfully!</h2>
          <p>Thank you for booking with Patil's Inn. We look forward to your stay.</p>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-primary mb-4">Available Rooms</h2>
          <div className="row justify-content-center">
            {rooms.map((room) => (
              <div key={room.id} className="col-md-4 mb-4">
                <Card>
                  <CardContent>
                    <h3 className="card-title">{room.name}</h3>
                    <p className="card-text">{room.description}</p>
                    <p className="fw-bold text-danger">Price: ₹{room.price}</p>
                    <Button onClick={handleBooking}>Book Now</Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
