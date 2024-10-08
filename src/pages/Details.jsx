import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching phones:", err);
      });
  }, []);
  return (
    <div
      className="flex base-container justify-between mt-24 border rounded-xl p-10
    "
    >
      <div className=" max-w-[600px] ">
        <img src={book.thumbnailUrl} alt="" className=" w-96" />
      </div>
      <div className=" w-1/2  mt-8">
        <h2 className="mb-5 font-semibold">
          Kitob nomi: <span className=" text-blue-500">{book.title}</span>
        </h2>
        <h3 className="mb-5 font-semibold ">
          Authors: <span className=" text-blue-500">{book.authors}</span>
        </h3>
        <p className="mb-5 font-bold">
          {" "}
          Count:
          <span className=" text-red-500">{book.pageCount}</span>
        </p>
        <p className="font-medium">
          Uzoq ta'rif:{" "}
          <span className="text-indigo-500">{book.longDescription}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
