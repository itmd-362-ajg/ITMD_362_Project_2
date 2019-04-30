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

  // All purpose validate function. It takes a value,
  // along with either a regular expression pattern or
  // a simple function -- like the comparison functions
  // above -- and a condition. JavaScript doesn't char
  // if a function is called with more or fewer arguments
  // than described in the function definition, so it's
  // no problem at all to leave off the `condition`
  // argument when calling a check that's a regular expression
  function validate(value, check, condition) {
    if (eq(typeof(check.test), 'function')) {
      // Handle a regular expression
      return check.test(value);
    } else if (eq(typeof(check), 'function')) {
      // Handle a comparison function
      return check(value, condition);
    } else {
      return false;
    }
  }


  // Email validity function
  function validate_email(value) {
    var email = clean_whitespace(value);
    return validate(email, /^[^@\s]+@[^@\s]+$/g);
  }


  //  detect button click to save event info to local storage
  function save_event_info(){
    var eventname;

    document.addEventListener('click', function(event){
      if(event.target.tagName=='A'){

        eventname = event.target.id;
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
    var descripPage= document.getElementById("body-description");
    var confirmPage= document.getElementById("body-confirmation");
    var eventPic;
    var eventStartDate;
    var eventTitle;
    var eventOrg;
    var eventBriefLocation;
    var eventPrice;
    var eventDescrip;
    var eventEndDate;
    var eventFullLocation;

    if(descripPage != null || confirmPage != null){
      eventPic = document.getElementById("descrip-img");
      eventStartDate = document.getElementById("descrip-start-date");
      eventTitle = document.getElementById("descrip-title");
      eventOrg = document.getElementById("descrip-org");
      eventBriefLocation = document.getElementById("descrip-brief-location");
      eventPrice = document.getElementById("descrip-price");
      eventDescrip = document.getElementById("descrip-descrip");
      eventEndDate = document.getElementById("descrip-end-date");
      eventFullLocation = document.getElementById("descrip-full-location");

      //  Set all elements from local storage

      eventPic.src = localStorage.getItem("event-img");
      eventStartDate.innerHTML = localStorage.getItem("event-start-date");
      eventTitle.innerHTML = localStorage.getItem("event-title");
      eventOrg.innerHTML = localStorage.getItem("event-org");
      eventBriefLocation.innerHTML = localStorage.getItem("event-brief-location");
      eventPrice.innerHTML = localStorage.getItem("event-price");
      eventDescrip.innerHTML = localStorage.getItem("event-descrip");
      eventEndDate.innerHTML = localStorage.getItem("event-end-date");
      eventFullLocation.innerHTML = localStorage.getItem("event-full-location");
    }

  }

  // Load event info to signup page
  function set_event_info_signup(){
    var eventPrice;
    var eventName;
    var eventOrg;

    if(document.getElementById("form-content") != null){
      eventPrice = document.getElementById("event-price");
      eventPrice.innerHTML = localStorage.getItem("event-price");
      eventName = document.getElementById("event-name");
      eventName.innerHTML = localStorage.getItem("event-title");
      eventOrg = document.getElementById("event-org");
      eventOrg.innerHTML = localStorage.getItem("event-org");
    }
  }

  //  Calculate the cost
  function calcPrice(){
    var numberOfTickets = document.getElementById("number-tickets-box").value;
    var costOfTickets = document.getElementById("event-price").innerHTML;
    var totalCostItem = document.getElementById("event-total-cost");
    var totalCost;
    costOfTickets=clean_nonnumbers(costOfTickets);

    totalCost = numberOfTickets*costOfTickets;

    totalCostItem.innerHTML = "$" + totalCost;

    console.log("number of tickets "+numberOfTickets);
    console.log("cost per tickets "+costOfTickets);
    console.log("Total Cost: " + totalCost);
  }
  //  Calculate total cost
  function eventPricing(){
    document.addEventListener('keyup', function(event){
      calcPrice()
    });
    document.addEventListener('click', function(event){
      calcPrice()
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

    if(formItem != null){
      formItem.addEventListener('keyup', function(){
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

        var first_name_valid = document.getElementById("first-name-valid");
        var last_name_valid = document.getElementById("last-name-valid");
        var event_price_valid = document.getElementById("event-price-valid");
        var email_valid = document.getElementById("email-valid");
        var address_valid = document.getElementById("address-valid");
        var zip_valid = document.getElementById("zip-valid");
        var city_valid = document.getElementById("city-valid");
        var state_valid = document.getElementById("state-valid");
        var credit_valid = document.getElementById("credit-valid");
        var credit_security_valid = document.getElementById("credit-security-valid");


        first_name_valid.classList.remove("hidden");
        last_name_valid.classList.remove("hidden");
        event_price_valid.classList.remove("hidden");
        email_valid.classList.remove("hidden");
        address_valid.classList.remove("hidden");
        zip_valid.classList.remove("hidden");
        city_valid.classList.remove("hidden");
        state_valid.classList.remove("hidden");
        credit_valid.classList.remove("hidden");
        credit_security_valid.classList.remove("hidden");

        submitButton.disabled=true;

        if(not_empty(firstName.value)){
          document.getElementById("first-name-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("first-name-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(not_empty(lastName.value)){
          document.getElementById("last-name-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("last-name-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(numberOfTickets.value != ""){
          document.getElementById("event-price-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("event-price-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(validate_email(email.value)){
          document.getElementById("email-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("email-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(not_empty(address.value)){
          document.getElementById("address-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("address-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(validate_string_length(zipCode.value, 5)){
          document.getElementById("zip-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("zip-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(not_empty(cityArea.value)){
          document.getElementById("city-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("city-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(not_empty(stateArea.value)){
          document.getElementById("state-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("state-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(validate_string_length(clean_nonnumbers(creditArea.value), 16)){
          document.getElementById("credit-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("credit-valid").src = "../assets/img/red-x-transparent.png";
        }

        if(validate_string_length(creditSecurityCode.value, 3)){
          document.getElementById("credit-security-valid").src = "../assets/img/green-check-transparent.png";
        }
        else{
          document.getElementById("credit-security-valid").src = "../assets/img/red-x-transparent.png";
        }


        if(not_empty(firstName.value) && not_empty(lastName.value) && numberOfTickets.value != "" && validate_email(email.value) && not_empty(address.value) && validate_string_length(zipCode.value, 5) && not_empty(cityArea.value) && not_empty(stateArea.value) && validate_string_length(clean_nonnumbers(creditArea.value), 16) && validate_string_length(creditSecurityCode.value, 3))
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


  //  Save order info after ticket purchase
  function saveOrderInfo(){
    var firstNameItem;
    var lastNameItem;
    var costPerTicketItem;
    var numberOfTicketsItem;
    var emailItem;
    var creditNumItem;

    var firstName;
    var lastName;
    var costPerTicket;
    var numberOfTickets;
    var email;
    var creditNum;

    var totalCostOrder;
    var submitButton;

    document.addEventListener('click', function(event){

      if(event.target.id == "order"){

        firstNameItem = document.getElementById("first-name");
        lastNameItem = document.getElementById("last-name");
        costPerTicketItem = document.getElementById("event-price");
        numberOfTicketsItem = document.getElementById("number-tickets-box");
        emailItem = document.getElementById("email");
        creditNumItem = document.getElementById("credit");

        firstName = firstNameItem.value;
        lastName = lastNameItem.value;
        costPerTicket = costPerTicketItem.innerHTML;
        numberOfTickets = numberOfTicketsItem.value;
        email = emailItem.value;
        creditNum = clean_nonnumbers(creditNumItem.value);

        costPerTicket = clean_nonnumbers(costPerTicket);
        totalCostOrder = costPerTicket*numberOfTickets;
        submitButton = document.getElementById("order");

        while(creditNum.length > 4)
        {
          creditNum = creditNum.substr(1);
        }


        //  console.log("first " + firstName);
        //  console.log("last " + lastName);
        //  console.log("cost " + costPerTicket);
        //  console.log("num " + numberOfTickets);
        //  console.log("email " + email);
        //  console.log("credit " + creditNum);

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
    var nameItem;
    var orderNumItem;
    var totalCostItem;
    var creditNumberItem;
    var emailItem;

    var name;
    var cost;
    var credit;
    var email;

    var pageName = document.getElementById("body-confirmation");
    if(pageName != null){
      nameItem = document.getElementById("name-thanks");
      orderNumItem = document.getElementById("order-number");
      totalCostItem = document.getElementById("total-cost");
      creditNumberItem = document.getElementById("credit-number");
      emailItem = document.getElementById("emailed-to");

      name = localStorage.getItem("order-first-name") + " " + localStorage.getItem("order-last-name");
      cost = localStorage.getItem("order-cost");
      credit = localStorage.getItem("order-credit-last-four");
      email = localStorage.getItem("order-email");


      nameItem.innerHTML = "Thank You for your order " + name + "!";
      orderNumItem.innerHTML = "Order Number: " + generateOrderNumber();
      totalCostItem.innerHTML = "Total Charged: $" + cost;
      creditNumberItem.innerHTML = "Credit Card Number: XXXX-XXXX-XXXX-" + credit;
      emailItem.innerHTML = "Order Information and tickets have been emailed to the following email: " + email;
    }

  }

  document.addEventListener('DOMContentLoaded', function(){
    var submitButton;
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
    submitButton = document.getElementById("order");
    if(submitButton!=null){
      submitButton.disabled=true;
    }

  // End of DOMContentLoaded
  });

// End of IIFE
}());
