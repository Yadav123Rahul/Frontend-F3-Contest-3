const api_key = "K2Vyd9gU5jW0t0cRJuFdM0ZcNSVFX6kRDMbprqnT";
const searchDate = document.getElementById("search-input");
const getImageOfTheDay = document.getElementById("search");


function getCurrentImageOfTheDay() {
    var date = new Date().toJSON().slice(0, 10);
    getImage(date);
}

getImageOfTheDay.addEventListener('click', function () {
    const date = searchDate.value;
    const pic = document.getElementById("pic");


    getImage(date);
    saveSearch(date);
});

function getImage(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            showData(data);
        })
        .catch(error => console.log(error));
}


function showData(data) {
    const image = document.getElementById("image");
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    image.src = data.url;
    title.innerHTML = data.title;
    content.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + data.explanation;

    if (data.date ===  new Date().toJSON().slice(0, 10)){
        pic.innerHTML = "Nasa Picture of the Day";
    }else{
        pic.innerHTML = "Nasa Picture on " + data.date;
    }

}

let storedDate = [];

function saveSearch(date) {
    storedDate.push(date);
    localStorage.setItem("date", JSON.stringify(storedDate));

    var prevDates = JSON.parse(localStorage.getItem('date'));
    addSearchToHistory(prevDates);
}

function addSearchToHistory(prevDates) {

    let list = document.getElementById("search-history");
    let li = document.createElement('li');
    li.innerText = prevDates[prevDates.length - 1];
    list.appendChild(li);
}

// search from previous search history

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

var ul = document.getElementById('search-history');
ul.onclick = function(event) {
    var target = getEventTarget(event);
    getImage(target.innerHTML);
};