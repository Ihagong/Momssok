import glob
import os

a = glob.glob('mydata\labels\*.xml', recursive = True)
f = open("mydata\path.txt", 'w')
for i in a:
    # b= i.split("\\")[-1]
    # print(b)
    print(i)
    f.write(i+'\n')
f.close()