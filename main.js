// TO-DO LIST WITH CHECKBOXES
function addTask() {
    let input = document.getElementById("todo-input");
    if (input.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${input.value}`;
    
    document.getElementById("todo-list").appendChild(li);
    input.value = "";
}


// SAVE DIARY (Right Section)
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


// MOOD REFLECTION
let moodButtons = document.querySelectorAll(".mood-btn");
let reflectionBox = document.getElementById("reflection-text");

moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let mood = btn.dataset.mood;

        if (mood === "happy") reflectionBox.value = "😊 Feeling joyful today!";
        if (mood === "sad") reflectionBox.value = "😢 It's okay to feel down sometimes.";
        if (mood === "confused") reflectionBox.value = "😕 Take your time. Think clearly.";
        if (mood === "focused") reflectionBox.value = "🎯 Stay on track. You’re doing great!";
    });
});
// ---------------------- SAVE REFLECTION ----------------------
function saveReflection() {
    let text = document.getElementById("reflection-text").value;

    if (text.trim() === "") {
        alert("Reflection is empty!");
        return;
    }

    let date = new Date().toLocaleString();

    // Save in local storage
    localStorage.setItem("Reflection_" + date, text);

    // Show in saved list
    let li = document.createElement("li");
    li.textContent = date;
    document.getElementById("saved-reflection-list").appendChild(li);

    alert("Reflection saved!");
}

// ---------------------- CLEAR REFLECTION ----------------------
function clearReflection() {
    document.getElementById("reflection-text").value = "";
}
