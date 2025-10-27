const btnSubmit = document.getElementById('submit');
const btnList = document.getElementById('btnList');

const inputName = document.getElementById('name');
const inputAge = document.getElementById('age');
const inputEmail = document.getElementById('email');

const table = document.getElementById("tablePersonas");

const db = new PouchDB('personas');

btnSubmit.addEventListener('click', (event) =>{
    event.preventDefault();

    const persona = {
        _id: new Date().toISOString(),
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value,
        status: 'pending'
    };

    db.put(persona)
    .then((response) => {
        console.log(response);
        console.log('Persona guardada con éxito');
        getData();
        inputName.value = '';
        inputAge.value = '';
        inputEmail.value = '';
    }).catch(err => {
        console.error('Error al guardar la persona', err);
    });
})

window.addEventListener("load", () => {
    getData();
})

const getData = () => {
    db.allDocs({include_docs: true})
    .then((result) => {
        console.log('Personas en la BD:');
        console.log(result);
        table.innerHTML = ``;
        result.rows.map((row) => {
            table.innerHTML += `
                <tr key="${row.key}">
                    <td>${row.doc.name}</td>
                    <td>${row.doc.age}</td>
                    <td>${row.doc.email}</td>
                    <td><button type="button" onclick="deletePerson('${row.doc._id}', '${row.doc._rev}')">Eliminar</button></td>
                </tr>
            `;  
        });        
    }).catch(err => {
        console.error('Error al obtener los datos: ', err);
    });
}

const deletePerson = (_id, _rev) => {
    db.remove(_id, _rev)
    .then((result) => {
        console.log('Persona eliminada correctamente: ', result);
        getData();
    })
    .catch((err) => {
        console.error('Error al eliminar la persona: ', err);
    });
};
