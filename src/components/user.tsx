

interface UsersProps {
    user: string,
    date?: any
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
  const User: React.FC<UsersProps> = ({ user}) => {
    return (
      <div>
        <p>
          Hello, {user},
                </p>
        <p>Today is: {currentTime()}</p>
      </div>
    );
  };

  export default User;