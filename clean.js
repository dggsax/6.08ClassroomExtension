var clean = function () {
    console.log('beginning cleaning');
    // fuck paywall
    document.getElementsByClassName('meter-paywall')[0].remove();

    // fuck the 'Read full article' button
    document.getElementById('continue_button').remove();

    // delete boston globe's javascript
    var r = document.getElementsByTagName('script');
    for (var i = (r.length - 1); i >= 0; i--) {
        if (r[i].getAttribute('id') != 'a') {
            r[i].parentNode.removeChild(r[i]);
        }
    }

    // clean up the article
    var articleElements = ['div', 'span', 'button', 'figure', 'article', 'h1', 'h2', 'h3', 'a', 'p', 'figcaption', 'img'];
    var article = document.getElementById('left');
    article.removeAttribute('class');
    article.removeAttribute('style');
    articleElements.forEach(function (element) {
        var targets = Array.from(article.getElementsByTagName(element));

        targets.forEach(function (target) {
            target.removeAttribute('class');
            target.removeAttribute('style');
        })
    })

    // delete all the body's children and reattach the article
    var body = document.getElementsByTagName('body')[0];
    body.removeAttribute('class');
    body.removeAttribute('style');
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }

    // Add stuff to page
    var backToGlobe = document.createElement('button');
    backToGlobe.innerHTML = 'Back to Boston Globe Website';
    backToGlobe.setAttribute('onclick', 'window.location=\'http://www.globe.com\'')
    backToGlobe.setAttribute('class', 'back-button');
    body.appendChild(backToGlobe);
    body.appendChild(article);

    // Make pretty
    var styles = `
        .back-button {
            background-color: rgb(0,93,199); /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
        }
        article { 
            display: flex;
            flex-direction: column;
            max-width: 800px;
            width: 75vw;
            margin: auto;
            padding-top: 50px;
        }
        img {
            max-width: 800px;
            width: 75vw;
        }
        #header-container > div > div:nth-last-child(2) > div:nth-child(1) > span:last-child {
            float: right;
        }
        #header-container > div > div:nth-last-child(2) > div:nth-child(1) > span:nth-child(3) > span {
            display: none;
        }
        #header-container > div > div:nth-last-child(2) > div:nth-child(2) {
            display: flex;
        }
        #left > div:nth-child(2) > div > * {
            margin-bottom: 1.25rem;
        }
        #header-container > div > div:nth-last-child(2) > div:nth-child(2) > *:not(:last-child) {
            width: 100%;
        }
        #header-container > div:nth-child(1) {
            margin-bottom: 50px;
        }
    `

    var styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
};

const metas = document.getElementsByTagName('meta');
for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') === 'og:type' && metas[i].getAttribute('content') === 'article') {
        console.log('Is an article');
        clean();
    }
}
