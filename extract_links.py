import openpyxl
import json

wb = openpyxl.load_workbook(r'S:\Iniyanmozhi\iniyenmozhi-dreams\Links.xlsx')
ws = wb.active

results = []
for row in ws.iter_rows(min_row=1, max_row=30, min_col=3, max_col=4, values_only=False):
    c_val = row[0].value
    d_val = row[1].value
    if c_val or d_val:
        results.append({
            "row": row[0].row,
            "col_c": str(c_val) if c_val else None,
            "col_d": str(d_val) if d_val else None
        })

with open(r'S:\Iniyanmozhi\iniyenmozhi-dreams\links_data.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print("Done! Wrote", len(results), "rows")
