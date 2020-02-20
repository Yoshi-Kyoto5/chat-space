# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
#  Chatspace DB設計
##  usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|
###  Association
- has_many :users_groups
- has_many  :groups,  through:  :users_groups

##  groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
|chatmemberadd|string|null: false|
###  Association
- has_many :users_groups
- has_many  :users,  through:  :users_groups

##  users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
###  Association
- belongs_to :user
- belongs_to :group
- has_many :posts

##  postsテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|
|text|text|null: false|
|users_groups_id|integer|null: false, foreign_key: true|
###  Association
- belongs_to :users_group

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
