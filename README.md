# A small restful CMS based on koa framework

## Test curl

```
curl http://0.0.0.0:3000/api/v1/Author/batch -X PUT -H "Content-Type:application/json" -d '[{"id": 1,"name":"fungleo1"},{"id": 2,"name":"fungleo2"},{"id": 3,"name":"fungleo3"}]'

curl http://0.0.0.0:3000/api/v1/Author/batch -X PUT -H "Content-Type:application/json" -d '[{"id": 1,"name":"fungleo4"},{"id": 2,"name":"fungleo5"},{"id": 3,"name":"fungleo6"}]'

curl http://0.0.0.0:3000/api/v1/Author/FIRST -X PUT -H "Content-Type:application/json" -d '{"name":"fungleo","mark":"articleContent","mobile": "13311122235"}'
curl http://0.0.0.0:3000/api/v1/Author/batch -X PUT -H "Content-Type:application/json" -d '[{"name":"fungleo4"},{"id": 2,"name":"fungleo5"},{"id": 3,"name":"fungleo6"}]'

curl http://0.0.0.0:3000/api/v1/Author -X POST -H "Content-Type:application/json" -d '[{"name":"fungleo","mark":"articleContent","mobile": "13311122233"},{"name":"fungleo","mark":"articleContent","mobile": "13311122233"},{"id": 1, "name":"fungleo","mark":"articleContent","mobile": "13311122233"}]'

curl http://0.0.0.0:3000/api/v1/Author/1,2,3,4,5 -X DELETE

curl http://0.0.0.0:3000/api/v1/Author\?pageSize\=3\&page\=1\&mobile\=13311122233
```
