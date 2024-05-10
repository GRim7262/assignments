let time = 0;
const counter = () => {
  time++;
  console.log(`${time} Sec`);
  setTimeout(counter, 1000);
};
counter();
