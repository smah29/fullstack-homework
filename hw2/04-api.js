/** Exercise 04 - API **/
//using v2 API which is already sorted
const url = 'https://restcountries.com/v2/all';
//for formatting population
const nf = new Intl.NumberFormat('en-US');

let app = document.querySelector('#results');
const getData = async function (url) {
    try {
        let response = await fetch(url);
        let data = await response.json();

        data.forEach((item) => {
            addCountryAndPopulationToDOM(item);
        });
    } catch (error) {
        console.error(error);
        let element = document.createElement('div');
        element.textContent = 'An error occured. Please try again';
        app.append(element);
    }
};
const addCountryAndPopulationToDOM = (item) => {

    let li = document.createElement('li');
    const population = isNaN(item.population) ? "Invalid population" : nf.format(item.population);
    li.textContent = `${item.name} - ${population}`;
    app.append(li);
};

getData(url);
