const API_BASE = " https://strong-files-know.loca.lt";
let token = null; // To store JWT token after login

// Fetch API Helper
async function fetchData(url, method = "GET", data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (token) options.headers["Authorization"] = `Bearer ${token}`;
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE}${url}`, options);
  return response.json();
}

// Toggle Forms
document.getElementById("go-to-login").addEventListener("click", () => {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});
document.getElementById("go-to-register").addEventListener("click", () => {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
});

// Handle Registration
document.getElementById("register-btn").addEventListener("click", async () => {
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const data = await fetchData("/auth/register", "POST", {
      username,
      email,
      password,
    });
    if (data.success) {
      alert("Registration successful. Please login.");
      document.getElementById("register-form").style.display = "none";
      document.getElementById("login-form").style.display = "block";
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
});

// Handle Login
document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const data = await fetchData("/auth/login", "POST", { email, password });
    if (data.token) {
      token = data.token;
      document.getElementById("login-form").style.display = "none";
      document.getElementById("task-manager").style.display = "block";

      loadTasks();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
});

// Load Tasks
async function loadTasks() {
  try {
    const data = await fetchData("/tasks");
    const tasksDiv = document.getElementById("tasks");
    tasksDiv.innerHTML = ""; // Clear existing tasks

    if (data.tasks && data.tasks.length > 0) {
      data.tasks.forEach((task) => {
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description || "No description"}</p>
                    <p>Deadline: ${
                      new Date(task.deadline).toLocaleDateString() ||
                      "No deadline"
                    }</p>
                    <p>Priority: ${task.priority}</p>
                    <button onclick="deleteTask('${task._id}')">Delete</button>
                `;
        tasksDiv.appendChild(taskEl);
      });
    } else {
      tasksDiv.innerHTML = "<p>No tasks found.</p>";
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Add Task
document
  .getElementById("task-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    try {
      const data = await fetchData("/tasks", "POST", {
        title,
        description,
        deadline,
        priority,
      });
      if (data.success) {
        loadTasks();
        document.getElementById("task-form").reset();
      } else {
        alert(data.message || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  });

// Delete Task
async function deleteTask(taskId) {
  try {
    const data = await fetchData(`/tasks/${taskId}`, "DELETE");
    if (data.message === "Task removed") {
      loadTasks();
    } else {
      alert(data.message || "Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Logout Functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  token = null; // Clear the token
  document.getElementById("task-manager").style.display = "none";
  document.getElementById("login-form").style.display = "block"; // Show login form
  alert("You have been logged out successfully.");
});
