package main

import (
	"encoding/json"
	"net/http"
)

/*
Duplicate main.go http.HandleFunc(), but tie it to application config by creating a handler with a receiver; So receiver is an very easy way to share info among the various components of the app in a clean and logical fashion
*/

func (app *application) statusHandler(w http.ResponseWriter, r *http.Request) {
	currentStatus := AppStatus {
		Status: "Available",
		Environment: app.config.env,
		Version: version,
	}

		// Convert variable which is a struct into JSON using "json.MarshalIndent", first argument is result, and second one is error; 
		// Using MarshaIndent to convert (content, prefix, how much needs to be indented), in this case, intentted one tab by using "\t"
		js, err := json.MarshalIndent(currentStatus, "", "\t")
		if err != nil {
			app.logger.Println(err)
		}

		// If no error, write the js to the browser as Json formatted(using MarshaIndent)
		// It also needs to set the header and send some kind of status
		w.Header().Set("Content-Type", "application/json")

		// And send some kind of status, which is 200
		w.WriteHeader(http.StatusOK)
		
		// Last step is to write the js
		w.Write(js)
}