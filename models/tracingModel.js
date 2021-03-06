const Database = require('../infrastructure/ManagerConnection').Connection;

class  TracingModel{
    
    constructor(tracing){
        this.database = new Database();
        this.database.getConection();

        if(tracing != undefined){
            this.confirmedAssistance =  tracing.confirmedAssistance;
        }
    }

    async getAllAttendance(id){
        console.log(id);
        return await this.database.queryCommand(`SELECT * FROM mydb.attendance WHERE idEvent = ${id}`);
   }

   async getAllEvents(){
    return await this.database.queryCommand(`SELECT * FROM mydb.events`);
    }

    async updateAttendance(id){    
        const result = await this.database.queryCommand(`UPDATE mydb.attendance SET confirmedAssistance ="${this.confirmedAssistance}" WHERE idattendance=${id} `);
        console.log(result);

    }

    async updateAttended(id, attend){
        const result = await this.database.queryCommand(`UPDATE mydb.attendance SET attended=${attend}
        WHERE idEvent=${id} `);
        console.log(result);
        return result['changedRows'] == 1 ? 'edited' :  'not-edited';
    }

    async countAttendend(){
        return await this.database.queryCommand(`SELECT COUNT(*) FROM mydb.attendance WHERE attended =1`)
    }

    async getLastActivitySystem(idUser){
        return await this.database.queryCommand(`SELECT * FROM mydb.lastActivitySystem WHERE idUser=${idUser}`);
    }

    async createLastActivitySystem(data){
        const hour =  `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}` 
        const result = await this.database.queryCommand(`INSERT INTO mydb.lastActivitySystem (idUser, activity, date, hour)
             values (${data.idUser}, "${data.activity}", "${new Date().toLocaleDateString()}", "${hour}")`);
        
        return result['affectedRows'] == 1 ? 'created' :  'not-created';
    }
}

    module.exports = {
        TracingModel : TracingModel
    }
    