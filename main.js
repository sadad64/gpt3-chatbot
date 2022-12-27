// import gpt3
import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';

let log = " ";
let token = 500;
let temperature = 0.9;

document.querySelector('#send').addEventListener('click', () => {
    chat();
});

document.querySelector('#text-input').addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        chat();
    }
})

function chat() {
    let msg = document.querySelector('#text-input').value;
    console.log("token : " + token);

    if (msg != "") {
        let newChat = document.createElement("DIV")
          newChat.classList.add("line");
          newChat.innerHTML = `<span class="chat-box mine">${msg}</span>`
          console.log(newChat);
          log += `${msg} \n`;
          
          document.querySelector('.chat-content').appendChild(newChat);
          newChat.classList.add("animation-init");
          setTimeout(function () {
            newChat.classList.add("animation-fade");
          }, 1);
    
        document.querySelector('#text-input').value = "";
    }

    try {
      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);
      
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: log,
        temperature: temperature,
        max_tokens: token,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      }).then((res) => {
          console.log(res.data.choices[0].text);
      
          let msg = res.data.choices[0].text;

          let newChat = document.createElement("DIV")
          newChat.classList.add("line");
          newChat.innerHTML = `<span class="chat-box">${msg}</span>`
          
          document.querySelector('.chat-content').appendChild(newChat);
          newChat.classList.add("animation-init");
          setTimeout(function () {
            newChat.classList.add("animation-fade");
          }, 1);

          log += `${msg} \n`;
          document.querySelector('.chat-content').scrollTo(0, document.querySelector('.chat-content').scrollHeight);
      });

    } catch (err) {
      let newChat = document.createElement("DIV");
      newChat.classList.add("line");
      newChat.innerHTML = `<span class="chat-box">에러가 발생했습니다. \n${err}</span>`;

    } finally {
      document.querySelector('.chat-content').scrollTo(0, document.querySelector('.chat-content').scrollHeight);
      console.log(log);
    }


      
}

document.querySelector(".setting-btn").addEventListener('click', () => {
  document.querySelector(".right-bar").style.transform = 'translateX(0%)';
})

document.querySelector(".close-btn").addEventListener('click', () => {
  document.querySelector(".right-bar").style.transform = 'translateX(100%)';
})

export function setTokenValue(event) {
  if(event.target.id == "slider-bar") {
    document.querySelector("#slider-num").value = event.target.value;
  } else if (event.target.id == "slider-num") {
    document.querySelector("#slider-bar").value = event.target.value;
  }

  token = parseInt(event.target.value);
}

export function setTemperatureValue(event) {
  if(event.target.id == "temp-bar") {
    document.querySelector("#temp-num").value = event.target.value;
  } else if (event.target.id == "temp-num") {
    document.querySelector("#temp-bar").value = event.target.value;
  }

  temperature = parseInt(event.target.value);
}