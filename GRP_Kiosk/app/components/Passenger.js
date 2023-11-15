import { useQuery } from "@realm/react";
import { realm } from "../../App";

export class Passenger extends Realm.Object {
    static schema = {
      name: 'Passenger',
      properties: {
        uuid: {type: 'string', indexed: true},
        expireDate: 'date',
      },
    };
  }

  export function getPassenger() {
    return realm.objects("Passenger");
  }

  export function createPassenger (passenger) {
    console.log("adding passenger")
    realm.write(() => {
      realm.create('Passenger', {
        uuid: passenger.passengerId,
        expireDate: passenger.expireDate,
        update: true
      });
      console.log(realm.objects("Passenger"))
    });
  };  