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
    })