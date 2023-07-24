import * as SQLite from "expo-sqlite";
import { Place } from "../modals/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((reslove, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => {
          reslove();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export const insertPlace = (place) => {
  const promise = new Promise((reslove, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title,imageUri,address,lat,lng) VALUES (?,?,?,?,?)`,
        [place.title, place.imageUri, place.address, place.lat, place.lng],

        (_, result) => {
          reslove();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((reslove, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],

        (_, result) => {
          const places = [];
          for(db of result.rows._array) {
              places.push(
                new Place(db.title, db.imageUri, {address: db.address, lat: db.lat, lng: db.lng}, db.id)
              )
          }
          reslove(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaceDetail = (id) => {
  const promise = new Promise( (reslove, reject) => {
      database.transaction( (tx) => {
          tx.executeSql(`SELECT * FROM places WHERE id = ?`, [id],
            (_, result) => {
              reslove(result.rows._array[0]);
            },
            (_, error) => {
              reject(error);
            }
          )
      });
  });
  return promise;
}
