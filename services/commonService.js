

const generateRandomNumber = () => {
    const timestamp = Date.now();
    const randomFactor = Math.floor(Math.random() * 1000000); 
    const randomNumber = randomFactor + timestamp;
    return randomNumber;
};



module.exports =  { generateRandomNumber }