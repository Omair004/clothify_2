# import mysql.connector

# # Connect to MySQL
# conn = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="Om@!r2004",  # Your actual MySQL password
#     database="my_database"  # Your actual database name
# )

# cursor = conn.cursor()
# cursor.execute("SELECT name, email FROM users")
# users = cursor.fetchall()

# # Debugging: Print fetched users
# print("Fetched users:", users)

# # Create an HTML file with the data
# html_content = """
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Users List</title>
#     <style>
#         body { font-family: Arial, sans-serif; margin: 20px; padding: 20px; }
#         table { width: 100%; border-collapse: collapse; margin-top: 20px; }
#         th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
#         th { background-color: #f4f4f4; }
#     </style>
# </head>
# <body>
#     <h2>Registered Users</h2>
#     <table>
#         <tr><th>Name</th><th>Email</th></tr>
# """

# if not users:
#     html_content += "<tr><td colspan='2'>No users found</td></tr>\n"

# for user in users:
#     html_content += f"<tr><td>{user[0]}</td><td>{user[1]}</td></tr>\n"

# html_content += """
#     </table>
# </body>
# </html>
# """

# # Save the HTML file in the 'html' folder
# with open("../html/users.html", "w") as file:
#     file.write(html_content)

# print("✅ users.html has been updated successfully!")

# # Close connection
# cursor.close()
# conn.close()
import mysql.connector
import json
# import Login_user as lu

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Om@!r2004",  # Your actual MySQL password
    database="my_database"  # Your actual database name
)

cursor = conn.cursor()

# Get the username from the URL (assuming you’re passing it as a query parameter or path)
username = "omair.m2004@gmail.com"  # Replace this with the actual username (either from a session or passed via query parameter)
# print(username)
# Query the database for user data
cursor.execute("SELECT name FROM users WHERE email = %s", (username,))
user = cursor.fetchone()

# Close connection
cursor.close()
conn.close()

# If user found, return their data as JSON, otherwise return a "Guest" response
if user:
    response = {
        'name': user[0]
    }
else:
    response = {
        'name': 'Guest'
    }

# Output the response as JSON
print("Content-Type: application/json\n")
print(json.dumps(response))
