package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	// HttpRouter is a lightweight high performance HTTP request router (also called multiplexer or just mux for short) for Go.
)

// Similar to node.JS express, we can use other router library help Go to build up routes:
// The main goal is to move "http.HandleFunc()" from main.go to routes.go and statusHandler.go files separately
// In this file, we only define the router.HandlerFunc, which is the restAPI router
// And in statusHandler.go, will write the logic details for this router

// "app" is the receiver that ties to application by using pointer operator
// so this func will have the access for application infomation
func (app *application) routes() http.Handler {
	router := httprouter.New()

	// Since statusHandler has the application receiver, so in here, we can use app.statusHandler directly, same for below other handlers
	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	// "/v1/" is the convention that if it introduces a breaking change, typically you would go from version one to version two and so on
	router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	
	router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)

	router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMoviesByGenre)

	router.HandlerFunc(http.MethodGet, "/v1/genres", app.getAllGenres)

	router.HandlerFunc(http.MethodPost, "/v1/admin/editmovie", app.editmovie)

	// return CORS middleware to enable all routes
	return app.enableCORS(router)
}