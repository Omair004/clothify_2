import mysql.connector

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Om@!r2004",  # Replace with your MySQL password
    database="my_database"    # Replace with your database name
)

cursor = conn.cursor()
cursor.execute("SHOW TABLES")

print("Tables in database:")
for table in cursor.fetchall():
    print(table)

conn.close()
