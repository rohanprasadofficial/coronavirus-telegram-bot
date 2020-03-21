from bs4 import BeautifulSoup
import requests
from tabulate import tabulate
import json

def fetchData(url):

	try:
		print("Fetching Data from : "+ url + " , please wait..")
		source=requests.get(url).text

		soup=BeautifulSoup(source,'lxml')

		dtable=soup.find('div',class_="table-responsive")
		table_rows=dtable.find_all('tr')

		data=[]

		td=table_rows[0].find_all('th')
		header=[i.text for i in td]
		data.append(header)
		print(header)
		for tr in table_rows:
			td=tr.find_all('td')
			row=[i.text for i in td]
			data.append(row)
		#print(tabulate(data,headers=header,tablefmt="simple"))
		dicdata=[]


		#print(data)

		for i in range(2,len(data)-2):
			dicdata.append({data[0][0]: data[i][0] , data[0][1]: data[i][1] , data[0][2]: data[i][2] , data[0][2]: data[i][2] , data[0][3]:data[i][3] , data[0][4]:data[i][4],data[0][5]:data[i][5]})
		dicdata.append({data[0][2] : data[len(data)-2][1] , data[0][3] : data[len(data)-2][2] , data[0][4]:data[len(data)-2][3],data[0][5]:data[len(data)-2][4]})
		with open("results.json", "w") as outfile:
    			json.dump(dicdata, outfile)
			print("Successfully wrote data , check results.json ")
	except:
		print("Error")

fetchData("https://www.mohfw.gov.in")

