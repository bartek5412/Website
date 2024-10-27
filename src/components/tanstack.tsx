import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
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
  });

  // Stan do przechowywania aktualnej godziny i minut
  const [currentTime, setCurrentTime] = useState(new Date());

  // Aktualizacja godziny i minut co minutę
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 100); // 60000 ms = 1 minuta

    return () => clearInterval(interval); // Czyści interval po odmontowaniu komponentu
  }, []);
  if (isLoading) return <p>Ładowanie danych</p>;
  if (error) return <p>Bład: {error.message}</p>;
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  const currentTemperature = data?.hourly.temperature_2m[currentHour];
  const currentRain = data?.hourly.rain[currentHour];
  return (
    <div>
      <h2>Progonoza pogody</h2>
      <p>Aktualna temperatura:</p>
      <p>
        Godzina: {currentHour}:{currentMinutes}:{currentSeconds}, temperatura:{" "}
        {currentTemperature}
      </p>
      <p>Opady: {currentRain}</p>
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
    <>
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    </>
  );
};

export default Tanstack;
