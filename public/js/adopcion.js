

const dogsListElem = document.querySelector("#dogs-ctn")
const showDogs = (dogs) => {
  dogs.forEach(dog => {
    const { name, image, life_span } = dog

    const dogElement = document.createElement("li")
    dogElement.innerHTML = `
      <img class="img-dog" src="${image.url}"/>
      <p class="Parrafo">Nombre: ${name}</p>
      <p class="Parrafo">Edad: ${life_span.split(" ").shift()}</p>
      <p class="Parrafo">El Lorem Ipsum fue concebido como un texto de relleno, formateado de una cierta manera para permitir la presentación de elementos gráficos en documentos, sin necesidad de una copia formal. El uso de Lorem Ipsum permite a los diseñadores reunir los diseños y la forma del contenido antes </p>
      <a href="./404.html"><button class="btn-adopt">Ver Mas</button></a>
    `
    dogsListElem.appendChild(dogElement)
  })
}

const breedsListElem = document.querySelector("#breeds-list")

fetch("https://api.thedogapi.com/v1/breeds", {
  headers: {
    "x-api-key": "live_JP4UQPFcGaKXRrP5N5YeURrtpGhuct4Ok6byJH0N0r0vNu9OQ23kU6RYuePQ5A4u"
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(breed => {
      const { id, name } = breed
      const breedButton = document.createElement("li")
      breedButton.innerHTML = `<button >${name}</button>`
      breedsListElem.appendChild(breedButton)
      breedButton.querySelector("button").addEventListener("click", () => {
        location.href = `adoptar.html?breed=${id}`
      })
    })
    const dogsToShow = data.slice(0, 12)
    showDogs(dogsToShow)
  })

document.querySelector(".F3").addEventListener("click", (e) => {
  document.querySelector(".filtro").classList.toggle("open")
  breedsListElem.classList.toggle("hidden")
})