const btnStartQuiz = document.getElementById("btn-start");
const difficultyLevel= document.getElementById("difficulty");
const categoryType = document.getElementById("category");
btnStartQuiz.onclick = function(){
    const query=`https://opentdb.com/api.php?amount=10&category=${categoryType.value}&difficulty=${difficultyLevel.value}`
    window.localStorage.setItem(`query`,query);  
    window.location.replace('quiz.html');
}


