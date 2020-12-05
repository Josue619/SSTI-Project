import { firestore } from '../config/firebaseDB';
import moment from "moment";

class MainService {

    getAll() {
        const dataStrings = [];
        firestore.collection('data').onSnapshot((snapshotChange) => {
            dataStrings.splice(0, dataStrings.length);
            snapshotChange.forEach((doc) => {
                dataStrings.push({
                    key: doc.id,
                    data: doc.data().data
                })
            });
        });

        return dataStrings;
    }

    getData(data) {
        const dataS = data.data.split('|');

        const user = {
            id: data.key,
            name: dataS[0],
            age: parseInt(dataS[1]),
            sex: dataS[2],
            birthdate: moment(new Date(dataS[3])).format("DD/MM/YY"),
            married: dataS[4],
        }

        return user;
    }

    async create(data) {
        const dataS = {
            data: this.concatData(data)
        }

        try {
            await firestore.collection('data').add(dataS);
        } catch (error) {
            console.log('Failed to save user');
        }
    }

    async update(id, data) {
        const dataS = {
            data: this.concatData(data)
        }

        try {
            await firestore.doc(`data/${id}`).set({
                data: dataS.data
            });
        } catch (error) {
            console.log('Failed to save user');
        }
    }

    concatData(data) {
        const dataS = "";
        const separator = "|";

        return dataS.concat(
            data.name, separator,
            data.age, separator,
            data.sex, separator,
            data.birthdate, separator,
            data.married
        );
    }

    validateChange(data, oldData) {
        let msj = 'Changes detected: ';
        const separator = ' - ';
        const lineJump = '\n';

        if (data.name != oldData.name) {
            msj = msj.concat(lineJump, oldData.name, separator, data.name, lineJump);
        }

        if (data.age != oldData.age) {
            msj = msj.concat(oldData.age, separator, data.age, lineJump);
        }

        if (data.sex != oldData.sex) {
            msj = msj.concat(oldData.sex, separator, data.sex, lineJump);
        }

        /* if (data.birthdate != oldData.birthdate) {
            msj = msj.concat(oldData.birthdate, separator, data.birthdate, lineJump);
        } */

        if (data.married != oldData.married) {
            msj = msj.concat(oldData.married, separator, data.married, lineJump);
        }

        return msj;
    }

}

export default new MainService();