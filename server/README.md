## Install Instructions

- Place the `flows.npy` file in this directory
- Create a virtualenv
```
virtualenv --python=/usr/bin/python3.7 env
source ./env/bin/activate
```
- Install libraries
```
pip install flask numpy pandas
```
- Run the Application `python app.py`
- Add a proxy in the React app to direct the server requests to the flask app. To do this, add the line `"proxy": "http://localhost:5000",` inside the `package.json` file of React app. An example is shown below. 
```
},
  "eslintConfig": {
    "extends": "react-app"
  },
  "proxy": "http://localhost:5000",
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
```