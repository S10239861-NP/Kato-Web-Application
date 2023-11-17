class TrainingCard extends HTMLElement
{
    static html = "";

    static observedAttributes = ["course-name", "category-name", "duration", "description"];

    #isInit = false;

    /**
     * @type {ShadowRoot}
     */
    #shadow = null;

    /**
     * @type {HTMLElement}
     */
    #courseNameLabel = null;

    /**
     * @type {HTMLElement}
     */
    #categoryNameLabel = null;

    /**
     * @type {HTMLElement}
     */
    #durationLabel = null;

    constructor()
    {
        super();
    }

    init()
    {
        if (this.#isInit == true)
        {
            return;
        }

        this.#shadow = this.attachShadow({
            mode: "open"
        });

        this.#shadow.innerHTML = TrainingCard.html;

        this.#courseNameLabel = this.#shadow.getElementById("courseNameLabel");

        this.#categoryNameLabel = this.#shadow.getElementById("categoryNameLabel");

        this.#durationLabel = this.#shadow.getElementById("durationLabel");

        this.#isInit = true;
    }

    connectedCallback()
    {
        this.init();
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();

        switch (attribName)
        {
            case "course-name":
            {
                this.#courseNameLabel.innerText = newValue;

                break;
            }
            case "category-name":
            {
                this.#categoryNameLabel.innerText = newValue;

                break;
            }
            case "duration":
            {
                this.#durationLabel.innerHTML = `<b>${newValue}</b>mins`;

                break;
            }
            case "description":
            {
                break;
            }
            default:
            {
                break;
            }
        }
    }
}

class DiscordChatbotButton extends HTMLElement
{
    static html = "";

    #isInit = false;

    #shadow = null;

    #discordChatbotPanel = document.createElement("discord-chatbot-panel");

    constructor()
    {
        super();

        this.#discordChatbotPanel.style["display"] = "none";
    }

    onMouseDown()
    {
        if (this.#discordChatbotPanel.style["display"] == "none")
        {
            this.#discordChatbotPanel.style["display"] = "block";
        }
        else
        {
            this.#discordChatbotPanel.style["display"] = "none";
        }

        for (const child of document.body.children)
        {
            if (child == this.#discordChatbotPanel)
            {
                return;
            }
        }

        document.body.appendChild(this.#discordChatbotPanel);
    }

    init()
    {
        if (this.#isInit == true)
        {
            return;
        }

        this.#shadow = this.attachShadow(
            {
                mode: "open"
            }
        );

        this.#shadow.innerHTML = DiscordChatbotButton.html;

        this.addEventListener("mousedown", this.onMouseDown.bind(this));

        this.#isInit = true;
    }

    connectedCallback()
    {
        this.init();
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();
    }
}

class DiscordChatbotPanel extends HTMLElement
{
    static html = "";

    #isInit = false;

    #shadow = null;

    #closeButton = null;

    constructor()
    {
        super();
    }

    onCloseButtonMouseDown()
    {
        this.style["display"] = "none";
    }

    init()
    {
        if (this.#isInit == true)
        {
            return;
        }

        this.#shadow = this.attachShadow(
            {
                mode: "open"
            }
        );

        this.#shadow.innerHTML = DiscordChatbotPanel.html;

        this.#closeButton = this.#shadow.getElementById("closeButton");

        this.#closeButton.addEventListener("mousedown", this.onCloseButtonMouseDown.bind(this));

        this.#isInit = true;
    }

    connectedCallback()
    {
        this.init();
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();
    }
}

let trainingCardHTMLRequest = new XMLHttpRequest();

trainingCardHTMLRequest.open("GET", "/components/training-card/main.html", false);

trainingCardHTMLRequest.send();

TrainingCard.html = trainingCardHTMLRequest.responseText;

customElements.define("training-card", TrainingCard);

let discordChatbotButtonHTMLRequest = new XMLHttpRequest();

discordChatbotButtonHTMLRequest.open("GET", "/components/discord-chatbot-button/main.html", false);

discordChatbotButtonHTMLRequest.send();

DiscordChatbotButton.html = discordChatbotButtonHTMLRequest.responseText;

customElements.define("discord-chatbot-button", DiscordChatbotButton);

let discordChatbotPanelHTMLRequest = new XMLHttpRequest();

discordChatbotPanelHTMLRequest.open("GET", "/components/discord-chatbot-panel/main.html", false);

discordChatbotPanelHTMLRequest.send();

DiscordChatbotPanel.html = discordChatbotPanelHTMLRequest.responseText;

customElements.define("discord-chatbot-panel", DiscordChatbotPanel);
