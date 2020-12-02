# README

# 開発環境起動
* コンテナを起動する
$ docker-compose up -d

# viewへのアクセス
http://localhost:50004

# APIへのアクセス
http://localhost:50003

# DBへのアクセス
* 開発環境DB
host     : localhost
port     : 50001
database : myapp_development
user     : postgres
password : postgres

* テスト環境DB
host     : localhost
port     : 50002
database : myapp_test
user     : postgres
password : postgres
