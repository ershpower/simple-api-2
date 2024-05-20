document.addEventListener('DOMContentLoaded', () => {

    const allCountriesNode = document.querySelector('.all-countries');
    const searchInput = document.querySelector('#search');
    const searchBtn = document.querySelector('#searchBtn');
    const searchField = document.querySelector('.search-field');

    // utils start
    const clearDomNode = (node) => node.innerHTML = '';

    // utils end

    const createCountryCard = (country) => {
        const card = document.createElement('div');
        card.classList.add('card', 'country-card');

        const img = document.createElement('img');
        img.src = country.flags.png;
        img.alt = country.flags.alt;

        const cardBody = document.createElement('div');
        card.classList.add('card-body');
        const capital = document.createElement('p');
        capital.innerText = country.capital[0];
        const name = document.createElement('p');
        name.innerText = country.name.common;

        cardBody.appendChild(img);
        cardBody.appendChild(capital);
        cardBody.appendChild(name);

        card.appendChild(cardBody);

        return card;

    }

    // All countries start
    const fetchAllCountries = async () => {

        try {
            allCountriesNode.innerText = 'Загрузка';
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital')
            const countries = await response.json();

            if (response.ok && countries.length) {
                clearDomNode(allCountriesNode);
                countries.forEach((country) => {
                    const countryCard = createCountryCard(country);
                    allCountriesNode.appendChild(countryCard);
                })
            }

        } catch (e) {
            allCountriesNode.innerText = 'Произошла ошибка при загрузке';
        }
    }

    fetchAllCountries()

    // All countries end

    // search start

    let searchValue = "";

    searchInput.addEventListener('input', (e) => {
        searchValue = e.target.value;
    })


    searchBtn.addEventListener('click', async () => {
        if (searchValue.length) {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
                const country = await response.json();
                const countryCard = createCountryCard(country[0]);
                searchField.appendChild(countryCard)
            }catch (e) {
                searchField.innerText = 'Произошла ошибка при загрузке';
            }


        }
    })
    // search end
})