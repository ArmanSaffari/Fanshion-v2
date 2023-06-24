window.addEventListener("DOMContentLoaded", async function () {

  let userUid = '';
  let userData = '';
  let file = "";
  let extension = "";
  const FbStorageBucket = 'profileImages';

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      userUid = user.uid;

      getUserDetails(userUid);

    } else {
      console.log("User is not logged in!");
      window.location.href = './index.html'
    }
  });

  async function getUserDetails(userUid) {
    console.log('beginning of getUser')
    db.collection('Users')
    .doc(userUid)
    .get()
    .then((doc) => doc.data())
    .then((userDetails) => {
      console.log("userDetails:", userDetails)
      userData = userDetails;
      displayUserDetails(userDetails);
    })
    .then(() => {
      getUserSavedItems();
    })
    .catch((err) => console.log("err", err));
  }

  async function displayUserDetails(userDetails) {
    // display Date of Birth:
    if (userDetails.DOB) {
      const DOB = new Date(1000 * userDetails.DOB.seconds);

      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };

      $('#DOB').text(DOB.toLocaleDateString('en-US', options));

      const DOBstring = 
      DOB.getFullYear().toString() + '-' +
      (DOB.getMonth() + 1).toString().padStart(2, '0') + '-' +
      DOB.getDate().toString().padStart(2, '0');

      $('#DOBInput').val(DOBstring)
    }
    
    //display user photo:
    if (userDetails.profileImageUrl) {
      console.log("profileImageUrl:", userDetails.profileImageUrl)
      $('#profileImage').attr('src', userDetails.profileImageUrl)
    }
    
    $('#name').text(`${userDetails.firstName} ${userDetails.lastName}`);
    $('#from').text(userDetails.from);
    $('#livesIn').text(userDetails.livesIn);
    $('#occupation').text(userDetails.occupation);
    
    $('#firstNameInput').val(userDetails.firstName);
    $('#lastNameInput').val(userDetails.lastName);
    $('#fromInput').val(userDetails.from);
    $('#livesInInput').val(userDetails.livesIn);
    $('#occupationInput').val(userDetails.occupation);
    $('#favoriteBrandInput').val(userDetails.favoriteBrand);

    if (userDetails.favoriteBrand) {
      $('#favoriteBrandContainer').removeClass('d-none')
      $('#favoriteBrand').attr('src', `./assets/brands/${userDetails.favoriteBrand}.png`)
    } else {
      $('#favoriteBrandContainer').addClass('d-none')
    }
  }

  async function updateUserDetails(userUid, values) {
    //values must be in form of an object
    return new Promise((resolve, reject) => {
      db.collection('Users')
      .doc(userUid)
      .update(values)
      .then(() => {
        console.log("Profile Data has been successfully editted");
        resolve();
      })
      .catch((err) => {
        console.log("err", err);
        alert(err.message);
        clearProfileImageInput();
        hideEditForm();
        reject();
      });
    });
  }

  // enable edit form when clicking the edit profile button:
  $('#editProfileBtn').click(() => {
    $('#userDetails').addClass('d-none');
    $('#editProfileFields').removeClass('d-none');
    $('#settingBtnContainer').addClass('opacity-25 pe-none');
    $('#editProfileBtnContainer').addClass('d-none');
    $('#saveProfileBtnContainer').removeClass('d-none');
    $('#rightSection').addClass('opacity-25 pe-none');
    $('#profileBtnsContainer').removeClass('d-none');
  });

  // update changes to firebase storage and firestore when clicking save changes button:
  $('#saveChangesBtn').click( async () => {

    if ( $('#firstNameInput').val() && $('#lastNameInput').val()) {

      const values = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        from: ($('#fromInput').val() || ""),
        livesIn: ($('#livesInInput').val() || ""),
        occupation: ($('#occupationInput').val() || ""),
        favoriteBrand: ($('#favoriteBrandInput').val() || ""),
      }

      if ($('#DOBInput').val()) {
        const day = $('#DOBInput').val().slice(8,10);
        const monthIndex = parseInt($('#DOBInput').val().slice(5,7)) - 1;
        const year = $('#DOBInput').val().slice(0,4);
        values.DOB = new Date(year, monthIndex, day);
      }

      await updateUserDetails(userUid, values);
      await uploadProfileImage(userUid, extension, file)
      // getUserDetails(userUid);
      hideEditForm();
    }
  });

  // hide the edit form and reset changes when clicking the cancel button:
  $('#cancelBtn').click(hideEditForm);

  function hideEditForm() {
    $('#userDetails').removeClass('d-none');
    $('#editProfileFields').addClass('d-none');
    $('#settingBtnContainer').removeClass('opacity-25 pe-none');
    $('#editProfileBtnContainer').removeClass('d-none');
    $('#saveProfileBtnContainer').addClass('d-none');
    $('#rightSection').removeClass('opacity-25 pe-none');
    $('#profileBtnsContainer').addClass('d-none');
    $('#selectedPhoto').addClass('d-none');
  }

  //update file whenever changing the profile image input:
  $('#profileImageUploadBtn').change((e) => {
    const files = $('#profileImageUploadBtn').prop('files')
    console.log(files)
    if (files.length > 0) {
      file = files[0];
      let imageURL = URL.createObjectURL(file);
      console.log("imageURL:", imageURL)

      extension = file.name.split('.').pop();
      $('#selectedPhoto').removeClass('d-none');
      $('#clearProfileImageInput').removeClass('d-none');
      $('#profileImage').attr('src', imageURL)
    }
    console.log("file:", file)
    console.log("extension:", extension)
  })

  //clear the selected profile image
  $('#clearProfileImageInput').click(() =>{
    file = "";
    extension = "";
    $('#profileImageUploadBtn').val('').trigger('change');
    $('#clearProfileImageInput').addClass('d-none');
    $('#selectedPhoto').addClass('d-none');
    $('#profileImage').attr('src',(userData.profileImageUrl) || "./assets/icons/profileAvatar.png")
  });

  // delete previous profile image when clicking the delete button:
  $('#deleteProfileImage').click(async () => {
    if (userData.profileImageUrl) {
      await deleteProfileImage();
      alert('previous profile image has deleted successfully.');
      window.location.href = './profile.html';
      // getUserDetails(userUid);
    }
  });

  async function deleteProfileImage () {
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().refFromURL(userData.profileImageUrl);
      console.log('fileRef:', fileRef)
      fileRef.delete().then(function() {
      db.collection('Users')
        .doc(userUid)
        .update({
          profileImageUrl: ''
        })
        .then(() => {
          console.log('delete Completed!')

          resolve();
        })
      }).catch(function(err) {
        console.error('Error deleting previous profile image :', err);
        reject(err);
      });
    });
  }

  // function to upload the selected image to firebase storage:
  async function uploadProfileImage (userUid, extension, file) {
    return new Promise(async (resolve, reject) => {
      console.log('uploading started!')
      if (extension && file) {
        // if there were any previous profile image, it will delete it,
        // since the extension my be different and cause multiple files being saved for one user!
        if (userData.profileImageUrl) {
          console.log('url:', userData.profileImageUrl)
          await deleteProfileImage();
        }

        console.log('step1')

        const storageRef = storage.ref(`${FbStorageBucket}/${userUid}.${extension}`);
        console.log('step2')
        const uploadTask = storageRef.put(file);

        console.log('step3')

        // const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        uploadTask.on('state_changed', (snapshot) => {
          const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progressValue, '%');

          $('#uploadProgressContainer').removeClass('d-none')
          $('#uploadProgressBar').css('width', `${progressValue}%`)
          $('#uploadProgressBar').text(`${progressValue}%`)

        },
        (err) => {
          console.error(err)
        },
        async () => {
          console.log("upload is done!");
          $('#uploadProgressContainer').addClass('d-none')
          $('#uploadProgressBar').css('width', `0%`)
          $('#uploadProgressBar').text(`0%`)

          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL()
          console.log("downloadURL: ", downloadURL);

          // add image Url to firestore for the current user
          console.log('step5')
          db.collection('Users')
          .doc(userUid)
          .update({
            profileImageUrl: downloadURL,
          })
          .then(() => {
            console.log('image url has added to user database');
            // window.location.href = './profile.html';
            getUserDetails(userUid);
            resolve();
          })
          .catch((err) => {
            console.error("err:", err)
            reject(err);
          })
        })
      }
    });
  }

  async function getUserSavedItems () {
    // clear savedItems Cards
    $('#savedItemsContainer').html('')
    console.log("savedItems:", userData.savedItems)
    if (userData.savedItems && userData.savedItems.length > 0) {
      db.collection('Products')
      .where('id', 'in', userData.savedItems)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          addSavedItemCard(product);
        })
      })
    } else {
      $('#savedItemsContainer').html('There is not any saved item!')
    }
  }

  function addSavedItemCard(product) {
    let cardItem =$('<div></div>')
    cardItem.addClass('col-12 col-lg-6 my-3');

    //create badges:
    let badgesList ='';
    if (product.badges && product.badges.length > 0) {
      product.badges.forEach((badge) => {
        badgesList += `<span class="badge filled-pink mx-1">${badge}</span>`
      });
    }

    //create stars:
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += (i < product.stars) ? 
      `<img width="20px" height="20px" src="./assets/Page6/star-filled.svg" />` :
      `<img width="20px" height="20px" src="./assets/Page6/star-blank.svg" />`
    }

    cardItem.html(`
      <div class="card border border-dark col-12" style="height: 350px">
        <a href="./itemDetails.html?id=${product.id}" class="h-100 text-decoration-none text-dark ">
          <img class="card-img h-100 object-fit-contain"
            src=${product.images[0]} alt="product Image">
          <div class="card-img-overlay position-relative p-0 ">
            <div class=" position-absolute bottom-100 w-100 m-0 p-4 rounded-bottom-2 bg-overlay-pink">
              <h5 class="w-100 card-title text-pink">${product.title}</h5>
              <div class="d-flex justify-content-between">
                <div class="">${stars}</div>
                <div class="">${badgesList}</div>
              </div>
            </div>
          </div>
        </a>`
    );

    $('#savedItemsContainer').append(cardItem);

  }

});