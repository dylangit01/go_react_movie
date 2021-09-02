package models

import (
	"database/sql"
	"time"
)

// In this models file, we are going to create some types to hold single move and genre information to serve the database, and it can be imported whenever we need it
// Then establish a single route to serve one move as Json and another route to serve a collection of movies

type Models struct {
	DB DBModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type Movie struct {
	ID 					int 				 `json:"id"`
	Title 			string 			 `json:"title"`
	Description string 			 `json:"description"`
	Year 				int 				 `json:"year"`
	ReleaseDate time.Time 	 `json:"release_date"`
	Runtime 		int 				 `json:"runtime"`
	Rating 			int 				 `json:"rating"`
	MPAARating 	string 			 `json:"mapp_rating"`
	CreatedAt 	time.Time 	 `json:"created_at"`
	UpdatedAt 	time.Time 	 `json:"updated_at"`
	MovieGenre 	[]MovieGenre `json:"-"`
}

type Genre struct {
	ID 				int 			`json:"id"`
	GenreName string 		`json:"genre_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MovieGenre struct {
	ID 				int 			`json:"id"`
	MovieID 	int 			`json:"movie_id"`
	GenreID 	int 			`json:"genre_id"`
	Genre 		Genre 		`json:"genre"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
