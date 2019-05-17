console.log("client side javascript loaded...");

// fetch('http://localhost:3000/weather?place=%22Boston%22').then((response) => {
//     response.json().then((data) => {
//         if(data.error) console.log(data.error);
//         else console.log(data);
//     })
// })

const formValue = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.getElementById('msg1');
const p2 = document.getElementById('msg2');



formValue.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;

    const place = location.split(' ')
    const address = place.slice(1).reduce((accumulator, curr) => accumulator + '%20' + curr, place[0]);

    p1.textContent = 'Loading...';
    p2.textContent = "";

    fetch(`http://localhost:3000/weather?place=%22${address}%22`)
        .then(response => {
            response.json().then(data => {
                if(data.error) {
                    p1.textContent = '';
                    p2.textContent = data.error;
                }
                else {
                    p1.textContent = '';
                    p2.textContent = JSON.stringify(data);
                }
            })
        })
        .catch(error => {
            p1.textContent = '';
            p2.textContent = data.error;
        })
})

