const quizContainer = document.getElementById("quiz-box");
const btnSubmit = document.getElementById("btn-result");

let rawDataContainer=[];
let answerContainer=[];

btnSubmit.onclick=function(){
    let responceCounter=0;
    answerContainer.map(item=>{
        if(item.answer){
            responceCounter+=1;
        }
    })
    SoloAlert.alert({
        title:`Your ${responceCounter} responces out of ${answerContainer.length} are true!`,
        onOk:()=>{
            window.location.replace("index.html");
        }
    })
}

const handlePageLoad=()=>{
    const query = window.localStorage.getItem("query");
    fetchData(query);
}


const fetchData=(query)=>{
    fetch(query)
    .then(response => response.json())
    .then(({results}) =>{
  
        // normalising data
        results.map(item=>{
            const dataHolder={
                answers:[]
            }
            dataHolder.question=item.question;
            dataHolder.correct_answer=item.correct_answer;
            dataHolder.answers.push(item.correct_answer)
            dataHolder.answers=[...dataHolder.answers,...item.incorrect_answers];
            dataHolder.answers=shuffleArray(dataHolder.answers);
            rawDataContainer.push(dataHolder);
            appendMarkup(dataHolder);
          })
          console.log(rawDataContainer);
    });
}
const handleAnswer=(elemId)=>{
    const checkedRadio=document.getElementById(elemId);
    const question=checkedRadio.name;
    const answer=checkedRadio.value;
    let validatedResponce=false
    if(validateAnswer(question,answer)){
        validatedResponce=true
    }
    collectResponces(question,validatedResponce);
    console.log(answerContainer);

}

const shuffleArray=(array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
const appendMarkup=(obj)=>{
    const markup=`
    <div class="form-group">
    <p class="main-text">${obj.question}</p>
    ${obj.answers.map(answer=>{
       return `<label for="${answer}">${answer}:</label>
       <input id="${answer}" onclick="handleAnswer('${answer}')" value="${answer}" type="radio" name="${obj.question}"/>`
    })}
   </div>`
    quizContainer.insertAdjacentHTML("beforeend",markup);
}

const validateAnswer=(question,answer)=>{
    let isTrue=false;
    rawDataContainer.map(item=>{
        if(item.question==question){
            if(item.correct_answer==answer){
                isTrue=true;
            }
        }
    })
    return isTrue;
}

const collectResponces=(question,answer)=>{
    const responce={};
    // make sure answers are not duplicated
    if(answerContainer){
        for(let i=0;i<answerContainer.length;i++){
            if(answerContainer[i].question==question){
                answerContainer[i].answer=answer;
                return;
            }
        }
    }
    responce.question=question;
    responce.answer=answer;
    
    answerContainer.push(responce);
}
