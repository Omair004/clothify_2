#!/usr/bin/env python3
print("Content-Type: text/html\n")  # Ensure CGI response

import mysql.connector
import cgi
import sys
import hashlib

# Get form data (CGI method)
form = cgi.FieldStorage()
username = form.getvalue("username")
email = form.getvalue("email")
password = form.getvalue("password")

# Debugging: Print received data (remove password from logs for security)
print(f"<p>Received: username={username}, email={email}</p>")

# Check if data is missing
if not username or not email or not password:
    print("<p>Error: Missing form data.</p>")
    sys.exit()  # Exit if data is missing

try:
    # Connect to MySQL
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Om@!r2004",  # Your MySQL password
        database="my_database"  # Replace with your actual database name
    )

    cursor = conn.cursor()

    # Hash the password before storing it (important for security)
    hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # Insert user data into the 'users' table
    sql = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
    cursor.execute(sql, (username, email, hashed_password))
    conn.commit()

    print("<p>Registration Successful!</p>")  # Success response
    print("<a href='/html/login_clothify.html'>Go to Login</a>")  # Link to login page

except mysql.connector.errors.IntegrityError:
    print("<p>Error: Email already exists.</p>")

except Exception as e:
    print(f"<p>Error: {str(e)}</p>")  # Print actual error for debugging

finally:
    cursor.close()
    conn.close()
