import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const formRef = useRef();
  const [pressed, setPressed] = useState(false);
  const [errors, setErrors] = useState({});

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  };

  const validate = () => {
    if (firstNameRef.current.value.trim().length < 3) {
      alert("First name must be at least 2 characters long.");
    }

    if (lastNameRef.current.value.trim().length < 2) {
      alert("Last name must be at least 2 characters long.");
    }

    if (!validateEmail(emailRef.current.value)) {
      alert("Invalid email address.");
    }

    if (!ageRef.current.value || ageRef.current.value < 18) {
      alert("You must be at least 18 years old.");
    }

    if (passwordRef.current.value.trim().length < 4) {
      alert("Password must be at least 4 characters.");
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match.");
    }

    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const user = {
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      age: ageRef.current.value,
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    console.log(user);
    setPressed(true);
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((reset) => {
        if (!reset.ok) {
          return res.json().then((errorData) => {
            alert(errorData.message || `Server error: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === "User registered successfully!") {
          formRef.current.reset();
          alert("Registration successful! You can now log in.");
          navigate("/login");
        } else {
          alert(data.message || "An unknown error occurred. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("Username is already in use")) {
          alert("This username is already taken. Please choose another one.");
        } else if (err.message.includes("Email is already in use")) {
          alert("This email is already registered. Please log in.");
        } else {
          alert("Registration failed. Please check your input and try again.");
        }
      })
      .finally(() => {
        setPressed(false);
      });
  };

  return (
    <div>
      <form
        ref={formRef}
        onSubmit={handleRegister}
        className="w-1/4 mt-4 flex flex-col mx-auto border bg-slate-100 rounded-md gap-5 p-5 hover:bg-stone-200 active:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300"
      >
        <input
          className={`border rounded-md p-3 ${
            errors.firstName ? "outline-red-500" : ""
          }`}
          ref={firstNameRef}
          type="text"
          placeholder="Enter first name"
          aria-label="First Name"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.lastName ? "outline-red-500" : ""
          }`}
          ref={lastNameRef}
          type="text"
          placeholder="Enter last name"
          aria-label="Last Name"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

        {/* Email input */}
        <input
          className={`border rounded-md p-3 ${
            errors.email ? "outline-red-500" : ""
          }`}
          ref={emailRef}
          type="email"
          placeholder="Enter email"
          aria-label="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.age ? "outline-red-500" : ""
          }`}
          ref={ageRef}
          type="number"
          placeholder="Enter age"
          aria-label="Age"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.password ? "outline-red-500" : ""
          }`}
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
          aria-label="Password"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <input
          className={`border rounded-md p-3 ${
            errors.confirmPassword ? "outline-red-500" : ""
          }`}
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm password"
          aria-label="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}

        <button
          disabled={pressed}
          className="py-2 m-auto text-gray-50 bg-blue-600 w-full px-40 border rounded-xl"
        >
          {pressed ? "LOADING..." : "Register"}
        </button>

        <Link
          className="w-full px-40 py-2 m-auto text-gray-50 bg-blue-600 border rounded-xl text-center"
          to="/login"
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
