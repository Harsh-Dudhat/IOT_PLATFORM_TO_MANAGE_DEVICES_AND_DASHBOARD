package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

const (
	dbName = "iotdata"
	dbUser = "root"
	dbPswd = ""
	dbHost = "localhost"
	dbPort = "3306"
)

func CreateDatabase() (*sql.DB, error) {

	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPswd, dbHost, dbPort, dbName)
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		return nil, err
	}

	return db, nil
}
