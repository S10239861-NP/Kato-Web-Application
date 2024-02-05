import * as utils from "./utils.js";

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

    #onWindowResizeBoundFunc = null;

    #onInit()
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
            sessionStorage.removeItem(
                "staffIDOfCurrentUser"
            );

            window.location.href = "/";
        };

        window.addEventListener("resize", this.#onWindowResizeBoundFunc);
    }

    #onWindowResize()
    {
        
    }

    constructor()
    {
        super();

        this.#onInitBoundFunc = this.#onInit.bind(this);

        this.#onWindowResizeBoundFunc = this.#onWindowResize.bind(this);
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

class TeamMemberCard extends BaseComponent
{
    static html = "";

    static observedAttributes = [
        "name",
        "role"
    ];

    /**
     * @type {HTMLElement}
     */
    #nameHeader = null;

    /**
     * @type {HTMLElement}
     */
    #roleLabel = null;

    /**
     * @type {HTMLButtonElement}
     */
    #viewMemberDetailsButton = null;

    #onInitBoundFunc = null;

    #onViewMemberDetailsButtonMouseDownBoundFunc = null;

    #onInit()
    {
        this.#nameHeader = this.shadow.getElementById(
            "nameHeader"
        );

        this.#roleLabel = this.shadow.getElementById(
            "roleLabel"
        );

        this.#viewMemberDetailsButton = this.shadow.getElementById(
            "viewMemberDetailsButton"
        );

        this.#viewMemberDetailsButton.addEventListener(
            "mousedown",
            this.#onViewMemberDetailsButtonMouseDownBoundFunc
        );
    }

    #onViewMemberDetailsButtonMouseDown()
    {

    }

    constructor()
    {
        super();

        this.#onInitBoundFunc = this.#onInit.bind(this);

        this.#onViewMemberDetailsButtonMouseDownBoundFunc = this.#onViewMemberDetailsButtonMouseDown.bind(this);
    }

    connectedCallback()
    {
        this.init(TeamMemberCard.html, this.#onInitBoundFunc);
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init(TeamMemberCard.html, this.#onInitBoundFunc);

        if (attribName == "name")
        {
            this.#nameHeader.innerText = newValue;

            return;
        }

        if (attribName == "role")
        {
            this.#roleLabel.innerText = newValue;

            return;
        }
    }
}

class TrainingModuleCard extends BaseComponent
{
    static html = "";

    static observedAttributes = [
        "name"
    ];

    #onInitBoundFunc = null;

    /**
     * @type {HTMLImageElement}
     */
    #trainingModuleThumbnail = null;

    /**
     * @type {HTMLElement}
     */
    #trainingModuleNameLabel = null;

    /**
     * @type {HTMLButtonElement}
     */
    #viewLessonsButton = null;

    #onInit()
    {
        this.#trainingModuleThumbnail = this.shadow.querySelector("#trainingModuleThumbnail");

        this.#trainingModuleNameLabel = this.shadow.querySelector("#trainingModuleNameLabel");

        this.#viewLessonsButton = this.shadow.querySelector("#viewLessonsButton");

        this.#viewLessonsButton.addEventListener(
            "mousedown",
            this.#onViewLessonsButtonMouseDown.bind(this)
        );
    }

    #onViewLessonsButtonMouseDown()
    {
        sessionStorage.setItem("mostRecentlySelectedTrainingModuleName", this.#trainingModuleNameLabel.innerText);

        window.location.href = "/training.html";
    }

    constructor()
    {
        super();

        this.#onInitBoundFunc = this.#onInit.bind(this);
    }

    connectedCallback()
    {
        this.init(TrainingModuleCard.html, this.#onInitBoundFunc);
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init(TrainingModuleCard.html, this.#onInitBoundFunc);

        if (attribName == "name")
        {
            this.#trainingModuleNameLabel.innerText = newValue;
        }
    }
}

function getHTMLForComponent(urlPath)
{
    let componentHTMLRequest = new XMLHttpRequest();

    componentHTMLRequest.open("GET", urlPath, false);

    componentHTMLRequest.send();

    return componentHTMLRequest.responseText;
}

/**
 * This function must be called at the start (preferably at the start of the script or when the page loads) in order to allow the
 * custom components defined in this library to be rendered.
 */
function init()
{
    TrainingCard.html = getHTMLForComponent("/components/training-card.html");

    customElements.define("training-card", TrainingCard);

    DiscordChatbotButton.html = getHTMLForComponent("/components/discord-chatbot-button.html");

    customElements.define("discord-chatbot-button", DiscordChatbotButton);

    DiscordChatbotPanel.html = getHTMLForComponent("/components/discord-chatbot-panel.html");

    customElements.define("discord-chatbot-panel", DiscordChatbotPanel);

    Sidebar.html = getHTMLForComponent("/components/sidebar.html");

    customElements.define("side-bar", Sidebar);

    TeamMemberCard.html = getHTMLForComponent("/components/team-member-card.html");

    customElements.define("team-member-card", TeamMemberCard);

    TrainingModuleCard.html = getHTMLForComponent("/components/training-module-card.html");

    customElements.define("training-module-card", TrainingModuleCard);
}

export {
    TrainingCard,
    DiscordChatbotButton,
    DiscordChatbotPanel,
    Sidebar,
    TeamMemberCard,
    TrainingModuleCard,
    init,
};
