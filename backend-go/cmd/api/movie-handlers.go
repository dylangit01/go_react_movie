package main

// This file is used to handle all movie related routes and will be used in routes.go file

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

// Because it's the handler, it takes a response writer and a request as arguments
func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	// params is similar like node.js: req.body.params
	params := httprouter.ParamsFromContext(r.Context())

	// Below express is used to see if the params can be converted to int, if not, meaning it has err, so using errorJSON func to handle the error and return nother
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}
	
	movie, err := app.models.DB.Get(id)

	// movie := models.Movie {
	// 	ID: id,
	// 	Title: "Some movie",
	// 	Description: "some description",
	// 	Year: 2021,
	// 	ReleaseDate: time.Date(2021, 01, 01, 01, 0, 0, 0, time.Local),
	// 	Runtime: 150,
	// 	Rating: 5,
	// 	MPAARating: "PG-13",
	// 	CreatedAt: time.Now(),
	// 	UpdatedAt: time.Now(),
	// }

	// Now we can use the func from utils.go
	err = app.writeJSON(w, http.StatusOK, movie, "movie")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, movies, "movies")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {

}

func (app *application) insertMovie(w http.ResponseWriter, r *http.Request) {
	
}

func (app *application) updateMovie(w http.ResponseWriter, r *http.Request) {
	
}

func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {
	
}