exports.getCurrentDate=()=> {
    return new Date();
}

exports.isLastDayOfMonth=(date) =>{
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay.getDate() === 1;
}

exports.getMonthName = (monthIndex) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  };