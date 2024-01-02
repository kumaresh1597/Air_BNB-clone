const form = document.getElementById("form");
const mainHeader = document.querySelector(".header");

const loader = document.createElement("div");
loader.className = "spinning-Loader";

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const place = document.getElementById("place").value;
    const checkIn = document.getElementById("check-in").value;
    const checkOut = document.getElementById("check-out").value;
    const guestNo = document.getElementById("guest").value;

    document.getElementById("place").value = "";
    document.getElementById("check-in").value = "";
    document.getElementById("check-out").value = "";
    document.getElementById("guest").value = "";

    if (place && checkIn && checkOut && guestNo) {
        mainHeader.style.opacity = "0.5";
        mainHeader.appendChild(loader);
        api(place, checkIn, checkOut, guestNo);
        setTimeout(() => {
            window.location.href = 'listing.html';
            mainHeader.style.opacity = "1";
            mainHeader.remove(loader);
        }, 5000);
    } else {
        alert("Give all Value");
    }
});

async function api(input, date1, date2, guestNo) {
  
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${input}&checkin=${date1}&checkout=${date2}&adults=${guestNo}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7d79aa4112mshf0bad47899f9724p1b30d0jsn764a3264c996',
            'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (data.error === false) {
            localStorage.setItem("result", JSON.stringify(data));
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    };
};