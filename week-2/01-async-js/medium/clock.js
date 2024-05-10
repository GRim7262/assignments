const clock = () => {
  const now = new Date();
  let hours = now.getHours();
  hours = hours % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hoursAmPm = hours >= 12 ? "PM" : "AM";
  console.log(`${hours}:${minutes}:${seconds} ${hoursAmPm}`);
};
clock();
setInterval(clock, 1000);
