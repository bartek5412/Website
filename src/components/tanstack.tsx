import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
export const fetchWeather = async () => {
  const response = await axios.get<WeatherData>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: 52.4069,
        longitude: 16.9299,
        hourly: "temperature_2m",
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
  if (isLoading) return <p>Ładowanie danych</p>;
  if (error) return <p>Bład: {error.message}</p>;
  const currentHour = new Date().getHours();
  const currentTemperature = data?.hourly.temperature_2m[currentHour];
  return (
    <div>
      <h2>Progonoza pogody</h2>
      <p>Aktualna temperatura:</p>
      <p>
        Godzina: {currentHour}, temperatura: {currentTemperature}
      </p>
    </div>
  );
}
interface WeatherData {
  hourly: { temperature_2m: number[] };
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
