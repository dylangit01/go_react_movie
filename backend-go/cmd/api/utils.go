package main

import (
	"encoding/json"
	"net/http"
)

// This func has responseWriter as we have to have somewhere to write it
// Then we need a status code and the data to convert to JSON, since we don't know what that's going to be, so we just call it interface
// Last argument is wrap, to wrap out JSON with some kind of key, something that describes the kind of content that's coming out of here, so we can create a wrapper as a map like an object in javascript

func (app *application) writeJSON(w http.ResponseWriter, status int, data interface{}, wrap string) error {
	wrapper := make(map[string]interface{})

	wrapper[wrap] = data
	js, err := json.Marshal(wrapper)
	if err != nil {
		return err 		// In order to return err, we need to define the "error" type in function
	}

	// If no error, we just send it off as JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	// If everything worked, return nil
	return nil
}