// App.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CloudIcon, SunIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    pressure: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5001/api/signup", {
        email,
        password,
      });
      toast.success("Signup successful! Please login.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
    setIsLoading(false);
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/predict",
        weatherData
      );
      setPrediction(response.data.prediction);
      toast.success("Prediction generated successfully!");
    } catch (error) {
      toast.error("Failed to generate prediction");
    }
    setIsLoading(false);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
            variants={pageVariants}
            exit="exit"
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-center mb-8">
              <CloudIcon className="h-16 w-16 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Weather Prediction App
            </h1>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                <button
                  onClick={handleSignup}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  {isLoading ? "Loading..." : "Signup"}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="prediction"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="flex justify-center mb-8">
              <SunIcon className="h-16 w-16 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Weather Prediction App
            </h1>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Humidity"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  value={weatherData.humidity}
                  onChange={(e) =>
                    setWeatherData({ ...weatherData, humidity: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Wind Speed"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  value={weatherData.windSpeed}
                  onChange={(e) =>
                    setWeatherData({
                      ...weatherData,
                      windSpeed: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pressure"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  value={weatherData.pressure}
                  onChange={(e) =>
                    setWeatherData({ ...weatherData, pressure: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <button
                  onClick={handlePredict}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  {isLoading ? "Loading..." : "Predict"}
                </button>
                {prediction && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <SunIcon className="h-8 w-8 text-yellow-500" />
                      <p className="text-lg text-gray-600">
                        Predicted Temperature
                      </p>
                      <motion.span
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {prediction}°C
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
