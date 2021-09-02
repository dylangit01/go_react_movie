package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"
)

const version = "1.0.0"

// db struct is used to connect with database, "dsn" is the connect string
type config struct {
		port 	int
		env 	string
		db struct {
			dsn string
		}
}

// Make below struct send some formatted JSON about the current info of the server to whoever requested it
// Also, if we want to change the capital words to lowercase, we can add backtic 
type AppStatus struct {
	Status 			string `json:"status"`
	Environment string `json:"environment"`
	Version 		string `json:"version"`
}

// In order to share information between various handlers, we can take advantage of Go's receivers and create a new type
type application struct {
	config config
	logger *log.Logger 		// point to build in log method
}

func main() {
		var cfg config

		// Assume when starting this app, it will read things like the port and environment from the command line as a flag pasted to the app:
		// "&" means store address in the config variable:
		flag.IntVar(&cfg.port, "port", 4000, "Server port to listen on")
		flag.StringVar(&cfg.env, "env", "development", "Application environment (development|production)")
		
		// For database config
		flag.StringVar(&cfg.db.dsn, "dsn", "postgres://changrendu@localhost/go_movies?sslmode=disable", "Postgres connection string")

		flag.Parse()

		// Create logger with data and time
		logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

		// For database connection logger
		db, err := openDB(cfg)
		if err != nil {
			logger.Fatal(err)
		}
		// Once open db, always have to defer close it
		defer db.Close()

		// Create app variable
		app := &application{
			config: cfg,
			logger: logger,
		}

		// fmt.Println("Running")

		// Get a basic web server running and server some kind of JSON content to the browser
		// Listen for specific URLs passed to the server
		
		/* since all below func has been moved to routes.go and statusHandler.go files:
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
				// If no error, write the js to the browser as Json formatted(using MarshaIndent)
				// It also needs to set the header and send some kind of status
				w.Header().Set("Content-Type", "application/json")
				// And send some kind of status, which is 200
				w.WriteHeader(http.StatusOK)
				// Last step is to write the js
				w.Write(js)
		})

		*/

		// http.ListenAndServe has two parameters, the first one is port number, but has to be the string, so using fmt.Sprintf to convert it to string
		// err := http.ListenAndServe(fmt.Sprintf(":%d", cfg.port), nil)

		// Define a new variable to handle status and error, it has three members
		// The first one is the addres, which is same as above
		// The second one what handler has been used
		// The third one is how long do you want to time out for an idle connection
		srv := &http.Server{
			Addr: fmt.Sprintf(":%d", cfg.port),
			Handler: app.routes(),
			IdleTimeout: time.Minute,
			ReadTimeout: 10 * time.Second,
			WriteTimeout: 30 * time.Second,
		}
		logger.Println("Starting server on port", cfg.port)

		err = srv.ListenAndServe()
		if err != nil {
			log.Println(err)
		}

		// Using address of operator(&) and
  	// pointer indirection(*) operator
		a := 4
		b := &a
		*b = 6
		fmt.Println(a, *b)
}

func openDB(cfg config) (*sql.DB, error) {
	db, err := sql.Open("postgres", cfg.db.dsn)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}