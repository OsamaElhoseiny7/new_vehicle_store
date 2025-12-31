import { MongoClient as _MongoClient } from 'mongodb';
let _db;

export function mongoConnect(){
    _MongoClient.connect(process.env.MONGODB_CONNECTION)
    .then(client=>{
        _db = client.db()
        console.log('connect correctly to DB')
        // cb()
})
.catch(err=> new Error(' cant connect database '))
}

export function getDB() {
    if(_db){
        return _db
    }
    else{
        throw "no database is not found"
    }
}


