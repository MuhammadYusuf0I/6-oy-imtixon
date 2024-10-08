
import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (firstNameRef.current.value.length < 3) {
      validationErrors.firstName = "User is not valid";
      isValid = false;
    }
    if (lastNameRef.current.value.length < 3) {
      validationErrors.lastName = "Surname is not valid";
      isValid = false;
    }
    const age = parseInt(ageRef.current.value, 10);
    if (isNaN(age) || age < 18) {
      validationErrors.age = "You must be at least 18 years old.";
      isValid = false;
    }
    if (!validateEmail(emailRef.current.value)) {
      validationErrors.email = "Email is not valid";
      isValid = false;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      validationErrors.password = "Passwords do not match!";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const registerUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    setPressed(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/register`, registerUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (
          data.data.message ===
          "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi."
        ) {
          navigate("/login");

        
          firstNameRef.current.value = "";
          lastNameRef.current.value = "";
          ageRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
          setErrors({});
        }
      })
      .catch((err) => {
        console.log(err);
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