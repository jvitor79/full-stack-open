```mermaid
    participant browser
    participant server

    note right of browser: when user submit the form, a new note is created, the new note is added to the local list of notes, the text input is cleared, the new note are show with the function redrawNotes, and a POST mothod is called with sendToServer function

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>broswer: responds with status code 201 and message "note created"
    deactivate server
```
