var gamesLink = "https://games-world.herokuapp.com"

getGames();

document.addEventListener('click', function (event) { //verificam daca se da click in document
    if (event.target.matches('.btn')) { // verificam daca am dat click pe un buton din document - de fapt pe un element care are clasa "btn"
        var clickedButton = event.target.value; //extragem valoarea butonului clickuit de tipul tip_actiune-id_joc
        var actionToPerform = clickedButton.split("-").shift(); //extragem tipul actiunii pe care s-a dat click EDIT/DELETE/ADD
        var idOfGame = clickedButton.split("-").pop(); //extragem ID-ul jocului care urmeaza sa fie editat
        switch (actionToPerform) {
            case "edit": editGame(idOfGame);
                break;
            case "delete": deleteGame(idOfGame);
                break;
            case "publish": publishGame(idOfGame);
                break;
            case "addGame": addGame();
                break;
        }
    }


}, false);


function getGames() { //GET ALL GAMES

    //FETCH IMI FUNCTIONAEAZA DOAR CU METODA GET SI DELETE
    // PENTRU PUT SI POST A TREBUIT SA FOLOSESC jQuery
    
    fetch(gamesLink + "/games")
        .then(resp => resp.json())
        .then(function (response) {

            for (let i = 0; i < response.length; i++) {
                fetch(gamesLink + "/games/" + response[i]._id)
                    .then(resp => resp.json())
                    .then(function (resp) {

                        let gameId = resp._id;
                        let gameTitle = resp.title;
                        let gameDate = resp.releaseDate;
                        let gameGenre = resp.genre;
                        let gamePublisher = resp.publisher;
                        let imageLink = resp.imageUrl.split("?").shift();//extragem link-ul imaginii pentru fiecare joc
                        let gameDescription = resp.description;


                        // initial codul cu bootstrap de generare a cardului pentru joc arata ca in ultimele trei linii de la acest comment dar 
                        // introduce  </div> unde nu ar trebui, alterand codul dorit => formatul ptr output nu este cum am dorit 
                        // solutia pe care am gasit-o a fost sa folosesc variabile +  un singur innerHTML in care sa "lipim" codul pentru generarea 
                        // cardului in bootstrap 
                        // document.getElementById('gameCard').innerHTML += '<div class ="col-sm-6"><div class="card h-80 my-4" id ="'+gameId+'" ><img class="card-img-top " src="'+imageLink+'" alt="'+gameTitle+ '"><div class="card-body"><h5  class="card-title">'+gameTitle+ '</h5><p class= "card-text" contenteditable = "false">'+gameDescripion+'</p>';              
                        // document.getElementById('gameCard').innerHTML +='<button type="button" class="btn btn-primary ">EDIT</button>';
                        // document.getElementById('gameCard').innerHTML +='<button type="button" class="btn btn-danger">DELETE</button></div></div></div>';

                        let t1 = '<div class ="col-sm-4"><div class="card h-80 my-4" id ="'; // adaugam id-ul jocului la id-ul cardului |  h-80 - inaltime fixa pentru fiecare card 
                        let t2 = '" ><img class="card-img-top gameImg " src="';
                        let t3 = '" alt="';
                        let t4 = '">';
                        let t11 = '<h6 class = "imgUrl" style="visibility: hidden" >New image link</h6>' + '<p class = "imageUrl" style="visibility: hidden">' + imageLink + '</p>';
                        let t5 = '<div class="card-body">' + t11;
                        let t51 = '<h5  class="gameTitle card-title" contenteditable = "false">';
                        let t6 = '</h5>';
                        let t61 = '<p class= "gameDate " name = "date" contenteditable = "false">';
                        let t62 = '<p class= "gameGenre " contenteditable = "false">';
                        let t63 = '<p class= "gamePublisher" contenteditable = "false">';
                        let t7 = '<p class= "gameDescription card-text" contenteditable = "false">'; //contenteditable = "true" la apasarea EDIT pentru orice element cu clasa gData
                        let t8 = '</p>';
                        let t9 = '<button type="button" class="btn btn-primary mx-1" value = "edit-' + gameId + '" >EDIT</button>';
                        let t10 = '<button type="button" class="btn btn-danger mx-1 " value = "delete-' + gameId + '" >DELETE</button>';
                        let t91 = '<button type="button" class="btn btn-warning mx-1 " value = "publish-' + gameId + '"  style="visibility: hidden" >PUBLISH</button></div></div></div>';
                        // adaugam la valoarea butonului si id-ul jocului pentr a-l putea identifica in DOM pentru actiunile ulterioare


                        document.getElementById('gameCard').innerHTML += t1 + gameId + t2 + imageLink + t3 + gameTitle + t4 + t5 + t51 + gameTitle + t6 + "<h6>Release date</h6>" + t61 + gameDate + t8 + "<h6>Game genre</h6>" + t62 + gameGenre + "<h6>Game publisher</h6>" + t63 + gamePublisher + "<h6>Game description</h6>" + t7 + gameDescription + t8 + t9 + t10 + t91;

                    })
            }
            return response.length;
        }
        );

}



function editGame(id) {
   
    let game = document.getElementById(id); //extragem div-ul jocului
    game.style.backgroundColor = "#FDFFA2";
    game.children[1].getElementsByClassName('imageUrl')[0].style.visibility = "visible"; // link-ul ptr imagine devine vizibil
    game.children[1].getElementsByClassName('imgUrl')[0].style.visibility = "visible"; // textul de deasupra link imagine
    game.children[1].getElementsByClassName('gameTitle')[0].setAttribute("contenteditable", true); //facem editabil titlul jocului
    game.children[1].getElementsByClassName('gameDate')[0].setAttribute("contenteditable", true); //facem editabila data jocului
    game.children[1].getElementsByClassName('gameGenre')[0].setAttribute("contenteditable", true); //facem editabila data jocului
    game.children[1].getElementsByClassName('gameDescription')[0].setAttribute("contenteditable", true); //facem editabil textul cardului
    game.children[1].getElementsByClassName('gamePublisher')[0].setAttribute("contenteditable", true);//facem editabil gamePublisher-ul
    game.children[1].getElementsByClassName('imageUrl')[0].setAttribute("contenteditable", true);//facem editabil gamePublisher-ul
    game.children[1].getElementsByClassName('imageUrl')[0].focus(); // focus pe link imagine
    game.children[1].getElementsByClassName('btn-warning')[0].style.visibility = "visible"; // PUBLISH devine vizibil

    console.log(game);

}

function deleteGame(id) { // DELETE GAME
    console.log("DELETE-", id);
    console.log(gamesLink + "/games/" + id);

    fetch(gamesLink + "/games/" + id, {
        method: 'DELETE'

    })
        .then(response => {
            response.json();
            alert('Game was deleted from DB');
            location.reload(); //refresh pagina
        })
        .then(response => console.log(response));
   
}


function publishGame(id) {  //UPDATE GAME EDITAT 

    let game = document.getElementById(id);
    game.children[1].getElementsByClassName('btn-warning')[0].style.visibility = "hidden";// buton PUBLISH ascuns
    game.children[1].getElementsByClassName('imageUrl')[0].style.visibility = "hidden";//camp imagine ascuns
    game.children[1].getElementsByClassName('imgUrl')[0].style.visibility = "hidden";//text imagine ascuns
    game.style.backgroundColor = "white";
    game.children[1].getElementsByClassName('gameTitle')[0].setAttribute("contenteditable", false); //nu mai este editabil titlul jocului
    game.children[1].getElementsByClassName('gameDate')[0].setAttribute("contenteditable", false); //nu mai este editabila data jocului
    game.children[1].getElementsByClassName('gameGenre')[0].setAttribute("contenteditable", false); //nu mai este editabila data jocului
    game.children[1].getElementsByClassName('gameDescription')[0].setAttribute("contenteditable", false); //nu mai este editabil textul cardului
    game.children[1].getElementsByClassName('gamePublisher')[0].setAttribute("contenteditable", false);//nu mai este editabil gamePublisher-ul

    var gameTitle = game.children[1].getElementsByClassName('gameTitle')[0].innerHTML; //captam noul titlu al jocului - care are clasa .gameTitle in variabila gameTitle
    var gameDate = game.children[1].getElementsByClassName('gameDate')[0].innerHTML; //captam noua data
    var gameGenre = game.children[1].getElementsByClassName('gameGenre')[0].innerHTML; //captam noul gen al jocului
    var gamePublisher = game.children[1].getElementsByClassName('gamePublisher')[0].innerHTML; //captam noul publisher
    var gameImage = game.children[1].getElementsByClassName('imageUrl')[0].innerHTML;
    var gameDescription = game.children[1].getElementsByClassName('card-text')[0].innerHTML;
    
    if (isNaN(gameDate)) {  // verificam daca data este un numar
        alert("Date must be a number");
        return false;
    }

    var gameData = {
        "title": gameTitle,
        "releaseDate": parseInt(gameDate),
        "genre": gameGenre,
        "publisher": gamePublisher,
        "imageUrl": gameImage,
        "description": gameDescription,
    }

    $.ajax({
        type: 'PUT',
        dataType: 'json', // Set datatype - affects Accept header
        url: gamesLink + '/games/' + id,
        data: gameData,
        success: () => {

            alert('Game ' + gameTitle + " was edited succesfully");
            location.reload(); //refresh pagina
        }
    })

    // METODA PUT PE SERVER CU FETCH  NU RETURNEAZA DECAT EROARE 500 DIN ACEST MOTIV AM FOLOSIT JQUERY +
    // ACEASTA FIIND SINGURA METODA PRIN CARE AM REUSIT SA FAC PUT PE SERVER
    // ********FETCH **********
    //     var gameData = {
    //     title: gameTitle,
    //     releaseDate: parseInt(gameDate),
    //     genre: gameGenre,
    //     publisher: gamePublisher,
    //     imageUrl: gameImage,
    //     description: gameDescription,

    // };
    // fetch(gamesLink + "/games/", {
    //     body: JSON.stringify(gameData),
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     credentials: "same-origin"


    // })
    //     .then(response => response.json())
    //     // .then(response => {console.log(response); console.log(response._id)})
    //     .catch(error => console.log('Error:', error))




}
function addGame() {
    console.log("ADD NEW GAME");
    document.getElementById("newGameForm").setAttribute('class', 'form-group form-visible'); // facem vizibil formularul pentru adaugarea unui joc nou
    document.body.scrollTop = 0; //facem scroll inapoi sus la formularul de add game
    document.documentElement.scrollTop = 0;
    document.getElementById("addGameButton").style.display = "none";  // ascundem butonul Add New Game
    document.getElementById("regenDB").style.display = "none";
    document.getElementById("cancelButton").onclick = function () { //apasare buton cancel 
        document.getElementById("newGameForm").setAttribute('class', 'form-group form-hidden'); //ascundere formular 
        document.getElementById("addGameButton").style.display = "initial"; // buron addnew game apare din nou pe pagina
        document.getElementById("regenDB").style.display = "initial";
    }
    document.getElementById("submitButton").onclick = function () {
        var gameTitle = document.getElementById("gameTitle").value; //captam noul titlu al jocului
        var gameDate = document.getElementById("releaseDate").value;
        var gameGenre = document.getElementById("gameGenre").value;
        var gamePublisher = document.getElementById("gamePublisher").value;
        var gameImage = document.getElementById("gameImgLink").value;
        var gameDescription = document.getElementById("gameDescription").value;
        
        // if (gameTitle || gameDate || gameGenre || gamePublisher || gameImage || gameDescription === "") {  //verificam daca exista campuri goale

        //     alert(" You have empty fields, please fill them with info");
        //     document.getElementById("gameTitle").focus();
        //     return false;
        // }
       
        if (isNaN(gameDate)) {  // verificam daca data este un numar
            alert("Date must be a number");
            document.getElementById("releaseDate").focus();
            return false;
        }
       
        var gameData = {
            "title": gameTitle,
            "releaseDate": parseInt(gameDate),
            "genre": gameGenre,
            "publisher": gamePublisher,
            "imageUrl": gameImage,
            "description": gameDescription,
        }

        $.ajax({
            type: 'POST',
            dataType: 'json', // Set datatype - affects Accept header
            url: gamesLink + '/games/',
            data: gameData,
            success: () => {

                alert('Game ' + gameTitle + " was posted succesfully");
                location.reload(); //refresh pagina
            }
        })
    }


}