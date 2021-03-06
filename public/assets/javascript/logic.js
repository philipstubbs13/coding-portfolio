// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQM9J6UPcXMX3Y-l_pWLnZ4N94HEdSpNk",
  authDomain: "code-portfolio.firebaseapp.com",
  databaseURL: "https://code-portfolio.firebaseio.com",
  projectId: "code-portfolio",
  storageBucket: "code-portfolio.appspot.com",
  messagingSenderId: "254125652507"
};
firebase.initializeApp(config);

//Google MAPS API
function initMap(){
    // Map options
    var options = {
        zoom: 8,
        center: {lat:44.9778,lng:-93.2650}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Array of markers
    var markers = [
        {
            coords:{lat:44.7677,lng:-93.2777},
            iconImage: '',
            content: '<h3>Burnsville, MN</h3>'
        }
    ];

    // Loop throug markers
    for(var i=0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props){
        var marker = new google.maps.Marker({
            position:props.coords,
            map: map,
            // icon: props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
            //Set icon image
            marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
    }
} 

// function getProjects(){
//   fetch('./projects.json').then(function(response) {
//     return response.json();
//   }).then(function(data) {
//     console.log(data);
//   });
// }
    //   let output = '<h2 class="mb-4">Users</h2>';
    //   data.forEach(function(user){
    //     output += `
    //       <ul class="list-group mb-3">
    //         <li class="list-group-item">ID: ${user.id}</li>
    //         <li class="list-group-item">Name: ${user.name}</li>
    //         <li class="list-group-item">Email: ${user.email}</li>
    //       </ul>
    //     `;
    //   });
    //   document.getElementById('output').innerHTML = output;

  getProjects();

  // Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contact-form').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');

    // Save message
    saveMessage(name, email, phone, message);

   // Show alert
   document.querySelector('.alert').style.display = 'block';

   // Hide alert after 3 seconds
   setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
   }, 5000);

   // Clear form
   document.getElementById('contact-form').reset();
}

// Function to get form values
function getInputVal(id){
 return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, phone, message) {
    var  newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
}




        