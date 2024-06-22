export function getDates(back) {
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
  
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
     // Current month
  
    // Calculate the month and year for two months back
    var twoMonthsBackMonth = currentMonth - back;
    
  
    if (twoMonthsBackMonth < 0) {
      twoMonthsBackMonth += 12;
      currentYear -= 1;
    }
    var firstDate = months[twoMonthsBackMonth] + ' ' + currentYear;
   
    return firstDate;
  }

  export const URI = 'https://openmca.com/api/'
  // export const URI = 'http://127.0.0.1:8000/api/'


  export const getdate = ()=>{
    const currentDate = new Date();

    // Get day, month, and year from the current date
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    // Concatenate the date parts with underscores
    const formattedDate = `${day}_${month}_${year}`;
    return formattedDate
  }

//   https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/
// https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/

// instant maize meal-> pollage


// Revives school order history
// Fromdate? Mm/yyyy
// Todate? Mm/yyyy
// SchoolId

// ———————
// Revive calculated order for that months 
// Month Mm/yyyy