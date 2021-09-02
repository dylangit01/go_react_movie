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
	ID 					int 				 	 `json:"id"`
	Title 			string 			 	 `json:"title"`
	Description string 			 	 `json:"description"`
	Year 				int 				 	 `json:"year"`
	ReleaseDate time.Time 	 	 `json:"release_date"`
	Runtime 		int 				 	 `json:"runtime"`
	Rating 			int 				 	 `json:"rating"`
	MPAARating 	string 			 	 `json:"mapp_rating"`
	CreatedAt 	time.Time 	 	 `json:"-"`
	UpdatedAt 	time.Time 	 	 `json:"-"`	 
	MovieGenre 	map[int]string `json:"genres"`
}

type Genre struct {
	ID 				int 			`json:"-"`
	GenreName string 		`json:"genre_name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type MovieGenre struct {
	ID 				int 			`json:"-"`
	MovieID 	int 			`json:"-"`
	GenreID 	int 			`json:"-"`
	Genre 		Genre 		`json:"genre"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
