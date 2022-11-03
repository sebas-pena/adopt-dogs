const searchParams = new URLSearchParams(location.search);
const breedId = searchParams.get("breed")
fetch(`https://api.TheDogAPI.com/v1/images/search?breed_ids=${breedId}`, {
	headers: {
		"x-api-key": "live_JP4UQPFcGaKXRrP5N5YeURrtpGhuct4Ok6byJH0N0r0vNu9OQ23kU6RYuePQ5A4u"
	}
})
	.then(res => res.json())
	.then(data => {
		console.log(data)
		const image = data[0].url
		const breed = data[0].breeds[0]
		const cardCtn = document.querySelector(".card-ctn")
		cardCtn.innerHTML = `
			<div class="card">
					<img
							class="card__img"
							src="${image}"
					/>
					<div class="card__body">
							<p class="card__name">African Hunting Dog</p>
							<p class="card__detail">Edad: ${breed.life_span} años</p>
							<p class="card__detail">Temperamento: ${breed.temperament}</p>
							<p class="card__detail">Peso: ${breed.weight.metric} Kg</p>
							<p class="card__detail">Altura: ${breed.height.metric} cm</p>
							<button>Confirmar</button>
					</div>
			</div>
		`
	})