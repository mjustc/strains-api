# CBD Strains
## REST API using Node.js, Express, and MongoDB
 
 ## Introduction
 This simple api provides information about CBD strains and their effects (medical, positive and negative) and flavors.
 Even you can discover your favorite strains.
 
 1. Install Node.js and MongoDB.
 2. Create 3 collections into test database: strains, effects and flavors. Add data.json files to each collection.
 3. Run your mongo in the default port. You can check the logs if you are conected.
 4. cd /strains-api and `npm install` & `npm start` or `npm test`
 6. Use Postman or curl to discover your favorite strains:
 
 `POST localhost:3000/survey`
````
{
    "race": "indica",
    "positive": [
        "Happy",
        "Relaxed"
    ],
    "medical": [
        "Stress"
    ],
    "negative": [
        "Dizzy"
    ],
    "flavors": [
        "Mango"
    ]
}
 ````

 4. Check swagger to see the documentation. `http://localhost:3000/api-docs/`
