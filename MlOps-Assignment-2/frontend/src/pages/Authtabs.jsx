import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const TabButton = ({ selected, title, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-8 py-2 rounded-lg font-medium transition-colors ${
      selected
        ? "bg-violet-600 text-white"
        : "text-violet-600 hover:bg-violet-50"
    }`}
  >
    {title}
  </motion.button>
);

const Input = ({ type, placeholder, value, onChange, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative"
  >
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      <Icon className="h-5 w-5" />
    </div>
    <input
      type={type}
      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </motion.div>
);

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // const loadingToast = toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("Welcome back!");
        Cookies.set("token", response.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    // const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Account created successfully!");
        setActiveTab("login");
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    // const loadingToast = toast.loading(
    //   showResetPassword ? "Updating password..." : "Sending reset email..."
    // );

    try {
      const endpoint = showResetPassword ? "change-password" : "reset-password";
      const payload = showResetPassword ? { email, password } : { email };

      await fetch(`http://localhost:3000/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      toast.success(
        showResetPassword
          ? "Password updated successfully!"
          : "Reset instructions sent to your email",
      );

      if (showResetPassword) {
        setActiveTab("login");
        setShowResetPassword(false);
      } else {
        setShowResetPassword(true);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-3xl font-bold text-violet-900 mb-2">
            {activeTab === "login"
              ? "Welcome back"
              : activeTab === "signup"
              ? "Create account"
              : "Reset password"}
          </h2>
          <p className="text-gray-500">
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : activeTab === "signup"
              ? "Fill in your information to get started"
              : "Enter your email to receive reset instructions"}
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          <TabButton
            selected={activeTab === "login"}
            title="Login"
            onClick={() => setActiveTab("login")}
          />
          <TabButton
            selected={activeTab === "signup"}
            title="Signup"
            onClick={() => setActiveTab("signup")}
          />
          <TabButton
            selected={activeTab === "reset"}
            title="Reset"
            onClick={() => setActiveTab("reset")}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={(props) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  {...props}
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              )}
            />

            {(activeTab !== "reset" || showResetPassword) && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={(props) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    {...props}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              />
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              onClick={
                activeTab === "login"
                  ? handleLogin
                  : activeTab === "signup"
                  ? handleSignup
                  : handleResetPassword
              }
              className={`w-full py-2 rounded-lg bg-violet-600 text-white font-medium transition-all 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-violet-700"
                }
              `}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : activeTab === "login" ? (
                "Sign in"
              ) : activeTab === "signup" ? (
                "Create account"
              ) : showResetPassword ? (
                "Update password"
              ) : (
                "Send reset link"
              )}
            </motion.button>

            {activeTab === "login" && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveTab("reset")}
                className="w-full text-center text-sm text-violet-600 hover:text-violet-700 mt-4"
              >
                Forgot your password?
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
