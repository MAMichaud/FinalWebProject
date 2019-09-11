
var db;

/**
 * General purpose error handler
 * @param tx The transaction
 * @param error The error object
 */
function errorHandler(tx, error){
    console.error("SQL error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    createDatabase: function(){
        var shortName= "A3DB";
        var version = "1.0";
        var displayName = "DB for A3-DB app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess(){
            console.info("Success: Database created successfully.");
        }
    },
    createTables: function(){

        function txFunction(tx) {
            console.info("Creating table: review");
            var sqlCreateReview = "CREATE TABLE IF NOT EXISTS review( " +
            "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "captainName VARCHAR(30) NOT NULL," +
            "firstMateName VARCHAR(30) NOT NULL," +
            "typeId INTEGER NOT NULL," +
            "reviewerEmail VARCHAR(30)," +
            "reviewerComments TEXT," +
            "reviewDate DATE," +
            "hasRating VARCHAR(1)," +
            "rating1 INTEGER," +
            "rating2 INTEGER," +
            "rating3 INTEGER," +
            "FOREIGN KEY(typeId) REFERENCES type(id));";
            var sqlCreateType = "CREATE TABLE IF NOT EXISTS type( "
            + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
            + "name VARCHAR(20) NOT NULL);";
            var sqlResetType = "DROP TABLE IF EXISTS type;";

            var options = [];

            function successCreate(){
                console.info("Success: Create tables: review & type successful.");
            }
            tx.executeSql(sqlResetType, options, successCreate, errorHandler);
            tx.executeSql(sqlCreateReview, options, successCreate, errorHandler);
            tx.executeSql(sqlCreateType, options, successCreate, errorHandler);
            tx.executeSql('INSERT INTO type (id, name) VALUES (1, "Human")'); 
            tx.executeSql('INSERT INTO type (id, name) VALUES (2, "Vulkan")'); 
            tx.executeSql('INSERT INTO type (id, name) VALUES (3, "Other")');
        }
        function successTransaction(){
            console.info("Success: Create tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction );
    },
    dropTables: function(){
        
        function txFunction(tx){
            var sqlDropReview = "DROP TABLE IF EXISTS review;";
            var sqlDropType = "DROP TABLE IF EXISTS type;";
            var options = [];
            
            function successDrop() {
                console.info("Success: review table dropped successfully");
            }
            tx.executeSql(sqlDropReview, options, successDrop, errorHandler );
            tx.executeSql(sqlDropType, options, successDrop, errorHandler );
        }
        
        function successTransaction(){
            console.info("Success: Drop tables transaction successful");
        }
        
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};