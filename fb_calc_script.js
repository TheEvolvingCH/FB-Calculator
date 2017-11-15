/*
TO DO:
1. Add formatting to audience on last page
2. Improve error message if Match Rate exceeds 100% when user makes edits
3. Make sure that all variables reset when hitting reset
4. Fix height scaling issues in CSS
5. Change errors if field is blank
6. Make animations reset so that animation occurs when button is clicked more than once
*/

console.log("I'm linked");

const mainWrapper = document.getElementById('main-wrapper');
const form = document.getElementById('calculate');
let audience = form.querySelector('#audience');
const step1 = document.getElementById('step1');
const seeMoreButton = document.getElementById('seeMore');
const impressionResults = document.getElementById('impressionResults');
const fullDetails = document.getElementById('fullDetails');
const finalDetails = document.querySelectorAll('.details');
const calcButton = document.getElementById('calcButton');
const matchDetails = document.getElementById('matched');
const campaignDetails = document.getElementById('campaign');
const totalsDetails = document.getElementById('totals');
const editingButtons = document.getElementById('editingButtons');
const editDetailsButton = document.getElementById('editDetailsButton');
let matchedAudience;
let totalImpressions;
let campaignLength = 30;
let matchRate = 0.75;
let winRate = 0.10;
let frequency = 2;


//Checks if the value entered by the user is a number
function checkEntry(audience) {
  if (isNaN(audience)) {
    return false
  } else {
    return true;
  }
};



//Calculates the estimated matched audience to Facebook
function matched() {
  matchedAudience = parseInt(audience * matchRate);
  totalImpressions = parseInt((matchedAudience * campaignLength) * winRate * frequency)
  console.log(totalImpressions);
  return totalImpressions;
};  


//Sets display property for initial impression results when the user clicks calculate
function displayResults() {
  let availableImpressions = matched(audience);
  impressionResults.style.display = 'flex';
  const results = document.createElement('h1');
  results.textContent = availableImpressions.toLocaleString();
  results.className = 'reset';
  impressionResults.insertBefore(results, seeMoreButton);  
};


//Creates headers for final page
function createHeaders() {
  const matchedHeader = document.createElement('h1');
  matchedHeader.textContent = "Matched Audience Details";
  matchDetails.appendChild(matchedHeader);
  const campaignHeader = document.createElement('h1');
  campaignHeader.textContent = "Campaign Details";
  campaignDetails.appendChild(campaignHeader);
  const totalsHeader = document.createElement('h1');
  totalsHeader.textContent = "Impression Estimates";
  totalsDetails.appendChild(totalsHeader);
};

//Creates all of the values for the full details page
function showFullDetails() {
    createHeaders();
    const audP = document.createElement('p');
    const audPValue = document.createElement('span');
    audPValue.classList.add('editable');
    audP.textContent = "Offline Audience Size: ";
    audPValue.textContent = audience;
    audP.appendChild(audPValue);
    matchDetails.appendChild(audP);
    const rateP = document.createElement('p');
    const ratePValue = document.createElement('span');
    ratePValue.classList.add('editable');
    rateP.textContent = "Estimated Match Rate: ";
    ratePValue.textContent = matchRate * 100 + "%";
    rateP.appendChild(ratePValue);
    matchDetails.appendChild(rateP);
    const matchP = document.createElement('p');
    matchP.textContent = "Estimated Matched Audience: " + matchedAudience.toLocaleString();
    matchP.id = 'reCalcMatch';
    matchDetails.appendChild(matchP);
    const lenP = document.createElement('p');
    const lenPValue = document.createElement('span');
    lenPValue.classList.add('editable');
    lenP.textContent = "Campaign Length (days): ";
    lenPValue.textContent = campaignLength;
    lenP.appendChild(lenPValue);
    campaignDetails.appendChild(lenP);
    const freqP = document.createElement('p');
    const freqPValue = document.createElement('span');
    freqPValue.classList.add('editable');
    freqP.textContent = "Daily Frequency: ";
    freqPValue.textContent = frequency;
    freqP.appendChild(freqPValue);
    campaignDetails.appendChild(freqP);
    const winP = document.createElement('p');
    winP.textContent = "Estimated Win Rate: " + winRate * 100 + "%";
    campaignDetails.appendChild(winP);
    const totalP = document.createElement('p');
    totalP.id ='reCalcTotal';
    totalP.textContent = "Total Impressions: " + totalImpressions.toLocaleString();
    totalsDetails.appendChild(totalP);
};


//Event listener for first page of the app
form.addEventListener('submit', (e) => {
  e.preventDefault();
  audience = parseInt(audience.value);
  let check = checkEntry(audience);
  if (check === true) {
    console.log(audience);
    displayResults();
    step1.style.display= 'none';
  } else {
      const errorCheck = document.getElementById('error');
      if (errorCheck === null) {
        const error = document.createElement('p');
        error.textContent = "Please enter numbers only";
        error.style.color = 'red';
        error.style.fontSize = '20px';
        error.id = 'error';
        error.className = 'reset';
        calculate.insertBefore(error, calcButton);
        audience = form.querySelector('#audience');
        audience.style.border = '2px dashed red';
      } else {
        error.style.animation = '0.3s 2 pulse';
        console.log('already there');
        audience = form.querySelector('#audience');
      }
  }
});


//Event listener for the See More button on the 2nd page of the app
seeMoreButton.addEventListener('click', (e) => {
  impressionResults.style.display = 'none';
  showFullDetails();
  fullDetails.style.display = 'flex';
  editingButtons.style.display = 'flex';     
});


//Event listener for the editing buttons on the full details page
editingButtons.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const edits = document.querySelectorAll('.editable');
    if (button.textContent === "Edit") {
      for (var i = 0; i < edits.length; i += 1) {
        const newInfo = document.createElement('input');
        const p = edits[i].parentNode;
        newInfo.type = 'text';
        newInfo.value = parseInt(edits[i].textContent);
        newInfo.classList.add('editable')
        p.appendChild(newInfo);
        p.removeChild(edits[i]);
        button.textContent = 'Save';
      } 
    }  else if (button.textContent === "Save") {
       const inputs = document.querySelectorAll('.editable');
       let tracker = 0;
       for (var i = 0; i < inputs.length; i += 1) {
         if (isNaN(inputs[i].value)) {
           tracker += 1;
           inputs[i].style.border = '2px dashed red';
         } 
       }
       if (tracker === 0) {
         for (var i = 0; i < inputs.length; i += 1) {
           const savedInfo = document.createElement('span');
           const p = inputs[i].parentNode;
           savedInfo.textContent = inputs[i].value;
           savedInfo.classList.add('editable');
           if (p.textContent === "Offline Audience Size: ") {
             audience = parseInt(inputs[i].value);
           } else if (p.textContent === "Estimated Match Rate: ") {
             matchRate = (parseInt(inputs[i].value)) / 100;
             if(matchRate > 1) {
               alert("Please revise your match rate so that it is below 100%");
               p.style.color = 'red';
             } else {
               p.style.color = 'black';
             }
           } else if (p.textContent === "Campaign Length (days): ") {
             campaignLength = parseInt(inputs[i].value);
           } else if (p.textContent === "Daily Frequency: ") {
             frequency = parseInt(inputs[i].value);
           } 
           p.appendChild(savedInfo);
           p.removeChild(inputs[i]);
           button.textContent = 'Edit'; 
           let revisedMatch = parseInt(audience * matchRate);
           const reCalcMatch = document.getElementById('reCalcMatch');
           reCalcMatch.textContent = "Estimated Matched Audience: " + revisedMatch.toLocaleString();
           let revisedImps = matched();
           const reCalcTotal = document.getElementById('reCalcTotal');
           reCalcTotal.textContent = "Total Impressions: " + revisedImps.toLocaleString();
           const revisionError = document.getElementById('revisionError');
           if (revisionError != null) {
             mainWrapper.removeChild(revisionError)
           }
           }
      } else {
          const revisionError = document.getElementById('revisionError');
          if (revisionError === null) {
            const error = document.createElement('p');
            error.textContent = "Please enter numbers only";
            error.style.fontSize = '20px';
            error.style.color = 'red';
            error.id = 'revisionError';
            mainWrapper.appendChild(error);
            error.style.textAlign = 'center';
			error.style.msGridColumn = '2';
            error.style.gridColumn = '2 / 3';
            error.style.paddingBottom = '50px';
          } else {
            revisionError.style.animation = '0.3s 2 pulse';
          }
       }
    } else if (button.textContent === "Reset") {
      console.log("Resetting");
      if (confirm("Are you sure you would like to start over?") === true) {
        fullDetails.style.display = 'none';
        editingButtons.style.display = 'none';
        step1.style.display = 'flex';
        form.reset();
        audience = form.querySelector('#audience');
        audience.style.border = '2px dashed grey';
        const resettableItems = document.querySelectorAll('.reset');
        for (var i = 0; i < resettableItems.length; i++) {
          const par = resettableItems[i].parentNode;
          par.removeChild(resettableItems[i]);
        }
        matchDetails.innerHTML = "";
        campaignDetails.innerHTML = "";
        totalsDetails.innerHTML = "";
        matchRate = 0.75;
        frequency = 2;
        campaignLength = 30;
        if(revisionError) {
          mainWrapper.removeChild(revisionError);
        }
        }  
      }
    } 
});
