```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: POST https://studies.cs.helsinki.fi/new_note
        activate server
        Note right of browser: The note text is collected from the html form and included in the POST reuquest

        server-->>browser: HTTP Redirect response
        deactivate server
        note over browser,server: The redirect url is included in the response header,<br/> in the 'location' field, and points to '/exampleapp/notes'
        
        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server
        
        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: CSS file
        deactivate server

        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server-->>browser: Javascript file
        deactivate server

        note right of browser: The borwser starts executing the received JavaScript code<br/> which will fetch the JSON data from the server
        browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: JSON formatted notes data
        deactivate server
        note right of browser: Upon receiving the JSON data, the browser executes<br/> the JavaScript callback to render the notes 
```