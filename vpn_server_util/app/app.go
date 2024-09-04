package app

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type reqUserDetails struct {
	Username string `json:username`
	Password string `json:password`
}

type dataformat struct {
	dashboardinfo []dataget
}

type loaddata struct {
	Savejson string
	Idpobj   string
}
type dataget struct {
	Id          int
	Title       string
	Description string
	Customer    string
}

type data struct {
	Id          string `json:id`
	Title       string `json:title`
	Description string `json:description`
	Customer    string `json:customer`
	Savejson    string `json:savejson`
	Idpobj      string `json:idpobj`
}

type apiResponse struct {
	Code        string `json:ResCode`
	Description string `json:ResDesc`
	ReqID       string `json:ReqUniqueID`
	// OutData     string `json:outData`
	OutData interface{}
}

type apiRequest struct {
	ReqID        string `json:ReqUniqueID`
	FunctionName string `json:functName`
	InData       string `json:inData`
}

type App struct {
	Router   *mux.Router
	Database *sql.DB
}

var ResponseCodeDesc = map[string]string{
	"000": "Success",
	"101": "Request format error",
	"102": "Database error",
	"103": "Invalid function name",
	"104": "Json creation error",
	"899": "Invalid request",
	"999": "Something went wrong",
}

var apiFunction = map[string]interface{}{
	"savedata":   savedata,
	"getdata":    getdata,
	"deletedata": deletedata,
	"savejson":   savejson,
	"loadjson":   loadjson,
	"logintable": logintable,
}

func (app *App) SetupRouter() {

	app.Router.
		Methods(http.MethodPost, http.MethodOptions).
		Path("/endpoint").
		HandlerFunc(app.postFunction)
}

func (app *App) postFunction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	var req apiRequest
	var res apiResponse

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		res = apiResponse{"899", ResponseCodeDesc["899"], "", ""}
		return
	}

	log.Printf("%s|%s|%s|%s", r.Method, r.RequestURI, r.RemoteAddr, reqBody)
	// err = json.NewDecoder(r.Body).Decode(&req)
	err = json.Unmarshal(reqBody, &req)

	if err != nil {
		res = apiResponse{"101", ResponseCodeDesc["101"], "", ""}
	} else {
		fName, ok := apiFunction[req.FunctionName]
		if ok {
			fName.(func(*App, http.ResponseWriter, *http.Request, *apiRequest, *apiResponse))(app, w, r, &req, &res)
		} else {
			res = apiResponse{"103", ResponseCodeDesc["103"], req.ReqID, ""}
		}
	}
	if err1 := json.NewEncoder(w).Encode(res); err1 != nil {
		log.Println("Error in creating reponse json")
		panic(err1)
	}
	w.WriteHeader(http.StatusOK)

}

func savedata(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {
	var formdata data
	err := json.Unmarshal([]byte(req.InData), &formdata)
	if err != nil {
		*res = apiResponse{"1011", ResponseCodeDesc["101"], req.ReqID, ""}
		log.Println("Request indata parese error:Indata:", req.InData)
		return
	}
	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, formdata}
	log.Println(formdata)

	response, err := app.Database.Exec("INSERT into dashtable (title, description, customer) values(? , ?, ?)", formdata.Title, formdata.Description, formdata.Customer)

	log.Println("Get user details query:", response)

	if err != nil {
		log.Println(err)
		*res = apiResponse{"1021", ResponseCodeDesc["102"], req.ReqID, ""}
		return
	}
}

func getdata(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {
	log.Println("done")
	var gd dataget
	var datainfo dataformat
	queryString := fmt.Sprintf("SELECT id,title,description,customer from dashtable where status='enable'")

	log.Println("Get tunnel details query:", queryString)

	getvpnTunnelResults, err := app.Database.Query(queryString)
	if err != nil {
		*res = apiResponse{"1022", ResponseCodeDesc["102"], req.ReqID, ""}
		log.Println("userDetailsResults:error", err)
		// defer getvpnTunnelResults.Close()
		return
	}
	for getvpnTunnelResults.Next() {

		err = getvpnTunnelResults.Scan(&gd.Id, &gd.Title, &gd.Description, &gd.Customer)
		if err != nil {
			*res = apiResponse{"1023", ResponseCodeDesc["102"], req.ReqID, ""}
			log.Println("Error in scanning vpn tunnel details results")
			defer getvpnTunnelResults.Close()
			return
		}
		datainfo.dashboardinfo = append(datainfo.dashboardinfo, gd)

	}

	getvpnTunnelResults.Close()

	_, err = json.Marshal(datainfo)
	if err != nil {
		*res = apiResponse{"104", ResponseCodeDesc["104"], req.ReqID, ""}
		log.Println("LoginAuth:error", res)
	}
	// *res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, string(data)}
	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, datainfo.dashboardinfo}
	// log.Println("LoginAuth:Success", res)
}

func deletedata(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {
	log.Println("function called")
	var formdata dataget
	err := json.Unmarshal([]byte(req.InData), &formdata)
	if err != nil {
		*res = apiResponse{"1011", ResponseCodeDesc["101"], req.ReqID, ""}
		log.Println("Request indata parese error:Indata:", req.InData)
		return
	}

	response, err := app.Database.Exec("UPDATE dashtable SET status='disable' where id=?", formdata.Id)

	log.Println("Get user details query:", response)

	if err != nil {
		log.Println(err)
		*res = apiResponse{"1021", ResponseCodeDesc["102"], req.ReqID, ""}
		return
	}

	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, ""}
	log.Println(formdata)
}

func savejson(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {
	log.Println("function called")
	var formdata data
	err := json.Unmarshal([]byte(req.InData), &formdata)
	if err != nil {
		*res = apiResponse{"1011", ResponseCodeDesc["101"], req.ReqID, ""}
		log.Println("Request indata parese error:Indata:", req.InData)
		return
	}

	response, err := app.Database.Exec("UPDATE dashtable SET savejson=? , idpobj=? where id=?;", formdata.Savejson, formdata.Idpobj, formdata.Id)

	log.Println("Get user details query:", response)

	if err != nil {
		log.Println(err)
		*res = apiResponse{"1021", ResponseCodeDesc["102"], req.ReqID, ""}
		return
	}

	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, ""}
	log.Println(formdata)
}

func loadjson(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {
	var formdata data
	var load loaddata
	err := json.Unmarshal([]byte(req.InData), &formdata)
	if err != nil {
		*res = apiResponse{"1011", ResponseCodeDesc["101"], req.ReqID, ""}
		log.Println("Request indata parese error:Indata:", req.InData)
		return
	}

	queryString := fmt.Sprintf("SELECT savejson,idpobj from dashtable where status='enable' AND id='%s' ", formdata.Id)

	log.Println("Get tunnel details query:", queryString)

	err = app.Database.QueryRow(queryString).Scan(&load.Savejson, &load.Idpobj)
	if err != nil {
		*res = apiResponse{"1022", ResponseCodeDesc["102"], req.ReqID, ""}
		log.Println("userDetailsResults:error", err)
		return
	}

	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, load}
	log.Println("loadjson:Success")
}

func logintable(app *App, w http.ResponseWriter, r *http.Request, req *apiRequest, res *apiResponse) {

	var userDetails reqUserDetails
	var userID int
	var userName string

	err := json.Unmarshal([]byte(req.InData), &userDetails)
	if err != nil {
		*res = apiResponse{"1011", ResponseCodeDesc["101"], req.ReqID, ""}
		log.Println("Request indata parese error:Indata:", req.InData)
		return
	}

	queryString := fmt.Sprintf("SELECT id, username  FROM logintable WHERE `username` = '%s' AND `password` = '%s' AND `status` = 'enable'", userDetails.Username, userDetails.Password)
	log.Println("Get user details query:", queryString)
	// userDetailsResults, err := app.Database.Query(queryString)
	err = app.Database.QueryRow(queryString).Scan(&userID, &userName)
	if err != nil {
		*res = apiResponse{"1021", ResponseCodeDesc["102"], req.ReqID, ""}
		log.Println("userDetailsResults:error", res)
		return
	}

	log.Println("User ID:", userID)

	if userID == 0 || len(userName) == 0 {
		*res = apiResponse{"107", ResponseCodeDesc["107"], req.ReqID, ""}
		return
	}

	*res = apiResponse{"000", ResponseCodeDesc["000"], req.ReqID, ""}
	log.Println("Login Successfully ")
}
