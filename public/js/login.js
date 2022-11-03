const loginForm = document.querySelector("#login")
const signupForm = document.querySelector("#signup")

localStorage.removeItem("user")

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.querySelector("#login-email").value
  const password = document.querySelector("#login-password").value
  const loginErrorEl = document.querySelector("#login-error")

  fetch("api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
    })
  }).then(async res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(await res.text())
    }
  }).then(user => {
    loginErrorEl.classList.add("hidden")
    localStorage.setItem("user", user.username)
    location.href = "/"
  }).catch(error => {
    loginErrorEl.textContent = error
    loginErrorEl.classList.remove("hidden")
  })
})

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.querySelector("#signup-email").value
  const password = document.querySelector("#signup-password").value
  const username = document.querySelector("#signup-username").value
  const signupErrorEl = document.querySelector("#signup-error")

  fetch("api/auth/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      username
    })
  }).then(async res => {
    if (res.ok) {
      signupErrorEl.classList.add("hidden")
      localStorage.setItem("user", username)
      location.href = "/"
    } else {
      return Promise.reject(await res.text())
    }
  }).catch(error => {
    signupErrorEl.textContent = error
    signupErrorEl.classList.remove("hidden")
  })
})