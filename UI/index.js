
$("#logoutBtn").click(function () {
    console.log("Logout button clicked");

    deleteCookie('token');
    checkLoginStatus();
});

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}


function checkLoginStatus() {
    let citiesContainer = document.getElementById('citiesContainer');

    citiesContainer.innerHTML = '';
    var jwtCookie = getCookie('token');
    if (jwtCookie) {
        $("#loginForm").hide();
        $("#registerForm").hide();
        $("#addCityForm").show();
        $("#getCitiesBtn").show();
        $("#logoutBtn").show()
    } else {
        $("#loginForm").show();
        $("#registerForm").show();
        $("#addCityForm").hide();
        $("#getCitiesBtn").hide();
        $("#logoutBtn").hide()
    }
}


checkLoginStatus()


let rbtn = document.querySelector("#registerBtn");
let lbtn = document.querySelector("#loginBtn");


rbtn.addEventListener('click', function (e) {
    e.preventDefault()
    let username = document.querySelector("#registerusername").value;
    let userpassword = document.querySelector("#registerPassword").value;


    var url = 'https://localhost:7145/api/auth/register'
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: userpassword
        }),
        success: function (data) {
            alert("Registered succesfully")
            document.querySelector("#registerusername").value="";
            document.querySelector("#registerPassword").value="";
        },
        error: function (error) {
            console.error("Register Error", error);
        }
    });


});



lbtn.addEventListener('click', function (e) {
    e.preventDefault()
    let username = document.querySelector("#loginusername").value;
    let userpassword = document.querySelector("#loginPassword").value;

    if (!username || !userpassword) {
        console.error("Dont be empty");
        return;
    }
    var url = 'https://localhost:7145/api/auth/login'
    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: userpassword
        }),
        success: function (data) {
            setCookie('token', data, 1);
            checkLoginStatus()
            document.querySelector("#loginusername").value="";
            document.querySelector("#loginPassword").value="";
        },
        error: function (error) {
            console.error("LOGIN ERROR", error);
            alert("Username or password wrong")
        }
    });


});

document.getElementById('addCityBtn').addEventListener('click', function (e) {
    e.preventDefault();

    var userId = getUserId();

    if (userId) {

        var cityName = document.querySelector("#cityName").value;
        var cityDescription = document.querySelector("#cityDescription").value;


        if (!cityName || !cityDescription) {
            console.error("EMpty");
            return;
        }


        var newCity = {
            name: cityName,
            userid: userId,
            description: cityDescription
        };


        var jsonData = JSON.stringify(newCity);

        var url = 'https://localhost:7145/api/Cities/add';


        var token = getCookie('token');


        if (token) {
            $.ajax({
                url: url,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: jsonData,
                success: function (data) {
                    console.log("City added", data);
                },
                error: function (error) {
                    console.error("ERROR", error);
                }
            });
        } else {
            console.log("Token not.");
        }
    } else {
        console.log("Id not.");
    }
});



document.getElementById('getCitiesBtn').addEventListener('click', function (e) {
    e.preventDefault();

    var userId = getUserId();
    var token = getCookie('token');

    if (userId) {
        var url = 'https://localhost:7145/api/Cities/' + userId;

        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (data) {
                displayCities(data);
            },
            error: function (error) {
                console.error("ERROR GETCITIES", error);
            }
        });
    } else {
        console.log("not found.");
    }
});



function displayCities(cities) {

    var citiesContainer = document.getElementById('citiesContainer');

    citiesContainer.innerHTML = '';

    cities.forEach(function (city) {

        var cityElement = document.createElement('p');

        cityElement.textContent = 'City Name: ' + city.name + ', Description: ' + city.description + ', PhotoUrl: ' + city.photoUrl;


        citiesContainer.appendChild(cityElement);
    });
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}


function getUserId() {
    var jwtCookie = getCookie('token');
    if (jwtCookie) {
        var decodedJwt = atob(jwtCookie.split('.')[1]);
        var jwtPayload = JSON.parse(decodedJwt);
        return jwtPayload.nameid;
    } else {
        console.log('error');
        return null;
    }
}
