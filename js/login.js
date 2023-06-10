window.addEventListener("DOMContentLoaded", async function () {

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    hideAlert()
    const formEl = event.target.elements

    console.log(formEl)
    if (formEl.email.value && formEl.password.value ) {

        await signInUser(formEl.email.value, formEl.password.value);

      } else {
        showAlert("Please Enter Email and Password First!", 'danger')
      }
  });

  async function signInUser (email, password) {
    try {
      const cred = await auth.signInWithEmailAndPassword(email, password)
      const user = cred.user;
      const token = await user.getIdToken();

      // console.log(user.uid)
      const userDetails = await db.collection('Users').where("uid", "==", user.uid.toString()).get()
      // console.log(userDetails.data())
      let userName = ''
      userDetails.forEach((doc) => {
        const userData = doc.data();
        userName = userData.firstName + ' ' + userData.lastName;
      });

      showAlert(`Hello ${userName}! You have signed in successfully.`, 'success')
      setParam(token, userName);

    } catch (err) {
      const errorMessage = err.message;
      showAlert(errorMessage, 'danger')
      console.error('err: ', errorMessage)
    }
  };

  async function signOut (email, password) {
    try {
      const cred = await auth.signOut()
      console.log("user successfully signed out!")
    } catch (err) {
      console.error('err: ', err)
    }
  };
  
  function showAlert(alertText, color) {
    const alertContainer = document.getElementById('alertContainer')
    alertContainer.innerHTML = `
    <div class="col-md-9 col-lg-7 col-12">
      <div class="alert alert-${color}" role="alert">
        ${alertText}
      </div>
    </div>`;
  }

  function hideAlert() {
    const alertContainer = document.getElementById('alertContainer')
    alertContainer.innerHTML = '';
  }

  function setParam(token, userName) {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);

    setTimeout(() => {
      window.location.href = './index.html';
    }, 3000);
  }
});
