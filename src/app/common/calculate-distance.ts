export class CalculateDistance {

    public static calculateDistance(uLat:number, ulon:number,shopLat:number,shopLon:number):number{
        // let userLat = uLat;
        const R = 6371;
        const culculateLat = this.deg2Rad(shopLat - uLat);
        const culculateLon = this.deg2Rad(shopLon - ulon);
        const calculation = 
             Math.sin(culculateLat/2)*
             Math.sin(culculateLat/2) +
             Math.cos(this.deg2Rad(uLat))* 
             Math.cos(this.deg2Rad(shopLat)) * 
             Math.sin(culculateLon/2) *  
             Math.sin(culculateLon/2);
        
        const killo = 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1-calculation));
        const distance = (R * killo);
        return distance;
    }
    public static deg2Rad(deg:number):number{
        return deg * (Math.PI/180)
    }
}
