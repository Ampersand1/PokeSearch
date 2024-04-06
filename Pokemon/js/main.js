//ocultar y mostrar divs
function mostrarCarta() {
    var div = document.getElementById("card");
    div.style.display = "block";
}
function ocultarCarta() {
    var div = document.getElementById("card");
    div.style.display = "none";
}
function mostrarTabla() {
    var div = document.getElementById("tabla");
    div.style.display = "block";
}
function ocultarTabla() {
    var div = document.getElementById("tabla");
    div.style.display = "none";
}
function mostrarBotonVoz() {
    var divError = document.getElementById("botonVoz");
    divError.style.display = "block";
}
function ocultarBotonVoz() {
    var divError = document.getElementById("botonVoz");
    divError.style.display = "none";
}
function mostrarError404() {
    var divError = document.getElementById("errorT");
    divError.style.display = "block";
}
function ocultarError404() {
    var divError = document.getElementById("errorT");
    divError.style.display = "none";
}
function mostrarImagenError() {
    var divError = document.getElementById("error");
    divError.style.display = "block";
}
function ocultarImagenError() {
    var divErrorImg = document.getElementById("error");
    divErrorImg.style.display = "none";
}
//variables cambiar carta

//obtener datos de la api

function datos(data) {
    //inicializar variables para llenar tabla y card
    let arrayNombre = {};
    let arrayTypes = {};
    let arrayItems = {};
    let arrayStats = {};
    //card:
    let typesHtml = "";
    let slotsTHtml = "";
    let abilitiesHtml = "";
    let slotsAHtml = "";
    let itemsHtml = "";
    //llenar card
    // nombre
    if (data.forms) {
        arrayNombre = data.forms;
        for (let i = 0; i < arrayNombre.length; i++) {
            console.log(arrayNombre[i].name);
            $("#nombre").html(`<h2>${arrayNombre[i].name}</h2>`);
        }
    }

    // types
    if (data.types) {
        arrayTypes = data.types;


        for (let i = 0; i < arrayTypes.length; i++) {
            console.log(arrayTypes[i].type.name);
            console.log(arrayTypes[i].slot);

            typesHtml += `<h6>${arrayTypes[i].type.name}</h6>`;
            slotsTHtml += `<h6>${arrayTypes[i].slot}</h6>`;
        }

    }

    // habilidades
    if (data.abilities) {
        arrayAbilities = data.abilities;

        for (let i = 0; i < arrayAbilities.length; i++) {
            console.log(arrayAbilities[i].ability.name);
            console.log(arrayAbilities[i].slot);

            abilitiesHtml += `<h6>${arrayAbilities[i].ability.name}</h6>`;
            slotsAHtml += `<h6>${arrayAbilities[i].slot}</h6>`;

        }

    }

    // items
    if (data.held_items) {
        arrayItems = data.held_items;
        for (let i = 0; i < arrayItems.length; i++) {
            console.log(arrayItems[i].item.name);

            itemsHtml += `<h6>${arrayItems[i].item.name}</h6>`;
        }
    }
    //llenar tabla
    // stats
    if (data.stats) {
        arrayStats = data.stats;
        for (let i = 0; i < arrayStats.length; i++) {
            console.log(arrayStats[i].stat.name);
            console.log(arrayStats[i].base_stat);
            console.log(arrayStats[i].effort);
        }
        mostrarCarta();
        mostrarTabla();
        $("#imagen_pokemon").html(`<img src="${data.sprites.other.home.front_default}" class="card-img-top">`);
        
    $("#hpE").html(`<h5>${arrayStats[0].effort}</h5>`);
    $("#hpS").html(`<h5>${arrayStats[0].base_stat}</h5>`);
    $("#attackS").html(`<h5>${arrayStats[1].base_stat}</h5>`);
    $("#attackE").html(`<h5>${arrayStats[1].effort}</h5>`);
    $("#defenseS").html(`<h5>${arrayStats[2].base_stat}</h5>`);
    $("#defenseE").html(`<h5>${arrayStats[2].effort}</h5>`);
    $("#specialDefenseS").html(`<h5>${arrayStats[3].base_stat}</h5>`);
    $("#specialDefenseE").html(`<h5>${arrayStats[3].effort}</h5>`);
    $("#specialAttackS").html(`<h5>${arrayStats[4].base_stat}</h5>`);
    $("#specialAttackE").html(`<h5>${arrayStats[4].effort}</h5>`);
    $("#speedS").html(`<h5>${arrayStats[5].base_stat}</h5>`);
    $("#speedE").html(`<h5>${arrayStats[5].effort}</h5>`);
    
    $("#types").html(`<h5>Types: </h5>${typesHtml}`);
    $("#slotsT").html(`<h5>Slots: </h5>${slotsTHtml}`);
    $("#abilities").html(`<h5>Abilities: </h5>${abilitiesHtml}`);
    $("#slotsA").html(`<h5>Slots: </h5>${slotsAHtml}`);
    $("#items").html(`<h5>Items: </h5>${itemsHtml}`);

    }

}

//datos por busqueda normal
function obtenerDatosBoton() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + $("#input").val().toLowerCase(),
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            datos(data);
            ocultarError404();
            ocultarImagenError();
        },
        error: function () {
            mostrarImagenError();
            mostrarError404();
            $("#error").html(`<img src="css/images/error.png" class="card-img-top">`);
            $("#error").css({
                "width": "600px",
                "height": "600px",
                "position": "absolute",
                "top": "70%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",
            });
        }
    });
}
//obtener datos por busqueda de voz
function obtenerDatosVoz(pokeNombre) {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + pokeNombre,
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            datos(data);
            ocultarError404();
            ocultarImagenError();
        },
        error: function () {
            mostrarImagenError();
            mostrarError404();
            $("#error").html(`<img src="css/images/error.png" class="card-img-top">`);
            $("#error").css({
                "width": "600px",
                "height": "600px",
                "position": "absolute",
                "top": "70%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",
            });
        }
    });
}


//obtener pokemon por busqueda de voz
var artyom = new Artyom();
//objeto pokemon
var pokemon = {};
var UserDictation = artyom.newDictation({
    continuous: true,
    onResult: function (text) {
        $("#input").val(text.toLowerCase());
        obtenerDatosVoz(text.toLowerCase());
    },
    onStart: function () {
        ocultarCarta();
        ocultarTabla();
        ocultarBotonVoz();
        ocultarError404();
        ocultarImagenError();
    },
    onEnd: function () {
        mostrarBotonVoz();
    }
});

//eventos botones
$(document).ready(function () {
    $("#botonBuscar").on("click", function () {
        ocultarError404();
        ocultarImagenError();
        ocultarCarta();
        ocultarTabla();
        obtenerDatosBoton();
    })
})
$(document).ready(function () {
    $("#botonVoz").on("click", function () {
        UserDictation.start();
        //detener a los x segundos
        setTimeout(function () {
            UserDictation.stop();
        }, 3000)

    })
})





