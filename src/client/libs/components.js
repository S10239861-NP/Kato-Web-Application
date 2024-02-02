class BaseComponent extends HTMLElement
{
    isInit = false;

    /**
     * @type {ShadowRoot}
     */
    shadow = null;

    constructor()
    {
        super();
    }

    /**
     * 
     * @param {string} html 
     * @param {} initCallback 
     * @returns 
     */
    init(html = "", initCallbackFunction = null)
    {
        if (this.isInit == true)
        {
            return;
        }

        this.shadow = this.attachShadow({
            mode: "open"
        });

        this.shadow.innerHTML = html;

        if (initCallbackFunction != null)
        {
            initCallbackFunction();
        }

        this.isInit = true;
    }
}

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

class Sidebar extends BaseComponent
{
    static html = "";

    static observedAttributes = [];

    /**
     * @type {HTMLElement}
     */
    #menuButton = null;

    /**
     * @type {HTMLElement}
     */
    #sidebar = null;

    /**
     * @type {HTMLElement}
     */
    #logoutButton = null;

    #onInitBoundFunc = null;

    constructor()
    {
        super();

        this.#onInitBoundFunc = this.onInit.bind(this);
    }

    onInit()
    {
        this.#menuButton = this.shadow.querySelector("#menu_btn");

        this.#sidebar = this.shadow.querySelector(".sidebar");

        this.#logoutButton = this.shadow.querySelector("#logout");

        this.#menuButton.onclick = (mouseEvent) =>
        {
            this.#sidebar.classList.toggle("active");
        };

        this.#logoutButton.onmousedown = (mouseEvent) =>
        {
            window.location.href = "/";
        };
    }

    connectedCallback()
    {
        this.init(Sidebar.html, this.#onInitBoundFunc);
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init(Sidebar.html, this.#onInitBoundFunc);
    }
}

/**
 * This function must be called at the start (preferably at the start of the script or when the page loads) in order to allow the
 * custom components defined in this library to be rendered.
 */
function init()
{
    let trainingCardHTMLRequest = new XMLHttpRequest();

    trainingCardHTMLRequest.open("GET", "/components/training-card.html", false);

    trainingCardHTMLRequest.send();

    TrainingCard.html = trainingCardHTMLRequest.responseText;

    customElements.define("training-card", TrainingCard);

    let discordChatbotButtonHTMLRequest = new XMLHttpRequest();

    discordChatbotButtonHTMLRequest.open("GET", "/components/discord-chatbot-button.html", false);

    discordChatbotButtonHTMLRequest.send();

    DiscordChatbotButton.html = discordChatbotButtonHTMLRequest.responseText;

    customElements.define("discord-chatbot-button", DiscordChatbotButton);

    let discordChatbotPanelHTMLRequest = new XMLHttpRequest();

    discordChatbotPanelHTMLRequest.open("GET", "/components/discord-chatbot-panel.html", false);

    discordChatbotPanelHTMLRequest.send();

    DiscordChatbotPanel.html = discordChatbotPanelHTMLRequest.responseText;

    customElements.define("discord-chatbot-panel", DiscordChatbotPanel);

    let sidebarHTMLRequest = new XMLHttpRequest();

    sidebarHTMLRequest.open("GET", "/components/sidebar.html", false);

    sidebarHTMLRequest.send();

    Sidebar.html = sidebarHTMLRequest.responseText;

    customElements.define("side-bar", Sidebar);
}

export {
    TrainingCard,
    DiscordChatbotButton,
    DiscordChatbotPanel,
    Sidebar,
    init
};
