const loadPhones = async (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit);
}

// displayPhones 
const displayPhones = (allPhones, dataLimit) => {
    // show-more
    const showMore = document.getElementById('show-more');
    if (dataLimit && allPhones.length > 9) {
        allPhones = allPhones.slice(1, 9)
        showMore.classList.remove('d-none')
    } else {
        showMore.classList.add('d-none')
    }



    // phone not found 
    const phonNotFound = document.getElementById('phone-not-found');
    if (allPhones.length === 0) {
        phonNotFound.classList.remove('d-none')
    } else {
        phonNotFound.classList.add('d-none')
    }


    // allPhones 
    const phonContainer = document.getElementById('phon-container')
    phonContainer.textContent = '';
    allPhones.forEach(phones => {

        // console.log(phones);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card ">
                <img src="${phones.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <!-- Button trigger modal -->
                <button onclick="phonesDetails('${phones.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                More Details
                </button>
                </div>
            </div>

        `
        phonContainer.appendChild(phoneDiv)

    })

    // loadingSpinner stop 
    loadingSpinner(false)


}

// common function
const proccesData = (dataLimit) => {
    const searchField = document.getElementById('search-field').value;
    loadPhones(searchField, dataLimit)

    // loading spinner start 
    loadingSpinner(true)
}

// search field here 
const searchField = document.getElementById('search-field')
searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("search-btn").click();
    }
});
document.getElementById('search-btn').addEventListener('click', function () {
    proccesData(9)
})
loadPhones('iphon')

const loadingSpinner = isLoading => {
    const loader = document.getElementById('loading-spinner');
    if (isLoading === true) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}


// show all phones 
document.getElementById('show-all-phone').addEventListener('click', function () {
    proccesData()
})


const phonesDetails = async (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.data)
}

const displayDetails = (data) => {
    console.log(data);
    const detailsName = document.getElementById('exampleModalLabel');
    detailsName.innerText = `${data.name}`

    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <div class="card ">
  <div class="w-100 pb-4 mx-auto d-flex justify-content-center"><img src="${data.image}" class="card-img-top w-50 " alt="..."></div>
  <div class="card-body">
    <ul>
    <li>Relase: ${data.releaseDate ? data.releaseDate : 'No realase date found'}</li>
    <li>Brand: ${data.brand}</li>
    <li>Model: ${data.name}</li>
    <li>Storage: ${data.mainFeatures.storage}</li>
    <li>Memory: ${data.mainFeatures.memory}</li>
    <li>Display Size: ${data.mainFeatures.displaySize}</li>
    <li>Chipset: ${data.mainFeatures.chipSet}</li>
    <li>Bluetooth: ${data.others.Bluetooth}</li>
    <li>GPS: ${data.others.GPS}</li>
    <li>NFC: ${data.others.NFC}</li>
    <li>Radio: ${data.others.Radio}</li>
    <li>USB: ${data.others.USB}</li>
    <li>WLAN: ${data.others.WLAN}</li>
    </ul>
   

  </div>
</div>
    
    
    `
    //     data.forEach(details => {
    //         modalBody.innerHTML = `
    // <div class="card" style="width: 18rem;">
    //   <img src="..." class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //   </div>
    // </div>


    // `
    // })

}
