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

let trainingCardHTMLRequest = new XMLHttpRequest();

trainingCardHTMLRequest.open("GET", "/components/training-card/main.html", false);

trainingCardHTMLRequest.send();

TrainingCard.html = trainingCardHTMLRequest.responseText;

customElements.define("training-card", TrainingCard);
