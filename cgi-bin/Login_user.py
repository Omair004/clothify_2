#!/usr/bin/env python3
print("Content-Type: text/html\n")  # Ensure CGI response

import mysql.connector
import cgi
import sys
import hashlib

# Read form data
form = cgi.FieldStorage()
email = form.getvalue("email")
password = form.getvalue("password")

    
# Hash the entered password (to compare with stored hash)
hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Om@!r2004",
    database="my_database"
)

cursor = conn.cursor()

# Check if user exists with hashed password
cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, hashed_password))
user = cursor.fetchone()
def sendmail(email=email):
    return email
if user:
    print("<p>Login Successful!</p>")
    print("<a href='/html/Home_clothify.html'>Go to Home</a>")
else:
    print("<p>Invalid email or password.</p>")
    print("<a href='/html/Login_clothify.html'>Try Again</a>")

# Close connection
cursor.close()
conn.close()
