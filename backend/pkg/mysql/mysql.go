package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DatabaseInit() {
	var err error

	conn := "root:@tcp(127.0.0.1:3306)/dumbflix?parseTime=true"
	DB, err = gorm.Open(mysql.Open(conn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Database Connected")
}