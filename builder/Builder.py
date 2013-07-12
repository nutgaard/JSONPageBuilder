import gzip, os, sys, string, re
class Builder:
	def __init__(self, copyright, filename, scanFolders, removeTemp = True, debug = False):
		self.base = os.getcwd()
		self.copyright = copyright
		self.filename = filename+'.js'
		self.minfilename = filename+'.min.js'
		self.scanFolders = scanFolders
		self.files = []
		self.type = "js"
		self.removeTemp = removeTemp
		self.debug = debug

	def build(self):
		self.__sout__('Scanning folders')
		self.files = self.__scanFolders__([self.base+f for f in self.scanFolders])
		self.__sout__('Scan folders')
		self.__sout__([self.base+f for f in self.scanFolders])
		self.__sout__('Creating copyright')
		copyright = self.__createCopyright__()
		self.__sout__('Reading files')
		content = copyright + self.__createContent__()
		self.__sout__('Cleaning')
		cleanContent = self.__stripCode__(content)
		self.__sout__('Dumping before minimize')
		self.__write__(self.filename, cleanContent)
		self.__sout__('Minimizing')
		self.__compress__()
		self.__sout__('Dumping minimized file')
		self.__write__(self.filename, content)

		print('Full size:		' + self.__size__(self.filename))
		print('Minified size:		' + self.__size__(self.minfilename))

		if (self.removeTemp):
			os.remove(self.filename)


	def __createCopyright__(self):
		return "\n".join([
				'/*!', self.copyright,'*/',
				'/**@license ' + self.copyright, '*/'
			])

	def __createContent__(self):
		filecontent = []
		for file in self.files:
			content = self.__read__(file)
			self.__sout__('Reading '+file+" size: "+str(len(content)))
			filecontent.append(content)
		return "\n".join(filecontent)

	def __stripCode__(self, content):
		return re.sub(r'//\^[^\x00]*?//\$[^\n\r]+', '', content)

	def __write__(self, filename, filecontent):
		f = open(filename, 'w')
		f.write(filecontent)
		f.close()

	def __read__(self, filename):
		f = open(filename, 'r')
		content = f.read()
		f.close()
		return content

	def __compress__(self):
		self.__write__(self.minfilename, "")
		os.system('java -jar "' + './builder/jar/compiler.jar' + '" --compilation_level=SIMPLE_OPTIMIZATIONS --language_in ECMASCRIPT5_STRICT --js "' + self.filename + '" --js_output_file "' + self.minfilename + '"')

	def __size__(self, file):
		i = 0
		suffix = ['bytes', 'Kb', 'Mb']
		size = os.path.getsize(file)
		while 1023.0 < size:
			size = size / 1024.0
			i = i + 1
		return str(round(size, 2)) + ' ' + suffix[i]

	def __scanFolders__(self, folders):
		filelist = []
		for folder in folders:
			files = [os.path.join(folder, f) for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
			for f in files:
				if f not in filelist:
					filelist.append(f)
#			for root, dirs, files in os.walk(folder):
#				for f in files:
#					if (f.endswith("."+self.type)):
#						filelist.append(root+"/"+f)
		return filelist
	def __sout__(self, msg):
		if (self.debug):
			print(msg)