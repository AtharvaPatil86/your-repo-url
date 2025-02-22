import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import overview from "./Images/hotel-overview.jpg";
import lobby from "./Images/lobby.jpeg";
import deluxe from "./Images/deluxe.jpeg";
import standard from "./Images/standard.jpg";
import suite from "./Images/suite.jpeg";
import swimmingPool from "./Images/swimming-pool.webp";
import spa from "./Images/spa.jpg";
import gameRoom from "./Images/game-room.jpg";
import clubhouse from "./Images/clubhouse.jpg";
import tennisCourt from "./Images/tennis-court.jpg";
import poolTable from "./Images/pool-table.jpg";
import bar from "./Images/bar.jpg";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

// Button and Input Components
const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="btn btn-primary mt-2 px-4 py-2 rounded shadow-sm">{children}</button>
);

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="form-control mb-3 border border-primary shadow-sm"
  />
);

const Card = ({ children }) => (
  <div className="card shadow-lg p-4 text-center w-100 h-100 rounded border-primary">{children}</div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Home = () => {
  const [mobile, setMobile] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();  // Hook to programmatically navigate

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX");
    }
  }, []);

  const roomData = [
    {
      id: 1,
      name: "Deluxe Room",
      description: "A luxurious room with a sea view.",
      price: 5000,
      image: deluxe,
    },
    {
      id: 2,
      name: "Standard Room",
      description: "A comfortable room for budget travelers.",
      price: 2500,
      image: standard,
    },
    {
      id: 3,
      name: "Suite",
      description: "A premium suite with all amenities and an elegant design.",
      price: 8000,
      image: suite,
    },
  ];

  const handleLogin = () => {
    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoggedIn(true);
    setRooms(roomData);
    navigate("/home");  // Redirect to the "home" page after login
  };

  const handleBooking = (room) => {
    setBookingSuccess(true);
    alert(`Successfully booked the ${room.name}`);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      {!isLoggedIn ? (
        <div className="card p-4 shadow-lg text-center w-50 border-primary rounded">
          <img src={overview} alt="Hotel Overview" className="img-fluid rounded mb-3" />
          <h2 className="text-primary mb-3">Welcome to Patil's Inn</h2>
          <Input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </div>
      ) : bookingSuccess ? (
        <div className="card p-4 shadow-lg text-center w-50 bg-success text-white rounded">
          <h2 className="mb-3">Room Booked Successfully!</h2>
          <p>Thank you for booking with Patil's Inn. We look forward to your stay.</p>
        </div>
      ) : (
        <div className="text-center w-100">
          <img
            src={lobby}
            alt="Hotel"
            className="img-fluid mb-4 rounded shadow"
          />
          <h2 className="text-primary mb-4">Available Rooms</h2>
          <div className="row justify-content-center">
            {rooms.map((room) => (
              <div key={room.id} className="col-md-4 mb-4">
                <Card>
                  <img src={room.image} alt={room.name} className="img-fluid rounded mb-3 shadow-sm" />
                  <CardContent>
                    <h3 className="card-title text-primary">{room.name}</h3>
                    <p className="card-text text-muted">{room.description}</p>
                    <p className="fw-bold text-danger">Price: ₹{room.price}</p>
                    <Button onClick={() => handleBooking(room)}>Book Now</Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <Link to="/amenities" className="btn btn-secondary mt-3">View Amenities</Link>
        </div>
      )}
    </div>
  );
};

const HomeAfterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary mb-4">Select Your Room</h2>
      <div className="row justify-content-center">
        {/* Room selection cards */}
        <div className="col-md-4 mb-4">
          <Card>
            <img src={deluxe} alt="Deluxe Room" className="img-fluid rounded mb-3 shadow-sm" />
            <CardContent>
              <h3 className="card-title text-primary">Deluxe Room</h3>
              <p className="card-text text-muted">A luxurious room with a sea view.</p>
              <p className="fw-bold text-danger">Price: ₹5000</p>
              <Button onClick={() => navigate("/home")}>Book Deluxe</Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
            <img src={standard} alt="Standard Room" className="img-fluid rounded mb-3 shadow-sm" />
            <CardContent>
              <h3 className="card-title text-primary">Standard Room</h3>
              <p className="card-text text-muted">A comfortable room for budget travelers.</p>
              <p className="fw-bold text-danger">Price: ₹2500</p>
              <Button onClick={() => navigate("/home")}>Book Standard</Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-4 mb-4">
          <Card>
            <img src={suite} alt="Suite" className="img-fluid rounded mb-3 shadow-sm" />
            <CardContent>
              <h3 className="card-title text-primary">Suite</h3>
              <p className="card-text text-muted">A premium suite with all amenities and an elegant design.</p>
              <p className="fw-bold text-danger">Price: ₹8000</p>
              <Button onClick={() => navigate("/home")}>Book Suite</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Link to="/amenities" className="btn btn-secondary mt-3">View Amenities</Link>
    </div>
  );
};

const Amenities = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary mb-4">Hotel Amenities</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <img src={swimmingPool} alt="Swimming Pool" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Swimming Pool</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={spa} alt="Spa" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Spa</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={gameRoom} alt="Game Room" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Game Room</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={clubhouse} alt="Club House" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Club House</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={tennisCourt} alt="Tennis Court" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Lawn Tennis Court</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={poolTable} alt="Pool Table" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Pool Table</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src={bar} alt="Bar" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Bar</h5>
            </div>
          </div>
        </div>
      </div>
      <Link to="/home" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<HomeAfterLogin />} />
        <Route path="/amenities" element={<Amenities />} />
      </Routes>
    </Router>
  );
};

export default App;
