import psycopg2
import psycopg2.extras
import requests
import json
import uuid
import random
import string
import datetime
from psycopg2 import OperationalError


# Accept database login info, loogin, and return a connection object
def createConnection(dbName, dbUser, dbPassword, dbHost, dbPort):
    connection = None
    try:
        connection = psycopg2.connect(database=dbName,
                                      user=dbUser,
                                      password=dbPassword,
                                      host=dbHost,
                                      port=dbPort,
                                      options='-c statement_timeout=10s')
        print("Connection to database ", dbName, " successful")
    except OperationalError as e:
        print(f"The error '{e} occurred")
    return connection


# Pass connection object and condition name in quotes to add to list of conditions.  Appends condName to condition table.
def addCondition(conn, condName):
    crsr = conn.cursor()
    cond1 = (condName, )
    SQL = "INSERT INTO condition (conditionname) VALUES (%s);"
    crsr.execute(SQL, cond1)
    crsr.close()


# Pass connection object to view list of conditions.  Outputs to console the conditions currently registered in condition table.
def showConditions(conn):
    crsr = conn.cursor()
    SQL = "SELECT * FROM condition;"
    crsr.execute(SQL)
    row = crsr.fetchall()
    for item in row:
        print(item)
    crsr.close()


# Generates a random filler value of argument length for filling names and email addresses.
# Returns a string of capital letters of length length.
def getRndStr(length):
    letters = string.ascii_uppercase
    resultStr = ''.join(random.choice(letters) for i in range(length))
    return resultStr


# Generates a random filler date value for filling the dob (date of birth) field.
# Returns a datetime.date object between stDte and edDte inclusive.
def getRndDate(stDte, edDte):
    diffTime = edDte - stDte
    diffDate = diffTime.days
    rndDays = random.randrange(diffDate)
    rndDate = stDte + datetime.timedelta(days=rndDays)
    return rndDate


# Pass connection to database.  Function outputs to console the locations currently in the db - data imported directly from Google Maps API.
def viewLocations(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM location;")
    row = cur.fetchall()

    for item in row:
        print(item)
    cur.close()


# Show the number of locations currently in the database
def viewNumLocs(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT (*) FROM location;")
    row = cur.fetchone()

    print("There are", row[0], "locations in the database")


# Show the number of visits currently in the database
def viewNumVisits(conn):
    cur = conn.cursor()
    cur.execute("SELECT COUNT (*) FROM visit;")
    row = cur.fetchone()

    print("There are", row[0], "visits in the database")


# Generates one random disease to assign to a user.  The diseaseID chosen at random is currently a random int from 1-30 inclusive.
# If the disease chosen at random matches a conditionid in the database, the condition is assigned to the user.  As of
# November 24, 2020 there are 6 conditions in the condition table so there is only a 1/5 chance that a user will be assigned a condition.
# Otherwise, no condition is assigned.
def addRndDisease(conn, sickUUID):
    diseaseID = random.randint(1, 30)
    chkDisSQL = "SELECT COUNT (conditionid) FROM condition WHERE conditionid = %s;"
    dataDisID = (diseaseID, )

    cur = conn.cursor()

    cur.execute(chkDisSQL, dataDisID)
    row = cur.fetchone()
    idPres = row[0]

    if idPres != 0:
        dataHasSQL = (sickUUID, diseaseID)
        chkHasSQL = "SELECT COUNT (hcuuid) FROM hascondition WHERE hcuuid = %s AND hccondid = %s;"

        cur.execute(chkHasSQL, dataHasSQL)
        row = cur.fetchone()
        idPres = row[0]

        if idPres == 0:
            insDisSQL = "INSERT INTO hascondition (hcuuid, hccondid) VALUES (%s, %s);"
            cur.execute(insDisSQL, dataHasSQL)
        else:
            print("User already has this condition.")

        cur.close()


# Generates a random user with a random uuid, random gender ("Male" or 'Female').  The functions getRndStr with length 6 is called for firstname and lastname
# and is called with length 14 for the email address (this does not attempt to create a realistic email with and @ character, etc).  dob is retrieved
# from a function call to getRndDate().  If the uuid is unique, the user is added and addRndDisease is called to assign a random condition.
def genRndUsr(conn):
    chkSQL = "SELECT COUNT (usruuid) FROM userinfo WHERE usruuid = %s;"

    insSQL = "INSERT INTO userinfo (usruuid, lastname, firstname, emailaddress, dob, gender) VALUES (%s, %s, %s, %s, %s, %s);"
    genders = ["Male", "Female"]
    userUUID = uuid.uuid4()
    lName = getRndStr(6)
    fName = getRndStr(6)
    eAdd = getRndStr(14)

    sDt = datetime.date(1940, 1, 1)
    eDt = datetime.date(2008, 12, 31)
    dob = getRndDate(sDt, eDt)

    gndr = random.choice(genders)
    dataSQL = (userUUID, lName, fName, eAdd, dob, gndr)
    dataUUID = (userUUID, )

    cur = conn.cursor()

    cur.execute(chkSQL, dataUUID)
    row = cur.fetchone()
    idPresent = row[0]

    if idPresent == 0:
        cur.execute(insSQL, dataSQL)
        print("Added: ", userUUID, fName, lName)
        addRndDisease(conn, userUUID)
    else:
        print("Already present: ", userUUID)

    cur.close()


# Pass connection to function.  Outputs to console entire list of all users including any health conditions assigned.
def viewAllUsersAndConds(conn):
    SQL = """SELECT u.firstname, u.lastname, c.conditionname FROM ((userinfo u LEFT JOIN hascondition h ON u.usruuid = h.hcuuid) LEFT JOIN 
            condition c ON h.hccondid = c.conditionid);"""

    crsr = conn.cursor()
    crsr.execute(SQL)

    row = crsr.fetchall()
    for item in row:
        print(item)

    crsr.close()


def viewNumUsersAndConds(conn):
    crsr = conn.cursor()
    crsr.execute("SELECT COUNT (*) FROM userinfo;")
    row = crsr.fetchone()
    print("There are", row[0], "users in the database")

    crsr.execute("SELECT COUNT (DISTINCT hcuuid) FROM hascondition;")
    row = crsr.fetchone()
    print(row[0], "of these users have underlying medical conditions")


# Prints to the console the user data currently located in the database.
def viewUsers(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM userinfo")
    row = cur.fetchall()

    for item in row:
        print(item)


# Add visit adds a user visit to a location when given the user's UUID, the location's ID, the date/time of the start
#  of the visit and the date/time of the end of the visit.
def addVisit(conn, usrUUID, locID, bDateTime, eDateTime):
    cur = conn.cursor()
    insSQL = """INSERT INTO visit (vstlocationid, vstuuid, datearrived, timearrived, 
        datedeparted, timedeparted) VALUES (%s, %s, %s, %s, %s, %s);"""
    bDate = bDateTime.date()
    bTime = bDateTime.time()
    eDate = eDateTime.date()
    eTime = eDateTime.time()

    try:
        #print(insSQL, (locID, usrUUID, bDate, bTime, eDate, eTime))
        cur.execute(insSQL, (locID, usrUUID, bDate, bTime, eDate, eTime))
    except psycopg2.DataError as er:
        print(f"The error '{er} occurred")


def showVisits(conn, dispUUID):
    cur = conn.cursor()
    visSQL = """SELECT u.firstname, u.lastname, l.locname, l.locaddress, v.datearrived, v.timearrived
                FROM ((userinfo u INNER JOIN visit v ON u.usruuid = v.vstuuid) INNER JOIN location l ON
                v.vstlocationid = l.loclocationid) WHERE usruuid = %s ORDER BY v.datearrived, v.timearrived;"""
    cur.execute(visSQL, (dispUUID, ))
    row = cur.fetchall()
    for item in row:
        print(item)


def addMoreConditions(conn):
    cur = conn.cursor()
    usrSQL = "SELECT usruuid FROM userinfo"
    cur.execute(usrSQL)
    row = cur.fetchall()
    for item in row:
        addRndDisease(conn, item[0])


def addRndVisitsAllUsers(conn):
    cur = conn.cursor()
    cur2 = conn.cursor()
    cur3 = conn.cursor()
    retrieveUserSQL = "SELECT usruuid FROM userinfo ORDER BY usruuid;"
    retrieveLocSQL = "SELECT loclocationid FROM location;"
    #chkSQL = "SELECT COUNT (*) FROM visit WHERE vstuuid = %(UUID)s AND datearrived = %(date)s AND timearrived = %(time)s;"
    chkSQL = "SELECT COUNT (*) FROM visit WHERE vstuuid = %s AND datearrived = %s AND timearrived = %s;"

    try:
        cur.execute(retrieveUserSQL)
    except:
        print("Could not get user list.")
        return

    try:
        cur2.execute(retrieveLocSQL)
    except:
        print("Could not get location list.")
        return

    userDetails = cur.fetchall()
    locDetails = cur2.fetchall()

    numLocs = len(locDetails)

    print(numLocs, "locations, ready to proceed.")

    vstCtr = 0
    usrCtr = 0

    for usrRow in userDetails:
        for x in range(20, 28):
            for y in range(8, 23):
                rndVis = random.randint(0, 2)
                if rndVis == 1:
                    bDT = datetime.datetime(2020, 11, x, y)
                    eDT = datetime.datetime(2020, 11, x, y + 1)
                    currentUUID = str(usrRow[0])
                    bDTdate = bDT.date()
                    bDTtime = bDT.time()

                    cur3.execute(chkSQL, (currentUUID, bDTdate, bDTtime))

                    visRow = cur3.fetchone()
                    visPres = visRow[0]

                    if visPres == 0:
                        selLocNum = random.randint(0, numLocs - 1)
                        selLoc = locDetails[selLocNum][0]
                        addVisit(conn, currentUUID, selLoc, bDT, eDT)
                        vstCtr += 1
        usrCtr += 1
        if usrCtr % 50 == 0:
            print(usrCtr, "users complete")

    print("Attempted to add", vstCtr, "visits.")


def addPosTests(conn):
    cur = conn.cursor()
    cur.execute("SELECT usruuid FROM userinfo;")
    row = cur.fetchall()
    sDt = datetime.date(2020, 11, 20)
    eDt = datetime.date(2020, 11, 27)
    posTestCtr = 0
    for item in row:
        rndVal = random.randint(0, 20)
        if rndVal == 1:
            testDate = getRndDate(sDt, eDt)
            cur.execute(
                "INSERT INTO covidtest (result, testdate, ctuuid) VALUES (%s, %s, %s)",
                (True, testDate, item[0]))
            posTestCtr += 1

    print(posTestCtr, "positive tests added")


def viewPosTests(conn):
    cur = conn.cursor()
    tstSQL = """SELECT u.firstname, u.lastname, c.testdate FROM userinfo u INNER JOIN 
            covidtest c ON u.usruuid = c.ctuuid WHERE c.result = %s ORDER BY c.testdate;"""

    cur.execute(tstSQL, (True, ))
    row = cur.fetchall()
    print("Positive COVID tests:")
    for item in row:
        print(item)


def calculateAge(born):
    today = datetime.date.today()
    return today.year - born.year - ((today.month, today.day) <
                                     (born.month, born.day))


def getUserDataForML(conn):
    cur = conn.cursor()
    getSQL = """SELECT u.usruuid, u.firstname, u.lastname, u.dob, u.gender, COALESCE(c.ccount, 0) AS condcount, ls.risksum FROM userinfo u 
                LEFT JOIN (SELECT hcuuid, COUNT (hcuuid) AS ccount FROM hascondition GROUP BY hcuuid) AS c ON c.hcuuid = u.usruuid 
                INNER JOIN (SELECT vstuuid, SUM(locriskscore) AS risksum FROM visit INNER JOIN location ON vstlocationid = loclocationid GROUP BY vstuuid) AS ls
                ON vstuuid = usruuid;"""

    cur.execute(getSQL)

    result = cur.fetchall()

    columns = [col[0] for col in cur.description]
    columns.append('age')
    rows = [
        dict(zip(columns, row + (calculateAge(row[3]), ))) for row in result
    ]

    return rows


def updateUserRiskScore(conn, uuidStr, riskScore):
    cur = conn.cursor()
    getIdSQL = "SELECT COUNT(usruuid) FROM userinfo WHERE usruuid = %s"
    addSQL = "UPDATE userinfo SET usrriskscore = %s WHERE usruuid = %s"
    cur.execute(getIdSQL)
    row = cur.fetchone()
    if row[0] == 0:
        print("Invalid user", uuidStr)
    elif riskScore < 0 or riskScore > 100:
        print("Invalid risk score", riskScore)
    else:
        cur.execute(addSQL, (riskScore, uuidStr))


def showTableSchema(conn, tableName):
    cur = conn.cursor()
    cur.execute(
        "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_name = %s",
        (tableName, ))
    row = cur.fetchall()
    for item in row:
        print(item)


def applyLocRisk(conn):
    cur = conn.cursor()
    incrementSQL = """UPDATE location SET locriskscore = locriskscore + 1 FROM ((visit INNER JOIN userinfo ON usruuid = vstuuid) INNER JOIN covidtest ON usruuid = ctuuid) 
    WHERE location.loclocationid = vstlocationid AND result = %s"""
    cur.execute(incrementSQL, (True, ))


def applyRndLocRisk(conn):
    cur = conn.cursor()
    cur.execute(
        "UPDATE location SET locriskscore = floor(random() * 999 + 1);")


# Main module begins here
# Function options:
#   addCondition(connection, "conditionName") ---- adds condition conditionName to the list of recognized conditions
#   showConditions(connection) ---- outputs to console the current conditions registered in the database
#   genRndUsr(connection) ---- generates random user and adds to user table - also calls addRndDisease when the new user is added
#   addRndDisease(connection, UUID) ---- adds a random disease to the user with the uuid passed with appx 20% rate of assigning a condition
#   viewLocations(connection) ---- outputs locations stored in database to console
#   viewUsers(connection) ---- outputs users stored in database to console
#   viewAllUsersAndConds(connection) ---- outputs all users and what conditions they may have to the console

conn = createConnection(sql_Database_Name, sql_User, sqp_Password,
                        sql_Server_Address, sql_Server_Port)

#conn = createConnection("postgres", "postgres", "password", "localhost", "5432")

psycopg2.extras.register_uuid()

#addLocation(conn)
#viewAllUsersAndConds(conn)

#viewUsers(conn)
#showConditions(conn)
#viewNumUsersAndConds(conn)
#viewNumLocs(conn)
#viewNumVisits(conn)
#addRndVisitsAllUsers(conn)
#viewPosTests(conn)
#addMoreConditions(conn)

#showVisits(conn, "4cd124d3-c304-4db0-8cd2-a0af2484716c")
#addPosTests(conn)

#applyLocRisk(conn)

for i in range(4):
    addMoreConditions(conn)

dictUsrData = getUserDataForML(conn)

#cur = conn.cursor()
#cur.execute("UPDATE location SET locriskscore = 0")
#applyRndLocRisk(conn)
#viewLocations(conn)

for item in dictUsrData:
    print(item)

conn.commit()
conn.close()
