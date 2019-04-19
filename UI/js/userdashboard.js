const showMessageContent = (evt) => {
  if (
    evt.target.classList.contains('messages')
    || evt.target.classList.contains('loan-details')
  ) {
    const messageContainer = document.querySelectorAll('.loan-container');
    messageContainer.forEach((currentElement) => {
      currentElement.style.display = 'none';
    });
    document.querySelector('.main-loan-body').style.display = 'block';
  }
};


const showListContent = (clickedElement) => {
  // hides sidebar if on responsive mode
  if (window.innerWidth <= 600) {
    sidebar.classList.toggle('show-sidebar');
  }

  const allActiveTab = document.querySelectorAll('.active');
  allActiveTab.forEach((currentTab) => {
    currentTab.classList.remove('active');
  });

  const allChildren = mainContent.children;
  const childrenArray = Array.prototype.slice.call(allChildren);
  childrenArray.forEach((currentElement) => {
    currentElement.style.display = 'none';

    if (currentElement.classList.contains(`${clickedElement}-container`)) {
      currentElement.firstElementChild.style.display = 'block';
      document.querySelector(`.${clickedElement}`).classList.add('active');
      currentElement.style.display = 'block';
    }
  });
};

const displaMainContent = (evt) => {
  
  if (evt.target.classList.contains('apply')) {
    const createForm = (document.querySelector('.create-loan-form').style.display = 'block');
    const closeForm = (document.querySelector('.compose-box').style.display ='none');
    const closedForm = (document.querySelector('.loan-container').style.display ='block');
    const closeMessage = (document.querySelector('.main-loan-body').style.display ='none');

  }
  if (evt.target.classList.contains('repayment')) {
    const createForm = (document.querySelector('.compose-box').style.display = 'block');
    const createdForm = (document.querySelector('.loan-container').style.display = 'none');
    document.querySelector('.main-loan-body').style.display = 'none';
    document.querySelector('.unpaid').style.display='none';
    document.querySelector('.repaid').style.display='none';
  }

  if (evt.target.classList.contains('repay')) {
    const createForm = (document.querySelector('.compose-box').style.display = 'none');
    const createdForm = (document.querySelector('.loan-container').style.display = 'none');
    document.querySelector('.main-loan-body').style.display = 'none';
    document.querySelector('.unpaid').style.display='block';
    document.querySelector('.repaid').style.display='none';
  }

  if (evt.target.classList.contains('paid')) {
    const createForm = (document.querySelector('.compose-box').style.display = 'none');
    const createdForm = (document.querySelector('.loan-container').style.display = 'none');
    document.querySelector('.main-loan-body').style.display = 'none';
    document.querySelector('.unpaid').style.display='none';
    document.querySelector('.repaid').style.display='block'
  }
};


const showMobileMenu = (evt) => {
  evt.preventDefault();
  sidebar.classList.toggle('show-sidebar');
};

const createGroupForm = document.querySelector('.create-loan-form');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.content');
const menuIcon = document.querySelector('.menu-icon');

mainContent.addEventListener('click', showMessageContent);

sidebar.addEventListener('click', displaMainContent);

menuIcon.addEventListener('click', showMobileMenu);

createGroupForm.addEventListener('click', (evt) => {
  if (evt.target === createGroupForm || evt.target.className === 'cancel-form') {
    createGroupForm.style.display = 'none';
  }
});
const updTime= document.querySelectorAll('.time-received');
for(let i =0; i <updTime.length; i++){
updTime[i].textContent = new Date().toUTCString();}

const closeIt=document.querySelectorAll('.close');
for(let i =0; i<closeIt.length; i++){
closeIt[i].addEventListener('click', ()=>{
  const closeForm = (document.querySelector('.compose-box').style.display ='none');
  const showM = (document.querySelector('.loan-container').style.display ='block');
  const closeRepaid = (document.querySelector('.repaid').style.display ='none');
  const closeUnpaid = (document.querySelector('.unpaid').style.display ='none');

});
}
