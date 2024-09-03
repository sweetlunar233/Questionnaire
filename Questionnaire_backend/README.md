# Questionnaire_backend
## 安装包和依赖项
(The following commands should be executed under the root directory)
```
pip install -r requirements.txt
```

## 服务器和数据库
服务器：
公网地址：49.232.201.229
内网地址：10.0.16.13
登录用户：ubuntu
密码：BUaa21374125

数据库：
外部地址：bj-cynosdbmysql-grp-g9kxigho.sql.tencentcdb.com:23531
内部地址：172.21.0.7:3306
用户3：buaa21374125
密码：BUaa21374125

## 数据库迁移
修改`models.py`后，在`backend`下执行：
```
python manage.py makemigrations user
python manage.py migrate user
```

## 关闭占用当前端口的进程
找到端口`8000`对应的进程号(PID):
```
sudo lsof -i :8000
```
kill进程：
```
kill [PID]
```