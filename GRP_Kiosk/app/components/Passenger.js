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
    // passengers = useQuery(Passenger);
    return realm.objects("Passenger");
  }