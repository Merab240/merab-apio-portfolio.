//gets all tab links and tab content elements
var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");


function opentab(tabName, event){
    //removes all active class from all tab links
 for(let tabLink of tabLinks){
    tabLink.classList.remove("active-link");
 }
 //removes all active class from all tab content
  for(let tabContent of tabContents){
    tabContent.classList.remove("active-tab");
 }
 //add active class to the clicked tab link
 event.currentTarget.classList.add("active-link");

 //show the content of the active class
 document.getElementById(tabName).classList.add("active-tab");
}

const hireMeBtn = document.getElementById("hireMeBtn");
const popupForm = document.getElementById("popupForm");
const closeBtn = document.querySelector(".close");

// Open popup
hireMeBtn.addEventListener("click", () => {
  popupForm.style.display = "flex";
});

// Close popup
closeBtn.addEventListener("click", () => {
  popupForm.style.display = "none";
});

// Close when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target === popupForm) {
    popupForm.style.display = "none";
  }
});





  