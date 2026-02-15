export function checkAuth() {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
  }
}

export function checkLogin() {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "dashboard.html";
  }
}
