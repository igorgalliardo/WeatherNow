document.querySelector('.search').addEventListener('submit',async(event)=>{
    event.preventDefault()//let's avoid standard update form

    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        clearInfo()
        showWarning('Loading...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=695c64947d1216e3f12295e082a63714&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clearInfo()
            showWarning('Location not found.')
        }
    }else{
        clearInfo()
    }
})

function showInfo(json){
    showWarning('')

    document.querySelector('.title').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.windInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.windPoint').style.transform = `rotate(${json.windAngle}deg)`

    document.querySelector('.result').style.display = 'block'
}

function clearInfo(){
    showWarning('')
    document.querySelector('.result').style.display = 'none'
}

function showWarning(msg){
    document.querySelector('.alert').innerHTML = msg
}