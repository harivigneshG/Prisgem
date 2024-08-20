import frappe

@frappe.whitelist()
def calculate_doc_count(year, month,doc):
    
    table_name = f"tab{doc}"
    counts = frappe.db.sql(f"""
        WITH RECURSIVE DateSeries AS (
            SELECT DATE_FORMAT(CONCAT(%(year)s, '-', %(month)s, '-01'), '%%Y-%%m-01') AS date
            UNION ALL
            SELECT DATE_ADD(date, INTERVAL 1 DAY)
            FROM DateSeries
            WHERE date < LAST_DAY(CONCAT(%(year)s, '-', %(month)s, '-01'))
        )
        SELECT 
            DateSeries.date AS "date", 
            COUNT(doc.name) AS "created"
        FROM 
            DateSeries
        LEFT JOIN 
            `{table_name}` AS doc ON DATE(doc.creation) = DateSeries.date
        GROUP BY 
            DateSeries.date
        ORDER BY 
            DateSeries.date;
        """, {
        "year": year,
        "month": month
    }, as_dict=1)

    print(counts)
    return counts

