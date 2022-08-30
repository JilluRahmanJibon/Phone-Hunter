const loadPhones = async (searchInputText, dataLimit) => {

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`
    fetch(url)
    const res = await fetch(url)
    const result = await res.json()
    displayPhones(result.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phones-container');
    // display phone show only 10
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 9)
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    // display no phone found 
    const noPhoneFound = document.getElementById('no-phone-found')
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none')
    } else {
        noPhoneFound.classList.add('d-none')
    }

    // display all phones 
    phoneContainer.textContent = '';
    phones.forEach(iphone => {
        console.log(iphone);
        const { brand, image, phone_name, slug } = iphone
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card p-4">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Brand: ${brand}</h5>
            <h5 class="card-title">${phone_name}</h5>
            <h5 class="card-title">Model: ${slug}</h5>
        
        </div>
    `;
        phoneContainer.appendChild(div)

    });
    // stop toggleSpinner 
    toggleSpinner(false)


}

const proccesData = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchInputText = searchField.value;
    loadPhones(searchInputText, dataLimit)
}

// handle search button click 
document.getElementById('search-button').addEventListener('click', function () {
    // start loader     
    proccesData(10)
    // searchField.value = '';
})
// loadPhones('')

const toggleSpinner = isLoading => {
    const loaderSpinner = document.getElementById('loader');
    if (isLoading) {
        loaderSpinner.classList.remove('d-none')
    }
    else {
        loaderSpinner.classList.add('d-none')
    }
}
document.getElementById('show-more').addEventListener('click', function () {
    proccesData()
})