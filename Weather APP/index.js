const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");


let target = "London";

const fetchData = async(target)=>{
    try {
        const url =`https://api.weatherapi.com/v1/current.json?key=93890b7898d44ec29aa144904230107&q=${target}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        const {
            current :{
                temp_c,
                condition :{text, icon},
            },
            location : { name , localtime},
        } = data;

        updateDom(temp_c,name,localtime,icon,text);

    } catch (error) {
        alert("Location Not Found\nSuggestion : Try Refreshing the Page or Enter Correct Spelling");
    }
    

};
function updateDom(temp,city,time,emoji,text){
    tempField.innerText = temp+'°';
    cityField.innerText = city;

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const exactDay = new Date(exactDate).getDay();

    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text ;
}

fetchData(target);
function getDayFullName(x){
    switch (x) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Err";
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    target = searchField.value ;
    fetchData(target);
});

