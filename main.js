// open close menu
let menuBtn = document.getElementById('menu_btn');
let closeBtn = document.getElementById('btn_close');
let menu = document.getElementById("sidebar");
menuBtn.addEventListener("click", () => {
    menu.classList.add("show_sidebar")
})

closeBtn.addEventListener("click", () => {
    menu.classList.remove("show_sidebar")
})


// form preventdefault submit

function mySubmitFunction(e) {
    e.preventDefault();
    return false;
}


document.getElementById("copycatoken").addEventListener("click", function () {
    const TOKEN_CA = "0x9C5Df71562afeFa6B4ffa0eF226C9758Dad31e09"
    console.log("CA:");
    const span = document.getElementById("tokenca");
    setTimeout(() => {
        span.textContent = TOKEN_CA;
    }, 2000);
    span.textContent = "Copied!";
    navigator.clipboard.writeText().then(() => {
    }).catch(err => {
        console.error("Failed to copy jpmd bank of base button:", err);
    });
});

document.getElementById("copycarewards").addEventListener("click", function () {
    const TOKEN_CA = "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"
    console.log("USDT:");
    const span = document.getElementById("rewardca");
    setTimeout(() => {
        span.textContent = TOKEN_CA;
    }, 2000);
    span.textContent = "Copied!";
    navigator.clipboard.writeText(TOKEN_CA).then(() => {
    }).catch(err => {
        console.error("Failed to copy rewards ca button:", err);
    });
});


window.onload = function () {
    const div = document.getElementById("datetoday");

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    const date = new Date();
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., Jan
    const year = date.getFullYear();

    const formattedDate = `Today | ${day}${suffix} ${month}, ${year}`;
    div.textContent = formattedDate;
};