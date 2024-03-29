```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML document
        deactivate server
        
        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: CSS file
        deactivate server

        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: Javascript file
        deactivate server

        note right of browser: The borwser starts executing the received JavaScript code<br/> which will fetch the JSON data from the server<br/> and change the behaviour of the form submit button
        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: JSON formatted notes data
        deactivate server
        note right of browser: Upon receiving the JSON data, the browser executes<br/> the JavaScript callback to render the notes 
```