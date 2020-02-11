#Peacock & Brick City Classic results19.htm
import re
filename = input("Please enter file name in this folder: ")
f = open(filename, "r")

line = f.readline()
events = []
diffCols = []
x = 0
while line:
	if ('Women ' in line or "Men " in line) and 'Relay' not in line:
		eventName = line.rstrip()
		events.append([eventName])
		f.readline()
		cols = ['Place']
		cols += f.readline().split()
		cols.remove('Year')
		events[x].append(cols)
		eventList = []
		while line.lstrip()!="":
			try:
				temp = int(line.lstrip()[0])
				eventList.append(line.lstrip().rstrip())
			except ValueError:
				pass
			line = f.readline()
		new = []
		idx=0
		for i in eventList:
			i = i.replace("'", "\'")
			new.append(re.split(" {2,}|^[0-9]* ",i))
			new[idx][0] = str(idx+1)
			idx+=1
		events[x].append(new)
		x+=1
	elif "Relay" in line:
		eventName = line.rstrip()
		events.append([eventName])
		eventList = []
		f.readline()
		cols = ['Place']
		cols += f.readline().split()
		events[x].append(cols)
		while line.lstrip()!="":
			if line.lstrip()[0].isnumeric() and line.lstrip()[1]!=")":
				eventList.append(line.lstrip().rstrip())
			line = f.readline()
		new = []
		idx=0
		for i in eventList:
			i = i.replace("'", "\'")
			new.append(re.split(" {2,}|^[0-9]* ",i))
			new[idx][0] = str(idx+1)
			idx+=1
		events[x].append(new)
		x+=1
		
	line = f.readline()
f.close()

def dashList(header,dash):
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(dash,header, headers_no_seed)
def runList(header,run):
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(run, header, headers_no_seed)
def fiveKList(header,run):
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(run, header, headers_no_seed)
def relayList(header,relay):
	header.insert(2,'Team')
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(relay, header, headers_no_seed)
def hJumpList(header,jump):
	header.append('Conversion')
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(jump, header, headers_no_seed)
def runJumpList(header,rJump):
	header.insert(6,'Conversion')
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(rJump, header, headers_no_seed)
def throwList(header,throw):
	header.insert(5,'Conversion')
	headers_no_seed = header.copy()
	headers_no_seed.remove("Seed")
	return list_maker(throw, header, headers_no_seed)

def dict_maker(row, header):
	eventName = a[0]
	header = a[1]
	results = a[2]
	rtn = {}
	rtn["eventName"] = eventName
	rtn["data"] = []
	for i in results:
		result = {}
		x=0
		for j in header:
			if len(i)!= len(header):
				if j=="Seed":
					continue
				else:
					result[j] = i[x]
					x+=1
			else:
				result[j] = i[x]
				x+=1
		rtn["data"].append(result)
	return str(rtn)
	
def list_maker(dash,headers1,headers2):
	newDash = ""
	for i in range(0,len(dash)):
		entry = dash[i]
		c = 0
		for l in entry:
			if l[0].isalpha() and l[0]!= 'x':
				continue
			elif '.' in l:
				if '-' not in l:
					if l!=entry[-1]:
						c+=1
					else:
						c+=1
		newDash += "\t{"
		print(c)
		if c==1:
			print(entry,headers2)
		if len(entry)==len(headers1):
			for j in range(0,len(entry)):
				if j+1!=len(entry):
					newDash += "\""+headers1[j]+"\":\""+entry[j]+"\", "
				else:
					newDash += "\""+headers1[j]+"\":\""+entry[j]+"\""
		else:
			for j in range(0,len(entry)):
				if j+1!=len(entry):
					newDash += "\""+headers2[j]+"\":\""+entry[j]+"\", "
				else:
					newDash += "\""+headers2[j]+"\":\""+entry[j]+"\""
		if i+1!=len(dash):
			newDash += "},\n"
		else:
			newDash += "}\n"
	return newDash

o = open(filename[0:filename.index(".")]+"_output.json","w")
newJSON = ""

newJSON+="[\n"

for i in events:
	newJSON+="{\"eventName\":\""+i[0]+"\", \"data\":[\n"
	if ("Dash" in i[0] or "Hurdles" in i[0]) and "400" not in i[0]:
		newJSON+= dashList(i[1],i[2])
	elif ("Run" in i[0] or " 400" in i[0]) and "5000" not in i[0]:
		newJSON += runList(i[1],i[2])
	elif "5000" in i[0]:
		newJSON += fiveKList(i[1],i[2])
	elif "High Jump" in i[0]:
		newJSON += hJumpList(i[1],i[2])
	elif "Jump" in i[0]:
		newJSON += runJumpList(i[1],i[2])
	elif "Throw" in i[0] or "Shot Put" in i[0]:
		newJSON += throwList(i[1],i[2])
	elif "Relay" in i[0]:
		newJSON += relayList(i[1],i[2])
	if i!=events[-1]:
		newJSON += "]},\n"
	else:
		newJSON += "]}"

newJSON+="\n]"
print(newJSON)

o.write("var events = ")
o.write(newJSON)
o.close()

#{"eventName":"Women 100m Dash", "data":[ {"name": "abc", "age": 50 },{"age": 25, "hobby": "swimming" }]},
#{"eventName":"Women 200m Dash", "data":[ {"age": 25, "hobby": "swimming" }]},
#{"eventName":"Women 400m Dash", "data":[ {"name": "xyz","age":25, "hobby": "programming" }]}