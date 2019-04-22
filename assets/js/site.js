(function(){
  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser. Say buh-bye
    // console.log('Old browser');
    return;
  }

  // Library of comparison functions
  //
  // Unlike the raw operators these encapsulate, functions
  // can be passed around like any other value into other
  // functions.
  function eq(value, condition) {
    return value === condition;
  }
  function gt(value, condition) {
    return value > condition;
  }
  function gte(value, condition) {
    return value >= condition;
  }
  function lt(value, condition) {
    return value < condition;
  }
  function lte(value, condition) {
    return value <= condition;
  }

  // Data cleanup functions
  function clean_nonnumbers(value) {
    // returns value with all non-digits removed
    return value.replace(/\D/g, '');
  }
  function clean_whitespace(value) {
    // returns value with all whitespace characters removed
    return value.replace(/\s/g, '');
  }
  
  // Email validity function
  function validate_email(value) {
    var email = clean_whitespace(value);
    return validate(email, /^[^@\s]+@[^@\s]+$/g);
  }


//  detect button click to save event info to local storage
  function save_event_info(){

    document.addEventListener('click', function(event){
      if(event.target.tagName=='A'){

        var eventname = event.target.id;
        localStorage.setItem("event-id", eventname);
        localStorage.setItem("event-title", document.getElementById(eventname + "-title").innerHTML);
        localStorage.setItem("event-start-date", document.getElementById(eventname + "-start-date").innerHTML);
        localStorage.setItem("event-brief-location", document.getElementById(eventname + "-brief-location").innerHTML);
        localStorage.setItem("event-price", document.getElementById(eventname + "-price").innerHTML);
        localStorage.setItem("event-end-date", document.getElementById(eventname + "-end-date").innerHTML);
        localStorage.setItem("event-full-location", document.getElementById(eventname + "-full-location").innerHTML);
        localStorage.setItem("event-org", document.getElementById(eventname + "-org").innerHTML);
        localStorage.setItem("event-descrip", document.getElementById(eventname + "-descrip").innerHTML);
        localStorage.setItem("event-img", document.getElementById(eventname + "-img").src);
      }
    });
  }

  function set_event_info() {
      //  get all elements
      var descripPage= document.getElementById("body-description")
      var confirmPage= document.getElementById("body-confirmation")
      if(descripPage != null || confirmPage != null){
      var eventPic = document.getElementById("descrip-img");
      var eventStartDate = document.getElementById("descrip-start-date");
      var eventTitle = document.getElementById("descrip-title");
      var eventOrg = document.getElementById("descrip-org");
      var eventBriefLocation = document.getElementById("descrip-brief-location");
      var eventPrice = document.getElementById("descrip-price");
      var eventDescrip = document.getElementById("descrip-descrip");
      var eventEndDate = document.getElementById("descrip-end-date");
      var eventFullLocation = document.getElementById("descrip-full-location");

      //  Set all elements from local storage

      eventPic.src = localStorage.getItem("event-img");
      eventStartDate.innerHTML = localStorage.getItem("event-start-date");
      eventTitle.innerHTML = localStorage.getItem("event-title");
      eventOrg.innerHTML = localStorage.getItem("event-Org");
      eventBriefLocation.innerHTML = localStorage.getItem("event-brief-location");
      eventPrice.innerHTML = localStorage.getItem("event-price");
      eventDescrip.innerHTML = localStorage.getItem("event-descrip");
      eventEndDate.innerHTML = localStorage.getItem("event-end-date");
      eventFullLocation.innerHTML = localStorage.getItem("event-full-location");
    }

  }

  // Load event info to signup page
  function set_event_info_signup(){
    if(document.getElementById("form-content")!=null){
    var eventPrice = document.getElementById("event-price");
    eventPrice.innerHTML = localStorage.getItem("event-price");
    var eventName = document.getElementById("event-name");
    eventName.innerHTML = localStorage.getItem("event-title");
    }
  }


  //  Calculate total cost
  function eventPricing(){
    document.addEventListener('click', function(event){

        var numberOfTickets = document.getElementById("number-tickets-box").value;
        var costOfTickets = document.getElementById("event-price").innerHTML;
        var totalCostItem = document.getElementById("event-total-cost");

        costOfTickets=clean_nonnumbers(costOfTickets);

        var totalCost = numberOfTickets*costOfTickets;

        totalCostItem.innerHTML = "$" + totalCost;

        console.log("number of tickets "+numberOfTickets);
        console.log("cost per tickets "+costOfTickets);
        console.log("Total Cost: " + totalCost);



    });
  }

  //  Finds if value is not empty
  function not_empty(value) {

    if(value == ""){
      return(false);
    }else{
      return(true);
    }
  }

  // Finds if email is valid
  function validate_email(value){
    var re = /^[^@\s]+@[^@\s]+$/g;
    console.log(value);
    return(re.test(value));

  }


  // Validate that string is as long as it you want it to be
  function validate_string_length(string_name, how_long){
    if(string_name.length == how_long){
      return(true);
    }
    else{
      return(false);
    }
  }

  // functions to remove characters not used for input
  function clean_nonnumbers(value) {
    // returns string with no characters that aren't numbers
    return (value.replace(/\D/g,''));
  }

  //  Validate form input from user
  function formValidate() {
    var formItem = document.getElementById("form-content");

    if(formItem!=null){
    formItem.addEventListener('keyup',function(){
      var firstName = document.getElementById("first-name");
      var lastName = document.getElementById("last-name");
      var costPerTiecket = document.getElementById("tickets");
      var numberOfTickets = document.getElementById("number-tickets-box");
      var email = document.getElementById("email");
      var address = document.getElementById("address");
      var zipCode = document.getElementById("zip");
      var cityArea = document.getElementById("city");
      var stateArea = document.getElementById("state");
      var creditArea = document.getElementById("credit");
      var creditSecurityCode = document.getElementById("credit-security");
      var submitButton = document.getElementById("order");

      submitButton.disabled=true;

      if(not_empty(firstName.value)){
        document.getElementById("first-name-valid").innerHTML = "Valid Name";
      }
      else{
        document.getElementById("first-name-valid").innerHTML = "Invalid Name";
      }

      if(not_empty(lastName.value)){
        document.getElementById("last-name-valid").innerHTML = "Valid Name";
      }
      else{
        document.getElementById("last-name-valid").innerHTML = "Invalid Name";
      }

      if(numberOfTickets.value != ""){
        document.getElementById("event-price-valid").innerHTML = "Valid number of tickets";
      }
      else{
        document.getElementById("event-price-valid").innerHTML = "Invalid number of tickets";
      }

      if(validate_email(email.value)){
        document.getElementById("email-valid").innerHTML = "Valid email address";
      }
      else{
        document.getElementById("email-valid").innerHTML = "Invalid email address";
      }

      if(not_empty(address.value)){
        document.getElementById("address-valid").innerHTML = "Valid address";
      }
      else{
        document.getElementById("address-valid").innerHTML = "Invalid address";
      }

      if(validate_string_length(zipCode.value, 5)){
        document.getElementById("zip-valid").innerHTML = "Valid zip code";
      }
      else{
        document.getElementById("zip-valid").innerHTML = "Invalid zip code";
      }

      if(not_empty(cityArea.value)){
        document.getElementById("city-valid").innerHTML = "Valid city";
      }
      else{
        document.getElementById("city-valid").innerHTML = "Invalid city";
      }

      if(not_empty(stateArea.value)){
        document.getElementById("state-valid").innerHTML = "Valid state";
      }
      else{
        document.getElementById("state-valid").innerHTML = "Invalid state";
      }

      if(validate_string_length(creditArea.value, 16)){
        document.getElementById("credit-valid").innerHTML = "Valid credit card number";
      }
      else{
        document.getElementById("credit-valid").innerHTML = "Invalid credit card number";
      }

      if(validate_string_length(creditSecurityCode.value, 3)){
        document.getElementById("credit-security-valid").innerHTML = "Valid security code";
      }
      else{
        document.getElementById("credit-security-valid").innerHTML = "Invalid security code";
      }


      if(not_empty(firstName.value) && not_empty(lastName.value) && numberOfTickets.value != "" && validate_email(email.value) && not_empty(address.value) && validate_string_length(zipCode.value, 5) && not_empty(cityArea.value) && not_empty(stateArea.value) && validate_string_length(creditArea.value, 16) && validate_string_length(creditSecurityCode.value, 3))
      {
        submitButton.disabled=false;
      }
      else {
        submitButton.disabled=true;
      }
    });
  }
  }

  // Generate random order number
  function generateOrderNumber(){
    var orderNum = Math.floor(100000 + Math.random() * 900000);
    return(orderNum);
  }


  //  Ave order info after ticket purchase
  function saveOrderInfo(){

    document.addEventListener('click', function(event){

    if(event.target.id == "order"){

      var firstNameItem = document.getElementById("first-name");
      var lastNameItem = document.getElementById("last-name");
      var costPerTicketItem = document.getElementById("event-price");
      var numberOfTicketsItem = document.getElementById("number-tickets-box");
      var emailItem = document.getElementById("email");
      var creditNumItem = document.getElementById("credit");

      var firstName = firstNameItem.value;
      var lastName = lastNameItem.value;
      var costPerTicket = costPerTicketItem.innerHTML;
      var numberOfTickets = numberOfTicketsItem.value;
      var email = emailItem.value;
      var creditNum = creditNumItem.value;

      costPerTicket = clean_nonnumbers(costPerTicket);
      var totalCostOrder = costPerTicket*numberOfTickets;
      var submitButton = document.getElementById("order");

      while(creditNum.length > 4)
      {
       creditNum = creditNum.substr(1);
      }


      /*console.log("first " + firstName);
      console.log("last " + lastName);
      console.log("cost " + costPerTicket);
      console.log("num " + numberOfTickets);
      console.log("email " + email);
      console.log("credit " + creditNum);*/

      localStorage.setItem("order-first-name", firstName);
      localStorage.setItem("order-last-name", lastName);
      localStorage.setItem("order-cost", totalCostOrder);
      localStorage.setItem("order-email", email);
      localStorage.setItem("order-credit-last-four", creditNum);
    }
    });
  }

  //  Read order info on to confirmation page
  function readOrderInfo(){
    var pageName = document.getElementById("body-confirmation");
    if(pageName != null){
    var nameItem = document.getElementById("name-thanks");
    var orderNumItem = document.getElementById("order-number");
    var totalCostItem = document.getElementById("total-cost");
    var creditNumberItem = document.getElementById("credit-number");
    var emailItem = document.getElementById("emailed-to");

    var name = localStorage.getItem("order-first-name") + " " + localStorage.getItem("order-last-name");
    var cost = localStorage.getItem("order-cost");
    var credit = localStorage.getItem("order-credit-last-four");
    var email = localStorage.getItem("order-email");


    nameItem.innerHTML = "Thank You for your order " + name + "!";
    orderNumItem.innerHTML = "Order Number: " + generateOrderNumber();
    totalCostItem.innerHTML = "Total Charged: $" + cost;
    creditNumberItem.innerHTML = "Credit Card Number: XXXX-XXXX-XXXX-" + credit;
    emailItem.innerHTML = "Order Information and tickets have been emailed to the following email: " + email;
    }

  }

  document.addEventListener('DOMContentLoaded', function(){

    //  save event info from main page and load to new page

    save_event_info();

    //  Load event info on decription page
    set_event_info();

    //  Set event info on signup page
    set_event_info_signup();

    //  calculate price on signup page
    eventPricing();

    // Validate user input on form
    formValidate();

    // On form submission generate order number
    generateOrderNumber();

    //  Ave order info after submission
    saveOrderInfo();

    //  Read order info to confirmation page
    readOrderInfo();

    // Disable form submission button
    var submitButton = document.getElementById("order");
    if(submitButton!=null){
    submitButton.disabled=true;
    }

  // End of DOMContentLoaded
  });

// End of IIFE
}());
