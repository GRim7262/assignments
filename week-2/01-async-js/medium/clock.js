setInterval(function () {
  const time = new Date();

  let hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  hours: String(hours).padStart(2, "0");

  console.log(`${hours}: ${minutes}: ${seconds} ${ampm}`);
}, 1000);
