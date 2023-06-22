
window.addEventListener("DOMContentLoaded", async function () {
  // Update progress bar width based on viewport position
function updateProgressBar() {
  // Get document height, viewport height, and current scroll position
  var documentHeight = $(document).height();
  var viewportHeight = $(window).height();
  var scrollTop = $(window).scrollTop();

  // Calculate progress based on current scroll position
  var progress = (scrollTop / (documentHeight - viewportHeight)) * 100;

  // Set progress bar width
  $('#progress-bar').css('width', progress + '%');
  $('#progress-bar').attr('aria-valuenow', progress);
}

// Call updateProgressBar on window scroll event
$(window).on('scroll', updateProgressBar);

// Call updateProgressBar on window resize event
$(window).on('resize', updateProgressBar);

// Call updateProgressBar on window load event
$(window).on('load', updateProgressBar);


firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
    let userUid = user.uid;
    db.collection('Users').doc(userUid).get().then((doc) => {
      const userData = doc.data();
      userName = userData.firstName + ' ' + userData.lastName;
      return userName
    }).then((userName) => {
      switchNavbar(userName)
    })
  } else {
    console.log("User is not logged in!")
  }
});

async function getUserName(userUid) {
  let userName = ''
  
  return "userName"
}

function switchNavbar(userName) {
  const navbarRight = this.document.getElementById('navbarRight');
  navbarRight.innerHTML = `
    <li class="nav-item order-lg-2">
      <a class="nav-link text-white" href="./profile.html"><span class="badge bg-danger ">${userName}</span></a>
    </li>
    <li class="nav-item order-lg-2">
      <a class="nav-link text-white" href="./index.html" id="signOutBtn">LOG OUT</a>
    </li>
    `;

  const signOutBtn = document.getElementById('signOutBtn');
  signOutBtn.addEventListener('click', signOut)
}



function signOut() {
  firebase.auth().signOut();
}

});