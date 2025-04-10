/**********************************/
/******** Rainikka Corprew ********/
/*********** JAVASCRIPT ***********/
/************ 308A.3 **************/
/**** Promises, Async & Await *****/
/********** 09-APR-2025 ***********/
/**********************************/

/******************* LAB DESCRIPTION **********************
 * Here's the scenario: you are a developer in a very large
 * corporation that splits its data across multiple databases.
 * Your job is to assemble this information using a single
 * function that takes an id parameter and returns Promise
 * that resolves to an object containing specific data.
 * The object must contain the following information, which
 * will be gathered from the databases:
 *
{
  id: number,
    name: string,
      username: string,
        email: string,
          address: {
    street: string,
      suite: string,
        city: string,
          zipcode: string,
            geo: {
      lat: string,
        lng: string
    }
  },
  phone: string,
    website: string,
      company: {
    name: string,
      catchPhrase: string,
        bs: string
  }
}
**********************************************/
/********** Promises, Async & Await  *********/

/*************** Databse Relational Structure ****************/
/***** Primary Key: id, Source: central db, Type: number *****
* db1: id: 1-4
* db2: id: 4 - 7
* db3: id: 8 - 10
*
/***** Foreign Keys: Data Source, Type, & Order ******
* 0. central db.id
* 1. db.username: string
* 2. vt.name: string
* 3. vt.email: string
*4. vt.address: obj
* 5. vt.phone: string
* 6. db.website,: string
* 7. db.company. obj

/******************************************/
/***Importing database functions***/
/***  DO NOT MODIFY THIS LINE  ***/
//  import { central, db1, db2, db3,
//  vault } from "./databases.js";
//  function getUserData(id) {
//  const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3
//   };
// }

/*** Fetch From Databases Client Contact Info ***/
// async function fetchAllClientData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users/')
//   const data = await response.json()
//   console.log(data.message)
// }
// fetchAllClientData();

/************* Body Selector **************/
const body = document.querySelector("body");

/*** Fetch Data to Create Client Rolodex ***/
const allClientContacts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    console.log(data)
    clientRolodex(data)
  } catch (error) {
    console.log(error)
  }
}
allClientContacts()

/**** Create Dropdown Client Rolodex ****/
function clientRolodex(clients) {
  /*** Create Section & Select ***/
  const selectSect = document.getElementById('selectSect');
  const cardSelector = (document.createElement('select'));
  cardSelector.id = 'cardSelector';

  /*** Option0: Chooose Company Prompt ***/
  const option0 = cardSelector.appendChild(document.createElement('option'));
  option0.id = 'option0';
  option0.textContent = 'Choose Company';

  /*** Populate Selector With Client Data ***/
  clients.forEach(client => {
    const option = document.createElement('option');
    option.value = client.id;
    option.textContent = client.company.name;
    cardSelector.appendChild(option);
  });

  /*** Selector Tool Dynamic Card Change ***/
  cardSelector.onchange = () => {
    const selectedClientId = cardSelector.value;
    if (selectedClientId) {
      const selectedClient = clients.find(client => client.id == selectedClientId);
      if (selectedClient) {
        updateClientProfile(selectedClient);
      }
    }
  };

  selectSect.appendChild(cardSelector);
}

/*** Add Client Company Data to Card ***/
function updateClientProfile(client) {
  document.getElementById('option0');
  document.getElementById('cardSelector');
  const imageBox = document.getElementById('imageBox');
  const cardTable = document.getElementById('cardTable');
  const clientPic = document.getElementById('clientPic');


  if (!client) {
    // Hide elements when no client selected
    imageBox.style.display = "none";
    cardTable.style.display = "none";
    clientPic.src = "";
    return;
  } else {
    imageBox.style.display = "block";
    cardTable.style.display = "block";
    const clientPic = document.getElementById('clientPic');
    const mrTPic = `images/T${client.id}.jpg`;
    clientPic.src = mrTPic;
    document.getElementById('clientId').textContent = client.id;
    document.getElementById('clientName').textContent = client.name;
    document.getElementById('clientUsername').textContent = client.username;
    document.getElementById('clientEmail').textContent = client.email;
    document.getElementById('companyStreet').textContent = client.address.street;
    document.getElementById('companySuite').textContent = client.address.suite;
    document.getElementById('companyCity').textContent = client.address.city;
    document.getElementById('companyZip').textContent = client.address.zipcode;
    document.getElementById('companyPhone').textContent = client.phone;
    document.getElementById('companyWebsite').textContent = client.website;
    document.getElementById('companyName').textContent = client.company.name;
    document.getElementById('companyMotto').textContent = client.company.catchPhrase;
    document.getElementById('companyBS').textContent = client.company.bs;
  }
}
