import React, { useState } from "react";
import { Header } from "../components";

const QuoteCalculator = () => {
  const [areas, setAreas] = useState([]);
  const [isCash, setIsCash] = useState(false);

  const handleAddArea = () => {
    setAreas([...areas, { length: 0, width: 0 }]);
  };

  const handleRemoveArea = (index) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  const handleLengthChange = (index, value) => {
    const updatedAreas = [...areas];
    updatedAreas[index].length = value;
    setAreas(updatedAreas);
  };

  const handleWidthChange = (index, value) => {
    const updatedAreas = [...areas];
    updatedAreas[index].width = value;
    setAreas(updatedAreas);
  };

  const totalSquareFootage = areas.reduce(
    (total, area) => total + area.length * area.width,
    0
  );

  const totalCost = totalSquareFootage * 21 * 1.13;
  const totalCostCash = totalSquareFootage * 20;

  const handleCashClick = () => {
    setIsCash(!isCash);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] border-green-700 p-8">
      <Header />
      <h2 className="text-green-700 text-4xl font-bold mb-4 mt-20">
        LiveRight Quote Calculator
      </h2>
      {areas.map((area, index) => (
        <div
          key={index}
          className="bg-[#1d1d1d] rounded-lg p-4 mb-4 w-full max-w-lg"
        >
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">
              Length (ft):
            </label>
            <input
              type="number"
              onChange={(e) =>
                handleLengthChange(index, parseFloat(e.target.value))
              }
              placeholder="ex... 18"
              className="block w-full bg-[#111] text-white border border-green-700 rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2">
              Width (ft):
            </label>
            <input
              type="number"
              onChange={(e) =>
                handleWidthChange(index, parseFloat(e.target.value))
              }
              placeholder="ex... 12"
              className="block w-full bg-[#111] text-white border border-green-700 rounded py-2 px-3 mb-2 leading-tight focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            onClick={() => handleRemoveArea(index)}
            className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          >
            Remove Area
          </button>
        </div>
      ))}
      <div className="flex gap-5">
        <button
          onClick={handleAddArea}
          className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Area
        </button>
      </div>
      <p className="text-white font-bold text-2xl mt-4 mb-4">
        Total Square Footage:{" "}
        <span className="text-green-400 text-4xl pl-2">
          {totalSquareFootage}
        </span>
      </p>
      <p className="text-white font-bold text-2xl">
        Total Cost:{" "}
        <span className="text-green-400 text-4xl pl-2">
          {isCash ? `$${totalCostCash}` : `$${totalCost.toFixed(2)}`}
          {!isCash && <span className="text-sm pl-3">(price after tax)</span>}
        </span>
      </p>
      <button
        onClick={handleCashClick}
        className="bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mb-4 mt-7"
      >
        {isCash ? "No Cash" : "Are You Paying With Cash?"}
      </button>
      <div className="text-white text-sm text-center mt-10 mb-10">
        This quick quote is a rough estimate based on the information you
        provided. Keep in mind that the final amount may differ once our boss
        comes to discuss what you want done. However, this quote should give you
        a ballpark idea of what you can expect to pay. Please let us know if you
        have any questions. Thanks for considering our services! You can contact
        us liverightlandscaping.com
      </div>
    </div>
  );
};

export default QuoteCalculator;
