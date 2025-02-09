import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Om@!r2004",  # Replace with your actual MySQL password
    database="my_database"    # Replace with your database name
)

cursor = conn.cursor()

# SQL Query to insert data into the 'users' table
sql = "INSERT IGNORE INTO users (name, email) VALUES (%s, %s)"
values = [
    ("Alice", "alice@example.com"),
    ("Bob", "bob@example.com"),
    ("Charlie", "charlie@example.com")
]

# Execute the query
cursor.executemany(sql, values)
conn.commit()  # Save changes

print(f"{cursor.rowcount} records inserted successfully!")

# Close connection
cursor.close()
conn.close()



