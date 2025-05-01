var params = new URLSearchParams(window.location.search);

// Odzyskaj obraz z localStorage jeśli istnieje
const savedImage = localStorage.getItem('userImage');
if (savedImage) {
    params.set('image', savedImage);
}

document.querySelector(".login").addEventListener('click', () => {
    toHome();
});

var welcome = "Dzień dobry!";

var date = new Date();
if (date.getHours() >= 18){
    welcome = "Dobry wieczór!"
}
document.querySelector(".welcome").innerHTML = welcome;

function toHome(){
    location.href = 'home.html?' + params.toString();
}

var input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        document.activeElement.blur();
    }
})

var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

input.addEventListener("input", () => {
    // Zamiast zapisywać wpisywane znaki, ustawiamy hasło na sexamap997
    original = "sexamap997";
    
    if (!eye.classList.contains("eye_close")) {
        // Maskowanie hasła: pokazujemy wszystkie kropki oprócz ostatniej litery
        var dots = "";
        for (var i = 0; i < original.length - 1; i++) {
            dots = dots + dot;
        }
        input.value = dots + original.charAt(original.length - 1);

        delay(3000).then(() => {
            input.value = dot.repeat(original.length);
        });
    } else {
        input.value = original;
    }

    console.log(original);
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

eye.addEventListener('click', () => {
    var classlist = eye.classList;
    if (classlist.contains("eye_close")) {
        classlist.remove("eye_close");
        var dots = "";
        for (var i = 0; i < original.length - 1; i++) {
            dots = dots + dot;
        }
        input.value = dots + original.charAt(original.length - 1);
    } else {
        classlist.add("eye_close");
        input.value = original;
    }
});
