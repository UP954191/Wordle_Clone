
let wordForToday;
let gameOver = false;

let height = 6; // Number of Tries
let width = 5; // Width of Board (Number of letters in word) 

let col = 0; // Current Letter for Attempt
let row = 0; // Current Attempt

let mode = 'light'; // Initial Theme

window.addEventListener("load",() => {
    createBoxes(); // Creates Boxes to Populate
    userInput(); // User Letter Inputs
    // Changes Colour Scheme
    const button = document.getElementById('themeButton');
    button.addEventListener('click', () =>{
        changeTheme();
    });
    getWord(); 
})

function createBoxes(){
    const board = document.getElementById("boardGrid");
    for(let r = 0;r<height;r++){
        for(let c= 0;c<width;c++){
            let box = document.createElement("div");
            box.classList.add("boxes");
            // Set ID to Row and Column Number:
            box.setAttribute("id",r.toString() +'-'+ c.toString()); 
            board.appendChild(box);
        }
    }
}

function userInput(){
    window.addEventListener('keyup', (e) => { // Listen for Key Inputs
        console.log(e);
        if(gameOver){return;}
        if(!gameOver &&  row == height){
            gameOver = true;
        }

        if(e.code >= "KeyA" && e.code <= "KeyZ"){
            if(col<width){
                let currentBox = document.getElementById(row+"-"+col);
                if(currentBox.textContent == ""){
                    // Set box to inputted letter
                    currentBox.textContent = e.code[3];
                    col++; 
                }
            }
        }else if(e.code == "Backspace"){
            console.log("Is it working?")
            if(col > 0 && col <= width){
                col--;
            }
            let currentBox = document.getElementById(row+"-"+col);
            currentBox.textContent = "";
        
        }else if(e.code == "Enter"){
            update(); // Change Colour on Enter 
            row++; // Next Row / Attempt
            col = 0;
        }

    });
}

async function getWord(){
    const response = await fetch("/word");

    if (response.ok) {
        wordForToday = await response.json();
    } else {
        console.log("No word Retrieved!");
    }
}

async function update(){
    // Stop Game On Correct Guess:
    let correctLetter = 0;
    gameFin(correctLetter);
    
    // Colour Change: 
    for(let i = 0; i< width; i++){
        let currentBox = document.getElementById(row+"-"+i);
        let letter = currentBox.textContent;
        if(wordForToday[0][i] == letter){
            console.log("Correct")
            correctLetter ++;
            currentBox.classList.add("correct");
        }else if(wordForToday[0][i].includes(letter)){
            console.log("Exists")
            currentBox.classList.add("exists");
        }else{
            console.log("Incorrect")
            currentBox.classList.add("incorrect");
        }
    }

}

function gameFin(correctLetter){
    if(correctLetter == width){
        gameOver = true;
    }
}




// Dark / Light Mode
function changeTheme(){
    const root = document.querySelector(':root');
    console.log(String(getComputedStyle(root).getPropertyValue('--fontColour')) == 'beige');
    if(mode == 'light'){
        // Switch to Light Theme
        root.style.setProperty('--fontColour', '#292724');
        root.style.setProperty('--primaryColour', 'beige');
        root.style.setProperty('--boxShadow', '#c4c4b0');

        mode = 'dark';
    }else if (mode == 'dark'){
        // Switch to Dark Theme
        root.style.setProperty('--fontColour', 'beige');
        root.style.setProperty('--primaryColour', 'rgb(59, 58, 58)');
        root.style.setProperty('--boxShadow', '#323131');

        mode = 'light';
    }
}
