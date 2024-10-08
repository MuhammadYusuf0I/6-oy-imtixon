import React from "react";

function Card({ books, onRedirect }) {
  const { id, title, authors, thumbnailUrl, pageCount } = books;

  return (
    <div
      className="bg-base-100 shadow-xl p-4 h-[550px] max-w-[280px] cursor-pointer"
      onClick={() => onRedirect(id)}
    >
      <div>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-80 object-cover"
        />
      </div>
      <div className="flex flex-col items-start mt-4">
        <h2 className="font-semibold text-[#294E6A] mb-2">
          Title: <span className="font-bold">{title}</span>
        </h2>

        <h2 className="font-semibold text-[#294E6A] mb-2">
          sahifa<span className="font-bold">{pageCount}</span>
        </h2>
        <p className="gap-2 flex mb-2">
          Authors:
          <span className="text-[#463AA1] font-bold ml-1">{authors}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
