var Input = document.getElementById("Input");
var box = document.getElementById("box");

Input.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    Add();
  }
});


window.onload = function() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text, task.time, task.completed));
};

function Add() {
  if (Input.value.trim() === "") return;

  var now = new Date();
  var formattedTime = now.toLocaleString("en-IN", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  createTask(Input.value, formattedTime, false);
  saveTasks();

  Input.value = "";
}

function createTask(text, time, completed) {

  var Box = document.createElement("div");
  var Task = document.createElement("h1");
  var dltbtn = document.createElement("button");
  var timeLabel = document.createElement("p");
  var checkbox = document.createElement("input");

  Box.id = "innerbox";
  Task.id = "added_task";
  dltbtn.id = "delete_btn";
  timeLabel.id = "task_time";

  checkbox.type = "checkbox";

  Task.textContent = text;
  timeLabel.textContent = time;
  dltbtn.textContent = "Delete";

  if (completed) {
    Task.classList.add("completed");
    checkbox.checked = true;
  }

  checkbox.onchange = function() {
    Task.classList.toggle("completed");
    saveTasks();
  };

  dltbtn.onclick = function(event) {
    event.target.parentElement.remove();
    saveTasks();
  };

  Box.appendChild(checkbox);
  Box.appendChild(Task);
  Box.appendChild(timeLabel);
  Box.appendChild(dltbtn);

  box.appendChild(Box);
}

function saveTasks() {

  var tasks = [];

  document.querySelectorAll("#innerbox").forEach(taskBox => {

    var text = taskBox.querySelector("#added_task").textContent;
    var time = taskBox.querySelector("#task_time").textContent;
    var completed = taskBox.querySelector("input").checked;

    tasks.push({
      text: text,
      time: time,
      completed: completed
    });

  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}