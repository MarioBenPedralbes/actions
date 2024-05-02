let data;
let htmlStr="";
let pregActual=0;
let score;
//anticipando cuando php retorne parte del json y 
//no el archivo completo, quizzlength sería igual a dates.preguntes.length, presumiblemente 5;
let quizzLength;
// IP del domain hestia==217.71.201.126
//rutes de pagina y de fetch en subdomini, respectivament;
//http://tr0.marbenalcdaw3.daw.inspedralbes.cat
//http://tr0.marbenalcdaw3.daw.inspedralbes.cat/backend/data.json

//ruta versión domini pare
//http://marbenalcdaw3.daw.inspedralbes.cat/transversal-0-2023-2024-MarioBenPedralbes/index.html
//http://marbenalcdaw3.daw.inspedralbes.cat/transversal-0-2023-2024-MarioBenPedralbes/backend/data.json

//ruta local
//http://localhost/dashboard/transversal-0-2023-2024-MarioBenPedralbes/index.html
//http://localhost/dashboard/transversal-0-2023-2024-MarioBenPedralbes/backend/data.json


// fetch('http://localhost/dashboard/transversal-0-2023-2024-MarioBenPedralbes/backend/data.json')
//   .then(response => response.json())
//   .then(d => data=d);

// funcion pintar landing
renderLanding(); 



function renderLanding() {
  document.getElementById("landing").style.display = "block";
  document.getElementById("preguntas").style.display = "none";
  document.getElementById("results").style.display = "none";
  if (localStorage.getItem("username") === null) {
    htmlStr=`
    <div class="landing__card">
    <h2 class="landing__title unimportant">Hello!<br>Welcome to the<br>GRAND DRIVING QUIZZ</h2>
    <button id="game__start" class="landing__button">START<br>CHALLENGE</button>
    <div id="landing__username">
                  <div id="landing__username__text">  
                  <label for="username__textbox">Your Name is: </label><br>
                  <input type="text" id="username__textbox" name="fav_language" value="" placeholder="Input Name">
                  </div>
                  <button id="landing__username__btn" data-type="add">Select Name</button>
              </div>
    </div>`;
  } else {
    htmlStr=`
    <div class="landing__card">
    <h2 class="landing__title unimportant">Hello, ${localStorage.getItem('username')}!<br>Welcome to the<br>GRAND DRIVING QUIZZ</h2>
    <button id="game__start" class="landing__button">START<br>CHALLENGE</button>
    <div id="landing__username">
                  <button id="landing__username__btn" data-type="reset">Reset Name</button>
              </div>
    </div>`;
  }
  document.getElementById("landing").innerHTML=htmlStr;
  document.getElementById("game__start").addEventListener("click", function() { renderGame() });
  document.getElementById("landing__username").addEventListener("click", function(e) { 
    if (e.target.getAttribute('data-type')=='reset') {
      localStorage.removeItem('username');
      console.log('reset');
      renderLanding();
    } else {
      if (e.target.getAttribute('data-type')=='add') {
        localStorage.setItem("username", `${document.getElementById('username__textbox').value}`);
        renderLanding();
      }
    }
   });
}


 
function renderGame() {
  score=0;
  fetch('http://localhost/dashboard/transversal-0-2023-2024-MarioBenPedralbes/backend/data.json')
    .then(response => response.json())
    .then( (d) =>{
      data=d;
      //pintar pregunta con quizzLength=dates.preguntes.length=5 
      //anticipando cuando php retorne parte del json y no el archivo completo
      quizzLength=5;
      renderPregunta(data.preguntes[pregActual], pregActual, quizzLength)
      console.log(data);
    });
  // funcion de crono  
  
  
  document.getElementById("landing").style.display = "none";
  document.getElementById("preguntas").style.display = "block";
  document.getElementById("results").style.display = "none";
 
  
}

function renderPregunta(render, pregActual, maxPreg) {
  htmlStr=`<div class="pregunta__card">
    <div class="pregunta__head">
        <div class="pregunta__progress">
            ${pregActual+1}/${maxPreg}
        </div>
        <div class="pregunta__title">
            ${render.pregunta}
        </div>
    </div>
  
    <img class="pregunta__image" src="${render.imatge}" alt="question_context" srcset="">
  
    <div class="pregunta__countdown">
        30:00
    </div>
  
    <div id="pregunta__respostes">`;
    for (let i = 0; i < render.respostes.length; i++) {
      htmlStr+=`<button class="ans" id="pregunta__respostes__ans${i+1}" data-pregId="${render.respostes[i].id}">
          ${render.respostes[i].etiqueta}
      </button>`;
      
    }
    htmlStr+=`<button id="pregunta__respostes__next">
              Next
          </button>
        </div>
      </div>
    </div>`
    document.getElementById("preguntas").innerHTML=htmlStr;
    document.getElementById("pregunta__respostes").addEventListener("click", function(e) {
      if (e.target.getAttribute('id')=='pregunta__respostes__next') {
        console.log('pulsado next');
        nextQuestion();
      } else {
        console.log(`pulsado respuesta #${parseInt((e.target.getAttribute('id')).slice(-1), 10)}`)
        answerAndNext(render, e.target);
        e.target
      }
    });

    // document.getElementById("pregunta__respostes__ans1").addEventListener("click", function() { answerAndNext(1, 1) });
    // document.getElementById("pregunta__respostes__ans2").addEventListener("click", function() { answerAndNext(2, 2) });
    // document.getElementById("pregunta__respostes__ans3").addEventListener("click", function() { answerAndNext(3, 3) });
    // document.getElementById("pregunta__respostes__next").addEventListener("click", function() { nextQuestion() });

}

function answerAndNext(render, res) {
  //Idealment l'int corresponent a render.resposta_correcta 
  //s'obtendria d'un fetch a la funcionalitat getResCorrecta.php de backend
  console.log(data);
  document.getElementById("pregunta__respostes__next").style.display = "block";
  for (let i = 0; i <  render.respostes.length; i++) {
    let answer=document.getElementById(`pregunta__respostes__ans${i+1}`);
    console.log(answer);
    let ansId=answer.getAttribute('data-pregId');
    if (ansId!= render.resposta_correcta) {
      answer.classList.add("incorrecte")
    } else {
      answer.classList.add("correcte")
    }
    
  }
  if (res.getAttribute('data-pregId')==render.resposta_correcta) {
    score++;
  }
}

function nextQuestion() {
  /*
  subir progreso del quizz con pegActual
  if para saber si ha acabdo el quizz (total preg menor que actual preg)
  render pregunta si aun queda quizz
  finalizar y render final si quizz acabado.
  */
 pregActual++;
 
 if (pregActual<quizzLength) {
   renderPregunta(data.preguntes[pregActual], pregActual, quizzLength)
  } else {
    endGame(); //esto reiniciará pregactual y llamará a 
    //renderResults y le dará la puntuación
  }
}

function endGame() {
  console.log('Juego acabado');
  pregActual=0;
  //renderLanding();
  renderResults();
}

function renderResults() {
  if (localStorage.getItem("username") === null) {
    htmlStr=`<div class="results__card">
    <div class="results__title unimportant">
    Quizz Completed<br>Congratulations!
    </div>`;
  } else {
    htmlStr=`<div class="results__card">
      <div class="results__title unimportant">
      Quizz Completed<br>Congratulations ${localStorage.getItem('username')}!
      </div>`;
      
      
    }
    htmlStr+=`
    <div class="results__final unimportant">
      <div class="results__final__score">
          ${score}/${quizzLength}
      </div>
      <div class="results__final__time">
          30:00
      </div>
  </div>

  <!-- <div class="results__bar">
  </div> -->
  <div class="results__exit">
      <button id="results__exit__again">
          Play Again
      </button>
      <button id="results__exit__landing">
          Landing
      </button>
  </div>
</div>`;
  
  document.getElementById('results').innerHTML=htmlStr;
  document.getElementById("results__exit__again").addEventListener("click", function() { renderGame() });
  document.getElementById("results__exit__landing").addEventListener("click", function() { renderLanding() });
  document.getElementById("landing").style.display = "none";
  document.getElementById("preguntas").style.display = "none";
  document.getElementById("results").style.display = "block";

}