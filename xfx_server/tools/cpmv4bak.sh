#!/bin/bash
for i in `ls -l *.bak |awk -F ' ' '{print $9}'`
	do
		name=`echo $i|sed 's/.bak//g' `
		\cp -f ./$i   $name
	done
