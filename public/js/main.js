function getDate(){
    var today = new Date();
    var year = today.getFullYear();
    document.getElementById("currentYear").innerHTML = year;
  }
  
  getDate();