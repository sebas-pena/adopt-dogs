const commentsList = document.querySelector("#comments-list")
const user = localStorage.getItem("user") || null

/* 

<p class="login-message">Inicia sesión para enviar un comentario</p>
      <form id="comment-form" class="add-comment-ctn">
        <p id="comment__username">@NombreUsuario</p>
        <textarea
          type="text"
          placeholder="Escribe tu comentario..."
          id="comment"
        ></textarea>
        <button>Enviar</button>
      </form>

*/
const main = document.querySelector("main")

if (user) {
  const commentForm = document.createElement("form")
  commentForm.classList.add("add-comment-ctn")
  commentForm.id = "comment-form"
  commentForm.innerHTML = `
    <p id="comment__username">${user}</p>
    <textarea
      type="text"
      placeholder="Escribe tu comentario..."
      id="comment"
    ></textarea>
    <button>Enviar</button>
  `

  const commentEl = commentForm.querySelector("#comment")

  commentEl.addEventListener("input", () => {
    if (commentEl.value && commentEl.classList.contains("error")) {
      commentEl.classList.remove("error")
    }
  })

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    // Si el input esta vacio agrega la clase error, sino envia el comentario
    if (commentEl.value) {
      commentEl.classList.remove("error")
      fetch("http://localhost:8080/api/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          author: user,
          content: commentEl.value
        })
      })

      createComment({
        author: user,
        content: commentEl.value
      })

      commentEl.value = ""

    } else {
      commentEl.classList.add("error")
    }
  })
  main.prepend(commentForm)
} else {
  const loginMessage = document.createElement("p")
  loginMessage.classList.add("login-message")
  loginMessage.textContent = "Inicia sesión para enviar un comentario"
  main.prepend(loginMessage)
}

// Recupera los comentarios en la api y los renderiza

fetch("http://localhost:8080/api/comments")
  .then(res => res.json())
  .then(comments => {
    comments.forEach(comment => {
      createComment(comment)
    })
  })


// Funcion que recibe un comentario y lo agrega a la lista

const createComment = (comment) => {
  const commentCtn = document.createElement("li")
  commentCtn.classList.add("comment__ctn")
  commentCtn.innerHTML = `
      <p class="comment__username">${comment.author}</p>
      <p class="comment">${comment.content}</p>
      ${user == comment.author ?
      `<div class="comment__controls">
          <button class="comment__edit">Editar</button>
          <button class="comment__delete">Eliminar</button>
        </div>` : ""
    }
      `
  if (user == comment.author) {
    const editBtn = commentCtn.querySelector(".comment__edit")
    let editable = false
    const commentEl = commentCtn.querySelector(".comment")
    editBtn.addEventListener("click", () => {
      commentEl.classList.toggle("input")
      console.log("clicked")
      if (editable == false) {
        editable = true
        editBtn.textContent = "Actualizar"
        commentEl.setAttribute("contenteditable", "true")
        commentEl.focus()
      } else {
        editable = false
        commentEl.setAttribute("contenteditable", "false")
        editBtn.textContent = "Editar"
        fetch(`http://localhost:8080/api/comments/${comment.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            content: commentEl.textContent
          })
        })
      }
    })
    commentCtn.querySelector(".comment__delete").addEventListener("click", () => {
      commentCtn.remove()
      fetch(`http://localhost:8080/api/comments/${comment.id}`, {

        method: "DELETE"
      })
    })
  }
  commentsList.prepend(commentCtn)
}