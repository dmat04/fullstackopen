```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->> browser: Collect the data from the form and save the current timestamp
        browser->> browser: Save the new note in the list of notes
        browser->> browser: Clear the form elements
        browser->> browser: Re-render all of the notes
            
        browser->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        note right of browser: The note JSON formatted data is<br/> included in the request body
        server-->>browser: HTTP 201
        deactivate server
        note left of server: A JSON formatted message is returned it he response 
```