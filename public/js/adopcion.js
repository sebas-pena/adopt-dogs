

const dogsListElem = document.querySelector("#dogs-ctn")
const showDogs = (dogs) => {
  dogs.forEach(dog => {
    const { name, image, life_span } = dog

    const dogElement = document.createElement("li")
    dogElement.innerHTML = `
      <img src="${image.url}"/>
      <p>Nombre: ${name}</p>
      <p>Edad: ${life_span.split(" ").shift()}</p>
      <p>El Lorem Ipsum fue concebido como un texto de relleno, formateado de una cierta manera para permitir la presentación de elementos gráficos en documentos, sin necesidad de una copia formal. El uso de Lorem Ipsum permite a los diseñadores reunir los diseños y la forma del contenido antes </p>
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
      breedButton.innerHTML = `<button>${name}</button>`
      breedsListElem.appendChild(breedButton)
    })
    const dogsToShow = data.slice(0, 22)
    showDogs(dogsToShow)
  })