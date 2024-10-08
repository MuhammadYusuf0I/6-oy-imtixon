import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [pressed, setPressed] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  function validate() {
    const email = emailRef.current.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length < 3) {
      alert("Email kamida 3 ta belgidan iborat bo'lishi kerak");
      emailRef.current.focus();
      emailRef.current.style.outline = "2px solid red";
      return false;
    } else if (!emailPattern.test(email)) {
      alert("Email formati noto'g'ri");
      emailRef.current.focus();
      emailRef.current.style.outline = "2px solid red";
      return false;
    } else {
      emailRef.current.style.outline = "";
    }

    if (passwordRef.current.value.trim().length < 4) {
      alert("Parol kamida 4 ta belgidan iborat bo'lishi kerak");
      passwordRef.current.focus();
      passwordRef.current.style.outline = "2px solid red";
      return false;
    } else {
      passwordRef.current.style.outline = "";
    }

    return true;
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };

    setPressed(true);

    fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          alert(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (
          data.message === "User Not found." ||
          data.message === "Invalid Password!"
        ) {
          alert(data.message);
        } else if (data.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Mavjud bolgan email yoki username kiritildi ");
      })
      .finally(() => {
        setPressed(false);
      });
  }

  return (
    <div>
      <form
        onSubmit={handleLogin}
        className="w-1/4 mt-4 flex flex-col mx-auto rounded-md gap-5 p-5 bg-slate-100 hover:bg-stone-200 active:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-300 border"
      >
        <input
          className="border rounded-md p-3"
          ref={emailRef}
          type="text"
          placeholder="Enter username"
        />
        <input
          className="border rounded-md p-3"
          ref={passwordRef}
          type="password"
          placeholder="Enter password"
        />
        <button
          disabled={pressed}
          className=" text-gray-50 bg-blue-600 border rounded-xl text-center"
        >
          {pressed ? "LOADING..." : "Login"}
        </button>
        <Link
          className=" text-gray-50 bg-blue-600 border rounded-xl text-center"
          to="/register"
        >
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
