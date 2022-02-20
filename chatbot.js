const INTENT_API_ENDPOINT = "http://localhost:8080/api/messages";

const buildHeader = () => {
    const header = document.createElement("header");
    header.style.background = "#293239";
    header.style.borderRadius = "5px 5px 0 0";
    header.style.color = "#fff";
    header.style.cursor = "pointer";
    header.style.padding = "16px 24px";

    const close = document.createElement("a");
    close.style.background = "#1b2126";
    close.style.borderRadius = "50%";
    close.style.color = "#fff";
    close.style.display = "block";
    close.style.float = "right";
    close.style.fontSize = "10px";
    close.style.height = "16px";
    close.style.lineHeight = "16px";
    close.style.margin = "2px 0 0 0";
    close.style.textAlign = "center";
    close.style.width = "16px";
    close.innerText = "X";

    const title = document.createElement("h4");
    title.style.fontSize = "12px";
    title.innerText = "Virtual Assistant"

    header.appendChild(close);
    header.appendChild(title);
    return header;
}

const buildChatbox = () => {
    const chatbox = document.createElement("div");
    chatbox.style.background = "#fff";

    const chatHistory = document.createElement("div");
    chatHistory.setAttribute("id", "chat-history");
    chatHistory.style.height = "350px";
    chatHistory.style.padding = "8px 24px";
    chatHistory.style.overflowY = "scroll";

    const messages = buildChatMessage("BOT", "Welcome to Virtual Assistant! I am still learning!");
    chatHistory.appendChild(messages);
    
    chatbox.appendChild(chatHistory);
    return chatbox;
}

const buildChatMessage = (user, message) => {
    const chatMessage = document.createElement("div");
    chatMessage.style.margin = "8px 0";

    const content = document.createElement("div");

    const time = document.createElement("span");
    time.style.float = "right";
    time.style.fontSize = "10px";
    time.innerText = `${new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })}`;

    const from = document.createElement("h5");
    from.style.lineHeight = "1.5em";
    from.style.margin = "0";
    from.innerText = user;

    const reply = document.createElement("p");
    reply.innerHTML = `<strong>${message}</strong>`;

    content.appendChild(time);
    content.appendChild(from);
    content.appendChild(reply);

    const hr = document.createElement("hr");
    hr.style.background = "#fff";
    hr.style.border = "0";
    hr.style.boxSizing = "content-box";
    hr.style.height = "1px";
    hr.style.margin = "0";
    hr.style.minHeight = "1px";

    chatMessage.appendChild(content);
    chatMessage.appendChild(hr);
    return chatMessage;
}

const buildInput = () => {
    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", "localhost:8080/api/messages");
    form.setAttribute("id", "chatbot-form");
    form.style.padding = "12px";
    form.style.backgroundColor = "white";

    const fieldset = document.createElement("fieldset");
    fieldset.style.border = "0";
    fieldset.style.margin = "0";
    fieldset.style.padding = "0";

    const inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("placeholder", "Enter a message");
    inputEl.setAttribute("id", "chatbot-input");
    inputEl.style.border = "1px solid #ccc";
    inputEl.style.borderRadius = "3px";
    inputEl.style.padding = "8px";
    inputEl.style.outline = "none";
    inputEl.style.width = "280px";

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.style.backgroundColor = "#293239";
    button.style.border = "none";
    button.style.borderRadius = "10%";
    button.style.color = "white";
    button.style.marginLeft = "8px"
    button.style.padding = "7px 14px";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.display = "inline-block";
    button.style.fontSize = "16px"
    button.innerText = "Send";

    fieldset.appendChild(inputEl);
    fieldset.appendChild(button);
    form.appendChild(fieldset);
    return form;
}

const callIntentAPI = async (text) => {
    // const response = await fetch(`${INTENT_API_ENDPOINT}?message=${text}`, {
    //     'Content-Type': 'application/json'
    // });
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
              title: "nice to meet you"
          });
        }, 3000);
    });
}

const buildChatbot = () => {
    const chatbot = document.createElement("div");
    chatbot.style.bottom = 0;
    chatbot.style.fontSize = "12px";
    chatbot.style.right = "24px";
    chatbot.style.position = "fixed";
    chatbot.style.width = "400px";

    const header = buildHeader();
    const chatbox = buildChatbox();
    const input = buildInput();

    chatbot.appendChild(header);
    chatbot.appendChild(chatbox);
    chatbot.appendChild(input);

    return chatbot;
}

const main = () => {
    const chatbot = buildChatbot();
    document.body.appendChild(chatbot);

    const form = document.getElementById("chatbot-form");
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputValue = form.elements["chatbot-input"].value;
        const chatHistory = document.getElementById("chat-history");
        const chat = buildChatMessage("USER", inputValue);
        document.getElementById("chatbot-input").value = "";
        chatHistory.appendChild(chat);
        callIntentAPI(inputValue)
            .then(obj => {
                const reply = obj["title"];
                return reply;
            })
            .then(reply => {
                const chatHistory = document.getElementById("chat-history");
                const chat = buildChatMessage("BOT", reply);
                chatHistory.appendChild(chat);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            })
    });
}

(() => {
    main();
})();