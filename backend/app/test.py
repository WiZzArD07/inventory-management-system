import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5433",
    database="inventory_db",
    user="postgres",
    password="@Aryan2006"
)

print("Connected Successfully!")