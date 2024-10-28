import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const fetchWeather = async () => {
  const response = await axios.get<WeatherData>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: 52.4069,
        longitude: 16.9299,
        hourly: ["temperature_2m", "rain"],
      },
    }
  );
  return response.data;
};

const queryClient = new QueryClient();

function Weather() {
  const { data, error, isLoading } = useQuery<WeatherData, Error>({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    refetchInterval: 1000,
  });

  const [selectedTime, setSelectedTime] = useState<boolean>(false);
  const [selectHour, setSelectHour] = useState<number>(new Date().getHours());

  const toggleSelectedTime = () => {
    setSelectedTime((prev) => !prev);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectHour(Number(e.target.value));
  };

  if (isLoading) return <p>Ładowanie danych...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  const currentTemperature = data?.hourly.temperature_2m[currentHour];
  const currentRain = data?.hourly.rain[currentHour];
  const handleTemperature = data?.hourly.temperature_2m[selectHour];
  const handleRain = data?.hourly.rain[selectHour];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
        Prognoza Pogody
      </h2>
      <button
        onClick={toggleSelectedTime}
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition"
      >
        {selectedTime ? "Prognoza godzinowa" : "Aktualna prognoza"}
      </button>

      {selectedTime ? (
        <>
          <p>Aktualna temperatura:</p>
          <p>
            Godzina: {currentHour}:{currentMinutes}:{currentSeconds},
            temperatura: {currentTemperature}°C
          </p>
          <p>Opady: {currentRain} mm</p>
        </>
      ) : (
        <div>
          <p>Prognoza godzinowa</p>
          <p>Wybierz godzinę:</p>
          <select
            value={selectHour}
            onChange={handleHourChange}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 24 }, (_, index) => (
              <option key={index} value={index}>
                {index}:00
              </option>
            ))}
          </select>
          <p>Wybrana godzina: {selectHour}:00</p>
          <p>Temperatura: {handleTemperature}°C</p>
          <p>Opady: {handleRain} mm</p>
        </div>
      )}
    </div>
  );
}

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    rain: number[];
  };
}

const Tanstack: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
};

export default Tanstack;
