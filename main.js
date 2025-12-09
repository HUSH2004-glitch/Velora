// main.js - MODIFIED CODE

// --- 1. CONFIGURATION: Mood Palettes and Attributes ---
const MOODS = {
    // RGB values for --accent-main and --accent-dark
    neutral: {
        accent: '138, 93, 168', // Default Purple/Blue
        dark: '167, 139, 250',
        question: "How do you feel about your goals today?",
        speed: 1.0 // Base speed
    },
    happy: {
        accent: '251, 191, 36', // Yellow
        dark: '234, 179, 8',
        question: "What small win brought you the most joy today?",
        speed: 0.8 // Faster, lighter movement
    },
    sad: {
        accent: '96, 165, 250', // Blue
        dark: '59, 130, 246',
        question: "What are you holding onto that you should let go?",
        speed: 2.0 // Slower, heavier movement
    },
    confused: {
        accent: '244, 114, 182', // Pink/Mauve
        dark: '219, 39, 119',
        question: "What is confusing you and why?",
        speed: 1.5 // Variable, slightly uneasy movement
    },
    focused: {
        accent: '34, 197, 94', // Green
        dark: '22, 163, 74',
        question: "What single task is the most important to complete right now?",
        speed: 0.5 // Quick, sharp movement
    },
    // **ANGRY MOOD (Uses your chosen Red palette)**
// Inside main.js

angry: {
        accent: '220, 32, 17',
        dark: '143, 11, 19',
        question: "What boundary was crossed?",
        
        // UPDATED: Correct filename and extension
        bg: "url(images/angry.jpeg)"
    },

};

let currentMood = MOODS.neutral; // Global state tracking

// --- 2. THE MOOD SWITCHING FUNCTION ---
function setMood(moodKey) {
    const moodData = MOODS[moodKey] || MOODS.neutral;
    currentMood = moodData;

    // 1. Update Colors (Keep this, it works)
    const root = document.documentElement; 
    root.style.setProperty('--accent-main-rgb', moodData.accent);
    root.style.setProperty('--accent-dark-rgb', moodData.dark);

    // 2. THE NEW BACKGROUND FIX (Class Toggle)
    // If the mood is 'angry', we add the class. Otherwise, we remove it.
    if (moodKey === 'angry') {
        document.body.classList.add('angry-mode');
    } else {
        document.body.classList.remove('angry-mode');
    }

    // 3. Update Question (Keep this)
    const questionEl = document.getElementById('mirror-question');
    if (questionEl) questionEl.innerText = moodData.question;
    
    // 4. Update Button Active States (Keep this)
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const newActiveBtn = document.querySelector(`[data-mood="${moodKey}"]`);
    if (newActiveBtn) newActiveBtn.classList.add('active');
    
    // 5. Update Reflection Placeholder (Keep this)
    const reflectionBox = document.getElementById("reflection-text");
    if (reflectionBox) {
         let message = "Write your reflection here...";
         if (moodKey === "happy") message = "😊 What small win brought you joy?";
         else if (moodKey === "sad") message = "😢 What are you holding onto?";
         else if (moodKey === "confused") message = "😕 List what is confusing you...";
         else if (moodKey === "focused") message = "🎯 What is the #1 goal right now?";
         else if (moodKey === "angry") message = "😡 Write it out. Burn the page.";
         
         reflectionBox.setAttribute("placeholder", message);
    }
}

// Attach the new logic to the buttons
let moodButtons = document.querySelectorAll(".mood-btn");
moodButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        setMood(btn.dataset.mood);
    });
});

// Load history and set default mood on load (Assuming you have these functions defined)
document.addEventListener('DOMContentLoaded', () => {
    // You must load your history functions here
    // loadHistory(); 
    setMood('neutral'); 
});


// TO-DO LIST WITH CHECKBOXES (Placeholder - implement updateProgressBar logic)
function addTask() {
    let input = document.getElementById("todo-input");
    const taskText = input.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${taskText}`;
    
    // Add event listener for progress bar update (must be implemented)
    // li.querySelector('input[type="checkbox"]').addEventListener('change', updateProgressBar);
    
    // Use the current mood color for the list border (aesthetic touch)
    li.style.borderLeftColor = `rgba(${currentMood.accent}, 0.7)`;

    document.getElementById("todo-list").appendChild(li);
    input.value = "";
}

// SAVE DIARY (Placeholder - logic to save to localStorage/DB)
function saveDiary() {
    let text = document.getElementById("diary-text").value;
    if (text.trim() === "") return;

    let date = new Date().toLocaleString();
    localStorage.setItem("Diary_" + date, text);
    
    let li = document.createElement("li");
    li.textContent = date;
    document.getElementById("saved-list").appendChild(li);

    alert("Diary saved!");
}
function clearDiary() {
    document.getElementById("diary-text").value = "";
}

// SAVE REFLECTION (Placeholder - logic to save to localStorage/DB)
function saveReflection() {
    let text = document.getElementById("reflection-text").value;

    if (text.trim() === "") {
        alert("Reflection is empty!");
        return;
    }

    let date = new Date().toLocaleString();
    localStorage.setItem("Reflection_" + date, text);

    let li = document.createElement("li");
    li.textContent = date;
    document.getElementById("saved-reflection-list").appendChild(li);

    alert("Reflection saved!");
}

// CLEAR REFLECTION (Placeholder)
function clearReflection() {
    document.getElementById("reflection-text").value = "";
}