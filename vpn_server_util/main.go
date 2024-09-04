package main

import (
	"log"
	"net/http"

	"vpn_server_util/app"
	"vpn_server_util/db"

	"github.com/gorilla/mux"
)

func main() {

	database, err := db.CreateDatabase()
	if err != nil {
		log.Fatal("Database connection failed: %s", err.Error())
	}

	app := &app.App{
		Router:   mux.NewRouter().StrictSlash(true),
		Database: database,
	}

	app.SetupRouter()

	log.Fatal(http.ListenAndServe(":8080", app.Router))
}
