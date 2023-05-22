export const getGreetingText = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};
