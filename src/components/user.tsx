interface UsersProps {
  user: string;
  date?: any; // Jeśli nie używasz `date`, rozważ usunięcie tej właściwości
}

const currentTime = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString(undefined, options);
};

const User: React.FC<UsersProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md">
      <p className="text-xl font-semibold mb-2">Hello, {user}!</p>
      <p className="text-gray-600">Today is: {currentTime()}</p>
    </div>
  );
};

export default User;
