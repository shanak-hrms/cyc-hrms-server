const generateRandomID=()=> {
    const prefix = 'CYNHRMS';
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomPart = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * randomChars.length);
        randomPart += randomChars.charAt(randomIndex);
    }

    return prefix + randomPart;
}

module.exports = { 
    generateRandomID: generateRandomID,
  };