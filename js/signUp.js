window.addEventListener("DOMContentLoaded", async function () {

  const signUpForm = document.getElementById("signUpForm");
  signUpForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    hideAlert()
    const formEl = event.target.elements

    if (formEl.firstName.value && formEl.lastName.value &&
      formEl.email.value && formEl.password.value ) {

        const response = await createUser({
          firstName: formEl.firstName.value,
          lastName: formEl.lastName.value,
          email: formEl.email.value,
          password: formEl.password.value
        });

      } else {
        showAlert("please enter all values first for register!", 'danger')
      }
  });


  async function createUser (userData) {
    try {
      const cred = await auth.createUserWithEmailAndPassword(userData.email, userData.password)
      const uid = cred.user.uid;

      db.collection("Users").doc(uid).set({
        firstName: userData.firstName,
        lastName: userData.lastName
      })
      .then(() => {
        // setParam(token, `${userData.firstName} ${userData.lastName}`);

        showAlert( `Hello ${userData.firstName} ${userData.lastName}! Thank you for registeration!` , 'success')
      })
    
    } catch (err) {
      const errorMessage = err.message;
      showAlert(errorMessage, 'danger')
      console.error('err: ', errorMessage)
    }
  };

  // async function signInUser (email, password) {
  //   try {
  //     const cred = await auth.signInWithEmailAndPassword(email, password)
  //     const user = cred.user;
  //     const token = await user.getIdToken();

  //     console.log(user.uid)
  //     db.collection('Users').where("uid", )

  //     setParam(token, `${userData.firstName} ${userData.lastName}`);

  //   } catch (err) {
  //     showAlert(errorMessage, 'danger')
  //     console.error('err: ', errorMessage)
  //   }
  // };

  // async function signOut (email, password) {
  //   try {
  //     const cred = await auth.signOut()
  //     console.log("user successfully signed out!")
  //   } catch (err) {
  //     console.error('err: ', err)
  //   }
  // };
  
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
