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

  // Upewnij się, że te warunki są na początku, aby zawsze zwrócić JSX
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
    <div>
      <button onClick={toggleSelectedTime}>
        {selectedTime ? "Prognoza godzinowa" : "Aktualna prognoza"}
      </button>

      {selectedTime ? (
        <>
          <h2>Aktualna prognoza</h2>

          <p>Aktualna temperatura:</p>
          <p>
            Godzina: {currentHour}:{currentMinutes}:{currentSeconds},
            temperatura:
            {currentTemperature}°C
          </p>
          <p>Opady: {currentRain} mm</p>
        </>
      ) : (
        <div>
          {" "}
          <p>Prognoza godzinowa</p>
          <p>Wybierz godzinę:</p>
          <select value={selectHour} onChange={handleHourChange}>
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
