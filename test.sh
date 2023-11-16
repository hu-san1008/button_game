#!/bin/bash
set -e
sudo /opt/lampp/lampp status #現在の状況を確認する
echo "データベースを起動しますか?(y/n)"
read DATA
if [ $DATA == "y" ]; then
	sudo /opt/lampp/lampp startmysql
	sudo /opt/lampp/lampp startapache
elif [ $DATA == "n" ]; then
	sudo /opt/lampp/lampp stop
else
	sudo /opt/lampp/lampp status #yes no以外なら再度現状を表示
fi

#sudo /opt/lampp/lampp start

#npm start