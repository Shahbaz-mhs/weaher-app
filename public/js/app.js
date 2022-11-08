//console.log('Client Side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           // console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'Out Side Temperature is '+data.temperature+', it feels like '+data.humidity+' and wind speed is '+data.windspeed+' km/hr.'
            messageTwo.textContent = data.address
            // console.log(location)
            // console.log(data.address)
            // console.log(data.temperature)
        }
    })
})
})