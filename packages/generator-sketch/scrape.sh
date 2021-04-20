curl http://localhost:5005/ | egrep -o 'a href="(.+)"' | sed -e 's/a href="/http:\/\/localhost:5005/g' -e 's/"//g'

