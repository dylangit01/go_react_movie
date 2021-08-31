package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const version = "1.0.0"

type config struct {
		port 	int
		env 	string
}

// Make below struct send some formatted JSON about the current info of the server to whoever requested it
// Also, if we want to change the capital words to lowercase, we can add backtic 
type AppStatus struct {
	Status 			string `json:"status"`
	Environment string `json:"environment"`
	Version 		string `json:"version"`
}

func main() {
		var cfg config

		// Assume when starting this app, it will read things like the port and environment from the command line as a flag pasted to the app:
		// "&" means store in the config variable:
		flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
		flag.StringVar(&cfg.env, "env", "development", "Application environment (development | production)")
		flag.Parse()

		fmt.Println("Running")

		// Server information to get a basic web server running and server some kind of JSON content to the browser
		// Listen for specific URLs passed to the server
		http.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
				// fmt.Fprint(w, "server is running")
				currentStatus := AppStatus {
					Status: "Available",
					Environment: cfg.env,
					Version: version,
				}

				// Convert variable which is a struct into JSON using "json.MarshalIndent", first argument is result, and second one is error; 
				// Using MarshaIndent to convert (content, prefix, how much needs to be indented), in this case, intentted one tab by using "\t"
				js, err := json.MarshalIndent(currentStatus, "", "\t")
				if err != nil {
					log.Println(err)
				}
				// Otherwise, write that js right to the browser as Json formatted(using MarshaIndent)
				// It also needs to set the header and send some kind of status
				w.Header().Set("Content-Type", "application/json")
				// And send some kind of status, which is 200
				w.WriteHeader(http.StatusOK)
				// Last step is to write the js
				w.Write(js)
		})

		// http.ListenAndServe has two parameters, the first one is port number, but has to be the string, so using fmt.Sprintf to convert it to string
		err := http.ListenAndServe(fmt.Sprintf(":%d", cfg.port), nil)

		if err != nil {
			log.Println(err)
		}
}