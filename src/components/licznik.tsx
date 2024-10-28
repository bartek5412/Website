import { useState } from "react";

const Licznik: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const removeCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      alert("Wartość jest mniejsza od zera");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4">Aktualny licznik: {count}</p>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={() => setCount(count + 1)}
        >
          Dodaj
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          onClick={removeCount}
        >
          Usuń
        </button>
      </div>
    </div>
  );
};

export default Licznik;
